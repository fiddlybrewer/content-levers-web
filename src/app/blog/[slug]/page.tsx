import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { getTopicMeta } from "@/lib/topics";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.updatedDate && { modifiedTime: post.updatedDate }),
      ...(post.author && { authors: [post.author] }),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const tag = post.tags[0];
  const topic = tag ? getTopicMeta(tag) : null;
  const baseUrl = process.env.SITE_URL || "https://contentlevers.com";

  // Schema.org Article + Person structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.updatedDate && { dateModified: post.updatedDate }),
    url: `${baseUrl}/blog/${slug}`,
    ...(post.thumbnail && { image: `${baseUrl}${post.thumbnail}` }),
    ...(post.author && {
      author: {
        "@type": "Person",
        name: post.author,
        ...(post.authorRole && { jobTitle: post.authorRole }),
        ...(post.authorBio && { description: post.authorBio }),
        ...(post.authorImage && { image: `${baseUrl}${post.authorImage}` }),
        ...(post.authorWebsite && { url: post.authorWebsite }),
        sameAs: [
          post.authorLinkedin,
          post.authorTwitter,
          post.authorWebsite,
        ].filter(Boolean),
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "Content Levers",
      url: baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6">
        <header className="pt-16 pb-8 flex flex-col items-start">
          <Link
            href="/blog"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors mb-6"
          >
            &larr; Back to blog
          </Link>

          {/* Tag with symbol */}
          {tag && topic && (
            <Link
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold mb-4"
              style={{ backgroundColor: topic.bg, color: topic.text }}
            >
              <span>{topic.symbol}</span>
              {tag}
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.updatedDate && (
              <span>
                Updated{" "}
                <time dateTime={post.updatedDate}>
                  {new Date(post.updatedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
            )}
            {post.author && (
              <span>
                by <span className="text-[var(--color-foreground)] font-medium">{post.author}</span>
              </span>
            )}
          </div>
        </header>

        <div
          className="prose pb-12"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Author box — E-E-A-T optimized */}
        {post.author && (
          <div className="border-t border-[var(--color-border)] pt-8 pb-20">
            <div className="rounded-2xl bg-[var(--color-surface)] p-6 sm:p-8">
              <div className="flex items-start gap-5">
                {/* Avatar */}
                {post.authorImage ? (
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[var(--color-border)] flex items-center justify-center text-xl font-bold text-[var(--color-muted)] shrink-0">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  {/* Name + role */}
                  <p className="text-[13px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-1">
                    Written by
                  </p>
                  <p className="text-[17px] font-bold">{post.author}</p>
                  {post.authorRole && (
                    <p className="text-[13px] text-[var(--color-muted)] mt-0.5">
                      {post.authorRole}
                    </p>
                  )}

                  {/* Bio — shows expertise */}
                  {post.authorBio && (
                    <p className="text-[14px] text-[var(--color-muted)] leading-relaxed mt-3">
                      {post.authorBio}
                    </p>
                  )}

                  {/* Social links — authoritativeness */}
                  <div className="flex items-center gap-3 mt-4">
                    {post.authorLinkedin && (
                      <a
                        href={post.authorLinkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A66C2] hover:opacity-70 transition-opacity"
                        aria-label={`${post.author} on LinkedIn`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {post.authorTwitter && (
                      <a
                        href={post.authorTwitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-foreground)] hover:opacity-70 transition-opacity"
                        aria-label={`${post.author} on X`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                    {post.authorWebsite && (
                      <a
                        href={post.authorWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors text-[13px] font-medium"
                      >
                        Website ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!post.author && <div className="pb-20" />}
      </article>
    </>
  );
}
