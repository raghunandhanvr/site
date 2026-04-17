import React, { ComponentPropsWithoutRef, Suspense } from "react"
import Link from "next/link"
import { highlight } from "sugar-high"
import { LinkPreviewServer } from "@/app/components/link-preview"
import { mdxHeadingSlug } from "@/app/lib/heading-slug"
import { cn } from "@/app/lib/utils"

const linkClassName = cn(
  "font-medium underline underline-offset-4 decoration-[color-mix(in_srgb,var(--color-text-soft)_55%,transparent)]",
  "text-[var(--color-text)] transition-colors hover:opacity-90",
)

type HeadingProps = ComponentPropsWithoutRef<"h1">
type ParagraphProps = ComponentPropsWithoutRef<"p">
type ListProps = ComponentPropsWithoutRef<"ul">
type ListItemProps = ComponentPropsWithoutRef<"li">
type AnchorProps = ComponentPropsWithoutRef<"a">
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">

const components = {
  h1: (props: HeadingProps) => {
    const id = props.id || mdxHeadingSlug(props.children)
    return (
      <h1
        id={id}
        className="mt-2 scroll-m-28 font-sans text-3xl font-medium tracking-tight text-[var(--color-text)]"
        {...props}
      />
    )
  },
  h2: (props: HeadingProps) => {
    const id = props.id || mdxHeadingSlug(props.children)
    return (
      <h2
        id={id}
        className="mt-16 scroll-m-28 font-sans text-xl font-medium tracking-tight text-[var(--color-text)] first:mt-0 lg:mt-8 [&+p]:!mt-4"
        {...props}
      />
    )
  },
  h3: (props: HeadingProps) => {
    const id = props.id || mdxHeadingSlug(props.children)
    return (
      <h3
        id={id}
        className="mt-12 scroll-m-28 font-sans text-lg font-medium tracking-tight text-[var(--color-text)]"
        {...props}
      />
    )
  },
  h4: (props: HeadingProps) => {
    const id = props.id || mdxHeadingSlug(props.children)
    return (
      <h4
        id={id}
        className="mt-8 scroll-m-28 font-sans text-base font-medium tracking-tight text-[var(--color-text)]"
        {...props}
      />
    )
  },
  p: (props: ParagraphProps) => (
    <p
      className="text-lg leading-relaxed text-[var(--color-text)] [&:not(:first-child)]:mt-2"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="mb-2 ml-6 mt-0 list-decimal text-lg text-[var(--color-text)]"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="mb-2 ml-6 mt-0 list-disc text-lg text-[var(--color-text)]"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li className="mt-2 pl-2 text-lg text-[var(--color-text)]" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={linkClassName} {...props}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={linkClassName} {...props}>
          {children}
        </a>
      )
    }
    if (href?.startsWith("http")) {
      return (
        <Suspense
          fallback={
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
              {...props}
            >
              {children}
            </a>
          }
        >
          <LinkPreviewServer href={href} className={linkClassName}>
            {children}
          </LinkPreviewServer>
        </Suspense>
      )
    }
    return (
      <a href={href} className={linkClassName} {...props}>
        {children}
      </a>
    )
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string)
    return (
      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className="text-[0.9em] [pre_&]:text-[0.8rem]"
        {...props}
      />
    )
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="relative w-full overflow-hidden border-none text-sm text-[var(--color-text)]">
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index} className="m-0 border-b border-[var(--color-border)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="mt-6 border-l-2 border-[var(--color-border-strong)] pl-6 text-lg italic text-[var(--color-text-muted)]"
      {...props}
    />
  ),
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
