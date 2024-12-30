import fs from "fs";
import path from "path";
import { cache } from 'react'
import { getAllViews } from "@/app/actions/blog";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string;
  image?: string;
};

export type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
  views: number;
};

const parseFrontmatter = cache(async (fileContent: string) => {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); 
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
})

const getMDXFiles = cache(async (dir: string) => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
})

const readMDXFile = cache(async (filePath: string) => {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
})

const getMDXData = cache(async (dir: string): Promise<BlogPost[]> => {
  let mdxFiles = await getMDXFiles(dir);
  const allViews = await getAllViews();

  return Promise.all(mdxFiles.map(async (file) => {
    let { metadata, content } = await readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
      views: allViews[slug] || 0,
    };
  }));
})

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return getMDXData(path.join(process.cwd(), "./app/content"));
})

