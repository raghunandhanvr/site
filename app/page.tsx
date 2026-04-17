import type { Metadata } from "next"
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

const previewMuted =
  "text-[var(--color-text-muted)] underline decoration-[color-mix(in_srgb,var(--color-text-soft)_55%,transparent)] underline-offset-4"

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

export default function HomePage() {
  return (
    <main className="flex w-max max-w-full min-w-0 flex-1 flex-col self-center px-6 pt-12 sm:px-10 sm:pt-16 lg:px-12">
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
        <p className="text-base leading-normal text-[var(--color-text-muted)]">
          Background across full-stack engineering, blockchain, and security;
          <span className="block">
            I&apos;m currently at{" "}
            <LinkPreviewServer
              href="https://byzanlink.com/"
              className={previewMuted}
            >
              Byzanlink
            </LinkPreviewServer>
            . Previously at{" "}
            <LinkPreviewServer href="https://lumel.com/" className={previewMuted}>
              Lumel
            </LinkPreviewServer>{" "}
            and{" "}
            <LinkPreviewServer
              href="https://www.freightify.com"
              className={previewMuted}
            >
              Freightify
            </LinkPreviewServer>
            .
          </span>
        </p>
        <p className="mt-5 text-base font-medium leading-normal text-[var(--color-text)]">
          Some of my tech contributions:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-normal text-[var(--color-text-muted)]">
          <li>
            <strong className="font-medium text-[var(--color-text)]">
              IAM service
            </strong>{" "}
            in golang serving 100K+ users daily
          </li>
          <li>
            <strong className="font-medium text-[var(--color-text)]">
              Custom reverse proxy
            </strong>{" "}
            in golang handling 1M+ daily API requests
          </li>
          <li>
            <strong className="font-medium text-[var(--color-text)]">
              AI research
            </strong>{" "}
            on fake image detection (
            <LinkPreviewServer
              href="https://ieeexplore.ieee.org/document/10046797"
              className={previewMuted}
            >
              IEEE published
            </LinkPreviewServer>
            )
          </li>
          <li>
            <strong className="font-medium text-[var(--color-text)]">
              Bug bounties
            </strong>{" "}
            from Microsoft Azure, McAfee, Uber
          </li>
          <li>
            Top 50 finalist in{" "}
            <strong className="font-medium text-[var(--color-text)]">
              Smart India Hackathon 2022
            </strong>
          </li>
          <li>
            <strong className="font-medium text-[var(--color-text)]">
              Network infrastructure
            </strong>{" "}
            for{" "}
            <LinkPreviewServer
              href="https://www.kghospital.com/"
              className={previewMuted}
            >
              KG Hospital
            </LinkPreviewServer>
            , Coimbatore
          </li>
          <li>
            Working on{" "}
            <strong className="font-medium text-[var(--color-text)]">
              ERC-3643
            </strong>{" "}
            (permissioned tokens) and{" "}
            <strong className="font-medium text-[var(--color-text)]">
              ERC-4626
            </strong>{" "}
            (tokenized vaults)
          </li>
        </ul>
      </div>

      <section className="mt-5 min-w-0 w-full">
        <h2 className="text-base font-medium leading-normal text-[var(--color-text)]">
          Some of my writings:
        </h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 marker:text-[var(--color-text-soft)]">
          {sortedPosts.map((post) => (
            <li key={post.slug} className="pl-1 text-base leading-normal">
              <Link href={post.slug} className="home-writings-link">
                {post.title}
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-base leading-normal text-[var(--color-text-muted)]">
          You can read my above writings or{" "}
          <LinkPreviewServer
            href={siteConfig.social.twitter}
            className={previewMuted}
          >
            follow me online
          </LinkPreviewServer>
          .{" "}
          <LinkPreviewServer
            href={`mailto:${siteConfig.email}`}
            className={previewMuted}
          >
            Reach out
          </LinkPreviewServer>{" "}
          if interested.
        </p>
      </section>
    </main>
  )
}
