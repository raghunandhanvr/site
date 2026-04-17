import { cacheLife } from "next/cache"

export type OGMetadata = {
  title?: string
  description?: string
  image?: string
  siteName?: string
  favicon?: string
  url: string
}

const META_RE_CACHE = new Map<string, RegExp>()
function metaRegex(property: string): RegExp {
  let re = META_RE_CACHE.get(property)
  if (!re) {
    re = new RegExp(
      `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']|<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
      "i",
    )
    META_RE_CACHE.set(property, re)
  }
  return re
}

const TITLE_RE = /<title[^>]*>([^<]*)<\/title>/i
const APPLE_TOUCH_RE_A =
  /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']*)["']/i
const APPLE_TOUCH_RE_B =
  /<link[^>]*href=["']([^"']*)["'][^>]*rel=["']apple-touch-icon["']/i
const ICON_RE_A =
  /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']*)["']/i
const ICON_RE_B =
  /<link[^>]*href=["']([^"']*)["'][^>]*rel=["'](?:shortcut )?icon["']/i

function isTweetUrl(url: string): boolean {
  return /^https?:\/\/(twitter\.com|x\.com)\/\w+\/status\/\d+/.test(url)
}

function tweetProxy(url: string): string {
  return url
    .replace("twitter.com", "fxtwitter.com")
    .replace("x.com", "fxtwitter.com")
}

export async function fetchOGMetadata(
  url: string,
): Promise<OGMetadata | null> {
  "use cache"
  cacheLife("max")

  try {
    const fetchUrl = isTweetUrl(url) ? tweetProxy(url) : url

    const response = await fetch(fetchUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)" },
    })

    if (!response.ok) return null

    const reader = response.body?.getReader()
    if (!reader) return null

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

    const meta = (property: string): string | undefined => {
      const m = html.match(metaRegex(property))
      return m?.[1] || m?.[2]
    }

    const title = meta("og:title") || html.match(TITLE_RE)?.[1]

    const origin = new URL(url).origin
    const favicon = (() => {
      const apple =
        html.match(APPLE_TOUCH_RE_A)?.[1] || html.match(APPLE_TOUCH_RE_B)?.[1]
      if (apple?.startsWith("http")) return apple

      const icon = html.match(ICON_RE_A)?.[1] || html.match(ICON_RE_B)?.[1]
      if (icon) {
        if (icon.startsWith("http")) return icon
        if (icon.startsWith("//")) return `https:${icon}`
        if (icon.startsWith("/")) return `${origin}${icon}`
        return `${origin}/${icon}`
      }
      return `${origin}/favicon.ico`
    })()

    const image = meta("og:image") || meta("twitter:image")

    return {
      title,
      description: meta("og:description") || meta("description"),
      image: image?.startsWith("http")
        ? image
        : image
          ? new URL(image, url).href
          : undefined,
      siteName: meta("og:site_name"),
      favicon,
      url,
    }
  } catch (error) {
    console.error("Failed to fetch OG metadata:", error)
    return null
  }
}
