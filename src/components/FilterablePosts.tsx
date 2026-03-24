"use client";

import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import { getTopicMeta } from "@/lib/topics";
import type { PostMeta } from "@/lib/posts";

export default function FilterablePosts({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div>
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

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--color-muted)] py-12">
          No articles for this topic yet.
        </p>
      )}
    </div>
  );
}
