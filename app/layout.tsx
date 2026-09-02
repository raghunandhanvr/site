import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import * as stylex from "@stylexjs/stylex"

import "@/app/styles/stylex.css"
import { ThemeProvider, ThemeToggle } from "@/app/components/theme"
import { ThemeSync } from "@/app/components/theme-sync"
import { siteConfig, getStructuredData } from "@/app/config"
import { darkThemeClassName } from "@/app/styles/themes"
import { styles } from "@/app/styles/ui"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
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
  icons: { icon: "/favicon.ico" },
}

const htmlSx = stylex.props(styles.html)
const bodySx = stylex.props(styles.body)
const shellSx = stylex.props(styles.box, styles.shell)
const darkClass = darkThemeClassName()

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        geistSans.variable,
        geistMono.variable,
        instrumentSerif.variable,
        htmlSx.className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={htmlSx.style}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=s==='dark'||((!s||s==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(s==='light'){document.documentElement.setAttribute('data-theme','light');}else if(d){document.documentElement.setAttribute('data-theme','dark');}document.documentElement.style.colorScheme=d?'dark':'light';if(d){document.documentElement.classList.add.apply(document.documentElement.classList,${JSON.stringify(darkClass.split(/\s+/).filter(Boolean))});}}catch(e){}})();`,
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID ? (
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
        ) : null}
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
      <body {...bodySx}>
        <ThemeProvider>
          <ThemeSync />
          <div {...shellSx}>{children}</div>
          <Analytics />
          <SpeedInsights />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
