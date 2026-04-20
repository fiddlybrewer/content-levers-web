import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import FilterablePosts from "@/components/FilterablePosts";
import SearchablePosts from "@/components/SearchablePosts";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import LogoPacman from "@/components/LogoPacman";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://contentlevers.xyz",
  },
};

export default function Home() {
  const posts = getAllPosts();
  const popular = posts.slice(0, 6);
  const recent = posts.slice(0);
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Content Levers",
    "url": "https://contentlevers.xyz",
    "description": "Actionable SEO strategies, content frameworks, and growth insights for modern marketers.",
    "author": {
      "@type": "Person",
      "name": "Kamila Olexa",
      "url": "https://contentlevers.xyz/about",
      "sameAs": [
        "https://www.linkedin.com/in/kamila-olexa-190074112/",
        "https://x.com/consistentlytop",
        "https://zkami.substack.com",
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="text-center pt-16 pb-14 border-b border-[var(--color-border)]">
        <LogoPacman />
        <h1 className="text-3xl sm:text-[40px] font-bold tracking-tight leading-tight mb-4">
          Content Levers
        </h1>
        <p className="text-[15px] text-[var(--color-muted)] max-w-lg mx-auto leading-relaxed">
          Must-have resources for Growth Marketers.
        </p>
      </section>

      {/* Popular */}
      {popular.length > 0 && (
        <section className="pt-10 pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-bold mb-6">Popular</h2>
          <FilterablePosts posts={popular} tags={allTags} />
        </section>
      )}

      {/* Recent */}
      {recent.length > 0 && (
        <section className="pt-10 pb-16">
          <h2 className="text-xl font-bold mb-6">Recent</h2>
          <SearchablePosts posts={recent} tags={allTags} />
        </section>
      )}

      {posts.length === 0 && (
        <section className="py-20 text-center">
          <p className="text-[var(--color-muted)]">
            Posts coming soon. Add markdown files to{" "}
            <code className="text-[13px] bg-[var(--color-surface)] px-2 py-1 rounded">
              content/posts/
            </code>
          </p>
        </section>
      )}


      <KonamiEasterEgg />
    </div>
  );
}
