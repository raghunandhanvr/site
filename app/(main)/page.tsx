import type { Metadata } from "next"
import { Link } from "next-view-transitions"

import { introWorkRoles } from "@/app/(main)/work/work-data"
import { LinkPreviewServer } from "@/app/components/link-preview/link-preview-server"
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
  alternates: {
    canonical: siteConfig.url,
  },
}

const listClass =
  "mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-[var(--color-text-muted)]"

const previewMuted =
  "text-[var(--color-text-muted)] underline decoration-[color-mix(in_srgb,var(--color-text-soft)_55%,transparent)] underline-offset-4"

const writingsLinkClass = "home-writings-link"

function PastEmployerLinks({
  employers,
}: {
  employers: { title: string; url: string }[]
}) {
  if (employers.length === 0) return null
  return (
    <>
      {" "}
      Previously at{" "}
      {employers.map((e, i) => (
        <span key={e.title}>
          {i > 0
            ? i === employers.length - 1
              ? " and "
              : ", "
            : null}
          <LinkPreviewServer href={e.url} className={previewMuted}>
            {e.title}
          </LinkPreviewServer>
        </span>
      ))}
    </>
  )
}

async function WritingsSection() {
  "use cache"

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <section className="mt-6 min-w-0 w-full">
      <h2 className="text-base font-medium leading-relaxed text-[var(--color-text)]">
        Some of my writings:
      </h2>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 marker:text-[var(--color-text-soft)]">
        {sorted.map((post) => (
          <li key={post.slug} className="pl-1 text-base leading-relaxed">
            <Link href={post.slug} className={writingsLinkClass}>
              {post.title}
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-base leading-relaxed text-[var(--color-text-muted)]">
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
  )
}

export default async function HomePage() {
  const roles = introWorkRoles()

  return (
    <>
      <div className="min-w-0 w-full">
        <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
          Background across full-stack engineering, blockchain, and security;
          I&apos;m currently at{" "}
          {roles ? (
            <>
              <LinkPreviewServer
                href={roles.current.url}
                className={previewMuted}
              >
                {roles.current.title}
              </LinkPreviewServer>
              {roles.past.length > 0 ? (
                <>
                  {"."}
                  <PastEmployerLinks employers={roles.past} />
                  {"."}
                </>
              ) : (
                "."
              )}
            </>
          ) : (
            "Byzanlink."
          )}
        </p>
        <p className="mt-6 text-base font-medium leading-relaxed text-[var(--color-text)]">
          Some of my tech contributions:
        </p>
        <ul className={listClass}>
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
            I&apos;ve worked on{" "}
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
      <WritingsSection />
    </>
  )
}
