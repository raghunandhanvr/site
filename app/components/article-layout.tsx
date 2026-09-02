import type { ReactNode } from "react"
import Link from "next/link"
import { cacheLife } from "next/cache"
import { ArrowLeft } from "lucide-react"
import * as stylex from "@stylexjs/stylex"

import { TableOfContents } from "@/app/components/toc"
import { slugify } from "@/app/lib/heading-slug"
import { styles } from "@/app/styles/ui"

export function WritingsStack({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.box, styles.writingsStack)}>{children}</div>
}

export async function WritingsArticleLayout({
  title,
  description,
  backHref = "/",
  meta,
  children,
}: {
  title: string
  description?: string
  backHref?: string
  meta?: ReactNode
  children: ReactNode
}) {
  "use cache"
  cacheLife("max")

  const titleId = slugify(title)

  return (
    <main
      data-slot="writings-doc"
      {...stylex.props(styles.box, styles.articleMain)}
    >
      <div
        {...stylex.props(styles.box, styles.articleInner)}
        data-writings-article
      >
        <Link
          href={backHref}
          {...stylex.props(stylex.defaultMarker(), styles.backLink)}
        >
          <ArrowLeft {...stylex.props(styles.backIcon)} />
          <span>Back</span>
        </Link>
        <h1 id={titleId} {...stylex.props(styles.articleTitle)}>
          {title}
        </h1>
        {description ? (
          <p
            {...stylex.props(
              styles.articleDesc,
              meta ? styles.articleDescWithMeta : styles.articleDescSolo,
            )}
          >
            {description}
          </p>
        ) : null}
        {meta ? (
          <div
            {...stylex.props(
              meta && description
                ? styles.articleMetaWithDesc
                : styles.articleMetaSolo,
            )}
          >
            {meta}
          </div>
        ) : null}
        <TableOfContents />
        <div {...stylex.props(styles.articleBody)}>{children}</div>
      </div>
      <div aria-hidden {...stylex.props(styles.fadeOverlayTop)} />
      <div aria-hidden {...stylex.props(styles.fadeOverlayBottom)} />
    </main>
  )
}
