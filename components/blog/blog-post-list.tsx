'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/date-utils";
import { useSearchStore } from "@/lib/search-store";
import { getViews } from "@/app/actions/track-blog-views";

interface BlogPostListProps {
  initialPosts: Awaited<ReturnType<typeof import("@/app/actions/blog").fetchBlogPosts>>;
}

export function BlogPostList({ initialPosts }: BlogPostListProps) {
  const [filteredBlogs, setFilteredBlogs] = useState(initialPosts);
  const { query, selectedTags } = useSearchStore();

  useEffect(() => {
    const filtered = initialPosts.filter((post) => {
      const matchesQuery = query
        ? post.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesTags = selectedTags.length
        ? post.metadata.tags
            .toLowerCase()
            .split(",")
            .map((t) => t.trim())
            .some((postTag) => selectedTags.includes(postTag))
        : true;

      return matchesQuery && matchesTags;
    });

    setFilteredBlogs(filtered);
  }, [query, selectedTags, initialPosts]);

  const updateViewCounts = async () => {
    const updatedPosts = await Promise.all(
      filteredBlogs.map(async (post) => {
        const views = await getViews(post.slug);
        return { ...post, views };
      })
    );
    setFilteredBlogs(updatedPosts);
  };

  useEffect(() => {
    const interval = setInterval(updateViewCounts, 5000);
    return () => clearInterval(interval);
  }, [filteredBlogs]);

  useEffect(() => {
    updateViewCounts();
  }, []);

  return (
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
              <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 sm:mb-0">
                <span className="text-black dark:text-white font-medium tracking-tight mb-1 sm:mb-0">
                  {post.metadata.title}
                </span>
                <div className="flex items-center text-neutral-600 dark:text-neutral-400 tabular-nums text-xs sm:text-sm">
                  <span>{formatDate(post.metadata.publishedAt, false)}</span>
                  <span className="mx-1 sm:hidden">•</span>
                  <span className="sm:hidden">{post.views} view{post.views === 1 ? '' : 's'}</span>
                </div>
              </div>
              <div className="w-full sm:flex sm:justify-between sm:items-center mt-2">
                <div className="flex flex-wrap gap-2">
                  {post.metadata.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-neutral-600 dark:text-neutral-400"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
                <div className="hidden sm:block text-neutral-600 dark:text-neutral-400 tabular-nums text-xs sm:text-sm">
                  {post.views} view{post.views === 1 ? '' : 's'}
                </div>
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
  );
}

