import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ViewTransitions } from "next-view-transitions"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "./components/layout/footer"
import Header from "./components/layout/header"
import WritingsLayoutWrapper from "./components/ui/writings-layout-wrapper"
import { siteConfig, getStructuredData } from "./config"
import Script from "next/script"
import clsx from "clsx"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: siteConfig.image,
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": "/rss.xml",
      "application/atom+xml": "/atom.xml",
      "application/feed+json": "/feed.json",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteConfig.name,
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={clsx(inter.className)} suppressHydrationWarning>
        <head>
          <Script
            id="ga-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-8E3Y6STYEC');
              `,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getStructuredData()),
            }}
          />
          <link rel="canonical" href={siteConfig.url} />
          <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS" />
          <link rel="alternate" type="application/atom+xml" href="/atom.xml" title="Atom" />
          <link rel="alternate" type="application/feed+json" href="/feed.json" title="JSON" />
        </head>
        <body className="antialiased tracking-tight">
          <div className="min-h-screen flex flex-col justify-between pt-0 pl-7 pr-7 p-8 bg-white text-gray-900">
            <main className="container space-y-6">
              <Header />
              <WritingsLayoutWrapper>
                {children}
              </WritingsLayoutWrapper>
              <Footer />
            </main>
            <Analytics />
            <SpeedInsights />
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}
