import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
    optimizeCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  poweredByHeader: false,
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

export default withBundleAnalyzer(withMDX(nextConfig));

