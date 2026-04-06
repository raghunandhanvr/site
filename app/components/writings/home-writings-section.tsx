import { Link } from "next-view-transitions"

import { LinkPreviewServer } from "@/app/components/link-preview/link-preview-server"
import { siteConfig } from "@/app/config"
import { blogPosts } from "@/app/writings/writings-data"

const linkClass = "home-writings-link"

const followPreviewLinkClass =
  "text-[var(--color-text-muted)] underline decoration-[color-mix(in_srgb,var(--color-text-soft)_55%,transparent)] underline-offset-4"

export async function HomeWritingsSection() {
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
            <Link href={post.slug} className={linkClass}>
              {post.title}
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-base leading-relaxed text-[var(--color-text-muted)]">
        You can read my above writings or{" "}
        <LinkPreviewServer
          href={siteConfig.social.twitter}
          className={followPreviewLinkClass}
        >
          follow me online
        </LinkPreviewServer>
        .
      </p>
    </section>
  )
}
