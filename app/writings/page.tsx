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
    <div className="inline-block h-4 w-12 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] bg-[linear-gradient(90deg,var(--color-surface-muted),var(--color-surface-emphasis),var(--color-surface-muted))]" 
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
        {sortedPosts.map((post: BlogPost, i: number) => {
          const year = post.year
          const firstOfYear = !sortedPosts[i - 1] || sortedPosts[i - 1].year !== year

          return (
            <li key={post.slug} className="group">
              <Link href={post.slug} className="work-link">
                <span className={`flex py-2 items-center ${!firstOfYear ? "ml-10 md:ml-14" : ""}`}>
                  {firstOfYear && (
                    <span className="inline-block w-10 shrink-0 text-xs text-[var(--color-text-soft)] md:w-14">
                      {year}
                    </span>
                  )}
                  <span className="grow text-[var(--color-text)]">
                    <span className="inline-block px-1.5 transition-all group-hover:bg-[var(--color-surface-emphasis)]">
                      {post.title}
                    </span>
                  </span>
                  <span className="ml-2 text-xs text-[var(--color-text-soft)]">
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