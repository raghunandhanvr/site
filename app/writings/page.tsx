import Link from "next/link"
import { getViewCount } from "@/app/lib/redis"
import { getAllBlogPosts } from "@/app/lib/server-utils"
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

  const posts = getAllBlogPosts().map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.publishedAt.split("T")[0],
    year: new Date(p.publishedAt).getFullYear().toString(),
  }))
  return posts
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

  return (
    <div className="container">
      <ul>
        {sortedPosts.map((post, i: number) => {
          const year = post.year
          const firstOfYear = !sortedPosts[i - 1] || sortedPosts[i - 1].year !== year

          return (
            <li key={post.slug} className="group">
              <Link href={post.slug} className="work-link">
                <span className={`flex py-2 items-center ${!firstOfYear ? "ml-10 md:ml-14" : ""}`}>
                  {firstOfYear && (
                    <span className="w-10 md:w-14 inline-block shrink-0 text-gray-500 text-xs">
                      {year}
                    </span>
                  )}
                  <span className="grow text-gray-900">
                    <span className="group-hover:bg-gray-200 transition-all px-1.5 inline-block">
                      {post.title}
                    </span>
                  </span>
                  <span className="text-gray-500 text-xs ml-2">
                    <Suspense fallback={<ViewCountSkeleton />}>
                      <ViewCount slug={post.slug} />
                    </Suspense>
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}