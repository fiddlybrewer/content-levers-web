"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  "📄 SERP #1",
  "🔗 Backlink",
  "🔑 Keyword",
  "📈 Traffic",
  "⭐ Rich Snippet",
  "🗺️ Sitemap",
  "🏷️ Meta Tag",
  "🤖 Crawl",
  "📊 DA 90+",
  "🎯 Featured Snippet",
  "💡 Schema",
  "🔍 Long-tail",
  "📱 Core Web Vitals",
  "🏆 Page 1",
];

export default function LogoPacman() {
  const [itemIndex, setItemIndex] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((c) => c + 1);
      setItemIndex((i) => (i + 1) % ITEMS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center items-center mb-5 overflow-x-hidden" style={{ width: "300px", height: "140px", margin: "0 auto" }}>
      <div className="relative w-[56px] h-[56px]" style={{ zIndex: 1 }}>
        {/* Top half - jaw opens up */}
        <div
          className="absolute inset-0 overflow-hidden animate-jaw-top"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="Content Levers"
            width={56}
            height={56}
            className="rounded-xl"
          />
        </div>

        {/* Bottom half - jaw opens down */}
        <div
          className="absolute inset-0 overflow-hidden animate-jaw-bottom"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            width={56}
            height={56}
            className="rounded-xl"
          />
        </div>

      </div>

      {/* Incoming item - starts right of logo, flies into center, behind logo */}
      <div
        key={cycle}
        className="absolute top-1/2 whitespace-nowrap animate-item-fly"
        style={{ left: "50%", zIndex: -1, transformOrigin: "left center" }}
      >
        <span className="text-[11px] font-semibold bg-white border border-[var(--color-border)] rounded-full px-2.5 py-1 shadow-sm">
          {ITEMS[itemIndex]}
        </span>
      </div>
    </div>
  );
}
