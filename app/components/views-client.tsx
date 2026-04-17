"use client"

import { useEffect, useState } from "react"

export function ViewsClient({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const url = `/api/views?slug=${encodeURIComponent(slug)}`

    fetch(url, { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { views?: number } | null) => {
        if (!cancelled && typeof data?.views === "number") {
          setViews(data.views)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [slug])

  return <span>{views === null ? "—" : views.toLocaleString()} views</span>
}
