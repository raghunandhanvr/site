import { works } from "@/app/work/work-data"
import { Tabs } from "@/app/components/ui/tabs"
import type { Metadata } from "next"
import Link from "next/link"

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
    canonical: "/work",
  },
}

async function getCategoryOrder() {
  "use cache"

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
  "use cache"

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

export default async function Works() {
  "use cache"

  const categoryOrder = await getCategoryOrder()
  const groupedWorks = await getGroupedWorks()

  return (
    <section className="container">
      <div className="space-y-8">
        <Tabs tabs={categoryOrder}>
          {categoryOrder.map((category) => {
            const categoryWorks = groupedWorks[category] || []
            return (
              <div key={category}>
                {categoryWorks.map((work, index) => (
                  <div key={index} className="mb-6">
                    <Link href={work.url} className="block hover:opacity-80 transition-opacity duration-200 work-link">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-gray-900 font-bold text-lg">{work.title}</h3>
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
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
