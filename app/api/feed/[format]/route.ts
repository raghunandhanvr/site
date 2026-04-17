import { Feed } from "feed"
import { cacheLife } from "next/cache"
import { notFound } from "next/navigation"

import { siteConfig } from "@/app/config"
import { blogPosts } from "@/app/writings/writings-data"

const baseUrl = siteConfig.url.replace(/\/$/, "")

async function renderFeed(format: "rss" | "atom" | "json"): Promise<string> {
  "use cache"
  cacheLife("max")

  const feed = generateFeed()
  switch (format) {
    case "rss":
      return feed.rss2()
    case "atom":
      return feed.atom1()
    case "json":
      return feed.json1()
  }
}

function generateFeed() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: baseUrl,
    link: baseUrl,
    language: "en",
    image: `${baseUrl}/opengraph-image.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    feedLinks: {
      rss: `${baseUrl}/api/feed/rss`,
      json: `${baseUrl}/api/feed/json`,
      atom: `${baseUrl}/api/feed/atom`,
    },
    author: {
      name: siteConfig.name,
      email: siteConfig.email,
      link: baseUrl,
    },
  })

  for (const post of blogPosts) {
    const url = `${baseUrl}${post.slug}`
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      date: new Date(post.date),
      author: [
        {
          name: siteConfig.name,
          email: siteConfig.email,
          link: baseUrl,
        },
      ],
    })
  }

  return feed
}

const CONTENT_TYPES = {
  rss: "application/rss+xml; charset=utf-8",
  atom: "application/atom+xml; charset=utf-8",
  json: "application/feed+json; charset=utf-8",
} as const

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ format: string }> },
) {
  const { format } = await params
  if (format !== "rss" && format !== "atom" && format !== "json") notFound()

  const body = await renderFeed(format)
  return new Response(body, { headers: { "Content-Type": CONTENT_TYPES[format] } })
}
