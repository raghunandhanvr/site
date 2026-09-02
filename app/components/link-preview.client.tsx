"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { ExternalLink } from "lucide-react"
import * as stylex from "@stylexjs/stylex"
import type { StyleXStyles } from "@stylexjs/stylex"

import type { OGMetadata } from "@/app/lib/og-metadata"
import { styles } from "@/app/styles/ui"

type LinkPreviewClientProps = {
  href: string
  children: React.ReactNode
  style?: StyleXStyles
  metadata?: OGMetadata | null
}

export function LinkPreviewClient({
  href,
  children,
  style,
  metadata,
}: LinkPreviewClientProps) {
  const [imageError, setImageError] = React.useState(false)
  const [faviconError, setFaviconError] = React.useState(false)

  const isExternal = href.startsWith("http")

  if (!metadata) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...stylex.props(styles.previewLink, style)}
      >
        {children}
      </a>
    )
  }

  const domain = (() => {
    try {
      return new URL(href).hostname.replace("www.", "")
    } catch {
      return href
    }
  })()

  return (
    <HoverCardPrimitive.Root openDelay={200} closeDelay={100}>
      <HoverCardPrimitive.Trigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.previewLink, style)}
        >
          {children}
        </a>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side="top"
          sideOffset={8}
          {...stylex.props(styles.box, styles.previewCard)}
        >
          {metadata.image && !imageError ? (
            <div {...stylex.props(styles.box, styles.previewImageWrap)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={metadata.image}
                alt={metadata.title || "Link preview"}
                {...stylex.props(styles.previewImage)}
                onError={() => setImageError(true)}
              />
            </div>
          ) : null}

          <div {...stylex.props(styles.box, styles.previewBody)}>
            <div {...stylex.props(styles.previewMeta)}>
              {metadata.favicon && !faviconError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={metadata.favicon}
                  alt=""
                  width={14}
                  height={14}
                  {...stylex.props(styles.previewFavicon)}
                  onError={() => setFaviconError(true)}
                />
              ) : null}
              <span {...stylex.props(styles.previewDomain)}>
                {metadata.siteName || domain}
              </span>
              <ExternalLink {...stylex.props(styles.previewExt)} />
            </div>

            {metadata.title ? (
              <h4 {...stylex.props(styles.previewTitle)}>{metadata.title}</h4>
            ) : null}

            {metadata.description ? (
              <p {...stylex.props(styles.previewDesc)}>{metadata.description}</p>
            ) : null}
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}
