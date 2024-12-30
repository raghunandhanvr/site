import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts, BlogPost } from '@/lib/posts';
import { getViews } from '@/app/actions/blog';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const tags = searchParams.get('tags')?.split(',') || [];

  const posts = await getBlogPosts();
  const postsWithViews: BlogPost[] = await Promise.all(
    posts.map(async (post) => {
      const views = await getViews(post.slug);
      return { ...post, views };
    })
  );

  const filteredPosts = postsWithViews.filter(post => {
    const matchesQuery = query.length >= 3
      ? post.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesTags = tags.length
      ? tags.some(tag => post.metadata.tags.toLowerCase().includes(tag.toLowerCase()))
      : true;

    return matchesQuery && matchesTags;
  });

  return NextResponse.json(filteredPosts);
}

