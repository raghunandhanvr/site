import { BlogPostsClient } from "@/app/components/blog-post-client";

interface BlogPostsProps {
  initialPosts: Awaited<ReturnType<typeof import("../actions/blog").fetchBlogPosts>>;
}

export default function BlogPosts({ initialPosts }: BlogPostsProps) {
  const allTags = Array.from(
    new Set(
      initialPosts.flatMap((post) =>
        post.metadata.tags.split(",").map((tag) => tag.trim())
      )
    )
  ).sort();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Thoughts, Opinions, Ideas
      </h1>
      <BlogPostsClient initialPosts={initialPosts} allTags={allTags} />
    </section>
  );
}
