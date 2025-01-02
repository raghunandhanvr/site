import { NextRequest, NextResponse } from 'next/server'
import { incrementViewCount } from '@/app/lib/redis'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  await incrementViewCount(slug)
  return NextResponse.json({ success: true })
}

