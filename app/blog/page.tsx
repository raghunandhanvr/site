import BlogPosts from '@/components/blog/blog-posts'
import { fetchBlogPosts } from '@/app/actions/blog'

export const metadata = {
  title: "Blog",
  description: "My Blog",
}

export default async function Page() {
  const initialPosts = await fetchBlogPosts()
  const allTags = Array.from(
    new Set(
      initialPosts.flatMap((post) =>
        post.metadata.tags.split(",").map((tag) => tag.trim())
      )
    )
  ).sort();
  
  return <BlogPosts initialPosts={initialPosts} allTags={allTags} />
}