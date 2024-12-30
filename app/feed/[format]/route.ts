import { Feed } from "feed";
import { metaData, socialLinks } from "@/app/config";
import { type NextRequest } from "next/server";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const validFormats = ["rss.xml", "atom.xml", "feed.json"] as const;
type FeedFormat = typeof validFormats[number];

function isValidFormat(format: string): format is FeedFormat {
  return validFormats.includes(format as FeedFormat);
}

export async function GET(request: NextRequest) {
  const format = request.nextUrl.pathname.split('/').pop() || '';

  if (!isValidFormat(format)) {
    return Response.json(
      { error: "Unsupported feed format" },
      { status: 404 }
    );
  }

  const BaseUrl = metaData.baseUrl.endsWith("/")
    ? metaData.baseUrl
    : `${metaData.baseUrl}/`;

  const feed = new Feed({
    title: metaData.title,
    description: metaData.description,
    id: BaseUrl,
    link: BaseUrl,
    language: "en",
    author: {
      name: metaData.name,
      email: socialLinks.email.replace("mailto:", ""),
      link: BaseUrl
    },
    copyright: `All rights reserved ${new Date().getFullYear()}, ${metaData.name}`,
    generator: "Feed for Node.js",
    feedLinks: {
      json: `${BaseUrl}feed.json`,
      atom: `${BaseUrl}atom.xml`,
      rss: `${BaseUrl}rss.xml`,
    },
    image: `${BaseUrl}${metaData.ogImage}`,
    favicon: `${BaseUrl}favicon.ico`
  });

  const { getPosts } = await import('@/app/lib/utils');
  const posts = await getPosts();

  posts.forEach((post) => {
    const postUrl = `${BaseUrl}b/${post.slug}`;
    const categories = post.metadata.tags
      ? post.metadata.tags.split(",").map((tag: string) => tag.trim())
      : [];

    feed.addItem({
      title: post.metadata.title,
      id: postUrl,
      link: postUrl,
      description: post.metadata.summary,
      content: post.content,
      category: categories.map((tag: string) => ({
        name: tag,
        term: tag,
      })),
      date: new Date(post.metadata.publishedAt),
      author: [{
        name: metaData.name,
        email: socialLinks.email.replace("mailto:", ""),
        link: BaseUrl
      }],
      image: post.metadata.image ? `${BaseUrl}${post.metadata.image}` : undefined,
    });
  });

  const responseMap: Record<FeedFormat, { content: string; contentType: string }> = {
    "rss.xml": { content: feed.rss2(), contentType: "application/xml" },
    "atom.xml": { content: feed.atom1(), contentType: "application/xml" },
    "feed.json": { content: feed.json1(), contentType: "application/json" },
  };

  const response = responseMap[format];

  return new Response(response.content, {
    headers: {
      "Content-Type": response.contentType,
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}