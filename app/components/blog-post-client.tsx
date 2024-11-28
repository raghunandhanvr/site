'use client';

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "app/lib/date-utils";
import { BlogSearch } from "../components/blog-search";

interface BlogPostsClientProps {
  initialPosts: Awaited<ReturnType<typeof import("../actions/blog").fetchBlogPosts>>;
  allTags: string[];
}

export function BlogPostsClient({ initialPosts, allTags }: BlogPostsClientProps) {
  const [filteredBlogs, setFilteredBlogs] = useState(initialPosts);

  const searchPosts = (query: string, tags: string[]) => {
    const filtered = initialPosts.filter((post) => {
      const matchesQuery = query
        ? post.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesTags = tags.length
        ? post.metadata.tags
            .toLowerCase()
            .split(",")
            .map((t) => t.trim())
            .some((postTag) => tags.includes(postTag))
        : true;

      return matchesQuery && matchesTags;
    });

    setFilteredBlogs(filtered);
  };

  return (
    <>
      <BlogSearch allTags={allTags} onSearch={searchPosts} />
      <div className="space-y-4">
        {filteredBlogs
          .sort((a, b) => {
            return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="block transition-opacity duration-200 hover:opacity-80"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <span className="text-black dark:text-white font-medium tracking-tight mb-1 sm:mb-0">
                    {post.metadata.title}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400 tabular-nums text-xs sm:text-sm">
                    {formatDate(post.metadata.publishedAt, false)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.metadata.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-neutral-600 dark:text-neutral-400"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-8 text-sm text-neutral-600 dark:text-neutral-400">
            404: Thoughts not found
            <div className="mt-2 text-xs">
              Got ideas for the blog? Drop a line at hi@raghu.app
            </div>
          </div>
        )}
      </div>
    </>
  );
}
