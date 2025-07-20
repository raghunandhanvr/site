import { BaseUrl, getBlogSlugs } from "@/app/lib/server-utils";

export default async function sitemap() {
  const slugs = await getBlogSlugs();

  const blogs = slugs.map((slug) => ({
    url: `${BaseUrl}writings/${slug}`,
    lastModified: new Date(),
  }));

  const routes = [
    "",
    "writings",
    "work",
    "rss",
    "atom",
    "feed",
    "rss.xml",
    "atom.xml",
    "feed.json",
  ].map((route) => ({
    url: route ? `${BaseUrl}${route}` : BaseUrl,
    lastModified: new Date(),
  }));

  return [...routes, ...blogs];
}
