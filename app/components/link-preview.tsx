import { fetchOGMetadata, type OGMetadata } from "@/app/lib/og-metadata"
import { LinkPreviewClient } from "@/app/components/link-preview.client"

type LinkPreviewServerProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export async function LinkPreviewServer({
  href,
  children,
  className,
}: LinkPreviewServerProps) {
  const isExternal = /^https?:\/\//i.test(href)

  if (!isExternal) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  const metadata = await fetchOGMetadata(href)

  return (
    <LinkPreviewClient href={href} className={className} metadata={metadata}>
      {children}
    </LinkPreviewClient>
  )
}

export type { OGMetadata }
