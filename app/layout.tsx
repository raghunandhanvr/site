import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import { Analytics } from '@vercel/analytics/react';
import Footer from './components/layout/footer';
import { metaData, structuredData } from "@/app/config";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${inter.className}`}>
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
        <body className="antialiased tracking-tight">
          <div className="min-h-screen flex flex-col justify-between pt-0 pl-7 pr-7 p-8 bg-white text-gray-900">
            <main className="max-w-[60ch] mx-auto w-full space-y-6">
              {children}
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
