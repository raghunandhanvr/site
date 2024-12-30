import { Suspense } from 'react';
import { Loader } from 'lucide-react';
import BlogSearch from '@/components/blog/blog-search';
import { getBlogPosts } from '@/lib/posts';

export const metadata = {
  title: "Blog",
  description: "My Blog",
};


export const revalidate = 3600;

export default async function Page() {
  const posts = await getBlogPosts();

  const allTags = Array.from(
    new Set(
      posts.flatMap((post) =>
        post.metadata.tags.split(",").map((tag) => tag.trim())
      )
    )
  ).sort();

  return (
    <section>
      <h1 className="mb-8 text-xl font-medium tracking-tight mt-5">
        Thoughts, Opinions, Ideas
      </h1>
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center space-y-4 h-32">
          <Loader className="w-6 h-6 animate-spin" />
          <p>Loading posts...</p>
        </div>
      }>
        <BlogSearch initialPosts={posts} allTags={allTags} />
      </Suspense>
    </section>
  );
}

