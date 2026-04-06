"use client";

import { useState } from "react";
import TopicTreemap, { TopicCell } from "@/components/TopicTreemap";
// TopicCell now includes { keyword, count, percentage, keywords, samplePages }

interface AnalysisResult {
  sitemapUrl: string;
  totalUrlsInSitemap: number;
  analyzedPages: number;
  topics: TopicCell[];
  samplePages: { url: string; title: string }[];
  durationMs: number;
  truncated: boolean;
}

export default function TopicClusterGeneratorClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

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
        body: JSON.stringify({ url: url.trim() }),
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
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
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
      </form>

      {loading && (
        <div className="mt-8 text-center text-[14px] text-[var(--color-muted)]">
          Fetching sitemap and analyzing pages — this may take 10–40 seconds.
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
            <Stat label="Pages analyzed" value={result.analyzedPages.toString()} />
            <Stat label="URLs in sitemap" value={result.totalUrlsInSitemap.toString()} />
            <Stat label="Topics found" value={result.topics.length.toString()} />
            <Stat label="Analysis time" value={`${(result.durationMs / 1000).toFixed(1)}s`} />
          </div>

          {result.truncated && (
            <div className="mb-4 text-center text-[13px] text-[var(--color-muted)]">
              Sitemap has {result.totalUrlsInSitemap} URLs. Showing an even sample of{" "}
              {result.analyzedPages}.
            </div>
          )}

          <TopicTreemap
            topics={result.topics}
            rootLabel={(() => {
              try {
                return new URL(result.sitemapUrl).hostname;
              } catch {
                return "Your Site";
              }
            })()}
          />

          {/* Topic list */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)] mb-3">
              All topics
            </h3>
            <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
              {result.topics.map((t, i) => (
                <div
                  key={t.keyword}
                  className={`flex items-center gap-4 px-4 py-3 text-[14px] ${
                    i !== result.topics.length - 1 ? "border-b border-[var(--color-border)]" : ""
                  }`}
                >
                  <div className="w-6 text-[var(--color-muted)] text-[13px] tabular-nums">
                    {i + 1}
                  </div>
                  <div className="flex-1 font-medium capitalize">{t.keyword}</div>
                  <div className="w-40 h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-foreground)]"
                      style={{ width: `${Math.min(t.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="w-20 text-right text-[var(--color-muted)] tabular-nums">
                    {t.percentage}%
                  </div>
                  <div className="w-24 text-right text-[var(--color-muted)] tabular-nums text-[13px]">
                    {t.count} pages
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
