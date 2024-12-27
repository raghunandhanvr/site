'use server'

import { getBlogPosts } from '@/lib/posts'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function fetchBlogPosts(query?: string, tags?: string[]) {
  const posts = await getBlogPosts()
  
  const postsWithViews = await Promise.all(
    posts.map(async (post) => {
      const views = await redis.get<number>(`pageviews:${post.slug}`) || 0
      return { ...post, views }
    })
  )

  return postsWithViews.filter(post => {
    const matchesQuery = query && query.length >= 3
      ? post.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesTags = tags && tags.length
      ? tags.some(tag => post.metadata.tags.toLowerCase().includes(tag.toLowerCase()))
      : true;

    return matchesQuery && matchesTags;
  });
}

export async function trackView(slug: string) {
  const views = await redis.incr(`pageviews:${slug}`)
  return views
}

export async function getViews(slug: string) {
  const views = await redis.get<number>(`pageviews:${slug}`) || 0
  return views
}