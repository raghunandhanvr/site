import Link from "next/link"
import { getViewCount } from "@/app/lib/redis"

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

interface BlogPost {
  title: string
  slug: string
  date: string
  year: string
}

const blogPosts: BlogPost[] = [
  {
    title: "The Cognitive Load: Why code makes your brain hurt",
    slug: "/writings/cognitive-load",
    date: "2025-06-24",
    year: "2025",
  },
  {
    title: "Bloom Filters: Lightning-fast username lookups",
    slug: "/writings/bloom-filter",
    date: "2025-04-11",
    year: "2025",
  },
  {
    title: "Inside a High‑Performance Reverse Proxy",
    slug: "/writings/skipper",
    date: "2025-02-02",
    year: "2025",
  },
  {
    title: "On Developer Experience",
    slug: "/writings/dx",
    date: "2025-01-24",
    year: "2025",
  },
  {
    title: "Understanding AI Models",
    slug: "/writings/ai",
    date: "2024-11-29",
    year: "2024",
  },
  {
    title: "Towards a Truly Decentralized Internet",
    slug: "/writings/decentralization",
    date: "2024-10-07",
    year: "2024",
  },
  {
    title: "From a Gaming Laptop to a Family-Managed Server",
    slug: "/writings/homelab",
    date: "2024-09-21",
    year: "2024",
  },
  {
    title: "Other DB options",
    slug: "/writings/db",
    date: "2024-08-10",
    year: "2024",
  },
]

export default async function WritingsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const params = await searchParams
  const sortBy = params.sort || "date"

  const sortedPosts = [...blogPosts]
  if (sortBy === "title") {
    sortedPosts.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortBy === "date") {
    sortedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const viewCounts = await Promise.all(sortedPosts.map((post) => getViewCount(post.slug)))
  const viewCountMap: Record<string, number> = sortedPosts.reduce((acc: Record<string, number>, post, index) => {
    acc[post.slug] = viewCounts[index]
    return acc
  }, {})

  const displayedYears = new Set<string>()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-medium mb-1">Writings</h1>
      <p className="text-sm text-gray-500 mb-8">Some of my writings on tech, and other random stuffs</p>

      <div className="w-full">
        <table className="w-full border-collapse text-sm writings-table" style={{ maxWidth: '100%', display: 'table' }}>
          <thead>
            <tr className="text-left">
              <th className="pb-2 font-normal text-gray-500 w-[15%]">
                <Link href={`/writings?sort=date`} className="work-link hover:text-blue-600">
                  date
                </Link>
              </th>
              <th className="pb-2 font-normal text-gray-500">
                <Link href={`/writings?sort=title`} className="work-link hover:text-blue-600">
                  title
                </Link>
              </th>
              <th className="pb-2 font-normal text-gray-500 text-right w-[15%]">views</th>
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