import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free SEO Tools",
  description:
    "Free SEO tools for content marketers. Generate topic clusters, measure topical authority, and more. No signup, no API keys.",
  alternates: {
    canonical: "https://contentlevers.xyz/free-tools",
  },
  openGraph: {
    title: "Free SEO Tools — Content Levers",
    description:
      "A growing collection of free SEO and content tools. No signup required.",
    url: "https://contentlevers.xyz/free-tools",
    type: "website",
  },
};

interface Tool {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  preview: "treemap" | "comingSoon";
  status: "live" | "soon";
}

const tools: Tool[] = [
  {
    slug: "topic-cluster-generator",
    title: "Topic Cluster Generator",
    tagline: "Visualize what your site is actually about",
    description:
      "Paste your sitemap and get a visual treemap of your site's topics. Measure your topical authority and find unrelated content hurting your SEO.",
    preview: "treemap",
    status: "live",
  },
];

export default function FreeToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <section className="text-center pt-16 pb-10 border-b border-[var(--color-border)]">
        <div className="inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-3">
          Free Tools
        </div>
        <h1 className="text-3xl sm:text-[40px] font-bold tracking-tight leading-tight mb-4">
          Free SEO Tools
        </h1>
        <p className="text-[15px] text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed">
          Built by marketers, for marketers. No signup, no API keys, no paywalls.
        </p>
      </section>

      {/* Grid */}
      <section className="pt-10 pb-20">
        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
          <ComingSoonCard />
        </div>
      </section>
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const href = `/free-tools/${tool.slug}`;
  return (
    <Link
      href={href}
      className="group block border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-foreground)] transition-colors"
    >
      <div className="aspect-[16/9] bg-[var(--color-surface)] relative overflow-hidden border-b border-[var(--color-border)]">
        {tool.preview === "treemap" && <TreemapPreview />}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-[17px] font-bold leading-tight">{tool.title}</h2>
          <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-muted)] border border-[var(--color-border)] rounded-full px-2 py-0.5">
            Live
          </span>
        </div>
        <p className="text-[13px] text-[var(--color-muted)] mb-3 font-medium">
          {tool.tagline}
        </p>
        <p className="text-[14px] text-[var(--color-muted)] leading-relaxed">
          {tool.description}
        </p>
        <div className="mt-4 text-[13px] font-semibold group-hover:translate-x-1 transition-transform inline-block">
          Try it →
        </div>
      </div>
    </Link>
  );
}

function ComingSoonCard() {
  return (
    <div className="border border-dashed border-[var(--color-border)] rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-10 min-h-[360px] bg-[var(--color-surface)]">
      <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-3">
        Coming soon
      </div>
      <div className="text-[17px] font-bold mb-2">More tools on the way</div>
      <p className="text-[13px] text-[var(--color-muted)] max-w-xs leading-relaxed">
        Got an idea for a free SEO tool you wish existed? Let me know via{" "}
        <a
          href="https://www.linkedin.com/in/kamila-olexa-190074112/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--color-foreground)] transition-colors"
        >
          LinkedIn
        </a>
        .
      </p>
    </div>
  );
}

// Mini colored treemap preview — matches the real tool output style + palette.
function TreemapPreview() {
  const cells: {
    x: number;
    y: number;
    w: number;
    h: number;
    bg: string;
    border: string;
    text: string;
    label: string;
    pct: string;
  }[] = [
    { x: 0, y: 0, w: 50, h: 62, bg: "#DBEAFE", border: "#93C5FD", text: "#1D4ED8", label: "SEO", pct: "34%" },
    { x: 50, y: 0, w: 26, h: 62, bg: "#FEF3C7", border: "#FCD34D", text: "#B45309", label: "Content", pct: "22%" },
    { x: 76, y: 0, w: 24, h: 62, bg: "#D1FAE5", border: "#6EE7B7", text: "#047857", label: "Growth", pct: "18%" },
    { x: 0, y: 62, w: 40, h: 38, bg: "#EDE9FE", border: "#C4B5FD", text: "#6D28D9", label: "Strategy", pct: "14%" },
    { x: 40, y: 62, w: 60, h: 38, bg: "#FCE7F3", border: "#F9A8D4", text: "#BE185D", label: "Analytics", pct: "12%" },
  ];
  return (
    <div className="absolute inset-3 rounded-lg overflow-hidden">
      {cells.map((c) => (
        <div
          key={c.label}
          className="absolute flex flex-col justify-end p-2"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.w}%`,
            height: `${c.h}%`,
            background: c.bg,
            border: `1.5px solid ${c.border}`,
            color: c.text,
            borderRadius: "6px",
            margin: "1px",
            boxSizing: "border-box",
          }}
        >
          <div
            className="font-semibold leading-tight"
            style={{ fontSize: "10px" }}
          >
            {c.label}
          </div>
          <div className="opacity-75" style={{ fontSize: "9px" }}>
            {c.pct}
          </div>
        </div>
      ))}
    </div>
  );
}
