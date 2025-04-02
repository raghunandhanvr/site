import { getViewCount, incrementViewCount } from '@/app/lib/redis'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug
    const views = await getViewCount(slug)
    await incrementViewCount(slug)
    
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error handling view count:', error)
    return NextResponse.json({ error: 'Failed to update view count' }, { status: 500 })
  }
} 