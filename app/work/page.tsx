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
                    <Link
                      href={work.url}
                      className="work-link block transition-opacity duration-200 hover:opacity-80"
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg font-bold text-[var(--color-text)]">
                          {work.title}
                        </h3>
                        <span className="ml-4 shrink-0 text-xs font-medium text-[var(--color-text-soft)]">
                          {work.year}
                        </span>
                      </div>
                      <div className="mb-3 text-sm text-[var(--color-text-muted)]">
                        {work.techStack}
                      </div>
                      <ul className="ml-4 space-y-1 text-sm leading-snug text-[var(--color-text)]">
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
