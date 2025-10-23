import { works } from "./work-data";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PageLoader from "@/app/components/ui/page-loader";

export const metadata: Metadata = {
  title: "Work",
  description: "Some of my works",
  openGraph: {
    images: [
      {
        url: `/api/og?title=Work+Experience`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: '/work',
  },
};

async function getCategoryOrder() {
  'use cache'
  
  const seen = new Set<string>()
  const order: string[] = []
  works.forEach((work) => {
    if (!seen.has(work.category)) {
      seen.add(work.category)
      order.push(work.category)
    }
  })
  return order
}

async function getGroupedWorks() {
  'use cache'
  
  return works.reduce(
    (acc, work) => {
      if (!acc[work.category]) {
        acc[work.category] = []
      }
      acc[work.category].push(work)
      return acc
    },
    {} as Record<string, typeof works>,
  )
}

async function WorksContent({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const resolvedParams = await searchParams
  const categoryOrder = await getCategoryOrder()
  const groupedWorks = await getGroupedWorks()
  
  const activeTab = resolvedParams?.tab || categoryOrder[0] || "Work Experience"
  const categoryWorks = groupedWorks[activeTab] || []

  return (
    <section className="container">
      <div className="space-y-8">
        <div className="flex gap-8 border-b border-gray-200 pb-0 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {categoryOrder.map((category) => {
            if (!groupedWorks[category] || groupedWorks[category].length === 0) return null
            const isActive = activeTab === category
            return (
              <Link
                key={category}
                href={`/work?tab=${encodeURIComponent(category)}`}
                className={`text-sm whitespace-nowrap transition-colors pb-2 -mb-px !no-underline hover:!no-underline border-b-[0.5px] font-normal ${
                  isActive
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-400 border-transparent hover:!text-gray-400 opacity-50"
                }`}
              >
                {category}
              </Link>
            )
          })}
        </div>

        <div>
          <div className="space-y-6">
            {categoryWorks.map((work, index) => (
              <div key={index}>
                <Link href={work.url} className="block hover:opacity-80 transition-opacity duration-200 work-link">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-gray-900 font-medium text-base">{work.title}</h3>
                    <span className="text-xs text-gray-500 font-medium ml-4 flex-shrink-0">{work.year}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{work.techStack}</div>
                  <ul className="text-gray-800 text-sm leading-snug space-y-1 ml-4">
                    {work.description.map((item, idx) => (
                      <li key={idx} className="relative">
                        <span className="absolute -left-4">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function Works({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  return (
    <Suspense fallback={<PageLoader />}>
      <WorksContent searchParams={searchParams} />
    </Suspense>
  )
}
