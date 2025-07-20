import { Feed } from "feed";
import { siteConfig } from "@/app/config";
import { type NextRequest } from "next/server";
import { BaseUrl, getBlogs } from "@/app/lib/server-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const validFormats = [
  "rss.xml",
  "atom.xml",
  "feed.json",
  "rss",
  "atom",
  "json",
] as const;
type FeedFormat = (typeof validFormats)[number];

function isValidFormat(format: string): format is FeedFormat {
  return validFormats.includes(format as FeedFormat);
}

function normalizeFormat(format: string): FeedFormat {
  switch (format) {
    case "rss":
    case "feed":
      return "rss.xml";
    case "atom":
      return "atom.xml";
    case "json":
      return "feed.json";
    default:
      return format as FeedFormat;
  }
}

export async function GET(request: NextRequest) {
  let format = request.nextUrl.pathname.split("/").pop() || "";

  if (!format || format === "feed") {
    format = "rss.xml";
  }

  format = normalizeFormat(format);

  if (!isValidFormat(format)) {
    return Response.json({ error: "Unsupported feed format" }, { status: 404 });
  }

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: BaseUrl,
    link: BaseUrl,
    language: "en",
    author: {
      name: siteConfig.name,
      email: siteConfig.email.replace("mailto:", ""),
      link: BaseUrl,
    },
    copyright: `All rights reserved ${new Date().getFullYear()}, ${
      siteConfig.name
    }`,
    generator: "Feed for Node.js",
    feedLinks: {
      json: `${BaseUrl}feed.json`,
      atom: `${BaseUrl}atom.xml`,
      rss: `${BaseUrl}rss.xml`,
    },
    image: `${BaseUrl}${siteConfig.image}`,
    favicon: `${BaseUrl}favicon.ico`,
  });

  const blogs = await getBlogs();

  blogs.forEach((blog) => {
    const blogUrl = `${BaseUrl}writings/${blog.slug}`;
    const categories = blog.metadata.tags
      ? blog.metadata.tags.split(",").map((tag: string) => tag.trim())
      : [];

    feed.addItem({
      title: blog.metadata.title,
      id: blogUrl,
      link: blogUrl,
      description: blog.metadata.summary,
      content: blog.content,
      category: categories.map((tag: string) => ({
        name: tag,
        term: tag,
      })),
      date: new Date(blog.metadata.publishedAt),
      author: [
        {
          name: siteConfig.name,
          email: siteConfig.email.replace("mailto:", ""),
          link: BaseUrl,
        },
      ],
      image: blog.metadata.image
        ? `${BaseUrl}${blog.metadata.image}`
        : undefined,
    });
  });

  const responseMap: Record<
    FeedFormat,
    { content: string; contentType: string }
  > = {
    "rss.xml": { content: feed.rss2(), contentType: "application/xml" },
    "atom.xml": { content: feed.atom1(), contentType: "application/xml" },
    "feed.json": { content: feed.json1(), contentType: "application/json" },
    rss: { content: feed.rss2(), contentType: "application/xml" },
    atom: { content: feed.atom1(), contentType: "application/xml" },
    json: { content: feed.json1(), contentType: "application/json" },
  };

  const response = responseMap[format];

  return new Response(response.content, {
    headers: {
      "Content-Type": response.contentType,
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
