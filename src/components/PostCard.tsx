import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getTopicMeta } from "@/lib/topics";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="border border-[var(--color-border)] rounded-lg overflow-hidden transition-shadow duration-200 group-hover:shadow-md h-full flex flex-col">
        {/* Thumbnail area */}
        {post.thumbnail && (
          <div className="relative bg-white flex items-center justify-center min-h-[180px] border-b border-[var(--color-border)] overflow-hidden">
            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}

        {/* Content */}
        <div className="px-5 py-4 flex-1 flex flex-col">
          <h3 className="text-[15px] font-semibold leading-snug mb-2">
            {post.title}
          </h3>
          <p className="text-[13px] text-[var(--color-muted)] leading-relaxed line-clamp-2 mb-3">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: getTopicMeta(t).bg,
                    color: getTopicMeta(t).text,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

