import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  poweredByHeader: false,
  compress: true,
  experimental: {
    mdxRs: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=86400, stale-while-revalidate",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/api/feed/rss.xml",
      },
      {
        source: "/atom.xml",
        destination: "/api/feed/atom.xml",
      },
      {
        source: "/feed.json",
        destination: "/api/feed/feed.json",
      },
      {
        source: "/rss",
        destination: "/api/feed/rss.xml",
      },
      {
        source: "/feed",
        destination: "/api/feed/rss.xml",
      },
      {
        source: "/atom",
        destination: "/api/feed/atom.xml",
      },
      {
        source: "/json",
        destination: "/api/feed/feed.json",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);

