'use server'

import { getBlogPosts } from '@/lib/posts'
import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

export async function fetchBlogPosts() {
  const posts = await getBlogPosts()
  
  const postsWithViews = await Promise.all(
    posts.map(async (post) => {
      const views = await redis.get<number>(`pageviews:${post.slug}`) || 0
      return { ...post, views }
    })
  )

  return postsWithViews
}

export async function trackView(slug: string) {
  const views = await redis.incr(`pageviews:${slug}`)
  return views
}

export async function getViews(slug: string) {
  const views = await redis.get<number>(`pageviews:${slug}`) || 0
  return views
}

