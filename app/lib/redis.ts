'use server'

import { Redis } from '@upstash/redis'

let redisClient: Redis | null | undefined

function getRedis(): Redis | null {
  if (redisClient !== undefined) {
    return redisClient
  }
  const url = process.env.REDIS_KV_REST_API_URL?.trim()
  const token = process.env.REDIS_KV_REST_API_TOKEN?.trim()
  if (!url || !token) {
    redisClient = null
    return null
  }
  redisClient = new Redis({ url, token })
  return redisClient
}

export async function incrementViewCount(slug: string): Promise<number> {
  const redis = getRedis()
  if (!redis) return 0
  return redis.incr(`pageviews:${slug}`)
}

export async function getViewCount(slug: string): Promise<number> {
  const redis = getRedis()
  if (!redis) return 0
  const views = await redis.get<number>(`pageviews:${slug}`)
  return views ?? 0
}
