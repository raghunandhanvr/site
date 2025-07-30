import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import WritingsLayoutWrapper from "./components/ui/writings-layout-wrapper";
import { siteConfig, getStructuredData } from "./config";
import Script from "next/script";
import { cn } from "./lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
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
    description: siteConfig.description,
    card: "summary_large_image",
    images: [siteConfig.image],
    creator: "@raghuvrx",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ViewTransitions>
      <html 
        lang="en" 
        className={cn(inter.variable, "font-sans")} 
        suppressHydrationWarning
      >
        <head>
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getStructuredData()),
            }}
          />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-8E3Y6STYEC`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-8E3Y6STYEC', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `,
            }}
          />
        </head>
        <body className="antialiased tracking-tight bg-white text-gray-900">
          <div className="min-h-screen flex flex-col justify-between pt-0 pl-7 pr-7 p-8">
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
  );
}
