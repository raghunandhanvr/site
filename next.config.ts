import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
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

