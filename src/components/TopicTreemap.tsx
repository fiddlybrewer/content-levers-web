"use client";

import { useMemo, useState } from "react";

export interface TopicCell {
  keyword: string;
  count: number;
  percentage: number;
  keywords: string[];
  samplePages: string[];
}

// Color palette borrowed from src/lib/topics.ts — same lighter-bg / darker-text vibe
const TOPIC_COLORS: { bg: string; text: string; border: string }[] = [
  { bg: "#FCEDFF", text: "#B600DB", border: "#E9B8F5" },
  { bg: "#EDE9FE", text: "#6D28D9", border: "#C4B5FD" },
  { bg: "#D1FAE5", text: "#047857", border: "#6EE7B7" },
  { bg: "#DBEAFE", text: "#1D4ED8", border: "#93C5FD" },
  { bg: "#FEF3C7", text: "#B45309", border: "#FCD34D" },
  { bg: "#FEE2E2", text: "#DC2626", border: "#FCA5A5" },
  { bg: "#FFEDD5", text: "#C2410C", border: "#FDBA74" },
  { bg: "#CFFAFE", text: "#0E7490", border: "#67E8F9" },
  { bg: "#ECFCCB", text: "#4D7C0F", border: "#BEF264" },
  { bg: "#FCE7F3", text: "#BE185D", border: "#F9A8D4" },
  { bg: "#E0E7FF", text: "#4338CA", border: "#A5B4FC" },
  { bg: "#F3F4F6", text: "#4B5563", border: "#D1D5DB" },
];

interface LaidOut {
  item: TopicCell;
  x: number;
  y: number;
  w: number;
  h: number;
  colorIndex: number;
}

// Squarified treemap — keeps cells closer to square shape so labels fit.
// Standard algorithm: build rows of cells, choose row direction based on the
// longer remaining dimension, add items until aspect ratio would worsen.
function squarify(items: TopicCell[], x: number, y: number, w: number, h: number): LaidOut[] {
  const result: LaidOut[] = [];
  const sorted = [...items].sort((a, b) => b.count - a.count);
  let colorIndex = 0;

  function layoutRow(row: TopicCell[], rx: number, ry: number, rw: number, rh: number) {
    const horizontal = rw >= rh;
    const rowSum = row.reduce((s, i) => s + i.count, 0);
    if (rowSum === 0) return;
    const rowLen = horizontal ? rh : rw;
    const rowThickness = (rowSum / totalRemaining) * (horizontal ? rw : rh);
    let offset = 0;
    for (const it of row) {
      const share = (it.count / rowSum) * rowLen;
      if (horizontal) {
        result.push({ item: it, x: rx, y: ry + offset, w: rowThickness, h: share, colorIndex });
      } else {
        result.push({ item: it, x: rx + offset, y: ry, w: share, h: rowThickness, colorIndex });
      }
      colorIndex++;
      offset += share;
    }
  }

  let totalRemaining = sorted.reduce((s, i) => s + i.count, 0);
  let rx = x,
    ry = y,
    rw = w,
    rh = h;
  let queue = sorted;

  while (queue.length > 0) {
    const horizontal = rw >= rh;
    const shortSide = Math.min(rw, rh);
    const row: TopicCell[] = [];
    let bestWorst = Infinity;

    for (let i = 0; i < queue.length; i++) {
      const candidate = queue.slice(0, i + 1);
      const worst = worstRatio(candidate, shortSide, totalRemaining, horizontal ? rw : rh);
      if (worst > bestWorst) {
        // Adding this item would worsen the aspect ratio — lay out the current row
        break;
      }
      row.push(queue[i]);
      bestWorst = worst;
    }

    const actualRow = row.length ? row : [queue[0]];
    layoutRow(actualRow, rx, ry, rw, rh);
    const rowSum = actualRow.reduce((s, i) => s + i.count, 0);
    const rowThickness = (rowSum / totalRemaining) * (horizontal ? rw : rh);
    if (horizontal) {
      rx += rowThickness;
      rw -= rowThickness;
    } else {
      ry += rowThickness;
      rh -= rowThickness;
    }
    totalRemaining -= rowSum;
    queue = queue.slice(actualRow.length);
  }

  return result;
}

function worstRatio(row: TopicCell[], shortSide: number, totalRemaining: number, longSide: number): number {
  const rowSum = row.reduce((s, i) => s + i.count, 0);
  const rowThickness = (rowSum / totalRemaining) * longSide;
  let worst = 0;
  for (const item of row) {
    const share = (item.count / rowSum) * shortSide;
    const ratio = Math.max(rowThickness / share, share / rowThickness);
    worst = Math.max(worst, ratio);
  }
  return worst;
}

export default function TopicTreemap({
  topics,
  rootLabel,
}: {
  topics: TopicCell[];
  rootLabel?: string;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const WIDTH = 1200;
  const HEIGHT = 600;
  const cells = useMemo(() => squarify(topics, 0, 0, WIDTH, HEIGHT), [topics]);
  const activeCell =
    activeIdx !== null ? cells.find((c) => c.colorIndex === activeIdx) : null;

  return (
    <div className="w-full">
      {rootLabel && (
        <div className="text-center mb-3 text-[13px] text-[var(--color-muted)]">
          Topic clusters for{" "}
          <span className="font-semibold text-[var(--color-foreground)]">{rootLabel}</span>
        </div>
      )}

      <div
        className="relative w-full rounded-xl overflow-hidden border border-[var(--color-border)]"
        style={{ aspectRatio: "2 / 1", minHeight: 380 }}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          {cells.map((c) => {
            const color = TOPIC_COLORS[c.colorIndex % TOPIC_COLORS.length];
            const isActive = activeIdx === c.colorIndex;
            return (
              <g
                key={c.item.keyword}
                onClick={() => setActiveIdx(isActive ? null : c.colorIndex)}
                style={{ cursor: "pointer" }}
              >
                <title>{`${c.item.keyword} — ${c.item.percentage}% (${c.item.count} pages) — click to expand`}</title>
                <rect
                  x={c.x + 3}
                  y={c.y + 3}
                  width={Math.max(0, c.w - 6)}
                  height={Math.max(0, c.h - 6)}
                  rx={10}
                  ry={10}
                  fill={color.bg}
                  stroke={isActive ? color.text : color.border}
                  strokeWidth={isActive ? 4 : 2}
                />
              </g>
            );
          })}
        </svg>

        {/* HTML label overlay — better text wrapping than SVG <text> */}
        <div className="absolute inset-0 pointer-events-none">
          {cells.map((c) => {
            const color = TOPIC_COLORS[c.colorIndex % TOPIC_COLORS.length];
            const pctW = (c.w / WIDTH) * 100;
            const pctH = (c.h / HEIGHT) * 100;
            const pctX = (c.x / WIDTH) * 100;
            const pctY = (c.y / HEIGHT) * 100;

            // Font size scales with the smaller dimension
            const minDim = Math.min(c.w, c.h);
            const titleSize = Math.max(11, Math.min(22, minDim / 7));
            const pctSize = Math.max(10, Math.min(16, minDim / 11));
            const showPct = minDim >= 60;
            const showTitle = minDim >= 35;

            return (
              <div
                key={c.item.keyword}
                className="absolute flex flex-col items-start justify-end p-3 overflow-hidden"
                style={{
                  left: `${pctX}%`,
                  top: `${pctY}%`,
                  width: `${pctW}%`,
                  height: `${pctH}%`,
                  color: color.text,
                }}
              >
                {showTitle && (
                  <div
                    className="font-semibold leading-tight break-words"
                    style={{
                      fontSize: `${titleSize}px`,
                      textTransform: "capitalize",
                      maxWidth: "100%",
                    }}
                  >
                    {c.item.keyword}
                  </div>
                )}
                {showPct && (
                  <div
                    className="mt-0.5 opacity-75"
                    style={{ fontSize: `${pctSize}px` }}
                  >
                    {c.item.percentage}% · {c.item.count} page
                    {c.item.count === 1 ? "" : "s"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 text-center text-[12px] text-[var(--color-muted)]">
        Click any cluster to see the keywords and pages inside it
      </div>

      {/* Expanded cluster detail */}
      {activeCell && (
        <ClusterDetail
          cell={activeCell.item}
          color={TOPIC_COLORS[activeCell.colorIndex % TOPIC_COLORS.length]}
          onClose={() => setActiveIdx(null)}
        />
      )}
    </div>
  );
}

function ClusterDetail({
  cell,
  color,
  onClose,
}: {
  cell: TopicCell;
  color: { bg: string; text: string; border: string };
  onClose: () => void;
}) {
  return (
    <div
      className="mt-6 rounded-xl border p-5"
      style={{ background: color.bg, borderColor: color.border }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.12em] opacity-75" style={{ color: color.text }}>
            Cluster
          </div>
          <div
            className="text-[22px] font-bold capitalize leading-tight"
            style={{ color: color.text }}
          >
            {cell.keyword}
          </div>
          <div className="text-[13px] mt-1 opacity-80" style={{ color: color.text }}>
            {cell.percentage}% of content · {cell.count} page{cell.count === 1 ? "" : "s"}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[13px] font-semibold hover:opacity-70 transition-opacity"
          style={{ color: color.text }}
          aria-label="Close cluster details"
        >
          ✕
        </button>
      </div>

      {cell.keywords.length > 0 && (
        <div className="mb-4">
          <div
            className="text-[11px] uppercase tracking-[0.1em] font-semibold mb-2 opacity-75"
            style={{ color: color.text }}
          >
            Keywords in this cluster
          </div>
          <div className="flex flex-wrap gap-2">
            {cell.keywords.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-full text-[12px] font-medium capitalize"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  color: color.text,
                  border: `1px solid ${color.border}`,
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {cell.samplePages.length > 0 && (
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.1em] font-semibold mb-2 opacity-75"
            style={{ color: color.text }}
          >
            Sample pages
          </div>
          <ul className="space-y-1">
            {cell.samplePages.map((url) => {
              let shortUrl = url;
              try {
                const u = new URL(url);
                shortUrl = u.pathname || "/";
              } catch {
                /* ignore */
              }
              return (
                <li key={url} className="text-[13px]">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-70 transition-opacity break-all"
                    style={{ color: color.text }}
                  >
                    {shortUrl}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
