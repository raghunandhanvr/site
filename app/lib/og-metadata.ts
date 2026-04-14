import { unstable_cache } from "next/cache"

export type OGMetadata = {
  title?: string
  description?: string
  image?: string
  siteName?: string
  favicon?: string
  url: string
}

function isTweetUrl(url: string): boolean {
  return /^https?:\/\/(twitter\.com|x\.com)\/\w+\/status\/\d+/.test(url)
}

function getTweetProxyUrl(url: string): string {
  return url
    .replace("twitter.com", "fxtwitter.com")
    .replace("x.com", "fxtwitter.com")
}

async function fetchOGMetadataInternal(
  url: string,
): Promise<OGMetadata | null> {
  try {
    const fetchUrl = isTweetUrl(url) ? getTweetProxyUrl(url) : url

    const response = await fetch(fetchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)",
      },
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      return null
    }

    const reader = response.body?.getReader()
    if (!reader) {
      return null
    }

    const decoder = new TextDecoder()
    let html = ""
    const maxBytes = 100_000

    while (html.length < maxBytes) {
      const { done, value } = await reader.read()
      if (done) break
      html += decoder.decode(value, { stream: true })
      if (html.includes("</head>")) break
    }
    reader.cancel()

    const getMetaContent = (property: string): string | undefined => {
      const regex = new RegExp(
        `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']|<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
        "i",
      )
      const match = html.match(regex)
      return match?.[1] || match?.[2]
    }

    const getTitle = (): string | undefined => {
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
      return getMetaContent("og:title") || titleMatch?.[1]
    }

    const getFavicon = (): string | undefined => {
      const urlObj = new URL(url)
      const origin = urlObj.origin

      const appleTouchMatch =
        html.match(
          /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']*)["']/i,
        ) ||
        html.match(
          /<link[^>]*href=["']([^"']*)["'][^>]*rel=["']apple-touch-icon["']/i,
        )

      if (appleTouchMatch?.[1]) {
        const iconUrl = appleTouchMatch[1]
        if (iconUrl.startsWith("http")) {
          return iconUrl
        }
      }

      const iconMatch =
        html.match(
          /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']*)["']/i,
        ) ||
        html.match(
          /<link[^>]*href=["']([^"']*)["'][^>]*rel=["'](?:shortcut )?icon["']/i,
        )

      if (iconMatch?.[1]) {
        const iconUrl = iconMatch[1]
        if (iconUrl.startsWith("http")) {
          return iconUrl
        }
        if (iconUrl.startsWith("//")) {
          return `https:${iconUrl}`
        }
        if (iconUrl.startsWith("/")) {
          return `${origin}${iconUrl}`
        }
        return `${origin}/${iconUrl}`
      }

      return `${origin}/favicon.ico`
    }

    const image = getMetaContent("og:image") || getMetaContent("twitter:image")

    return {
      title: getTitle(),
      description:
        getMetaContent("og:description") || getMetaContent("description"),
      image: image?.startsWith("http")
        ? image
        : image
          ? new URL(image, url).href
          : undefined,
      siteName: getMetaContent("og:site_name"),
      favicon: getFavicon(),
      url,
    }
  } catch (error) {
    console.error("Failed to fetch OG metadata:", error)
    return null
  }
}

const getCachedOG = unstable_cache(
  async (url: string) => fetchOGMetadataInternal(url),
  ["og-metadata"],
  { revalidate: 86400 },
)

export async function fetchOGMetadata(
  url: string,
): Promise<OGMetadata | null> {
  return getCachedOG(url)
}
