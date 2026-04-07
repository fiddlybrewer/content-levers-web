"use client";

import { useEffect, useMemo, useState } from "react";
import TopicTreemap, { TopicCell } from "@/components/TopicTreemap";
import { clusterTopics, extractSections, type SiteSection } from "@/lib/topic-cluster";

// Rotating status messages shown while the analysis is running.
// They cycle through to give the user a sense of progress and what's happening behind the scenes.
const LOADING_STEPS = [
  "Fetching the sitemap...",
  "Reading sub-sitemaps...",
  "Collecting URLs...",
  "Tokenizing slugs...",
  "Finding common patterns...",
  "Building topic clusters...",
  "Counting subtopics...",
  "Picking sample pages...",
  "Almost there...",
];

interface AnalysisResult {
  sitemapUrl: string;
  totalUrlsInSitemap: number;
  analyzedPages: number;
  rawUrls: string[];
  topics: TopicCell[];
  sections: SiteSection[];
  samplePages: { url: string; title: string }[];
  durationMs: number;
  truncated: boolean;
}

const SAMPLE_DEPTHS = [
  { value: 1000, label: "Standard (1,000 pages)", hint: "~10-20s" },
  { value: 2500, label: "Deep (2,500 pages)", hint: "~20-40s" },
  { value: 5000, label: "Very deep (5,000 pages)", hint: "~40-80s" },
  { value: 10000, label: "Maximum (10,000 pages)", hint: "~1-2 min" },
];

export default function TopicClusterGeneratorClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [maxPages, setMaxPages] = useState(1000);

  // User-facing exclude filter: comma-separated keywords like "press, offers, tag"
  const [excludeInput, setExcludeInput] = useState("");

  // Cycle through loading status messages while the analysis is running
  const [loadingStep, setLoadingStep] = useState(0);
  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [loading]);

  // Parse the exclude input into an array of trimmed lowercase keywords
  const excludeKeywords = useMemo(() => {
    return excludeInput
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k.length > 0);
  }, [excludeInput]);

  // Apply the user's exclude filter to the raw URL list once, then reuse
  // the filtered list for both topic clustering and section extraction.
  const filteredUrls = useMemo(() => {
    if (!result) return [];
    if (excludeKeywords.length === 0) return result.rawUrls;
    return result.rawUrls.filter((u) => {
      try {
        const path = new URL(u).pathname.toLowerCase();
        return !excludeKeywords.some((kw) => path.includes(kw));
      } catch {
        return true;
      }
    });
  }, [result, excludeKeywords]);

  // Re-cluster topics client-side whenever the filter changes.
  // This is fast (hundreds of ms at most) because clustering is pure string work.
  const displayedTopics = useMemo(() => {
    if (!result) return [];
    if (excludeKeywords.length === 0) return result.topics;
    const pages = filteredUrls.map((u) => ({ url: u }));
    return clusterTopics(pages) as TopicCell[];
  }, [result, excludeKeywords, filteredUrls]);

  // Re-extract site sections with the same filter
  const displayedSections = useMemo(() => {
    if (!result) return [];
    if (excludeKeywords.length === 0) return result.sections;
    return extractSections(filteredUrls);
  }, [result, excludeKeywords, filteredUrls]);

  // Count of URLs removed by the user's exclude filter
  const excludedCount = useMemo(() => {
    if (!result || excludeKeywords.length === 0) return 0;
    return result.rawUrls.filter((u) => {
      try {
        const path = new URL(u).pathname.toLowerCase();
        return excludeKeywords.some((kw) => path.includes(kw));
      } catch {
        return false;
      }
    }).length;
  }, [result, excludeKeywords]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/topic-cluster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), maxPages }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            inputMode="url"
            placeholder="https://yoursite.com/sitemap.xml"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-[15px] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-foreground)] transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-3 rounded-lg bg-[var(--color-foreground)] text-white font-semibold text-[14px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing…" : "Generate Graph"}
          </button>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <label htmlFor="max-pages" className="text-[13px] font-medium text-[var(--color-foreground)] shrink-0">
            Sample depth:
          </label>
          <select
            id="max-pages"
            value={maxPages}
            onChange={(e) => setMaxPages(Number(e.target.value))}
            disabled={loading}
            className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-[13px] focus:outline-none focus:border-[var(--color-foreground)] transition-colors disabled:opacity-50"
          >
            {SAMPLE_DEPTHS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label} — {d.hint}
              </option>
            ))}
          </select>
          {maxPages > 1000 && (
            <span className="text-[12px] text-[var(--color-muted)] italic">
              Deeper analysis takes longer. Large sitemaps may need up to 2 minutes.
            </span>
          )}
        </div>

        <p className="mt-3 text-[12px] text-[var(--color-muted)]">
          Limited to 5 searches per hour per user to keep the tool free and available for everyone.
        </p>
      </form>

      {loading && (
        <div className="mt-10 flex flex-col items-center gap-5">
          {/* Animated bouncing dots */}
          <div className="flex items-end gap-1.5 h-6">
            <span className="block w-2 h-2 rounded-full bg-[var(--color-foreground)] animate-cluster-bounce" style={{ animationDelay: "0ms" }} />
            <span className="block w-2 h-2 rounded-full bg-[var(--color-foreground)] animate-cluster-bounce" style={{ animationDelay: "150ms" }} />
            <span className="block w-2 h-2 rounded-full bg-[var(--color-foreground)] animate-cluster-bounce" style={{ animationDelay: "300ms" }} />
            <span className="block w-2 h-2 rounded-full bg-[var(--color-foreground)] animate-cluster-bounce" style={{ animationDelay: "450ms" }} />
            <span className="block w-2 h-2 rounded-full bg-[var(--color-foreground)] animate-cluster-bounce" style={{ animationDelay: "600ms" }} />
          </div>

          {/* Cycling status message */}
          <div className="h-6 relative w-full max-w-md text-center">
            {LOADING_STEPS.map((msg, i) => (
              <div
                key={i}
                className="absolute inset-0 text-[14px] text-[var(--color-muted)] transition-all duration-500"
                style={{
                  opacity: loadingStep === i ? 1 : 0,
                  transform: loadingStep === i ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {msg}
              </div>
            ))}
          </div>

          <div className="text-[12px] text-[var(--color-muted)] opacity-60">
            This may take {maxPages > 5000 ? "1-2 minutes" : maxPages > 1000 ? "20-60 seconds" : "10-20 seconds"}.
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 max-w-2xl mx-auto px-4 py-3 rounded-lg border border-[#EF4444] bg-[#FEF2F2] text-[14px] text-[#991b1b]">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-10">
          {/* Stats */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <Stat label="Pages analyzed" value={(result.analyzedPages - excludedCount).toString()} />
            <Stat label="URLs in sitemap" value={result.totalUrlsInSitemap.toString()} />
            <Stat label="Topics found" value={displayedTopics.length.toString()} />
            <Stat label="Analysis time" value={`${(result.durationMs / 1000).toFixed(1)}s`} />
          </div>

          {result.truncated && (
            <div className="mb-4 text-center text-[13px] text-[var(--color-muted)]">
              Sitemap has {result.totalUrlsInSitemap} URLs. Showing an even sample of{" "}
              {result.analyzedPages}.
            </div>
          )}

          {/* Dynamic exclude filter */}
          <div className="mb-6 max-w-2xl mx-auto">
            <label className="block text-[13px] font-semibold text-[var(--color-foreground)] mb-1.5">
              Exclude URL keywords
            </label>
            <p className="text-[12px] text-[var(--color-muted)] mb-2">
              Comma-separated. Any URL whose path contains these words will be ignored. Useful for
              filtering out noise like <code className="text-[11px] bg-[var(--color-surface)] px-1 py-0.5 rounded">press</code>,{" "}
              <code className="text-[11px] bg-[var(--color-surface)] px-1 py-0.5 rounded">tag</code>,{" "}
              <code className="text-[11px] bg-[var(--color-surface)] px-1 py-0.5 rounded">offers</code>, or brand-specific patterns.
            </p>
            <input
              type="text"
              value={excludeInput}
              onChange={(e) => setExcludeInput(e.target.value)}
              placeholder="press, tag, offers, author"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white text-[14px] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-foreground)] transition-colors"
            />
            {excludedCount > 0 && (
              <div className="mt-2 text-[12px] text-[var(--color-muted)]">
                Filtered out {excludedCount} URL{excludedCount === 1 ? "" : "s"} matching your
                exclude keywords.
              </div>
            )}
          </div>

          <TopicTreemap
            topics={displayedTopics}
            rootLabel={(() => {
              try {
                return new URL(result.sitemapUrl).hostname;
              } catch {
                return "Your Site";
              }
            })()}
          />

          {/* Site sections — structural breakdown by first URL segment */}
          <div className="mt-10">
            <div className="mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground)]">
                Site sections
              </h3>
              <p className="text-[12px] text-[var(--color-muted)] mt-1">
                How the site is structured. Each row shows a top-level directory and how many
                pages live inside it. Standalone root-level landing pages are not counted.
              </p>
            </div>
            <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
              {displayedSections.map((s, i) => (
                <div
                  key={s.section}
                  className={`flex items-center gap-4 px-4 py-3 text-[14px] ${
                    i !== displayedSections.length - 1 ? "border-b border-[var(--color-border)]" : ""
                  }`}
                >
                  <div className="w-6 text-[var(--color-muted)] text-[13px] tabular-nums">
                    {i + 1}
                  </div>
                  <div className="flex-1 font-mono text-[13px] font-medium text-[var(--color-foreground)]">
                    {s.section === "homepage" ? "/" : `/${s.section}/`}
                  </div>
                  <div className="w-40 h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-foreground)]"
                      style={{ width: `${Math.min(s.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="w-20 text-right text-[var(--color-muted)] tabular-nums">
                    {s.percentage}%
                  </div>
                  <div className="w-24 text-right text-[var(--color-muted)] tabular-nums text-[13px]">
                    {s.count} page{s.count === 1 ? "" : "s"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-5 py-3 min-w-[120px] text-center">
      <div className="text-[1.25rem] font-bold leading-tight">{value}</div>
      <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-[0.06em] mt-0.5">
        {label}
      </div>
    </div>
  );
}
