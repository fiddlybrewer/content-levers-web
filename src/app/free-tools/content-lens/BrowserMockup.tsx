"use client";

import Image from "next/image";
import { useState } from "react";

type TabKey =
  | "overview"
  | "headings"
  | "eeat"
  | "links"
  | "images"
  | "schema"
  | "social"
  | "performance"
  | "technical";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "headings", label: "Headings" },
  { key: "eeat", label: "E-E-A-T" },
  { key: "links", label: "Links" },
  { key: "images", label: "Images" },
  { key: "schema", label: "Schema" },
  { key: "social", label: "Social" },
  { key: "performance", label: "Performance" },
  { key: "technical", label: "Technical" },
];

// Tokens that mirror the real extension (content-lens/tailwind.config.js)
const C = {
  foreground: "#1a1a1a",
  muted: "#6b6b6b",
  border: "#e5e5e5",
  surface: "#f7f7f7",
  goodBg: "#D1FAE5",
  goodText: "#047857",
  warnBg: "#FEF3C7",
  warnText: "#B45309",
  badBg: "#FEE2E2",
  badText: "#DC2626",
  infoBg: "#DBEAFE",
  infoText: "#1D4ED8",
};

export default function BrowserMockup() {
  const [tab, setTab] = useState<TabKey>("overview");

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--color-border)] shadow-xl bg-white">
      {/* Browser chrome */}
      <div
        className="px-4 py-2 border-b flex items-center gap-2"
        style={{ background: C.surface, borderColor: C.border }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div
          className="flex-1 bg-white rounded px-3 py-1 text-[11px] truncate border"
          style={{ color: C.muted, borderColor: C.border }}
        >
          ahrefs.com/blog/how-long-does-it-take-to-rank-in-google
        </div>
      </div>

      {/* Split: page + side panel */}
      <div className="grid grid-cols-[1fr_340px] h-[520px] overflow-hidden">
        {/* Page content */}
        <div
          className="relative border-r bg-white overflow-hidden"
          style={{ borderColor: C.border }}
        >
          <Image
            src="/posts/content-lens/content_lens_bg.png"
            alt="Ahrefs blog post being audited by ContentLens"
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Side panel — matches real extension App.tsx layout */}
        <div className="bg-white flex flex-col overflow-hidden font-sans">
          {/* Header: label/url on left, buttons on right */}
          <div
            className="px-4 py-3 border-b flex items-center justify-between gap-2 shrink-0"
            style={{ borderColor: C.border }}
          >
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-sm"
                style={{ color: C.foreground }}
              >
                ContentLens
              </div>
              <div
                className="text-xs truncate"
                style={{ color: C.muted }}
              >
                ahrefs.com/blog/how-long-does-it-take-to-rank
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button
                className="text-[11px] px-2.5 py-1.5 rounded-md border hover:bg-[var(--color-surface)]"
                style={{ borderColor: C.border, color: C.foreground }}
              >
                Copy for LLM
              </button>
              <button
                className="text-[11px] px-2.5 py-1.5 rounded-md border hover:bg-[var(--color-surface)]"
                style={{ borderColor: C.border, color: C.foreground }}
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="relative border-b bg-white shrink-0"
            style={{ borderColor: C.border }}
          >
            <div className="flex overflow-x-auto scrollbar-thin">
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className="px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors"
                    style={{
                      borderColor: active ? C.foreground : "transparent",
                      color: active ? C.foreground : C.muted,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-8"
              style={{
                background:
                  "linear-gradient(to left, #fff 0%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 text-sm">
            {tab === "overview" && <OverviewTab />}
            {tab === "headings" && <HeadingsTab />}
            {tab === "eeat" && <EEATTab />}
            {tab === "links" && <LinksTab />}
            {tab === "images" && <ImagesTab />}
            {tab === "schema" && <SchemaTab />}
            {tab === "social" && <SocialTab />}
            {tab === "performance" && <PerformanceTab />}
            {tab === "technical" && <TechnicalTab />}
          </div>

          {/* Footer: small "Built by Content Levers" line */}
          <div
            className="px-4 py-2 border-t text-[10px] text-center shrink-0"
            style={{ borderColor: C.border, color: C.muted }}
          >
            Built by <span className="underline">Content Levers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Shared primitives ---------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] font-semibold uppercase tracking-wider mb-1"
      style={{ color: C.muted }}
    >
      {children}
    </div>
  );
}

function Row({
  children,
  last,
}: {
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className="py-3"
      style={{
        borderBottom: last ? "none" : `1px solid ${C.border}`,
      }}
    >
      {children}
    </div>
  );
}

function Tag({
  tone,
  children,
}: {
  tone: "good" | "warn" | "bad" | "info" | "neutral";
  children: React.ReactNode;
}) {
  const styles = {
    good: { background: C.goodBg, color: C.goodText },
    warn: { background: C.warnBg, color: C.warnText },
    bad: { background: C.badBg, color: C.badText },
    info: { background: C.infoBg, color: C.infoText },
    neutral: { background: C.surface, color: C.muted },
  }[tone];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
      style={styles}
    >
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{ borderColor: C.border }}
    >
      {children}
    </div>
  );
}

/* ---------- Tabs ---------- */

function OverviewTab() {
  return (
    <div>
      <Row>
        <SectionTitle>Title</SectionTitle>
        <div className="text-sm mb-1.5" style={{ color: C.foreground }}>
          How Long Does It Take to Rank in Google?
        </div>
        <div className="flex gap-1.5">
          <Tag tone="good">42 chars</Tag>
          <Tag tone="good">380 px</Tag>
        </div>
      </Row>
      <Row>
        <SectionTitle>Meta description</SectionTitle>
        <div className="text-sm mb-1.5" style={{ color: C.foreground }}>
          We studied 2 million keywords to answer an age-old question: how
          long does it take to rank in Google?
        </div>
        <div className="flex gap-1.5">
          <Tag tone="warn">148 chars</Tag>
        </div>
      </Row>
      <Row>
        <SectionTitle>Canonical</SectionTitle>
        <div
          className="text-xs break-all mb-1.5"
          style={{ color: C.foreground }}
        >
          https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google
        </div>
        <Tag tone="good">Self-referencing</Tag>
      </Row>
      <Row>
        <SectionTitle>Indexability</SectionTitle>
        <div className="flex gap-1.5">
          <Tag tone="good">Indexable</Tag>
          <Tag tone="neutral">index, follow</Tag>
        </div>
      </Row>
      <Row last>
        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Word count" value="1,842" />
          <MiniStat label="Lang" value="en" />
        </div>
      </Row>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg border p-2"
      style={{ borderColor: C.border }}
    >
      <div
        className="text-[10px] uppercase tracking-wider"
        style={{ color: C.muted }}
      >
        {label}
      </div>
      <div
        className="text-base font-semibold"
        style={{ color: C.foreground }}
      >
        {value}
      </div>
    </div>
  );
}

function HeadingsTab() {
  return (
    <div>
      <div className="grid grid-cols-6 gap-1 mb-4">
        {[
          ["H1", 1],
          ["H2", 6],
          ["H3", 12],
          ["H4", 0],
          ["H5", 0],
          ["H6", 0],
        ].map(([l, n]) => (
          <div
            key={l as string}
            className="rounded border p-1.5 text-center"
            style={{ borderColor: C.border }}
          >
            <div
              className="text-[9px] uppercase tracking-wider"
              style={{ color: C.muted }}
            >
              {l}
            </div>
            <div
              className="text-sm font-semibold"
              style={{ color: C.foreground }}
            >
              {n}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <HLine level={1}>How Long Does It Take to Rank in Google?</HLine>
        <HLine level={2}>Key takeaways</HLine>
        <HLine level={2}>How long does it take to rank in Google?</HLine>
        <HLine level={3} indent>
          Methodology
        </HLine>
        <HLine level={2}>How old are the top-ranking pages?</HLine>
        <HLine level={3} indent>
          Pages by age distribution
        </HLine>
        <HLine level={2}>Final thoughts</HLine>
      </div>
    </div>
  );
}

function HLine({
  level,
  children,
  indent,
}: {
  level: number;
  children: React.ReactNode;
  indent?: boolean;
}) {
  return (
    <div
      className={`flex gap-2 text-xs leading-snug ${indent ? "pl-4" : ""}`}
    >
      <span
        className="font-mono font-bold text-[11px] mt-[1px]"
        style={{ color: C.muted }}
      >
        H{level}
      </span>
      <span style={{ color: C.foreground }}>{children}</span>
    </div>
  );
}

function EEATTab() {
  return (
    <div>
      <Row>
        <SectionTitle>Author</SectionTitle>
        <div
          className="text-sm mb-1.5 font-medium"
          style={{ color: C.foreground }}
        >
          Patrick Stox
        </div>
        <div className="text-xs mb-2" style={{ color: C.muted }}>
          Product Advisor, Technical SEO &amp; Brand Ambassador at Ahrefs.
        </div>
        <div className="flex gap-1.5">
          <Tag tone="good">Found in schema</Tag>
          <Tag tone="good">Linked</Tag>
        </div>
      </Row>
      <Row>
        <SectionTitle>Dates</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[10px]" style={{ color: C.muted }}>
              Published
            </div>
            <div className="text-xs" style={{ color: C.foreground }}>
              May 15, 2025
            </div>
          </div>
          <div>
            <div className="text-[10px]" style={{ color: C.muted }}>
              Modified
            </div>
            <div className="text-xs" style={{ color: C.muted }}>
              —
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <SectionTitle>Readability (Flesch)</SectionTitle>
        <div className="flex gap-1.5">
          <Tag tone="good">62 · Standard</Tag>
        </div>
      </Row>
      <Row>
        <SectionTitle>External citations</SectionTitle>
        <div className="flex gap-1.5">
          <Tag tone="good">14 unique domains</Tag>
          <Tag tone="good">3 trusted</Tag>
        </div>
      </Row>
      <Row last>
        <SectionTitle>Multi-format</SectionTitle>
        <div className="flex gap-1.5">
          <Tag tone="good">Video</Tag>
          <Tag tone="neutral">No audio</Tag>
        </div>
      </Row>
    </div>
  );
}

function LinksTab() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {[
          ["Total", 65],
          ["Unique", 58],
          ["Internal", 47],
          ["External", 18],
        ].map(([l, n]) => (
          <div
            key={l as string}
            className="rounded border p-2 text-center"
            style={{ borderColor: C.border }}
          >
            <div
              className="text-[9px] uppercase tracking-wider"
              style={{ color: C.muted }}
            >
              {l}
            </div>
            <div
              className="text-base font-semibold"
              style={{ color: C.foreground }}
            >
              {n}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-3">
        {["All", "Internal", "External", "No anchor (2)"].map((f, i) => (
          <button
            key={f}
            className="text-[11px] px-2 py-1 rounded-md border"
            style={{
              borderColor: i === 0 ? C.foreground : C.border,
              background: i === 0 ? C.surface : "transparent",
              color: C.foreground,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        {[
          {
            anchor: "study",
            href: "ahrefs.com/blog/seo-basics",
          },
          {
            anchor: "on top of Google?",
            href: "ahrefs.com/blog/ranking-on-google",
          },
          {
            anchor: "Xibeijia Guan",
            href: "ahrefs.com/authors/xibeijia-guan",
          },
        ].map((l, i) => (
          <div
            key={i}
            className="rounded border p-2"
            style={{ borderColor: C.border }}
          >
            <div
              className="text-xs font-medium break-words"
              style={{ color: C.foreground }}
            >
              {l.anchor}
            </div>
            <div
              className="text-[10px] break-all mt-0.5"
              style={{ color: C.muted }}
            >
              {l.href}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImagesTab() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        <MiniStat label="Total" value="11" />
        <MiniStat label="Missing alt" value="4" />
        <MiniStat label="Coverage" value="62%" />
      </div>

      <Row>
        <SectionTitle>Alt coverage</SectionTitle>
        <div className="flex gap-1.5">
          <Tag tone="bad">62%</Tag>
          <Tag tone="neutral">4 of 11 missing</Tag>
        </div>
      </Row>
      <Row last>
        <SectionTitle>Recent images</SectionTitle>
        <div className="space-y-1.5 mt-1">
          {[
            { name: "rank-chart.png", alt: true },
            { name: "age-distribution.png", alt: true },
            { name: "hero-image.jpg", alt: false },
            { name: "author-headshot.jpg", alt: true },
          ].map((img) => (
            <div
              key={img.name}
              className="flex items-center justify-between rounded border p-2"
              style={{ borderColor: C.border }}
            >
              <div
                className="text-[11px] font-mono truncate"
                style={{ color: C.foreground }}
              >
                {img.name}
              </div>
              <Tag tone={img.alt ? "good" : "bad"}>
                {img.alt ? "alt" : "no alt"}
              </Tag>
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
}

function SchemaTab() {
  const [view, setView] = useState<"tree" | "raw">("tree");
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {["Article", "Person", "BreadcrumbList"].map((t) => (
            <Tag key={t} tone="info">
              {t}
            </Tag>
          ))}
        </div>
        <div className="flex gap-1 shrink-0">
          {(["tree", "raw"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="text-[11px] px-2 py-1 rounded-md border capitalize"
              style={{
                borderColor: view === v ? C.foreground : C.border,
                background: view === v ? C.surface : "transparent",
                color: C.foreground,
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "tree" ? (
        <div className="space-y-2">
          <Card>
            <TreeView
              entries={[
                ["@type", '"Article"'],
                ["headline", '"How Long Does It Take to Rank in Google?"'],
                ["datePublished", '"2025-05-15"'],
                ["author", { "@id": '"#patrick-stox"' }],
                ["publisher", '"Ahrefs"'],
              ]}
            />
          </Card>
          <Card>
            <TreeView
              entries={[
                ["@type", '"Person"'],
                ["@id", '"#patrick-stox"'],
                ["name", '"Patrick Stox"'],
                ["url", '"ahrefs.com/authors/patrick-stox"'],
              ]}
            />
          </Card>
        </div>
      ) : (
        <pre
          className="text-[11px] rounded-md p-3 overflow-auto max-h-[300px]"
          style={{ background: C.surface, color: C.foreground }}
        >
          {`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Long Does It Take to Rank in Google?",
  "datePublished": "2025-05-15",
  "author": { "@id": "#patrick-stox" }
}`}
        </pre>
      )}
    </div>
  );
}

function TreeView({
  entries,
  depth = 0,
}: {
  entries: [string, unknown][];
  depth?: number;
}) {
  return (
    <div className="text-[11px] leading-relaxed font-mono">
      {entries.map(([k, v]) => (
        <div key={k} style={{ paddingLeft: `${depth * 8}px` }}>
          <span className="font-semibold" style={{ color: C.foreground }}>
            {k}:
          </span>{" "}
          {typeof v === "object" && v !== null ? (
            <TreeView
              entries={Object.entries(v as Record<string, unknown>)}
              depth={depth + 1}
            />
          ) : (
            <span style={{ color: C.foreground }}>{String(v)}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function SocialTab() {
  return (
    <div>
      <Row>
        <SectionTitle>Open Graph preview</SectionTitle>
        <div
          className="rounded-lg border overflow-hidden mt-1"
          style={{ borderColor: C.border }}
        >
          <div className="h-24 bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            ahrefs.com
          </div>
          <div className="p-2" style={{ background: C.surface }}>
            <div
              className="text-[10px] uppercase tracking-wide"
              style={{ color: C.muted }}
            >
              ahrefs.com
            </div>
            <div
              className="text-xs font-semibold leading-tight mt-0.5"
              style={{ color: C.foreground }}
            >
              How Long Does It Take to Rank in Google?
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <SectionTitle>og tags</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          <Tag tone="good">og:title</Tag>
          <Tag tone="good">og:description</Tag>
          <Tag tone="good">og:image</Tag>
          <Tag tone="good">og:url</Tag>
        </div>
      </Row>
      <Row last>
        <SectionTitle>twitter card</SectionTitle>
        <div className="flex gap-1.5">
          <Tag tone="good">summary_large_image</Tag>
        </div>
      </Row>
    </div>
  );
}

function PerformanceTab() {
  return (
    <div>
      <Row>
        <SectionTitle>LCP</SectionTitle>
        <div className="flex items-center gap-2">
          <div
            className="text-2xl font-semibold"
            style={{ color: C.foreground }}
          >
            2.8s
          </div>
          <Tag tone="warn">Needs improvement</Tag>
        </div>
      </Row>
      <Row>
        <SectionTitle>CLS</SectionTitle>
        <div className="flex items-center gap-2">
          <div
            className="text-2xl font-semibold"
            style={{ color: C.foreground }}
          >
            0.04
          </div>
          <Tag tone="good">Good</Tag>
        </div>
      </Row>
      <Row>
        <SectionTitle>FCP</SectionTitle>
        <div className="flex items-center gap-2">
          <div
            className="text-2xl font-semibold"
            style={{ color: C.foreground }}
          >
            1.2s
          </div>
          <Tag tone="good">Good</Tag>
        </div>
      </Row>
      <Row last>
        <SectionTitle>TTFB</SectionTitle>
        <div className="flex items-center gap-2">
          <div
            className="text-2xl font-semibold"
            style={{ color: C.foreground }}
          >
            340ms
          </div>
          <Tag tone="good">Good</Tag>
        </div>
      </Row>
    </div>
  );
}

function TechnicalTab() {
  return (
    <div>
      <Row>
        <SectionTitle>Schema</SectionTitle>
        <div className="flex gap-1.5">
          <Tag tone="good">3 types</Tag>
          <Tag tone="good">No drift</Tag>
        </div>
      </Row>
      <Row>
        <SectionTitle>Crawl directives</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          <Tag tone="good">Sitemap found</Tag>
          <Tag tone="good">robots.txt found</Tag>
          <Tag tone="good">index, follow</Tag>
        </div>
      </Row>
      <Row>
        <SectionTitle>Hreflang</SectionTitle>
        <Tag tone="neutral">0 tags</Tag>
      </Row>
      <Row last>
        <SectionTitle>Canonical</SectionTitle>
        <Tag tone="good">Self-referencing</Tag>
      </Row>
    </div>
  );
}
