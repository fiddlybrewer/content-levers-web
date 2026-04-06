import type { Metadata } from "next";
import TopicClusterGeneratorClient from "./Client";

export const metadata: Metadata = {
  title: "Free Topic Cluster Generator: Visualize Your Site's Topics",
  description:
    "Free topic cluster tool. Paste your sitemap.xml and get a visual treemap of what your website is actually about. Measure topical authority and find unrelated content hurting your SEO.",
  keywords: [
    "topic cluster generator",
    "topic cluster tool",
    "free topic cluster tool",
    "content cluster tool",
    "topical authority checker",
    "topical map",
    "sitemap analyzer",
    "SEO topic research",
  ],
  alternates: {
    canonical: "https://contentlevers.xyz/free-tools/topic-cluster-generator",
  },
  openGraph: {
    title: "Free Topic Cluster Generator",
    description:
      "Visualize your website's topic clusters from a sitemap. Free, no signup, no API keys.",
    url: "https://contentlevers.xyz/free-tools/topic-cluster-generator",
    type: "website",
  },
};

const faqs = [
  {
    q: "What is a topic cluster?",
    a: "A topic cluster is a group of related pages on your website that all cover different angles of the same subject. In modern SEO, topic clusters help search engines understand what your site is an authority on. Instead of looking at individual keywords, Google evaluates whether you cover a topic comprehensively.",
  },
  {
    q: "How does this topic cluster generator work?",
    a: "You paste the URL of your sitemap.xml. The tool fetches up to 500 pages from your sitemap, extracts the URL slug, title, and meta description from each, and runs keyword frequency + clustering analysis to surface the dominant topics on your site. The result is a visual treemap showing which topics make up the biggest share of your content.",
  },
  {
    q: "Is this topic cluster tool really free?",
    a: "Yes. No signup, no API key, no credit card. It runs entirely on open-source techniques (keyword extraction, stemming, n-gram clustering) so there's no per-use LLM cost to pass on to you.",
  },
  {
    q: "What is topical authority and why does it matter?",
    a: "Topical authority is how much Google trusts your site to be an expert on a given subject. Sites with strong topical authority rank higher because Google sees them as comprehensive sources. If your site covers too many unrelated topics, you dilute that authority signal, which makes it harder to rank for any single topic, and harder for LLMs like ChatGPT to decide when to cite you.",
  },
  {
    q: "How is a topic cluster different from a topical map?",
    a: "A topical map is the upfront plan, a diagram of all the topics and subtopics you want to cover before you write anything. A topic cluster is what actually exists on your site after you've published content. This tool shows you the cluster reality: what your site is actually about, based on the pages that exist today.",
  },
  {
    q: "Why does my topic cluster contain unrelated keywords?",
    a: "Usually it means your site covers too many unrelated subjects. This is one of the most common reasons sites struggle to rank. Google can't tell what you're an authority on. The fix is to either prune unrelated content, move it to a subdomain, or create deeper clusters around your highest-value topics.",
  },
  {
    q: "How many pages can the tool analyze?",
    a: "Up to 500 URLs per sitemap. If your sitemap has more, we evenly sample across the list so you still get a representative picture of your whole site. Nested sitemap indexes are supported.",
  },
  {
    q: "Do I need to enter any API keys?",
    a: "No. The tool is 100% free and runs without any third-party AI services or keys. Just paste your sitemap URL and go.",
  },
];

export default function Page() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Topic Cluster Generator",
    applicationCategory: "SEOApplication",
    operatingSystem: "Web",
    description:
      "Free topic cluster generator. Visualize your website's topics from a sitemap and measure topical authority.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://contentlevers.xyz/free-tools/topic-cluster-generator",
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
      <section className="text-center pt-16 pb-10 border-b border-[var(--color-border)]">
        <div className="inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-3">
          Free Tool
        </div>
        <h1 className="text-3xl sm:text-[40px] font-bold tracking-tight leading-tight mb-4">
          Topic Cluster Generator
        </h1>
        <p className="text-[15px] text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed">
          Paste your sitemap. Get a visual map of every topic your site covers,
          and spot the content hurting your topical authority.
        </p>
      </section>

      {/* Tool */}
      <section className="pt-10 pb-16">
        <TopicClusterGeneratorClient />

        {/* Bot access disclaimer */}
        <div className="mt-6 max-w-2xl mx-auto flex gap-3 text-[12.5px] text-[var(--color-muted)] leading-relaxed">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="flex-shrink-0 mt-[2px]"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 8V13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
          <div>
            For the most accurate results, make sure your site allows good-faith
            bots. If you&apos;re behind Cloudflare, Vercel BotID, or a strict WAF,
            some pages may fail to fetch and won&apos;t be counted. The tool still
            works with fewer pages, but whitelisting{" "}
            <code className="text-[11.5px] bg-[var(--color-surface)] px-1.5 py-0.5 rounded text-[var(--color-foreground)]">
              ContentLeversTopicBot
            </code>{" "}
            gives you the full picture.
          </div>
        </div>
      </section>

      {/* ─── SEO content with custom graphics ─── */}

      {/* 01: What is a topic cluster? — Split layout with hub-spoke diagram */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-16">
        <SectionLabel number="01" label="Concept" />
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-6">
          <div>
            <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mb-5">
              What is a topic cluster?
            </h2>
            <div className="text-[15px] text-[var(--color-muted)] leading-[1.75] space-y-4">
              <p>
                A topic cluster is a group of pages that all cover different angles
                of the same subject, linked to a central pillar page.
              </p>
              <p>
                Google doesn&apos;t rank pages in isolation anymore. It evaluates
                whether your whole site demonstrates comprehensive coverage of a
                topic. The denser your cluster, the more Google trusts you as an
                authority.
              </p>
              <p>
                This tool shows you clusters that already exist on your site.
                Unlike a topical map (a plan you make before writing), a cluster
                analysis mirrors what your site is actually about today.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <HubSpokeDiagram />
          </div>
        </div>
      </section>

      {/* 02: How it works — Horizontal flow with icons */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-16">
        <SectionLabel number="02" label="Method" />
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mt-6 mb-10">
          How the topic cluster tool works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
          <FlowStep
            step={1}
            title="Fetch your sitemap"
            icon={<SitemapIcon />}
            color="#DBEAFE"
            iconColor="#1D4ED8"
          >
            We read up to 500 URLs from your{" "}
            <code className="text-[12px] bg-[var(--color-surface)] px-1.5 py-0.5 rounded">
              sitemap.xml
            </code>
            , nested indexes included.
          </FlowStep>
          <FlowStep
            step={2}
            title="Extract URL keywords"
            icon={<MagnifierIcon />}
            color="#FEF3C7"
            iconColor="#B45309"
          >
            We pull keywords from every URL slug. No heavy crawling, no logins,
            no body scraping.
          </FlowStep>
          <FlowStep
            step={3}
            title="Cluster the topics"
            icon={<ClusterIcon />}
            color="#D1FAE5"
            iconColor="#047857"
          >
            Keywords are scored, stemmed, and grouped into clusters. The largest
            become your topical pillars.
          </FlowStep>
        </div>
      </section>

      {/* 03: Focused vs Scattered — comparison visual */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-16">
        <SectionLabel number="03" label="Why it matters" />
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mt-6 mb-3">
          Focused beats scattered, every time
        </h2>
        <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] max-w-2xl mb-10">
          Google ranks sites it trusts on a topic. If your content is spread thin
          across unrelated subjects, Google can&apos;t tell what you&apos;re an
          authority on, and neither can{" "}
          <a
            href="/blog/ai-search-optimization-5-platforms"
            className="text-[var(--color-foreground)] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            LLMs like ChatGPT, Perplexity, or Claude when they decide who to cite
          </a>
          .
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <ComparisonCard
            verdict="good"
            label="Focused site"
            sub="1 dominant cluster · strong topical authority"
            diagram={<FocusedSiteDiagram />}
          />
          <ComparisonCard
            verdict="bad"
            label="Scattered site"
            sub="8 small clusters · no clear expertise signal"
            diagram={<ScatteredSiteDiagram />}
          />
        </div>
        <p className="mt-10 max-w-2xl text-[15px] text-[var(--color-muted)] leading-[1.75]">
          In my experience, a site with 80% of its content clustered around its
          money topic will almost always outrank a site where that topic is just
          15%, even if the second site has more total pages.
        </p>
      </section>

      {/* 04: Use cases — 2x2 grid with icons */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-16">
        <SectionLabel number="04" label="Use cases" />
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mt-6 mb-10">
          When to use this tool
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <UseCaseCard
            title="Content audits"
            icon={<AuditIcon />}
            color="#FEF3C7"
            iconColor="#B45309"
          >
            Find out what your site is <em>really</em> about before planning your next
            quarter of content. Spot gaps and outliers.
          </UseCaseCard>
          <UseCaseCard
            title="Competitor research"
            icon={<CompetitorIcon />}
            color="#EDE9FE"
            iconColor="#6D28D9"
          >
            Plug in a competitor&apos;s sitemap to see their content focus. Great
            for understanding what they&apos;re committing to.
          </UseCaseCard>
          <UseCaseCard
            title="Pre-rebrand cleanup"
            icon={<RefreshIcon />}
            color="#FCE7F3"
            iconColor="#BE185D"
          >
            Before a site refresh, identify legacy pages that no longer fit your
            positioning and should be pruned.
          </UseCaseCard>
          <UseCaseCard
            title="LLM visibility"
            icon={<SparkleIcon />}
            color="#DBEAFE"
            iconColor="#1D4ED8"
          >
            Generative AI tools cite sites with clear topical focus. Check if your
            site sends them a clear signal.
          </UseCaseCard>
        </div>
      </section>

      {/* Feedback note */}
      <section className="border-t border-[var(--color-border)] pt-12 pb-4">
        <p className="text-[14px] text-[var(--color-muted)] leading-relaxed max-w-2xl">
          This tool is free and constantly evolving. If something looks off, or
          you&apos;ve got an idea for another free SEO tool you wish existed,{" "}
          <a
            href="https://www.linkedin.com/in/kamila-olexa-190074112/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-foreground)] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            send me a DM on LinkedIn
          </a>
          .
        </p>
      </section>

      {/* 05: FAQ — Two-column accordion */}
      <section className="border-t border-[var(--color-border)] pt-16 pb-24">
        <SectionLabel number="05" label="FAQ" />
        <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-[1.1] mt-6 mb-8">
          Frequently asked questions
        </h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-0">
          {faqs.map((f) => (
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
            </details>
          ))}
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

function FlowStep({
  step,
  title,
  icon,
  color,
  iconColor,
  children,
}: {
  step: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className="w-full aspect-[5/3] rounded-xl flex items-center justify-center mb-4 border"
        style={{ background: color, borderColor: iconColor + "33" }}
      >
        <div style={{ color: iconColor }}>{icon}</div>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold text-white"
          style={{ background: iconColor }}
        >
          {step}
        </span>
        <div className="font-bold text-[16px] text-[var(--color-foreground)]">
          {title}
        </div>
      </div>
      <div className="text-[14px] text-[var(--color-muted)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function ComparisonCard({
  verdict,
  label,
  sub,
  diagram,
}: {
  verdict: "good" | "bad";
  label: string;
  sub: string;
  diagram: React.ReactNode;
}) {
  const isGood = verdict === "good";
  return (
    <div
      className="rounded-2xl border-2 overflow-hidden"
      style={{
        background: isGood ? "#ECFDF5" : "#FEF2F2",
        borderColor: isGood ? "#6EE7B7" : "#FCA5A5",
      }}
    >
      <div className="p-5 pb-3 flex items-start justify-between">
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.12em] font-bold mb-1"
            style={{ color: isGood ? "#047857" : "#991b1b" }}
          >
            {isGood ? "✓ Do this" : "✕ Avoid"}
          </div>
          <div
            className="text-[18px] font-bold"
            style={{ color: isGood ? "#065f46" : "#7f1d1d" }}
          >
            {label}
          </div>
          <div
            className="text-[12px] mt-0.5"
            style={{ color: isGood ? "#047857" : "#991b1b" }}
          >
            {sub}
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">{diagram}</div>
    </div>
  );
}

function UseCaseCard({
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

/* ───────────── Graphics (inline SVG) ───────────── */

function HubSpokeDiagram() {
  // Central pillar page + 6 cluster articles radiating out, connected by lines.
  const clusters = [
    { x: 200, y: 30, label: "SEO", color: "#DBEAFE", text: "#1D4ED8" },
    { x: 320, y: 100, label: "Content", color: "#FEF3C7", text: "#B45309" },
    { x: 320, y: 200, label: "Analytics", color: "#FCE7F3", text: "#BE185D" },
    { x: 200, y: 270, label: "Growth", color: "#D1FAE5", text: "#047857" },
    { x: 80, y: 200, label: "Strategy", color: "#EDE9FE", text: "#6D28D9" },
    { x: 80, y: 100, label: "AI", color: "#CFFAFE", text: "#0E7490" },
  ];
  const hub = { x: 200, y: 150 };
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-[420px]">
      {/* Spoke lines */}
      {clusters.map((c) => (
        <line
          key={`line-${c.label}`}
          x1={hub.x}
          y1={hub.y}
          x2={c.x}
          y2={c.y}
          stroke="#d1d5db"
          strokeWidth={2}
          strokeDasharray="3,3"
        />
      ))}
      {/* Cluster nodes */}
      {clusters.map((c) => (
        <g key={`node-${c.label}`}>
          <rect
            x={c.x - 38}
            y={c.y - 14}
            width={76}
            height={28}
            rx={14}
            fill={c.color}
            stroke={c.text + "40"}
            strokeWidth={1.5}
          />
          <text
            x={c.x}
            y={c.y + 4}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill={c.text}
          >
            {c.label}
          </text>
        </g>
      ))}
      {/* Central hub */}
      <circle cx={hub.x} cy={hub.y} r={46} fill="#1a1a1a" />
      <text
        x={hub.x}
        y={hub.y - 2}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill="#fff"
      >
        Your
      </text>
      <text
        x={hub.x}
        y={hub.y + 14}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill="#fff"
      >
        Site
      </text>
    </svg>
  );
}

function FocusedSiteDiagram() {
  // 1 dominant cluster + 2 small ones
  return (
    <svg viewBox="0 0 300 160" className="w-full">
      {/* Big cluster (80%) */}
      <rect x={5} y={5} width={220} height={150} rx={10} fill="#DBEAFE" stroke="#93C5FD" strokeWidth={2} />
      <text x={115} y={75} textAnchor="middle" fontSize={16} fontWeight={700} fill="#1D4ED8">
        Main Topic
      </text>
      <text x={115} y={94} textAnchor="middle" fontSize={12} fill="#1D4ED8" opacity={0.75}>
        80%
      </text>
      {/* Small cluster */}
      <rect x={232} y={5} width={63} height={72} rx={8} fill="#F3F4F6" stroke="#D1D5DB" strokeWidth={1.5} />
      <text x={263.5} y={45} textAnchor="middle" fontSize={10} fontWeight={600} fill="#4B5563">
        10%
      </text>
      {/* Small cluster */}
      <rect x={232} y={83} width={63} height={72} rx={8} fill="#F3F4F6" stroke="#D1D5DB" strokeWidth={1.5} />
      <text x={263.5} y={123} textAnchor="middle" fontSize={10} fontWeight={600} fill="#4B5563">
        10%
      </text>
    </svg>
  );
}

function ScatteredSiteDiagram() {
  // 8 small clusters, all similar size, different colors
  const cells = [
    { x: 5, y: 5, w: 70, h: 72, bg: "#FEE2E2", stroke: "#FCA5A5", text: "#DC2626" },
    { x: 79, y: 5, w: 70, h: 72, bg: "#DBEAFE", stroke: "#93C5FD", text: "#1D4ED8" },
    { x: 153, y: 5, w: 70, h: 72, bg: "#FEF3C7", stroke: "#FCD34D", text: "#B45309" },
    { x: 227, y: 5, w: 68, h: 72, bg: "#D1FAE5", stroke: "#6EE7B7", text: "#047857" },
    { x: 5, y: 83, w: 70, h: 72, bg: "#EDE9FE", stroke: "#C4B5FD", text: "#6D28D9" },
    { x: 79, y: 83, w: 70, h: 72, bg: "#FCE7F3", stroke: "#F9A8D4", text: "#BE185D" },
    { x: 153, y: 83, w: 70, h: 72, bg: "#CFFAFE", stroke: "#67E8F9", text: "#0E7490" },
    { x: 227, y: 83, w: 68, h: 72, bg: "#FFEDD5", stroke: "#FDBA74", text: "#C2410C" },
  ];
  return (
    <svg viewBox="0 0 300 160" className="w-full">
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={6} fill={c.bg} stroke={c.stroke} strokeWidth={1.5} />
          <text
            x={c.x + c.w / 2}
            y={c.y + c.h / 2 + 4}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill={c.text}
          >
            12%
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ───────────── Step icons ───────────── */

function SitemapIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="20" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="36" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="36" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="36" y="36" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M26 16V26M10 36V26H42V36M26 26V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MagnifierIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 32L44 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 22H26M22 18V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClusterIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="8" fill="currentColor" />
      <circle cx="10" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="42" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="40" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="42" cy="40" r="5" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="24" x2="13" y2="15" stroke="currentColor" strokeWidth="1.5" />
      <line x1="34" y1="24" x2="39" y2="15" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="28" x2="13" y2="37" stroke="currentColor" strokeWidth="1.5" />
      <line x1="34" y1="28" x2="39" y2="37" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ───────────── Use-case icons ───────────── */

function AuditIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8H16M8 12H16M8 16H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CompetitorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 12H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 8V6M17 8V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12C4 7.58 7.58 4 12 4C14.5 4 16.7 5.15 18.15 7M20 12C20 16.42 16.42 20 12 20C9.5 20 7.3 18.85 5.85 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M18 3V7H14M6 21V17H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L13.5 9L19.5 10.5L13.5 12L12 18L10.5 12L4.5 10.5L10.5 9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M19 4L19.5 6L21.5 6.5L19.5 7L19 9L18.5 7L16.5 6.5L18.5 6L19 4Z" fill="currentColor" />
      <path d="M5 16L5.5 17.5L7 18L5.5 18.5L5 20L4.5 18.5L3 18L4.5 17.5L5 16Z" fill="currentColor" />
    </svg>
  );
}
