import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPosts } from "@/lib/posts"
import { metaData } from "app/config"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { serializeMDX } from "@/lib/mdx-server"

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const posts = await getBlogPosts()
  const post = posts.find((post) => post.slug === params.slug)
  
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata

  const ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function BlogPost({ params }) {
  const posts = await getBlogPosts()
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.metadata.publishedAt).toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const mdxSource = await serializeMDX(post.content)

  return (
    <BlogPostContent 
      post={{
        ...post,
        content: mdxSource,
      }}
      formattedDate={formattedDate}
      baseUrl={metaData.baseUrl}
      authorName={metaData.name}
    />
  )
}