'use server'

import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function trackView(slug: string) {
  const views = await redis.incr(`pageviews:${slug}`)
  return views
}

export async function getViews(slug: string) {
  const views = await redis.get<number>(`pageviews:${slug}`) || 0
  return views
}

