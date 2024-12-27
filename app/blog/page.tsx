import { Suspense } from 'react';
import BlogSearch from '@/components/blog/blog-search';
import { fetchBlogPosts } from '@/app/actions/blog';

export const metadata = {
  title: "Blog",
  description: "My Blog",
};

export default async function Page() {
  const initialPosts = await fetchBlogPosts();
  const allTags = Array.from(
    new Set(
      initialPosts.flatMap((post) =>
        post.metadata.tags.split(",").map((tag) => tag.trim())
      )
    )
  ).sort();

  return (
    <section>
      <h1 className="mb-8 text-xl font-medium tracking-tight">
        Thoughts, Opinions, Ideas
      </h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogSearch initialPosts={initialPosts} allTags={allTags} />
      </Suspense>
    </section>
  );
}