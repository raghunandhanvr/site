import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  cacheComponents: true,
  cacheLife: {
    static: {
      stale: 3600, // 1 hour
      revalidate: 86400, // 1 day
      expire: 604800, // 1 week
    },
    posts: {
      stale: 900, // 15 minutes
      revalidate: 1800, // 30 minutes
      expire: 86400, // 1 day
    },
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

const withMDX = createMDX({});

export default withMDX(nextConfig);

