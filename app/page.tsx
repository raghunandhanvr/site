import type { Metadata } from "next"
import { cacheLife } from "next/cache"
import Link from "next/link"

import { LinkPreviewServer } from "@/app/components/link-preview"
import { siteConfig } from "@/app/config"
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
    <main className="mx-auto flex w-full min-w-0 max-w-4xl flex-1 flex-col px-6 pt-12 sm:px-10 sm:pt-32 lg:px-12">
      <header className="mb-8 min-w-0 sm:mb-6">
        <h1 className="m-0 p-0 text-lg font-medium leading-[1.3] sm:text-xl">
          <Link href="/" className="work-link">
            <span className="sr-only">{siteConfig.name}</span>
            <span aria-hidden="true" className="group relative block overflow-hidden">
              <span className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                {siteConfig.name}
              </span>
              <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                raghu
              </span>
            </span>
          </Link>
        </h1>
      </header>

      <div className="min-w-0 w-full">
        <p className="text-base leading-relaxed text-[var(--color-text)]">
          I&apos;m a software engineer based in India.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
          I like building things, used to assemble PCs for my
          friends. Then a social media app we built in{" "}
          <LinkPreviewServer
            href="https://sece.ac.in/"
            className="home-inline-link"
          >
            college
          </LinkPreviewServer>{" "}
          got serious traffic, and I kept building after that. Now I&apos;m at{" "}
          <LinkPreviewServer
            href="https://byzanlink.com/"
            className="home-inline-link"
          >
            Byzanlink
          </LinkPreviewServer>
          , after working with the teams at{" "}
          <LinkPreviewServer href="https://lumel.com/" className="home-inline-link">
            Lumel
          </LinkPreviewServer>{" "}
          and{" "}
          <LinkPreviewServer
            href="https://www.freightify.com"
            className="home-inline-link"
          >
            Freightify
          </LinkPreviewServer>
          .
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
          Away from the screen, I&apos;m usually backpacking or out on my bike
          somewhere.
        </p>
        <p className="mt-8 text-base font-medium leading-normal text-[var(--color-text)]">
          Some of my tech contributions:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-normal text-[var(--color-text)]">
          <li>
            AI research on fake image detection (
            <LinkPreviewServer
              href="https://ieeexplore.ieee.org/document/10046797"
              className="home-inline-link"
            >
              IEEE published
            </LinkPreviewServer>
            )
          </li>
          <li>
            Bug bounties from{" "}
            <LinkPreviewServer
              href="https://www.microsoft.com/en-us/msrc/bounty-microsoft-azure"
              className="home-inline-link"
            >
              Microsoft Azure
            </LinkPreviewServer>
            ,{" "}
            <LinkPreviewServer
              href="https://hackerone.com/mcafee_secure"
              className="home-inline-link"
            >
              McAfee
            </LinkPreviewServer>
            ,{" "}
            <LinkPreviewServer
              href="https://hackerone.com/uber"
              className="home-inline-link"
            >
              Uber
            </LinkPreviewServer>
          </li>
          <li>
            <LinkPreviewServer
              href="https://github.com/zalando/skipper"
              className="home-inline-link"
            >
              Custom reverse proxy
            </LinkPreviewServer>{" "}
            in Go, 1M+ daily API requests
          </li>
          <li>IAM service in Go serving 100K+ users daily</li>
          <li>
            Network infrastructure for{" "}
            <LinkPreviewServer
              href="https://www.kghospital.com/"
              className="home-inline-link"
            >
              KG Hospital
            </LinkPreviewServer>
            , Coimbatore
          </li>
        </ul>
      </div>

      <section className="mt-5 min-w-0 w-full">
        <h2 className="text-base font-medium leading-normal text-[var(--color-text)]">
          Some of my writings:
        </h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 marker:text-[var(--color-text)]">
          {orderedHomeWritings.map((post) => (
            <li key={post.slug} className="pl-1 text-base leading-normal">
              <Link href={post.slug} className="home-writings-link">
                {post.title}
              </Link>
            </li>
          ))}
        </ol>
        <p className="home-footer mt-6 text-base leading-normal">
          You can read my above writings or{" "}
          <LinkPreviewServer
            href={siteConfig.social.twitter}
            className="home-footer-link"
          >
            follow me online
          </LinkPreviewServer>
          .
        </p>
      </section>
    </main>
  )
}
