import { MetadataRoute } from "next";
import { getAllBlogPosts } from "./lib/server-utils";
import { siteConfig } from "./config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();

  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/writings`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  const blogPages = posts.map((post) => ({
    url: `${siteConfig.url}${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
