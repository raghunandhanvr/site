"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { ExternalLink } from "lucide-react"

import { cn } from "@/app/lib/utils"
import type { OGMetadata } from "@/app/lib/og-metadata"

const linkClass = cn(
  "font-medium underline underline-offset-4",
  "decoration-[color-mix(in_srgb,var(--color-text-soft)_55%,transparent)]",
)

type LinkPreviewClientProps = {
  href: string
  children: React.ReactNode
  className?: string
  metadata?: OGMetadata | null
}

export function LinkPreviewClient({
  href,
  children,
  className,
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
        className={cn(linkClass, className)}
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
          className={cn(linkClass, className)}
        >
          {children}
        </a>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side="top"
          sideOffset={8}
          className="z-50 w-[320px] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-0 text-[var(--color-text)] shadow-lg outline-none"
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
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}
