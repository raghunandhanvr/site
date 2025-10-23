import Link from "next/link"
import { getViewCount } from "@/app/lib/redis"
import { blogPosts, type BlogPost } from "./writings-data"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Suspense } from "react"
import PageLoader from "@/app/components/ui/page-loader"

export const metadata = {
  title: "Writings",
  description: "Some of my writings",
  openGraph: {
    images: [
      {
        url: `/api/og?title=Writings`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: "/writings",
  },
}

async function getSortedPosts(sortBy: string, sortOrder: string) {
  'use cache'
  
  const sortedPosts = [...blogPosts]
  if (sortBy === "title") {
    sortedPosts.sort((a, b) => {
      const result = a.title.localeCompare(b.title)
      return sortOrder === "asc" ? result : -result
    })
  } else if (sortBy === "date") {
    sortedPosts.sort((a, b) => {
      const result = new Date(a.date).getTime() - new Date(b.date).getTime()
      return sortOrder === "asc" ? result : -result
    })
  }
  
  return sortedPosts
}

async function ViewCount({ slug }: { slug: string }) {
  const count = await getViewCount(slug)
  return <>{count.toLocaleString()}</>
}

function ViewCountSkeleton() {
  return <div className="inline-block h-4 w-12 bg-gray-100 animate-pulse rounded" />
}

async function WritingsTable({
  sortedPosts,
  sortBy,
  sortOrder,
}: {
  sortedPosts: BlogPost[]
  sortBy: string
  sortOrder: string
}) {
  'use cache'
  
  const displayedYears = new Set<string>()

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null
    return sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
  }

  const getNextSortOrder = (column: string) => {
    if (sortBy !== column) return "asc"
    return sortOrder === "asc" ? "desc" : "asc"
  }

  return (
    <div className="w-full">
      <table className="w-full border-collapse writings-table" style={{ maxWidth: '100%', display: 'table' }}>
        <thead>
          <tr className="text-left">
            <th className="pb-2 font-normal text-gray-500 text-sm w-[15%]">
              <Link 
                href={`/writings?sort=date&order=${getNextSortOrder("date")}`} 
                className="work-link hover:text-blue-600 flex items-center gap-1"
              >
                date {getSortIcon("date")}
              </Link>
            </th>
            <th className="pb-2 font-normal text-gray-500 text-sm">
              <Link 
                href={`/writings?sort=title&order=${getNextSortOrder("title")}`} 
                className="work-link hover:text-blue-600 flex items-center gap-1"
              >
                title {getSortIcon("title")}
              </Link>
            </th>
            <th className="pb-2 font-normal text-gray-500 text-sm text-right w-[15%]">
              <Link 
                href={`/writings?sort=views&order=${getNextSortOrder("views")}`} 
                className="work-link hover:text-blue-600 flex items-center gap-1 justify-end"
              >
                views {getSortIcon("views")}
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post: BlogPost) => {
            const isFirstOfYear = !displayedYears.has(post.year)
            if (isFirstOfYear) {
              displayedYears.add(post.year)
            }

            return (
              <tr key={post.slug} className="border-t border-gray-100">
                <td className="py-4 pr-4 text-gray-500 text-sm align-top">{isFirstOfYear ? post.year : ""}</td>
                <td className="py-4">
                  <Link href={post.slug} className="work-link text-gray-900 text-base hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </td>
                <td className="py-4 text-right text-gray-500 text-sm">
                  <Suspense fallback={<ViewCountSkeleton />}>
                    <ViewCount slug={post.slug} />
                  </Suspense>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

async function WritingsContent({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; order?: string }>
}) {
  const params = await searchParams
  const sortBy = params.sort || "date"
  const sortOrder = params.order || "desc"

  let sortedPosts: BlogPost[]

  if (sortBy === "views") {
    const viewCounts = await Promise.all(blogPosts.map((post) => getViewCount(post.slug)))
    const postsWithViews = blogPosts.map((post, index) => ({
      ...post,
      views: viewCounts[index]
    }))
    
    sortedPosts = postsWithViews.sort((a, b) => {
      const result = a.views - b.views
      return sortOrder === "asc" ? result : -result
    })
  } else {
    // Static sorting for date and title (fully cacheable)
    sortedPosts = await getSortedPosts(sortBy, sortOrder)
  }
  
  const tableContent = await WritingsTable({
    sortedPosts,
    sortBy,
    sortOrder,
  })

  return (
    <div className="container">
      {tableContent}
    </div>
  )
}

export default async function WritingsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; order?: string }>
}) {
  return (
    <Suspense fallback={<PageLoader />}>
      <WritingsContent searchParams={searchParams} />
    </Suspense>
  )
}