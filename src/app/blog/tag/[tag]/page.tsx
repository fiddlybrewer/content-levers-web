import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: decoded,
    description: `Articles tagged "${decoded}" on Content Levers.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getAllPosts().filter((p) => p.tags.includes(decoded));

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-12 pb-8">
        <Link
          href="/blog"
          className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors mb-4 inline-block"
        >
          &larr; All articles
        </Link>
        <h1 className="text-2xl font-bold mb-1">{decoded}</h1>
        <p className="text-[14px] text-[var(--color-muted)]">
          {posts.length} article{posts.length !== 1 ? "s" : ""}
        </p>
      </section>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-[var(--color-muted)]">No articles with this tag yet.</p>
        </div>
      )}
    </div>
  );
}
