import BlogPosts from './blog-posts'
import { fetchBlogPosts } from '../actions/blog'

export const metadata = {
  title: "Blog",
  description: "My Blog",
}

export default async function Page() {
  const initialPosts = await fetchBlogPosts()
  
  return <BlogPosts initialPosts={initialPosts} />
}

