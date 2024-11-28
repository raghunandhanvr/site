import * as React from 'react';
import { MDXContent } from './mdx';

interface BlogPostContentProps {
  post: {
    metadata: {
      title: string;
      publishedAt: string;
      tags: string;
      summary?: string;
      image?: string;
    };
    content: any;
    slug: string;
  };
  formattedDate: string;
  baseUrl: string;
  authorName: string;
}

export function BlogPostContent({
  post,
  formattedDate,
  baseUrl,
  authorName,
}: BlogPostContentProps) {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: authorName,
            },
          }),
        }}
      />
      <h1 className="title mb-3 font-medium text-2xl tracking-tight">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 text-medium">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formattedDate}
        </p>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-8 mt-2">
        {post.metadata.tags.split(',').map((tag, index) => (
          <span key={index} className="mr-2">
            #{tag.trim()}
          </span>
        ))}
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <MDXContent source={post.content} />
      </article>
    </section>
  );
}
