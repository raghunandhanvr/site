'use server'

import { getBlogPosts } from '../lib/posts'

export async function fetchBlogPosts() {
  return getBlogPosts()
}
