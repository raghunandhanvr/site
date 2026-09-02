import type { StyleXStyles } from "@stylexjs/stylex"
import * as stylex from "@stylexjs/stylex"

import { fetchOGMetadata, type OGMetadata } from "@/app/lib/og-metadata"
import { LinkPreviewClient } from "@/app/components/link-preview.client"

type LinkPreviewServerProps = {
  href: string
  children: React.ReactNode
  style?: StyleXStyles
}

export async function LinkPreviewServer({
  href,
  children,
  style,
}: LinkPreviewServerProps) {
  const isExternal = /^https?:\/\//i.test(href)

  if (!isExternal) {
    return (
      <a href={href} {...stylex.props(style)}>
        {children}
      </a>
    )
  }

  const metadata = await fetchOGMetadata(href)

  return (
    <LinkPreviewClient href={href} style={style} metadata={metadata}>
      {children}
    </LinkPreviewClient>
  )
}

export type { OGMetadata }
