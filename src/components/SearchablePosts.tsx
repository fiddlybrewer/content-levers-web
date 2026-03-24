"use client";

import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import { getTopicMeta } from "@/lib/topics";
import type { PostMeta } from "@/lib/posts";

export default function SearchablePosts({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags?: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = posts.filter((post) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div>
      <div className="relative mb-4">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-[var(--color-border)] rounded-lg pl-11 pr-4 py-3 text-sm placeholder-[var(--color-muted)] outline-none focus:border-[#999] transition-colors"
        />
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTag(null)}
            className="text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: !activeTag ? "#1a1a1a" : "#f3f4f6",
              color: !activeTag ? "#fff" : "#4b5563",
            }}
          >
            All
          </button>
          {tags.map((tag) => {
            const meta = getTopicMeta(tag);
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(isActive ? null : tag)}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                style={{
                  backgroundColor: isActive ? meta.text : meta.bg,
                  color: isActive ? "#fff" : meta.text,
                }}
              >
                {meta.symbol} {tag}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--color-muted)] py-12">
          No articles found.
        </p>
      )}
    </div>
  );
}
