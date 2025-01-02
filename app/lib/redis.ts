import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_KV_REST_API_URL!,
  token: process.env.REDIS_KV_REST_API_TOKEN!,
})

export async function incrementViewCount(slug: string): Promise<number> {
  const views = await redis.incr(`pageviews:${slug}`)
  return views
}

export async function getViewCount(slug: string): Promise<number> {
  const views = await redis.get<number>(`pageviews:${slug}`)
  return views ?? 0
}

