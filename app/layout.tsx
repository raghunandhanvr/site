import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { AnalyticsProviders } from "@/app/components/analytics";
import { ThemeProvider } from "@/app/components/theme/theme-provider";
import ThemeToggle from "@/app/components/theme/theme-toggle";
import { siteConfig, getStructuredData } from "@/app/config";
import Script from "next/script";
import clsx from "clsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          instrumentSerif.variable,
        )}
      >
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
          <link
            rel="alternate"
            type="application/rss+xml"
            href="/rss.xml"
            title="RSS"
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            href="/atom.xml"
            title="Atom"
          />
          <link
            rel="alternate"
            type="application/feed+json"
            href="/feed.json"
            title="JSON"
          />
          <meta name="color-scheme" content="light dark" />
        </head>
        <body className="antialiased">
          <ThemeProvider>
            <>
              <div className="mx-auto flex min-h-svh w-full max-w-4xl min-w-0 flex-col bg-[var(--color-page)] px-3 pt-12 pb-safe-shell text-[var(--color-text)] sm:px-10 sm:pt-16">
                <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col">
                  {children}
                </div>
              </div>
              <AnalyticsProviders />
              <ThemeToggle />
            </>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
