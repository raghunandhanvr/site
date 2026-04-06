import { works, type Work } from "@/app/(main)/work/work-data"
import { WorkExperienceTabs } from "@/app/components/work/work-experience-tabs"

export async function WorkExperienceSection() {
  "use cache"

  const seen = new Set<string>()
  const categoryOrder: string[] = []
  works.forEach((work) => {
    if (!seen.has(work.category)) {
      seen.add(work.category)
      categoryOrder.push(work.category)
    }
  })

  const groupedWorks = works.reduce(
    (acc, work) => {
      if (!acc[work.category]) {
        acc[work.category] = []
      }
      acc[work.category].push(work)
      return acc
    },
    {} as Record<string, Work[]>,
  )

  return (
    <section className="container">
      <div className="space-y-8">
        <WorkExperienceTabs
          categoryOrder={categoryOrder}
          groupedWorks={groupedWorks}
        />
      </div>
    </section>
  )
}
