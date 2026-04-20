import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import BrowserMockup from "./BrowserMockup";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/contentlens-on-page-seo-a/ldelidibimmnlbnenahilakkakbdnkkg";

export const metadata: Metadata = {
  title: "Free On-Page SEO Chrome Extension | ContentLens",
  description:
    "Free on-page SEO Chrome extension. Inspect titles, meta, schema, headings, images, and E-E-A-T signals in a side panel. Copy audits as markdown for Claude or ChatGPT.",
  keywords: [
    "on page seo chrome extension",
    "on page seo tool",
    "chrome extension for seo",
    "seo chrome extension",
    "seo audit chrome extension",
    "free seo chrome extension",
    "seo checker chrome extension",
    "schema inspector chrome extension",
    "on page seo checker",
  ],
  alternates: {
    canonical: "https://contentlevers.xyz/free-tools/content-lens",
  },
  openGraph: {
    title: "Free On-Page SEO Chrome Extension | ContentLens",
    description:
      "Inspect any page's SEO in a Chrome side panel. No signup, no tracking. Copy audits as markdown for Claude or ChatGPT.",
    url: "https://contentlevers.xyz/free-tools/content-lens",
    type: "website",
  },
};

type Faq = { q: string; a: string; extra?: ReactNode };

const faqs: Faq[] = [
  {
    q: "What is ContentLens?",
    a: "ContentLens is a free Chrome extension that audits any webpage's on-page SEO in a side panel. It inspects title tags, meta descriptions, headings, schema, images, E-E-A-T signals, and technical SEO, all without leaving the page you're analyzing.",
  },
  {
    q: "How is this different from Detailed SEO Extension or SEO Pro?",
    a: "ContentLens adds things other extensions don't: schema-vs-HTML drift detection (catches bugs like unresolved [year] template variables), E-E-A-T author extraction from JSON-LD, Flesch reading score, content-only link filtering (excludes nav and footer), and a one-click 'Copy for LLM' button that formats the audit as markdown for Claude or ChatGPT.",
  },
  {
    q: "Is it really free?",
    a: "Yes. No signup, no accounts, no credit card, no API keys. All analysis runs locally in your browser. The extension doesn't send your data anywhere.",
  },
  {
    q: "What does the Copy for LLM button do?",
    a: "It exports the complete audit of the current page as structured markdown and copies it to your clipboard. You can paste the result into Claude, ChatGPT, Perplexity, or any LLM to get concrete fix recommendations in seconds. No more manually retyping what you see in your SEO tool.",
  },
  {
    q: "Does it work on SPAs and client-side rendered pages?",
    a: "Yes. The extension reads the rendered DOM, so it sees exactly what users see after JavaScript runs. This includes Framer, Webflow, Next.js, and other modern frameworks.",
  },
  {
    q: "What character thresholds does the tool use?",
    a: "The tool uses Screaming Frog's widely accepted thresholds: titles 30-60 characters, meta descriptions 70-155 characters, H1 and H2 warnings above 70 characters, and URL warnings above 115 characters. Pixel width checks for titles and descriptions are also included.",
  },
  {
    q: "What's E-E-A-T and how does the tool check it?",
    a: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness, Google's framework for content quality. ContentLens extracts author name and bio from JSON-LD schema (handling @id references), checks for author page links, shows published and modified dates with a freshness tag, calculates Flesch reading ease, and detects multi-format content.",
  },
  {
    q: "How does schema drift detection work?",
    a: "The tool compares your rendered HTML (what users see) to your JSON-LD structured data (what Google's parsers read). It flags when titles don't match, when og:title or twitter:title differ from the page title, and when schema contains unresolved template variables like [year] from a CMS bug. Google uses schema for rich results, so drift causes incorrect search listings.",
    extra: (
      <>
        See a real-world example in our teardown of{" "}
        <Link
          href="/blog/clickup-blog-traffic-drop"
          className="underline hover:text-[var(--color-foreground)]"
        >
          how ClickUp's blog lost 97.6% of its traffic
        </Link>{" "}
        — schema bugs played a role.
      </>
    ),
  },
  {
    q: "Does it collect any data?",
    a: "No. ContentLens has no backend, no analytics, and no tracking. The extension reads the page you're on and shows you the results. Nothing leaves your browser.",
  },
];

export default function Page() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ContentLens",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome",
    description:
      "Free on-page SEO Chrome extension. Inspect titles, meta, schema, headings, images, and E-E-A-T signals in a side panel.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://contentlevers.xyz/free-tools/content-lens",
    creator: {
      "@type": "Person",
      name: "Kamila Olexa",
      url: "https://contentlevers.xyz/about",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-16 pb-20">
        <div className="text-center">
          <div className="inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-3">
            Free Tool
          </div>
          <h1 className="text-3xl sm:text-[40px] font-bold tracking-tight leading-tight mb-4">
            On-Page SEO Chrome Extension
          </h1>
          <p className="text-[15px] text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed mb-7">
            Audit any webpage's SEO in a Chrome side panel. Titles, meta, schema,
            headings, images, E-E-A-T, and a one-click export for Claude or ChatGPT.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:opacity-85 transition-opacity"
            >
              Add to Chrome
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-[var(--color-border)] px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:border-[var(--color-foreground)] transition-colors"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-14">
          <BrowserMockup />
        </div>
      </section>

      {/* 01: What it does */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-16" id="what-it-does">
        <SectionLabel number="01" label="Concept" />

        {/* Editorial headline on left, narrow paragraphs on right */}
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-8 mt-8 items-start">
          <h2 className="md:col-span-7 text-[32px] sm:text-[44px] md:text-[56px] font-bold tracking-tight leading-[1.02]">
            A complete SEO audit,
            <br />
            <span className="text-[var(--color-muted)]">
              one click away.
            </span>
          </h2>
          <div className="md:col-span-5 md:pt-3 text-[15px] text-[var(--color-muted)] leading-[1.75] space-y-4">
            <p>
              Most SEO Chrome extensions cram everything into a tiny popup.
              ContentLens uses Chrome's side panel — a proper column of data
              next to the page you're auditing.
            </p>
            <p>
              Every metric is color-coded against Screaming Frog thresholds.
              Too-long title, low alt coverage, schema bugs Google reads
              differently from your users — all surface at a glance.
            </p>
          </div>
        </div>

        {/* Audit-result chip row — full width, horizontal */}
        <div className="mt-14 flex flex-wrap gap-2">
          {([
            { label: "Title", value: "42 chars", tone: "good" },
            { label: "Meta", value: "148 chars", tone: "warn" },
            { label: "H1", value: "1", tone: "good" },
            { label: "Schema", value: "3 types", tone: "good" },
            { label: "Alt", value: "62%", tone: "bad" },
            { label: "LCP", value: "2.8s", tone: "warn" },
            { label: "E-E-A-T", value: "Author ✓", tone: "good" },
            { label: "Canonical", value: "Self", tone: "good" },
            { label: "Links", value: "65", tone: "good" },
            { label: "Flesch", value: "62 Standard", tone: "good" },
          ] as const).map((chip) => (
            <ResultChip key={chip.label} {...chip} />
          ))}
        </div>

        {/* Audience strip */}
        <div className="mt-14 pt-10 border-t border-[var(--color-border)] grid sm:grid-cols-3 gap-8">
          {[
            ["Content marketers", "Check your draft before publishing"],
            ["SEO specialists", "Audit any competitor page in seconds"],
            ["Technical teams", "Catch schema drift and rendering bugs"],
          ].map(([who, why]) => (
            <div key={who}>
              <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5">
                For
              </div>
              <div className="text-[16px] font-semibold mb-1">{who}</div>
              <div className="text-[14px] text-[var(--color-muted)] leading-relaxed">
                {why}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[14px] text-[var(--color-muted)] leading-relaxed">
          Pair it with our{" "}
          <Link
            href="/free-tools/topic-cluster-generator"
            className="underline hover:text-[var(--color-foreground)]"
          >
            Topic Cluster Generator
          </Link>{" "}
          to map your site's topical authority before you start auditing
          individual pages.
        </p>
      </section>

      {/* 02: How it works — vertical ladder with large step numbers */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-16" id="how-it-works">
        <SectionLabel number="02" label="How it works" />
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mt-6 mb-10 max-w-2xl">
          Open the side panel, get the full picture.
        </h2>
        <ol className="border-t border-[var(--color-border)]">
          {[
            {
              n: "01",
              title: "Install the extension",
              body: "Add ContentLens from the Chrome Web Store. No signup, no account creation, no permissions beyond reading the page you're on.",
            },
            {
              n: "02",
              title: "Pin to your toolbar",
              body: "One-click access from any tab. Click the icon and the side panel opens next to your page.",
            },
            {
              n: "03",
              title: "Scan any page",
              body: "The extension reads the rendered DOM — works on static sites, SPAs, and JS-heavy pages like Webflow, Framer, or Next.js.",
            },
            {
              n: "04",
              title: "Export for an LLM",
              body: "Click ‘Copy for LLM’ and paste into Claude or ChatGPT. Get prioritized fixes in seconds, in plain English.",
            },
          ].map((s) => (
            <LadderStep key={s.n} {...s} />
          ))}
        </ol>
      </section>

      {/* 03: Features */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-16" id="features">
        <SectionLabel number="03" label="Features" />
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mt-6 mb-3">
          What you get in every scan
        </h2>
        <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] max-w-2xl mb-10">
          Nine tabs of on-page intelligence, each with color-coded tags that flag
          issues against industry-standard thresholds.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            title="Overview"
            icon={<OverviewIcon />}
            color="#FEF3C7"
            iconColor="#B45309"
          >
            SERP preview, title, meta description, canonical, robots, URL length,
            all tagged against Screaming Frog thresholds.
          </FeatureCard>
          <FeatureCard
            title="Headings"
            icon={<HeadingsIcon />}
            color="#DBEAFE"
            iconColor="#1D4ED8"
          >
            H1-H6 tree with skip-level detection, multiple H1 warnings, and
            character-count flags.
          </FeatureCard>
          <FeatureCard
            title="E-E-A-T signals"
            icon={<ShieldIcon />}
            color="#EDE9FE"
            iconColor="#6D28D9"
          >
            Author, bio, link, dates with freshness tag, Flesch reading score,
            multi-format content detection.
          </FeatureCard>
          <FeatureCard
            title="Links"
            icon={<LinkIcon />}
            color="#D1FAE5"
            iconColor="#047857"
          >
            Internal, external, unique, empty-anchor counts. "Content only" filter
            strips out nav and footer noise.
          </FeatureCard>
          <FeatureCard
            title="Images"
            icon={<ImageIcon />}
            color="#FCE7F3"
            iconColor="#BE185D"
          >
            Alt coverage, previews with alt text, lazy-load and picture element
            handling, tracking pixels filtered out.
          </FeatureCard>
          <FeatureCard
            title="Schema"
            icon={<SchemaIcon />}
            color="#CFFAFE"
            iconColor="#0E7490"
          >
            JSON-LD inline tree view with all @type values. Hreflang table for
            international sites.
          </FeatureCard>
          <FeatureCard
            title="Social"
            icon={<SocialIcon />}
            color="#FFEDD5"
            iconColor="#C2410C"
          >
            Open Graph and Twitter Card previews rendered with actual images, not
            just raw tag values.
          </FeatureCard>
          <FeatureCard
            title="Performance"
            icon={<PerfIcon />}
            color="#FEE2E2"
            iconColor="#DC2626"
          >
            LCP, CLS, FCP, TTFB from the Performance API, each tagged Good / Needs
            Improvement / Poor.
          </FeatureCard>
          <FeatureCard
            title="Technical"
            icon={<WrenchIcon />}
            color="#F3F4F6"
            iconColor="#4B5563"
          >
            Schema-vs-HTML drift detection, redirect chain, X-Robots-Tag,
            robots.txt and sitemap.xml presence.
          </FeatureCard>
        </div>
      </section>

      {/* 04: Why it's different */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-16" id="why">
        <SectionLabel number="04" label="What's unique" />
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mt-6 mb-10">
          What other SEO extensions don't catch
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          <UniqueCard
            title="Schema vs HTML drift"
            description="Catches CMS bugs where your HTML shows '2026' but the JSON-LD schema still has a literal [year] template variable. Google reads schema directly, so drift breaks rich results."
          />
          <UniqueCard
            title="Content-only link filtering"
            description="Filters out nav and footer links so you only see the links inside your main content. Uses semantic HTML detection plus article/main element boundaries."
          />
          <UniqueCard
            title="E-E-A-T from JSON-LD"
            description="Resolves author references by @id, handles nested @graph schemas, and pulls bio text directly from Person entities. Catches cases where the visible byline differs from the schema author."
          />
          <UniqueCard
            title="Copy for LLM"
            description="One button exports the full audit as clean markdown with an embedded prompt. Paste into Claude or ChatGPT and get prioritized fix recommendations in seconds."
          />
        </div>
      </section>

      {/* 05: FAQ */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-24" id="faq">
        <SectionLabel number="05" label="FAQ" />
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mt-6 mb-8">
          Frequently asked questions
        </h2>
        <div className="grid md:grid-cols-2 gap-x-10 items-start">
          {[
            faqs.filter((_, i) => i % 2 === 0),
            faqs.filter((_, i) => i % 2 === 1),
          ].map((column, ci) => (
            <div key={ci}>
              {column.map((f) => (
                <details
                  key={f.q}
                  className="group py-5 border-b border-[var(--color-border)]"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="font-semibold text-[15px] text-[var(--color-foreground)]">
                      {f.q}
                    </span>
                    <span className="text-[var(--color-muted)] text-xl leading-none transition-transform group-open:rotate-45 select-none flex-shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[14px] text-[var(--color-muted)] leading-relaxed">
                    {f.a}
                  </p>
                  {f.extra && (
                    <p className="mt-2 text-[14px] text-[var(--color-muted)] leading-relaxed">
                      {f.extra}
                    </p>
                  )}
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-24 text-center">
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mb-4">
          Start auditing pages in your side panel
        </h2>
        <p className="text-[15px] text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed mb-6">
          Free, no signup, no tracking. Just on-page SEO where you need it.
        </p>
        <a
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:opacity-85 transition-opacity"
        >
          Add to Chrome
        </a>
        <div className="mt-6 text-[13px] text-[var(--color-muted)]">
          Or browse all our{" "}
          <Link
            href="/free-tools"
            className="underline hover:text-[var(--color-foreground)]"
          >
            free SEO tools
          </Link>
          .
        </div>
      </section>
    </div>
  );
}

/* ───────────── Layout helpers ───────────── */

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
      <span className="text-[var(--color-foreground)] font-bold mr-2">{number}</span>
      {label}
    </div>
  );
}

function ResultChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "good" | "warn" | "bad";
}) {
  const tones = {
    good: { bg: "#D1FAE5", fg: "#047857", dot: "#047857" },
    warn: { bg: "#FEF3C7", fg: "#B45309", dot: "#B45309" },
    bad: { bg: "#FEE2E2", fg: "#DC2626", dot: "#DC2626" },
  }[tone];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border pl-2.5 pr-3 py-1 text-[13px]"
      style={{ borderColor: "var(--color-border)", background: "#fff" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: tones.dot }}
      />
      <span className="font-semibold">{label}</span>
      <span
        className="rounded-full px-1.5 py-0.5 text-[11px] font-semibold"
        style={{ background: tones.bg, color: tones.fg }}
      >
        {value}
      </span>
    </span>
  );
}

function LadderStep({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <li className="group grid md:grid-cols-12 gap-4 md:gap-8 items-baseline py-8 border-b border-[var(--color-border)] last:border-b-0">
      <div className="md:col-span-2 text-[44px] sm:text-[56px] font-bold leading-none tracking-tight text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors">
        {n}
      </div>
      <div className="md:col-span-4">
        <div className="text-[20px] sm:text-[22px] font-bold leading-tight">
          {title}
        </div>
      </div>
      <div className="md:col-span-6 text-[15px] text-[var(--color-muted)] leading-[1.7]">
        {body}
      </div>
    </li>
  );
}

function FeatureCard({
  title,
  icon,
  color,
  iconColor,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-foreground)] transition-colors">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: color, color: iconColor }}
      >
        {icon}
      </div>
      <div className="font-bold text-[var(--color-foreground)] text-[16px] mb-1">
        {title}
      </div>
      <div className="text-[14px] text-[var(--color-muted)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function UniqueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-foreground)] transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-6 h-6 rounded-md bg-[var(--color-foreground)] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="font-bold text-[17px] leading-tight">{title}</div>
      </div>
      <p className="text-[14px] text-[var(--color-muted)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* ───────────── Feature icons ───────────── */

function OverviewIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HeadingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 5V19M15 5V19M5 12H15M18 19V11L21 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L5 6V12C5 16.5 8 20 12 21C16 20 19 16.5 19 12V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10 13C11 14 12.5 14 13.5 13L17.5 9C18.5 8 18.5 6.5 17.5 5.5C16.5 4.5 15 4.5 14 5.5L13 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 11C13 10 11.5 10 10.5 11L6.5 15C5.5 16 5.5 17.5 6.5 18.5C7.5 19.5 9 19.5 10 18.5L11 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21 15L16 10L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SchemaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 4L4 9L9 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 10L20 15L15 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4L10 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PerfIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3V7M19 12H15M12 21V17M5 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 10L12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.7 6.3C16.1 4.9 18.4 4.9 19.8 6.3C21.2 7.7 21.2 10 19.8 11.4L12 19.2L4.8 19.2L4.8 12L14.7 6.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 16L8 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
