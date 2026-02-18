import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ViewTransitions } from "next-view-transitions"
import { AnalyticsProviders } from "./components/analytics"
import Footer from "./components/layout/footer"
import Header from "./components/layout/header"
import { siteConfig, getStructuredData } from "./config"
import Script from "next/script"
import clsx from "clsx"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <html lang="en" className={clsx(geist.className, geistMono.className)} suppressHydrationWarning>
        <head>
          {process.env.NEXT_PUBLIC_GA_ID && (
            <Script
              id="ga-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          )}
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
        <body className="antialiased tracking-tight font-sans">
          <div className="min-h-screen flex flex-col pt-0 px-4 sm:px-7 p-8 bg-white text-gray-900 max-w-full overflow-x-hidden">
            <main className="flex-1 container space-y-6 max-w-full">
              <Header />
              {children}
            </main>
            <div className="container max-w-full">
              <Footer />
            </div>
            <AnalyticsProviders />
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}
