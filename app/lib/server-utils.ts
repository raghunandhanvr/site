import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "@/app/config";
import { BlogPost, BlogMetadata } from "@/app/types";
import { kebabToTitle, extractExcerpt, calculateReadingTime } from "./utils";

const blogsDirectory = path.join(process.cwd(), "app", "writings");

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(blogsDirectory, {
      recursive: true,
      withFileTypes: true,
    });
    
    return entries
      .filter((entry) => entry.isFile() && entry.name === "page.mdx")
      .map((entry) => {
        const relativePath = path.relative(
          blogsDirectory,
          path.join(entry.parentPath, entry.name)
        );
        return path.dirname(relativePath);
      })
      .map((slug) => slug.replace(/\\/g, "/"));
  } catch (error) {
    console.error("Failed to get blog slugs:", error);
    return [];
  }
}

export async function getBlogData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(blogsDirectory, slug, "page.mdx");
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data: metadata, content } = matter(fileContents);

  const processedMetadata: BlogMetadata = {
    title: metadata.title || kebabToTitle(slug),
    summary: metadata.summary || extractExcerpt(content),
    publishedAt: metadata.publishedAt || new Date().toISOString(),
    tags: Array.isArray(metadata.tags) 
      ? metadata.tags 
      : typeof metadata.tags === "string" 
        ? metadata.tags.split(",").map((tag: string) => tag.trim())
        : [],
    image: metadata.image || "",
  };

  return {
    slug: `/writings/${slug}`,
    ...processedMetadata,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export async function getAllBlogPosts(): Promise<Omit<BlogPost, "content">[]> {
  try {
    const slugs = await getBlogSlugs();
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const { content, ...metadata } = await getBlogData(slug);
        return metadata;
      })
    );

    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Failed to get all blog posts:", error);
    return [];
  }
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const slugs = await getBlogSlugs();
    const blogs = await Promise.all(slugs.map((slug) => getBlogData(slug)));

    return blogs.sort((a, b) => {
      return (
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
      );
    });
  } catch (error) {
    console.error("Failed to get blogs:", error);
    return [];
  }
}
