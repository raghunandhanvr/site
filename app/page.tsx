import type { Metadata } from "next"
import { cacheLife } from "next/cache"
import Link from "next/link"
import * as stylex from "@stylexjs/stylex"

import { LinkPreviewServer } from "@/app/components/link-preview"
import { siteConfig } from "@/app/config"
import { styles } from "@/app/styles/ui"
import { blogPosts } from "@/app/writings/writings-data"

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
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
  alternates: { canonical: siteConfig.url },
}

const homeWritingsOrder = [
  "/writings/simd",
  "/writings/skipper",
  "/writings/deletion-focused",
  "/writings/dx",
  "/writings/db",
  "/writings/munnar",
] as const

const orderedHomeWritings = homeWritingsOrder.map((slug) => {
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) throw new Error(`Missing blog post for slug: ${slug}`)
  return post
})

export default async function HomePage() {
  "use cache"
  cacheLife("max")

  return (
    <main {...stylex.props(styles.box, styles.homeMain)}>
      <header {...stylex.props(styles.homeHeader)}>
        <h1 {...stylex.props(styles.homeTitle)}>
          <Link href="/" {...stylex.props(styles.workLink)}>
            <span {...stylex.props(styles.srOnly)}>{siteConfig.name}</span>
            <span
              aria-hidden="true"
              {...stylex.props(stylex.defaultMarker(), styles.nameWrap)}
            >
              <span {...stylex.props(styles.nameCurrent)}>
                {siteConfig.name}
              </span>
              <span {...stylex.props(styles.nameAlt)}>raghu</span>
            </span>
          </Link>
        </h1>
      </header>

      <div {...stylex.props(styles.homeCopy)}>
        <p {...stylex.props(styles.homeP)}>
          I&apos;m a software engineer based in India.
        </p>
        <p {...stylex.props(styles.homePSpaced)}>
          I like building things, used to assemble PCs for my
          friends. Then a social media app we built in{" "}
          <LinkPreviewServer
            href="https://sece.ac.in/"
            style={styles.homeInlineLink}
          >
            college
          </LinkPreviewServer>{" "}
          got serious traffic, and I kept building after that. Now I&apos;m at{" "}
          <LinkPreviewServer
            href="https://byzanlink.com/"
            style={styles.homeInlineLink}
          >
            Byzanlink
          </LinkPreviewServer>
          , after working with the teams at{" "}
          <LinkPreviewServer
            href="https://lumel.com/"
            style={styles.homeInlineLink}
          >
            Lumel
          </LinkPreviewServer>{" "}
          and{" "}
          <LinkPreviewServer
            href="https://www.freightify.com"
            style={styles.homeInlineLink}
          >
            Freightify
          </LinkPreviewServer>
          .
        </p>
        <p {...stylex.props(styles.homePSpaced)}>
          Away from the screen, I&apos;m usually backpacking or out on my bike
          somewhere.
        </p>
        <p {...stylex.props(styles.homeLead)}>
          Some of my tech contributions:
        </p>
        <ul {...stylex.props(styles.homeList)}>
          <li {...stylex.props(styles.homeListItem)}>
            AI research on fake image detection (
            <LinkPreviewServer
              href="https://ieeexplore.ieee.org/document/10046797"
              style={styles.homeInlineLink}
            >
              IEEE published
            </LinkPreviewServer>
            )
          </li>
          <li {...stylex.props(styles.homeListItem)}>
            Bug bounties from{" "}
            <LinkPreviewServer
              href="https://www.microsoft.com/en-us/msrc/bounty-microsoft-azure"
              style={styles.homeInlineLink}
            >
              Microsoft Azure
            </LinkPreviewServer>
            ,{" "}
            <LinkPreviewServer
              href="https://hackerone.com/mcafee_secure"
              style={styles.homeInlineLink}
            >
              McAfee
            </LinkPreviewServer>
            ,{" "}
            <LinkPreviewServer
              href="https://hackerone.com/uber"
              style={styles.homeInlineLink}
            >
              Uber
            </LinkPreviewServer>
          </li>
          <li {...stylex.props(styles.homeListItem)}>
            <LinkPreviewServer
              href="https://github.com/zalando/skipper"
              style={styles.homeInlineLink}
            >
              Custom reverse proxy
            </LinkPreviewServer>{" "}
            in Go, 1M+ daily API requests
          </li>
          <li {...stylex.props(styles.homeListItem)}>
            Ticketing queue in Go for Paytm{" "}
            <LinkPreviewServer
              href="https://insider.in/"
              style={styles.homeInlineLink}
            >
              Insider
            </LinkPreviewServer>
            , 40,000+ concurrent requests at sub-200ms p99
          </li>
          <li {...stylex.props(styles.homeListItem)}>
            IAM service in Go serving 100K+ users daily
          </li>
          <li {...stylex.props(styles.homeListItem)}>
            Network infrastructure for{" "}
            <LinkPreviewServer
              href="https://www.kghospital.com/"
              style={styles.homeInlineLink}
            >
              KG Hospital
            </LinkPreviewServer>
            , Coimbatore
          </li>
        </ul>
      </div>

      <section {...stylex.props(styles.homeWritings)}>
        <h2 {...stylex.props(styles.homeWritingsTitle)}>
          Some of my writings:
        </h2>
        <ol {...stylex.props(styles.homeWritingsList)}>
          {orderedHomeWritings.map((post) => (
            <li key={post.slug} {...stylex.props(styles.homeWritingsItem)}>
              <Link href={post.slug} {...stylex.props(styles.homeWritingsLink)}>
                {post.title}
              </Link>
            </li>
          ))}
        </ol>
        <p {...stylex.props(styles.homeFooter)}>
          You can read my above writings or{" "}
          <LinkPreviewServer
            href={siteConfig.social.twitter}
            style={styles.homeInlineLink}
          >
            follow me online
          </LinkPreviewServer>
          . Here is my{" "}
          <LinkPreviewServer href="/resume" style={styles.homeInlineLink}>
            resume
          </LinkPreviewServer>
          .
        </p>
      </section>
    </main>
  )
}
