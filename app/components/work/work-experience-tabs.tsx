"use client"

import Link from "next/link"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/radix-tabs"
import type { Work } from "@/app/(main)/work/work-data"

type WorkExperienceTabsProps = {
  categoryOrder: string[]
  groupedWorks: Record<string, Work[]>
}

export function WorkExperienceTabs({
  categoryOrder,
  groupedWorks,
}: WorkExperienceTabsProps) {
  const defaultTab = categoryOrder[0] ?? ""

  return (
    <Tabs defaultValue={defaultTab} className="w-full gap-6">
      <TabsList className="h-auto w-fit max-w-full flex-wrap justify-start gap-0.5 p-1">
        {categoryOrder.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {categoryOrder.map((category) => {
        const categoryWorks = groupedWorks[category] || []
        return (
          <TabsContent
            key={category}
            value={category}
            className="outline-none data-[state=inactive]:hidden"
          >
            <div className="space-y-6">
              {categoryWorks.map((work, index) => (
                <div key={index} className="mb-6">
                  <Link
                    href={work.url}
                    className="work-link block transition-opacity duration-200 hover:opacity-80"
                  >
                    <div className="mb-2 flex items-baseline justify-between">
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
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
