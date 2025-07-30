import Link from "next/link";
import type { Metadata } from "next";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getViewCount } from "@/app/lib/redis";
import { getAllBlogPosts } from "@/app/lib/server-utils";
import { PageProps } from "@/app/types";
import { siteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: "Writings",
  description: "My thoughts on software development, distributed systems, and technology.",
  openGraph: {
    title: "Writings | " + siteConfig.name,
    description: "My thoughts on software development, distributed systems, and technology.",
    url: `${siteConfig.url}/writings`,
    images: [
      {
        url: `/api/og?title=Writings`,
        width: 1200,
        height: 630,
        alt: "Writings",
      },
    ],
  },
  alternates: {
    canonical: "/writings",
  },
};

interface WritingsPageProps extends Omit<PageProps, 'params'> {
  searchParams: Promise<{ sort?: string; order?: string }>;
}

type SortBy = "date" | "title" | "views";
type SortOrder = "asc" | "desc";

export default async function WritingsPage({ searchParams }: WritingsPageProps) {
  const params = await searchParams;
  const sortBy = (params.sort as SortBy) || "date";
  const sortOrder = (params.order as SortOrder) || "desc";

  const blogPosts = await getAllBlogPosts();
  
  const viewCounts = await Promise.all(
    blogPosts.map((post) => getViewCount(post.slug))
  );
  
  const viewCountMap: Record<string, number> = blogPosts.reduce(
    (acc: Record<string, number>, post, index) => {
      acc[post.slug] = viewCounts[index];
      return acc;
    }, 
    {}
  );

  const sortedPosts = [...blogPosts].sort((a, b) => {
    let result = 0;
    
    switch (sortBy) {
      case "title":
        result = a.title.localeCompare(b.title);
        break;
      case "views":
        result = viewCountMap[a.slug] - viewCountMap[b.slug];
        break;
      case "date":
      default:
        result = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        break;
    }
    
    return sortOrder === "asc" ? result : -result;
  });

  const displayedYears = new Set<string>();

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const getNextSortOrder = (column: string): SortOrder => {
    if (sortBy !== column) return "asc";
    return sortOrder === "asc" ? "desc" : "asc";
  };

  return (
    <div className="container">
      <div className="w-full">
        <table className="w-full border-collapse text-sm writings-table">
          <thead>
            <tr className="text-left">
              <th className="pb-2 font-normal text-gray-500 w-[15%]">
                <Link
                  href={`/writings?sort=date&order=${getNextSortOrder("date")}`}
                  className="work-link hover:text-blue-600 flex items-center gap-1"
                  aria-label={`Sort by date ${getNextSortOrder("date")}`}
                >
                  date {getSortIcon("date")}
                </Link>
              </th>
              <th className="pb-2 font-normal text-gray-500">
                <Link
                  href={`/writings?sort=title&order=${getNextSortOrder("title")}`}
                  className="work-link hover:text-blue-600 flex items-center gap-1"
                  aria-label={`Sort by title ${getNextSortOrder("title")}`}
                >
                  title {getSortIcon("title")}
                </Link>
              </th>
              <th className="pb-2 font-normal text-gray-500 text-right w-[15%]">
                <Link
                  href={`/writings?sort=views&order=${getNextSortOrder("views")}`}
                  className="work-link hover:text-blue-600 flex items-center gap-1 justify-end"
                  aria-label={`Sort by views ${getNextSortOrder("views")}`}
                >
                  views {getSortIcon("views")}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map((post) => {
              const year = new Date(post.publishedAt).getFullYear().toString();
              const isFirstOfYear = !displayedYears.has(year);
              
              if (isFirstOfYear) {
                displayedYears.add(year);
              }

              return (
                <tr key={post.slug} className="border-t border-gray-100">
                  <td className="py-4 pr-4 text-gray-500 align-top">
                    {isFirstOfYear ? year : ""}
                  </td>
                  <td className="py-4">
                    <Link
                      href={post.slug}
                      className="work-link text-black hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-4 text-right text-gray-500">
                    {(viewCountMap[post.slug] || 0).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}