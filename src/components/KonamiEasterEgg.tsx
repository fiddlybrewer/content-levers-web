"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

const QUERY = "why did my traffic drop overnight";

const results = [
  {
    url: "reddit.com › r/SEO › comments",
    title: "Why did my traffic drop overnight? I didn't change anything",
    snippet:
      "UPDATE: It was a Google core update. I lost 60% of my traffic. My boss thinks I broke something. I did not break anything. Please someone tell my boss I did not break anything.",
    date: "3 days ago",
  },
  {
    url: "searchenginejournal.com › news",
    title: "Google Confirms Core Update, Says 'Don't Panic' (Everyone Panics)",
    snippet:
      "Google's Danny Sullivan tweeted 'there's nothing wrong with your pages' which historically means there is definitely something wrong with your pages.",
  },
  {
    url: "twitter.com › @SEOconsultant2024",
    title: "\"Just focus on quality content\" - A thread 🧵 (1/847)",
    snippet:
      "Day 1: Created 10x content. Day 30: Still on page 4. Day 60: AI overview replaced my featured snippet. Day 90: Considering a career in plumbing.",
  },
  {
    url: "stackoverflow.com › questions",
    title: "How to check if Google hates my website specifically",
    snippet:
      "Closed as duplicate. This question has been asked 47,000 times before. Marked as: not reproducible, yet somehow affects every website I have ever built.",
  },
  {
    url: "medium.com › @growthmarketer",
    title: "I Spent $40k on SEO Tools and All I Got Was This Dashboard",
    snippet:
      "After subscribing to Ahrefs, Semrush, Moz, Screaming Frog, Surfer, Clearscope, and 14 other tools, I can now confirm with 97% accuracy that my traffic is, in fact, down.",
  },
];

const paa = [
  "Why does Google hate me personally",
  "Is SEO dead (asked every year since 2009)",
  "How to explain a traffic drop to stakeholders without crying",
  "Can I sue a Google core update",
];

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [seq, setSeq] = useState<string[]>([]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      setSeq((prev) => {
        const next = [...prev, e.code].slice(-KONAMI.length);
        if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
          setActive(true);
        }
        return next;
      });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white overflow-y-auto cursor-pointer"
      onClick={() => setActive(false)}
    >
      <div className="max-w-[652px] mx-auto px-4 pt-6 pb-20" onClick={(e) => e.stopPropagation()}>
        {/* Google-style header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex gap-[3px]">
            <span className="text-[22px] font-medium" style={{ color: "#4285F4" }}>G</span>
            <span className="text-[22px] font-medium" style={{ color: "#EA4335" }}>o</span>
            <span className="text-[22px] font-medium" style={{ color: "#FBBC05" }}>o</span>
            <span className="text-[22px] font-medium" style={{ color: "#4285F4" }}>g</span>
            <span className="text-[22px] font-medium" style={{ color: "#34A853" }}>l</span>
            <span className="text-[22px] font-medium" style={{ color: "#EA4335" }}>e</span>
          </div>
          <div className="flex-1 border border-[#dfe1e5] rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm">
            <span className="text-[14px] text-[#202124]">{QUERY}</span>
            <span className="ml-auto text-[#9aa0a6] text-xs">✕</span>
          </div>
        </div>

        <div className="border-b border-[#ebebeb] mb-4">
          <div className="flex gap-6 text-[13px] pb-3">
            <span className="text-[#1a73e8] border-b-[3px] border-[#1a73e8] pb-2.5 font-medium">All</span>
            <span className="text-[#5f6368]">Images</span>
            <span className="text-[#5f6368]">Videos</span>
            <span className="text-[#5f6368]">News</span>
          </div>
        </div>

        <p className="text-[12px] text-[#70757a] mb-5">
          About 4,290,000,000 results (0.47 seconds) — <em>none of them will make you feel better</em>
        </p>

        {/* AI Overview */}
        <div className="border border-[#dadce0] rounded-xl p-5 mb-6 bg-[#f8f9fa]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[13px] font-medium text-[#202124]">✨ AI Overview</span>
          </div>
          <p className="text-[14px] text-[#4d5156] leading-relaxed">
            Your traffic dropped because Google released a core update that &quot;rewards helpful content,&quot;
            which apparently does not include your helpful content. Consider pivoting to video,
            starting a podcast, or accepting that the algorithm is a chaotic deity that answers to no one.
            Sources disagree on everything except that you should &quot;just create great content.&quot;
          </p>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
          {results.map((r, i) => (
            <div key={i}>
              <div className="text-[12px] text-[#4d5156] mb-0.5">{r.url}</div>
              <h3 className="text-[18px] text-[#1a0dab] leading-snug mb-1 hover:underline cursor-pointer">
                {r.title}
              </h3>
              <p className="text-[13px] text-[#4d5156] leading-relaxed">
                {r.date && <span className="text-[#70757a]">{r.date} — </span>}
                {r.snippet}
              </p>
            </div>
          ))}
        </div>

        {/* People Also Ask */}
        <div className="mt-8 mb-6">
          <h3 className="text-[16px] text-[#202124] font-medium mb-3">People also ask</h3>
          <div className="border border-[#dadce0] rounded-lg divide-y divide-[#dadce0]">
            {paa.map((q, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 text-[14px] text-[#202124]">
                <span>{q}</span>
                <span className="text-[#70757a] text-[12px]">▼</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dismiss hint */}
        <p className="text-center text-[12px] text-[#70757a] mt-10">
          click anywhere to return to reality · easter egg by Content Levers
        </p>
      </div>
    </div>
  );
}
