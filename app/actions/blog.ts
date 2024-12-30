'use server'

import { Redis } from '@upstash/redis'
import { cache } from 'react'

const redis = Redis.fromEnv()

export async function trackView(slug: string) {
  const views = await redis.incr(`pageviews:${slug}`)
  return views
}

export const getViews = cache(async (slug: string) => {
  const views = await redis.get<number>(`pageviews:${slug}`) || 0
  return views
})

export const getAllViews = cache(async () => {
  const keys = await redis.keys('pageviews:*')
  const views = await Promise.all(
    keys.map(async (key) => {
      const count = await redis.get<number>(key)
      return { slug: key.replace('pageviews:', ''), views: count || 0 }
    })
  )
  return Object.fromEntries(views.map(({ slug, views }) => [slug, views]))
})

