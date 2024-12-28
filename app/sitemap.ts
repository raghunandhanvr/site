import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/posts";
import { metaData } from "@/app/config";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = (await getBlogPosts()).map((post) => ({
    url: `${BaseUrl}b/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "b", "w"].map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
