import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function getPosts() {
  const notesDirectory = path.join(process.cwd(), 'app', 'b');
  
  // Get all directories in the posts folder
  async function getNoteSlugs(dir: string) {
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

  // Get the content of a post
  async function getNoteData(slug: string) {
    const fullPath = path.join(notesDirectory, slug, 'page.mdx');
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

  const slugs = await getNoteSlugs(notesDirectory);
  const posts = await Promise.all(
    slugs.map(slug => getNoteData(slug))
  );

  // Sort posts by date
  return posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - 
           new Date(a.metadata.publishedAt).getTime();
  });
}