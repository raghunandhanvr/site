import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/", permanent: true },
      { source: "/writings", destination: "/", permanent: true },
    ]
  },
  async rewrites() {
    return [
      { source: "/rss.xml", destination: "/api/feed/rss" },
      { source: "/atom.xml", destination: "/api/feed/atom" },
      { source: "/feed.json", destination: "/api/feed/json" },
      { source: "/rss", destination: "/api/feed/rss" },
      { source: "/feed", destination: "/api/feed/rss" },
      { source: "/atom", destination: "/api/feed/atom" },
      { source: "/json", destination: "/api/feed/json" },
    ]
  },
}

export default createMDX({})(nextConfig)
