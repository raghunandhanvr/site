import { BlogPostList } from "@/components/blog/blog-post-list";
import { BlogSearch } from "@/components/blog/blog-search";

interface BlogPostsProps {
  initialPosts: Awaited<ReturnType<typeof import("@/app/actions/blog").fetchBlogPosts>>;
  allTags: string[];
}

export default function BlogPosts({ initialPosts, allTags }: BlogPostsProps) {
  return (
    <section>
      <h1 className="mb-8 text-xl font-medium tracking-tight">
        Thoughts, Opinions, Ideas
      </h1>
      <BlogSearch allTags={allTags} />
      <BlogPostList initialPosts={initialPosts} />
    </section>
  );
}