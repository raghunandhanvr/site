import { Suspense } from 'react';
import { Loader } from 'lucide-react';
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
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center space-y-4 h-32">
          <Loader className="w-6 h-6 animate-spin" />
          <p>Loading posts...</p>
        </div>
      }>
        <BlogSearch initialPosts={initialPosts} allTags={allTags} />
      </Suspense>
    </section>
  );
}