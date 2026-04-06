import type { Metadata } from "next"

import { HomeWritingsSection } from "@/app/components/writings/home-writings-section"
import { siteConfig } from "@/app/config"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(siteConfig.shortName)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function HomePage() {
  return <HomeWritingsSection />
}
