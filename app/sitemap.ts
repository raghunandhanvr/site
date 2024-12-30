import { promises as fs } from 'fs';
import path from 'path';
import { metaData } from "@/app/config";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

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

export default async function sitemap() {
  const notesDirectory = path.join(process.cwd(), 'app', 'b');
  const slugs = await getNoteSlugs(notesDirectory);

  const notes = slugs.map((slug) => ({
    url: `${BaseUrl}b/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/work'].map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...notes];
}
