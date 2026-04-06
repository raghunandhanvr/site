"use client"

import * as React from "react"
import { ExternalLink } from "lucide-react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card"
import { cn } from "@/app/lib/utils"
import type { OGMetadata } from "@/app/lib/og-metadata"

type LinkPreviewProps = {
  href: string
  children: React.ReactNode
  className?: string
  metadata?: OGMetadata | null
}

export function LinkPreview({
  href,
  children,
  className,
  metadata,
}: LinkPreviewProps) {
  const [imageError, setImageError] = React.useState(false)
  const [faviconError, setFaviconError] = React.useState(false)

  if (!metadata) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={cn(
          "font-medium underline underline-offset-4 decoration-[color-mix(in_srgb,var(--color-text-soft)_55%,transparent)]",
          className,
        )}
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
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "font-medium underline underline-offset-4 decoration-[color-mix(in_srgb,var(--color-text-soft)_55%,transparent)]",
            className,
          )}
        >
          {children}
        </a>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-[320px] overflow-hidden p-0"
        side="top"
        sideOffset={8}
      >
        {metadata.image && !imageError && (
          <div className="relative h-40 w-full overflow-hidden bg-[var(--color-surface-muted)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={metadata.image}
              alt={metadata.title || "Link preview"}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        )}

        <div className="space-y-1.5 p-3">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-soft)]">
            {metadata.favicon && !faviconError && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={metadata.favicon}
                alt=""
                width={14}
                height={14}
                className="rounded-sm"
                onError={() => setFaviconError(true)}
              />
            )}
            <span className="truncate">{metadata.siteName || domain}</span>
            <ExternalLink className="ml-auto size-3 shrink-0 opacity-50" />
          </div>

          {metadata.title && (
            <h4 className="line-clamp-2 text-sm font-medium leading-snug text-[var(--color-text)]">
              {metadata.title}
            </h4>
          )}

          {metadata.description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
              {metadata.description}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
