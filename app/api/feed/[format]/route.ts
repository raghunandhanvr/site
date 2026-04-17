import { Feed } from "feed"
import { notFound } from "next/navigation"

import { siteConfig } from "@/app/config"
import { blogPosts } from "@/app/writings/writings-data"

export const revalidate = 3600

const baseUrl = siteConfig.url.replace(/\/$/, "")

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ format: string }> },
) {
  const { format } = await params
  const feed = generateFeed()

  switch (format) {
    case "rss":
      return new Response(feed.rss2(), {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
      })
    case "atom":
      return new Response(feed.atom1(), {
        headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
      })
    case "json":
      return new Response(feed.json1(), {
        headers: { "Content-Type": "application/feed+json; charset=utf-8" },
      })
    default:
      notFound()
  }
}
