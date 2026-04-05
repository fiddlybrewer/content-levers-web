import { getAllPosts } from "@/lib/posts";
import FilterablePosts from "@/components/FilterablePosts";
import SearchablePosts from "@/components/SearchablePosts";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import LogoPacman from "@/components/LogoPacman";

export default function Home() {
  const posts = getAllPosts();
  const popular = posts.slice(0, 6);
  const recent = posts.slice(0);
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="max-w-6xl mx-auto px-6">
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
