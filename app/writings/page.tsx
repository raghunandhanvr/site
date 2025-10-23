import Link from "next/link"
import { getViewCount } from "@/app/lib/redis"
import { blogPosts, type BlogPost } from "./writings-data"
import { Suspense } from "react"

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

async function getSortedPosts() {
  'use cache'
  
  const sortedPosts = [...blogPosts]
  sortedPosts.sort((a, b) => {
    const result = new Date(b.date).getTime() - new Date(a.date).getTime()
    return result
  })
  
  return sortedPosts
}

async function ViewCount({ slug }: { slug: string }) {
  const count = await getViewCount(slug)
  return <>{count.toLocaleString()}</>
}

function ViewCountSkeleton() {
  return (
    <div className="inline-block h-4 w-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded" 
         style={{ 
           animation: 'shimmer 1.5s ease-in-out infinite',
           backgroundPosition: '-200% 0'
         }} 
    />
  )
}

export default async function WritingsPage() {
  'use cache'
  
  const sortedPosts = await getSortedPosts()
  const displayedYears = new Set<string>()

  return (
    <div className="container">
      <div className="w-full">
        <table className="w-full border-collapse writings-table" style={{ maxWidth: '100%', display: 'table' }}>
          <thead>
            <tr className="text-left">
              <th className="pb-2 font-normal text-gray-500 text-sm w-[15%]">date</th>
              <th className="pb-2 font-normal text-gray-500 text-sm">title</th>
              <th className="pb-2 font-normal text-gray-500 text-sm text-right w-[15%]">views</th>
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
    </div>
  )
}