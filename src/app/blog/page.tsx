import { getAllPosts } from "@/lib/posts";
import SearchablePosts from "@/components/SearchablePosts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "All articles from Content Levers — SEO strategies, content frameworks, and growth playbooks.",
  alternates: {
    canonical: "https://contentlevers.xyz/blog",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-12 pb-8">
        <h1 className="text-2xl font-bold mb-1">All Articles</h1>
        <p className="text-[14px] text-[var(--color-muted)]">
          SEO strategy, content frameworks, and growth.
        </p>
      </section>

      <section className="pb-20">
        <SearchablePosts posts={posts} tags={allTags} />
      </section>
    </div>
  );
}
