import { NextResponse } from "next/server"

import { getViewCount, incrementViewCount } from "@/app/lib/redis"

function isValidSlug(slug: string | null): slug is string {
  if (!slug) return false
  if (slug.length > 200) return false
  return /^\/[a-zA-Z0-9/_-]+$/.test(slug)
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug")
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 })
  }
  const views = await getViewCount(slug)
  return NextResponse.json(
    { views },
    { headers: { "cache-control": "no-store" } },
  )
}

export async function POST(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug")
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 })
  }
  const views = await incrementViewCount(slug)
  return NextResponse.json(
    { views },
    { headers: { "cache-control": "no-store" } },
  )
}
