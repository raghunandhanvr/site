import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import { getBlogPosts } from '@/lib/posts';
import { formatDate } from '@/lib/date-utils';
import { metaData } from '@/app/config';
import { ViewCounter } from '@/components/blog/view-counter';
import dynamic from 'next/dynamic';
import { cache } from 'react';

const Code = dynamic(() => import('@/components/mdx/code'), { ssr: false });
const Tokenization = dynamic(() => import('@/components/blog/ai/tokenization'), { ssr: false });
const NeuralNetwork = dynamic(() => import('@/components/blog/ai/neural-network'), { ssr: false });
const Transformer = dynamic(() => import('@/components/blog/ai/transformer'), { ssr: false });
const ContextAwareResponse = dynamic(() => import('@/components/blog/ai/context-aware-response'), { ssr: false });
const SelfAttention = dynamic(() => import('@/components/blog/ai/self-attention'), { ssr: false });

function CustomLink(props) {
  let href = props.href;
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }
  if (href.startsWith('#')) {
    return <a {...props} />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr className="text-left">{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function Strikethrough(props) {
  return <del {...props} />;
}

function Callout(props) {
  return (
    <div className="px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout leading-relaxed">{props.children}</div>
    </div>
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level) {
  return function Heading({ children }) {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  strikethrough: Strikethrough,
  Callout,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Tokenization,
  NeuralNetwork,
  Transformer,
  ContextAwareResponse,
  SelfAttention,
};

const getCachedBlogPosts = cache(async () => {
  return await getBlogPosts();
});

export async function generateStaticParams() {
  const posts = await getCachedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const posts = await getCachedBlogPosts();
  const post = posts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  const ogImage = image ? image : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${metaData.baseUrl}/b/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export const revalidate = 3600;

export default async function BlogPost({ params }) {
  const posts = await getCachedBlogPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

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
              ? `${metaData.baseUrl}${post.metadata.image}`
              : `${metaData.baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${metaData.baseUrl}/b/${post.slug}`,
            author: {
              '@type': 'Person',
              name: metaData.name,
            },
          }),
        }}
      />
      <h1 className="title mb-3 font-medium text-2xl tracking-tight mt-5">
            {post.metadata.title}
      </h1>
      <div className="flex flex-wrap items-center mt-2 text-medium">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <span className="mx-2 text-neutral-600 dark:text-neutral-400">•</span>
        <ViewCounter slug={post.slug} />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-8 mt-2">
        {post.metadata.tags.split(',').map((tag, index) => (
          <span key={index} className="mr-2">
            #{tag.trim()}
          </span>
        ))}
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <MDXRemote
          source={post.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath, remarkGfm],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </article>
    </section>
  );
}