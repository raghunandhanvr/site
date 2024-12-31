import { BaseUrl, getBlogSlugs } from "@/app/lib/utils";

export default async function sitemap() {
  const slugs = await getBlogSlugs();

  const blogs = slugs.map((slug) => ({
    url: `${BaseUrl}b/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', 'work', 'rss', 'atom', 'feed', 'rss.xml', 'atom.xml', 'feed.json', 'rss', 'feed', 'atom', 'json'].map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogs];
}

