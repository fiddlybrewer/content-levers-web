import { getAllPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

// Register every tool slug here. The sitemap will include it automatically.
const FREE_TOOLS = ["topic-cluster-generator"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "https://contentlevers.xyz";

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const tools = FREE_TOOLS.map((slug) => ({
    url: `${baseUrl}/free-tools/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/notes`, lastModified: new Date() },
    { url: `${baseUrl}/free-tools`, lastModified: new Date() },
    ...tools,
    ...posts,
  ];
}
