import type { MetadataRoute } from "next"

import { siteConfig } from "@/app/config"
import { blogPosts } from "@/app/writings/writings-data"

const baseUrl = siteConfig.url.endsWith("/")
  ? siteConfig.url
  : `${siteConfig.url}/`

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const blogs = blogPosts.map((post) => ({
    url: `${baseUrl}${post.slug.replace(/^\//, "")}`,
    lastModified: new Date(post.date),
  }))

  const routes = [
    "",
    "rss.xml",
    "atom.xml",
    "feed.json",
    "sitemap.xml",
  ].map((route) => ({
    url: route ? `${baseUrl}${route}` : baseUrl,
    lastModified: now,
  }))

  return [...routes, ...blogs]
}
