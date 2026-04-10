import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  thumbnail?: string;
  author?: string;
  authorRole?: string;
  authorBio?: string;
  authorImage?: string;
  authorLinkedin?: string;
  authorTwitter?: string;
  authorWebsite?: string;
  canonicalUrl?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        updatedDate: data.updatedDate ?? undefined,
        tags: data.tags ?? [],
        thumbnail: data.thumbnail ?? undefined,
        author: data.author ?? undefined,
        authorRole: data.authorRole ?? undefined,
        authorBio: data.authorBio ?? undefined,
        authorImage: data.authorImage ?? undefined,
        authorLinkedin: data.authorLinkedin ?? undefined,
        authorTwitter: data.authorTwitter ?? undefined,
        authorWebsite: data.authorWebsite ?? undefined,
        canonicalUrl: data.canonicalUrl ?? undefined,
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    updatedDate: data.updatedDate ?? undefined,
    tags: data.tags ?? [],
    thumbnail: data.thumbnail ?? undefined,
    author: data.author ?? undefined,
    authorRole: data.authorRole ?? undefined,
    authorBio: data.authorBio ?? undefined,
    authorImage: data.authorImage ?? undefined,
    authorLinkedin: data.authorLinkedin ?? undefined,
    authorTwitter: data.authorTwitter ?? undefined,
    authorWebsite: data.authorWebsite ?? undefined,
    contentHtml,
  };
}
