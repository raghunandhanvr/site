import { fetchOGMetadata } from "@/app/lib/og-metadata"
import { LinkPreview } from "@/app/components/link-preview/link-preview"

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
    <LinkPreview href={href} className={className} metadata={metadata}>
      {children}
    </LinkPreview>
  )
}
