import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/layout/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-switch";
import { metaData, structuredData } from "@/app/config";
import Script from "next/script";
import { ViewTransitions } from 'next-view-transitions';

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  keywords: metaData.alternateNames.concat([
    "Software Engineer",
    "Tech Blog",
    "Web Development",
    "Distributed Systems"
  ]),
  alternates: {
    canonical: metaData.baseUrl,
    types: {
      'application/rss+xml': '/rss.xml',
      'application/atom+xml': '/atom.xml',
      'application/feed+json': '/feed.json',
    },
  },
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website",
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
    title: metaData.name,
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Create a separate component for structured data to prevent hydration issues
function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
        <head>
          <Script
            async 
            src="https://www.googletagmanager.com/gtag/js?id=G-8E3Y6STYEC"
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8E3Y6STYEC');
            `}
          </Script>
          <StructuredData />
          <meta name="author" content={metaData.name} />
          <link rel="canonical" href={metaData.baseUrl} />
          <link
            rel="alternate"
            type="application/rss+xml"
            href="/rss.xml"
            title="RSS Feed"
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            href="/atom.xml"
            title="Atom Feed"
          />
          <link
            rel="alternate"
            type="application/feed+json"
            href="/feed.json"
            title="JSON Feed"
          />
        </head>
        <body className="antialiased flex flex-col items-center justify-center mx-auto mt-1 lg:mt-4 mb-20 lg:mb-40">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex-auto min-w-0 mt-1 md:mt-3 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full">
              <Navbar />
              {children}
              <Footer />
              <Analytics />
              <SpeedInsights />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}

