import type { Metadata } from "next"
import { cacheLife } from "next/cache"
import Link from "next/link"

import { withSiteTitle } from "@/app/config"

export const metadata: Metadata = {
  title: withSiteTitle("Problems"),
  robots: { index: false, follow: false },
}

const problems = [
  {
    href: "/ps/1",
    title: "Securing microservice communication",
  },
] as const

export default async function ProblemsPage() {
  "use cache"
  cacheLife("max")

  return (
    <main className="mx-auto flex w-full min-w-0 max-w-4xl flex-1 flex-col px-6 pt-12 sm:px-10 sm:pt-32 lg:px-12">
      <ol className="list-decimal space-y-1 pl-5 marker:text-[var(--color-text)]">
        {problems.map((problem) => (
          <li key={problem.href} className="pl-1 text-base leading-normal">
            <Link href={problem.href} className="home-writings-link">
              {problem.title}
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}
