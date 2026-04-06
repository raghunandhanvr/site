import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { Link } from "next-view-transitions"

import { Fade } from "@/app/components/ui/blur-fade/blur-fade"
import { WritingsTableOfContents } from "@/app/components/writings/writings-table-of-contents"
import { slugify } from "@/app/lib/heading-slug"
import { cn } from "@/app/lib/utils"

export function WritingsArticleLayout({
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
  const titleId = slugify(title)

  return (
    <div
      data-slot="writings-doc"
      className="relative w-full min-w-0 text-[1.05rem] sm:text-[15px]"
    >
      {/* Top fade is h-32 — pt-32 clears it so Back/title aren’t dimmed. */}
      <div
        className="relative mx-auto flex w-full max-w-4xl flex-col gap-2 px-3 pb-40 pt-32 lg:px-12"
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
        <WritingsTableOfContents />
        <div className="min-w-0">{children}</div>
      </div>
      {/* Fades after content in DOM so they sit above scrolling prose (same idea as her docs shell). */}
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
    </div>
  )
}
