import { siteConfig } from "@/app/config";
import { blogManifest } from "@/app/lib/blog-manifest";

export const blogsDirectory = "app/writings";

export const BaseUrl = siteConfig.url.endsWith("/")
  ? siteConfig.url
  : `${siteConfig.url}/`;

function manifestSlugToShort(slug: string): string {
  return slug.replace(/^\/writings\//, "");
}

export function getBlogSlugs(): string[] {
  return blogManifest.map((e) => manifestSlugToShort(e.slug));
}

export function getBlogData(slug: string) {
  const fullSlug = slug.startsWith("/writings/") ? slug : `/writings/${slug}`;
  const entry = blogManifest.find((e) => e.slug === fullSlug);
  if (!entry) return null;
  return {
    slug: manifestSlugToShort(entry.slug),
    metadata: {
      title: entry.title,
      summary: entry.summary,
      publishedAt: entry.publishedAt,
      tags: entry.tags,
      image: entry.image,
    },
    content: entry.content,
  };
}

export function getAllBlogPosts() {
  return blogManifest.map((e) => ({
    slug: e.slug,
    title: e.title,
    summary: e.summary,
    publishedAt: e.publishedAt,
    tags: e.tags,
    image: e.image,
  }));
}

export function getBlogs() {
  return blogManifest.map((e) => ({
    slug: manifestSlugToShort(e.slug),
    metadata: {
      title: e.title,
      summary: e.summary,
      publishedAt: e.publishedAt,
      tags: e.tags,
      image: e.image,
    },
    content: e.content,
  }));
}
