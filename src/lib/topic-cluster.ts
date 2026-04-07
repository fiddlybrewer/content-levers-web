// Topic cluster analysis from a sitemap.xml
// Zero external dependencies — pure fetch + string parsing.

const DEFAULT_MAX_PAGES = 1000;
const ABSOLUTE_MAX_PAGES = 10000;
const FETCH_CONCURRENCY = 20;
const PAGE_FETCH_TIMEOUT_MS = 6000;
const SITEMAP_FETCH_TIMEOUT_MS = 10000;
const USER_AGENT =
  "Mozilla/5.0 (compatible; ContentLeversTopicBot/1.0; +https://contentlevers.xyz/free-tools/topic-cluster-generator)";

// Common English stopwords — only true grammatical/structural words, no topic keywords.
// We deliberately avoid adding words like "press", "offers", "tag" here — those are site-specific
// junk that should be filtered via the user-facing exclude input, not globally hardcoded.
const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","then","else","when","at","by","for","with","about","against","between",
  "into","through","during","before","after","above","below","to","from","up","down","in","out","on","off",
  "over","under","again","further","is","are","was","were","be","been","being","have","has","had","do","does",
  "did","doing","will","would","could","should","may","might","must","shall","can","of","this","that","these",
  "those","i","you","he","she","it","we","they","them","his","her","its","our","their","my","your","as","so",
  "than","too","very","s","t","just","don","now","no","not","only","own","same","such","how","why","what",
  "which","who","whom","where","html","php","asp","aspx","htm","page","pages","www","com","org","net","xyz",
  "io","co","home","index","default","read","more","new","best","top","get","make","use","using","way",
  "ways","need","one","two","all","any","some","also","first","last","next","prev","here","there",
]);

export interface TopicResult {
  keyword: string; // cluster label (the topic term)
  count: number; // total pages in this cluster
  percentage: number; // count / totalPages * 100
  keywords: string[]; // subtopic angles covered in this cluster
  samplePages: string[]; // up to 5 sample URLs in the cluster
}

export interface SiteSection {
  section: string; // e.g. "marketplace", "blog", "dictionary", or "homepage" for /
  count: number; // pages in this section
  percentage: number; // count / totalPages * 100
  samplePages: string[]; // up to 5 sample URLs
}

export interface AnalysisResult {
  sitemapUrl: string;
  totalUrlsInSitemap: number;
  analyzedPages: number;
  rawUrls: string[]; // full URL list returned to client for dynamic re-clustering
  topics: TopicResult[];
  sections: SiteSection[];
  samplePages: { url: string; title: string }[];
  durationMs: number;
  truncated: boolean;
}

function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, {
    signal: ctrl.signal,
    headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xml,text/xml,*/*" },
    redirect: "follow",
  }).finally(() => clearTimeout(timer));
}

// Parse a sitemap.xml and recursively expand sitemapindex files. Returns URLs.
async function parseSitemap(url: string, maxPages: number, depth = 0): Promise<string[]> {
  if (depth > 3) return []; // safety against recursive loops
  const res = await fetchWithTimeout(url, SITEMAP_FETCH_TIMEOUT_MS);
  if (!res.ok) throw new Error(`Failed to fetch sitemap (${res.status})`);
  const text = await res.text();

  // Detect sitemapindex (nested sitemaps)
  if (/<sitemapindex[\s>]/i.test(text)) {
    const nested = [...text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
    const all: string[] = [];
    for (const sub of nested) {
      try {
        const subUrls = await parseSitemap(sub, maxPages, depth + 1);
        all.push(...subUrls);
        if (all.length >= maxPages * 2) break;
      } catch {
        /* skip broken sub-sitemap */
      }
    }
    return all;
  }

  // Regular urlset
  return [...text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
}

// Extract title + meta description from an HTML string
function extractMeta(html: string): { title: string; description: string } {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i) ||
    html.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i);

  const decode = (s: string) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();

  return {
    title: titleMatch ? decode(titleMatch[1]) : "",
    description: descMatch ? decode(descMatch[1]) : "",
  };
}

// Fetch a single page and extract its metadata. Returns null on failure.
async function fetchPageMeta(url: string): Promise<{ url: string; title: string; description: string } | null> {
  try {
    const res = await fetchWithTimeout(url, PAGE_FETCH_TIMEOUT_MS);
    if (!res.ok) return null;
    // Only read first ~100KB — titles/metas are always in <head>
    const reader = res.body?.getReader();
    if (!reader) {
      const text = await res.text();
      const meta = extractMeta(text);
      return { url, ...meta };
    }
    let received = "";
    const decoder = new TextDecoder();
    let bytes = 0;
    while (bytes < 100_000) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      received += decoder.decode(value, { stream: true });
      // Early exit once we have <meta> stuff closed
      if (received.includes("</head>")) break;
    }
    try {
      await reader.cancel();
    } catch {
      /* ignore */
    }
    const meta = extractMeta(received);
    return { url, ...meta };
  } catch {
    return null;
  }
}

// Run fetches in bounded-concurrency batches
async function fetchAllPages(urls: string[]): Promise<{ url: string; title: string; description: string }[]> {
  const results: { url: string; title: string; description: string }[] = [];
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const idx = i++;
      const r = await fetchPageMeta(urls[idx]);
      if (r) results.push(r);
    }
  }
  await Promise.all(Array.from({ length: FETCH_CONCURRENCY }, worker));
  return results;
}

// Normalize text for keyword extraction
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && w.length <= 25 && !STOPWORDS.has(w) && !/^\d+$/.test(w));
}

// Plural stripper only — keeps the actual word forms intact.
// "tools" -> "tool", "queries" -> "query", "alternatives" -> "alternative".
// We deliberately do NOT strip -ing (scheduling -> schedul) or -ed.
// Over-aggressive stemming creates nonsense tokens that confuse users.
function stem(word: string): string {
  if (word.length <= 4) return word;
  // -ies -> -y (queries -> query, categories -> category)
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  // -sses -> -ss (classes -> class)
  if (word.endsWith("sses")) return word.slice(0, -2);
  // -s -> drop, but not -ss, -us, -is (tools -> tool, alternatives -> alternative,
  // but not business -> busines, analysis -> analysi)
  if (word.endsWith("s") && !word.endsWith("ss") && !word.endsWith("us") && !word.endsWith("is"))
    return word.slice(0, -1);
  return word;
}

// Extract keywords from the URL slug (last path segment only).
// Slug-only avoids folder names like "blog", "posts", "category" polluting the topic list.
function extractKeywordsFromSlug(url: string): string[] {
  let path = "";
  try {
    path = new URL(url).pathname;
  } catch {
    return [];
  }

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  // Use only the last segment — that's the actual page slug
  const slug = segments[segments.length - 1];
  const tokens = tokenize(slug).map(stem);
  if (tokens.length === 0) return [];

  const unigrams = new Set(tokens);
  const bigrams = new Set<string>();
  for (let i = 0; i < tokens.length - 1; i++) {
    bigrams.add(`${tokens[i]} ${tokens[i + 1]}`);
  }
  return [...unigrams, ...bigrams];
}

// Build topic clusters using a greedy "dominant keyword" approach.
// 1. Extract keywords per page from URL slug.
// 2. Rank keywords by how many pages they appear on.
// 3. For each top keyword (in order), claim the pages it appears on that
//    haven't been claimed yet. Those pages become a cluster.
// 4. Collect all supporting subtopic keywords from the pages in that cluster.
export function clusterTopics(
  pages: { url: string }[],
  options?: { excludeKeywords?: string[] }
): TopicResult[] {
  const totalPages = pages.length;
  if (totalPages === 0) return [];

  // Normalize exclude keywords — user-provided filter terms (e.g. "press, tag, offers")
  const excludeSet = new Set(
    (options?.excludeKeywords ?? [])
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k.length > 0)
  );

  // Filter pages: drop any URL whose full path contains an excluded keyword
  const filteredPages = pages.filter((p) => {
    if (excludeSet.size === 0) return true;
    try {
      const path = new URL(p.url).pathname.toLowerCase();
      for (const kw of excludeSet) {
        if (path.includes(kw)) return false;
      }
      return true;
    } catch {
      return true;
    }
  });

  if (filteredPages.length === 0) return [];

  // 1. For each page, extract its slug keywords
  const pageKeywords = new Map<string, Set<string>>(); // url -> keywords
  const keywordPages = new Map<string, Set<string>>(); // keyword -> urls

  for (const p of filteredPages) {
    const kws = new Set(extractKeywordsFromSlug(p.url));
    pageKeywords.set(p.url, kws);
    for (const kw of kws) {
      if (!keywordPages.has(kw)) keywordPages.set(kw, new Set());
      keywordPages.get(kw)!.add(p.url);
    }
  }

  // 2. Rank candidate cluster labels.
  // Prefer bigrams over unigrams (more specific) and keywords on more pages.
  const candidates = [...keywordPages.entries()]
    .map(([kw, urls]) => ({
      keyword: kw,
      pages: urls,
      count: urls.size,
      isBigram: kw.includes(" "),
    }))
    .filter((c) => c.count >= 1)
    .sort((a, b) => {
      // Prefer higher count first
      if (b.count !== a.count) return b.count - a.count;
      // Tiebreak: bigrams first (more specific)
      if (a.isBigram !== b.isBigram) return a.isBigram ? -1 : 1;
      return a.keyword.length - b.keyword.length;
    });

  // 3. Greedy claim: each cluster gets the pages that haven't been claimed yet.
  const MAX_CLUSTERS = 12;
  const MIN_CLUSTER_SIZE = 1;
  const claimedPages = new Set<string>();
  const clusters: TopicResult[] = [];

  for (const cand of candidates) {
    if (clusters.length >= MAX_CLUSTERS) break;

    const newPages = [...cand.pages].filter((url) => !claimedPages.has(url));
    if (newPages.length < MIN_CLUSTER_SIZE) continue;

    // 4. Collect supporting keywords from all pages in this cluster
    const supportingKeywords = new Map<string, number>(); // kw -> count
    for (const url of newPages) {
      const kws = pageKeywords.get(url) ?? new Set();
      for (const kw of kws) {
        if (kw === cand.keyword) continue;
        supportingKeywords.set(kw, (supportingKeywords.get(kw) ?? 0) + 1);
      }
    }

    // Dedupe supporting keywords: drop unigrams that are part of kept bigrams
    const sortedSupport = [...supportingKeywords.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([kw]) => kw);

    const keptSupport: string[] = [];
    const droppedSub = new Set<string>();
    for (const kw of sortedSupport) {
      if (kw.includes(" ")) {
        keptSupport.push(kw);
        kw.split(" ").forEach((w) => droppedSub.add(w));
      }
    }
    for (const kw of sortedSupport) {
      if (!kw.includes(" ") && !droppedSub.has(kw)) keptSupport.push(kw);
    }

    clusters.push({
      keyword: cand.keyword,
      count: newPages.length,
      percentage: Math.round((newPages.length / filteredPages.length) * 1000) / 10,
      keywords: keptSupport.slice(0, 12),
      samplePages: pickDiverseSamples(newPages, 5),
    });

    newPages.forEach((url) => claimedPages.add(url));
  }

  return clusters;
}

// Normalize a URL by stripping locale prefix (/en/, /fr-ca/, /pt-br/, etc.)
// so /fr/notion-integration and /en/notion-integration look like duplicates.
function normalizePath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\/[a-z]{2}(-[a-z]{2,4})?(\/|$)/i, "/").replace(/\/+$/, "") || "/";
  } catch {
    return url;
  }
}

// Group URLs by their first path segment after the domain.
// Only counts URLs that live INSIDE a directory (e.g. /blog/post-1, /marketplace/abc),
// not standalone root-level landing pages (/about, /pricing, /google-calendar-integration).
// This shows the actual structural sections of a site, not noise from landing page URLs.
export function extractSections(urls: string[]): SiteSection[] {
  const totalPages = urls.length;
  if (totalPages === 0) return [];

  const sectionPages = new Map<string, string[]>();

  for (const url of urls) {
    let pathname = "";
    try {
      pathname = new URL(url).pathname;
    } catch {
      continue;
    }

    // Strip locale prefix so /en/blog/x and /fr/blog/x both count as "blog"
    const noLocale = pathname.replace(/^\/[a-z]{2}(-[a-z]{2,4})?(\/|$)/i, "/");
    const segments = noLocale.split("/").filter(Boolean);

    // Only count URLs that have a real subdirectory path: /section/page
    // Root-level standalone pages (/about, /pricing, /landing-page) are not "sections" —
    // they're individual pages that happen to live at the top of the site.
    if (segments.length < 2) continue;

    const section = segments[0];

    if (!sectionPages.has(section)) sectionPages.set(section, []);
    sectionPages.get(section)!.push(url);
  }

  return [...sectionPages.entries()]
    .filter(([, pages]) => pages.length > 1)
    .map(([section, pages]) => ({
      section,
      count: pages.length,
      percentage: Math.round((pages.length / totalPages) * 1000) / 10,
      samplePages: pickDiverseSamples(pages, 5),
    }))
    .sort((a, b) => b.count - a.count);
}

// Pick up to N sample URLs that are different content (not the same page
// translated into multiple locales).
function pickDiverseSamples(urls: string[], n: number): string[] {
  const seen = new Set<string>();
  const picked: string[] = [];
  for (const url of urls) {
    const key = normalizePath(url);
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(url);
    if (picked.length >= n) break;
  }
  // If we ran out of unique pages and still have room, fill with leftovers
  if (picked.length < n) {
    for (const url of urls) {
      if (picked.includes(url)) continue;
      picked.push(url);
      if (picked.length >= n) break;
    }
  }
  return picked;
}

export async function analyzeSitemap(
  rawUrl: string,
  options?: { maxPages?: number }
): Promise<AnalysisResult> {
  const started = Date.now();

  // Resolve max pages: clamp user input between 100 and ABSOLUTE_MAX_PAGES
  const maxPages = Math.min(
    ABSOLUTE_MAX_PAGES,
    Math.max(100, options?.maxPages ?? DEFAULT_MAX_PAGES)
  );

  // Normalize input
  let sitemapUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(sitemapUrl)) sitemapUrl = `https://${sitemapUrl}`;
  if (!sitemapUrl.includes("sitemap")) {
    // Treat as domain — append /sitemap.xml
    sitemapUrl = sitemapUrl.replace(/\/+$/, "") + "/sitemap.xml";
  }

  let urls = await parseSitemap(sitemapUrl, maxPages);
  const total = urls.length;

  // Dedupe
  urls = Array.from(new Set(urls));

  const truncated = urls.length > maxPages;
  if (truncated) {
    // Evenly sample down to maxPages
    const step = urls.length / maxPages;
    const sampled: string[] = [];
    for (let i = 0; i < maxPages; i++) sampled.push(urls[Math.floor(i * step)]);
    urls = sampled;
  }

  // URL-slug-only analysis — no HTML fetching needed. Much faster.
  const pages = urls.map((url) => ({ url }));
  const topics = clusterTopics(pages);
  const sections = extractSections(urls);

  // Fetch titles for just a few sample pages (for display purposes only, not analysis)
  const sampleUrls = urls.slice(0, 8);
  const sampleFetched = await fetchAllPages(sampleUrls);
  const sampleByUrl = new Map(sampleFetched.map((p) => [p.url, p.title || p.url]));
  const samplePages = sampleUrls.map((url) => ({ url, title: sampleByUrl.get(url) || url }));

  return {
    sitemapUrl,
    totalUrlsInSitemap: total,
    analyzedPages: pages.length,
    rawUrls: urls,
    topics,
    sections,
    samplePages,
    durationMs: Date.now() - started,
    truncated,
  };
}
