import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from "@/app/config";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const blogsDirectory = path.join(process.cwd(), 'app', 'writings');

export const BaseUrl = siteConfig.url.endsWith("/")
  ? siteConfig.url
  : `${siteConfig.url}/`;

export async function getBlogSlugs(dir: string = blogsDirectory) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export async function getBlogData(slug: string) {
  const fullPath = path.join(blogsDirectory, slug, 'page.mdx');
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data: metadata, content } = matter(fileContents);
  
  return {
    slug,
    metadata: {
      title: metadata.title || slug,
      summary: metadata.summary || '',
      publishedAt: metadata.publishedAt || new Date().toISOString(),
      tags: metadata.tags || '',
      image: metadata.image || '',
    },
    content
  };
}

export async function getBlogs() {
  const slugs = await getBlogSlugs();
  const blogs = await Promise.all(
    slugs.map(slug => getBlogData(slug))
  );

  return blogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - 
           new Date(a.metadata.publishedAt).getTime();
  });
}

