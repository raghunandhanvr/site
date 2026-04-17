import type { ReactNode } from "react"
import Link from "next/link"
import { cacheLife } from "next/cache"
import { ArrowLeft } from "lucide-react"

import { Fade } from "@/app/components/fade"
import { TableOfContents } from "@/app/components/toc"
import { slugify } from "@/app/lib/heading-slug"
import { cn } from "@/app/lib/utils"

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
      className="relative w-full min-w-0 flex-1 text-[1.05rem] sm:text-[15px] [-webkit-tap-highlight-color:transparent]"
    >
      <div
        className="relative mx-auto flex w-full max-w-4xl flex-col gap-2 px-6 pb-40 pt-32 sm:px-10 lg:px-12"
        data-writings-article
      >
        <Link
          href={backHref}
          className="writings-back-link group mb-4 inline-flex w-fit items-center gap-2 text-[var(--color-text-soft)] no-underline transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>
        <h1
          id={titleId}
          className="scroll-m-20 font-serif text-6xl font-medium tracking-tight text-[var(--color-text)] sm:text-7xl xl:text-8xl"
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-4 text-balance text-lg leading-relaxed text-[var(--color-text-soft)]",
              meta ? "mb-1.5" : "mb-6",
            )}
          >
            {description}
          </p>
        ) : null}
        {meta ? (
          <div className={cn(description ? "mb-6" : "mt-4 mb-6")}>{meta}</div>
        ) : null}
        <TableOfContents />
        <div className="min-w-0">{children}</div>
      </div>
      <Fade
        side="top"
        background="var(--color-page)"
        blur="4px"
        stop="50%"
        className="pointer-events-none !fixed inset-x-0 top-0 z-10 h-32"
      />
      <Fade
        side="bottom"
        background="var(--color-page)"
        blur="4px"
        stop="25%"
        className="pointer-events-none !fixed inset-x-0 bottom-0 z-10 h-1/6 min-h-[6rem]"
      />
    </main>
  )
}
