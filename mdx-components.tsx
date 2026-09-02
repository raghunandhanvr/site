import React, { ComponentPropsWithoutRef, Suspense } from "react"
import Link from "next/link"
import { highlight } from "sugar-high"
import * as stylex from "@stylexjs/stylex"

import { LinkPreviewServer } from "@/app/components/link-preview"
import { mdxHeadingSlug } from "@/app/lib/heading-slug"
import { styles } from "@/app/styles/ui"

type HeadingProps = ComponentPropsWithoutRef<"h1">
type ParagraphProps = ComponentPropsWithoutRef<"p">
type ListProps = ComponentPropsWithoutRef<"ul">
type ListItemProps = ComponentPropsWithoutRef<"li">
type AnchorProps = ComponentPropsWithoutRef<"a">
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">

const components = {
  h1: (props: HeadingProps) => {
    const id = props.id || mdxHeadingSlug(props.children)
    return <h1 {...props} {...stylex.props(styles.mdxH1)} id={id} />
  },
  h2: (props: HeadingProps) => {
    const id = props.id || mdxHeadingSlug(props.children)
    return <h2 {...props} {...stylex.props(styles.mdxH2)} id={id} />
  },
  h3: (props: HeadingProps) => {
    const id = props.id || mdxHeadingSlug(props.children)
    return <h3 {...props} {...stylex.props(styles.mdxH3)} id={id} />
  },
  h4: (props: HeadingProps) => {
    const id = props.id || mdxHeadingSlug(props.children)
    return <h4 {...props} {...stylex.props(styles.mdxH4)} id={id} />
  },
  p: (props: ParagraphProps) => (
    <p {...props} {...stylex.props(styles.mdxP)} />
  ),
  ol: (props: ListProps) => <ol {...props} {...stylex.props(styles.mdxOl)} />,
  ul: (props: ListProps) => <ul {...props} {...stylex.props(styles.mdxUl)} />,
  li: (props: ListItemProps) => (
    <li {...props} {...stylex.props(styles.mdxLi)} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em {...props} {...stylex.props(styles.mdxEm)} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} {...stylex.props(styles.mdxStrong)} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props} {...stylex.props(styles.mdxLink)}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} {...props} {...stylex.props(styles.mdxLink)}>
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
              {...props}
              {...stylex.props(styles.mdxLink)}
            >
              {children}
            </a>
          }
        >
          <LinkPreviewServer href={href} style={styles.mdxLink}>
            {children}
          </LinkPreviewServer>
        </Suspense>
      )
    }
    return (
      <a href={href} {...props} {...stylex.props(styles.mdxLink)}>
        {children}
      </a>
    )
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      {...stylex.props(stylex.defaultMarker(), styles.box, styles.mdxPre)}
    />
  ),
  code: ({
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string)
    const isBlock =
      Boolean(className) ||
      (typeof children === "string" && children.includes("\n"))
    const sx = stylex.props(isBlock ? styles.mdxCodeInPre : styles.mdxCode)
    return (
      <code
        {...props}
        className={[sx.className, className].filter(Boolean).join(" ")}
        style={sx.style}
        dangerouslySetInnerHTML={{ __html: codeHTML }}
      />
    )
  },
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} {...stylex.props(styles.mdxHr)} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div {...stylex.props(styles.box, styles.mdxTableWrap)}>
      <table {...props} {...stylex.props(styles.mdxTable)} />
    </div>
  ),
  th: ({
    children,
    ...props
  }: ComponentPropsWithoutRef<"th"> & { index?: number }) => (
    <th {...props} {...stylex.props(styles.mdxTh)} >
      {children}
    </th>
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td {...props} {...stylex.props(styles.mdxTd)} />
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div {...stylex.props(styles.box, styles.mdxTableWrap)}>
      <table {...stylex.props(styles.mdxTable)}>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                {...stylex.props(
                  styles.mdxTh,
                  index > 0 && styles.mdxCellEnd,
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  {...stylex.props(
                    styles.mdxTd,
                    index === data.rows.length - 1 && styles.mdxTdLast,
                    cellIndex > 0 && styles.mdxCellEnd,
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote {...props} {...stylex.props(styles.mdxQuote)} />
  ),
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
