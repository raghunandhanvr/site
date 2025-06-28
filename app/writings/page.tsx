import Link from "next/link"
import { getViewCount } from "@/app/lib/redis"
import { blogPosts, type BlogPost } from "./writings-data"
import { ChevronDown, ChevronUp } from 'lucide-react'

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

export default async function WritingsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; order?: string }>
}) {
  const params = await searchParams
  const sortBy = params.sort || "date"
  const sortOrder = params.order || "desc"

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

  const viewCounts = await Promise.all(sortedPosts.map((post) => getViewCount(post.slug)))
  const viewCountMap: Record<string, number> = sortedPosts.reduce((acc: Record<string, number>, post, index) => {
    acc[post.slug] = viewCounts[index]
    return acc
  }, {})


  if (sortBy === "views") {
    sortedPosts.sort((a, b) => {
      const result = viewCountMap[a.slug] - viewCountMap[b.slug]
      return sortOrder === "asc" ? result : -result
    })
  }

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
    <div className="max-w-2xl mx-auto">
      <div className="w-full">
        <table className="w-full border-collapse text-sm writings-table" style={{ maxWidth: '100%', display: 'table' }}>
          <thead>
            <tr className="text-left">
              <th className="pb-2 font-normal text-gray-500 w-[15%]">
                <Link 
                  href={`/writings?sort=date&order=${getNextSortOrder("date")}`} 
                  className="work-link hover:text-blue-600 flex items-center gap-1"
                >
                  date {getSortIcon("date")}
                </Link>
              </th>
              <th className="pb-2 font-normal text-gray-500">
                <Link 
                  href={`/writings?sort=title&order=${getNextSortOrder("title")}`} 
                  className="work-link hover:text-blue-600 flex items-center gap-1"
                >
                  title {getSortIcon("title")}
                </Link>
              </th>
              <th className="pb-2 font-normal text-gray-500 text-right w-[15%]">
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
            {sortedPosts.map((post: BlogPost, index: number) => {
              const isFirstOfYear = !displayedYears.has(post.year)
              if (isFirstOfYear) {
                displayedYears.add(post.year)
              }

              return (
                <tr key={post.slug} className="border-t border-gray-100">
                  <td className="py-4 pr-4 text-gray-500 align-top">{isFirstOfYear ? post.year : ""}</td>
                  <td className="py-4">
                    <Link href={post.slug} className="work-link text-black hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-4 text-right text-gray-500">{viewCountMap[post.slug].toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}