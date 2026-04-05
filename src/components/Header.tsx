"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const topics = [
  { label: "LLM", slug: "LLM" },
  { label: "Strategy", slug: "Strategy" },
  { label: "Resources", slug: "Resources" },
  { label: "Breakdown", slug: "Breakdown" },
  { label: "SEO", slug: "SEO" },
  { label: "Technical SEO", slug: "Technical SEO" },
  { label: "Growth", slug: "Growth" },
  { label: "Content", slug: "Content" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)]">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="Content Levers"
            width={32}
            height={32}
            className="rounded-md"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-[13px] text-[var(--color-foreground)]">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:opacity-60 transition-opacity">
              Topics
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="mt-0.5 transition-transform group-hover:rotate-180">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
              <div className="bg-white border border-[var(--color-border)] rounded-xl shadow-lg py-2 min-w-[180px]">
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/blog/tag/${encodeURIComponent(topic.slug)}`}
                    className="block px-4 py-2 text-[13px] text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition-colors"
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blog" className="hover:opacity-60 transition-opacity">
            Archive
          </Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">
            About
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-[var(--color-foreground)] transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[var(--color-foreground)] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[var(--color-foreground)] transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            <button
              className="flex items-center justify-between w-full py-2 text-[14px] text-[var(--color-foreground)]"
              onClick={() => setTopicsOpen(!topicsOpen)}
            >
              Topics
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform ${topicsOpen ? "rotate-180" : ""}`}
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {topicsOpen && (
              <div className="pl-4 space-y-1">
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/blog/tag/${encodeURIComponent(topic.slug)}`}
                    className="block py-1.5 text-[13px] text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/blog"
              className="block py-2 text-[14px] text-[var(--color-foreground)]"
              onClick={() => setMobileOpen(false)}
            >
              Archive
            </Link>
            <Link
              href="/about"
              className="block py-2 text-[14px] text-[var(--color-foreground)]"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
