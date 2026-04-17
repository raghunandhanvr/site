import { Suspense } from "react"
import type { Metadata } from "next"
import { cacheLife } from "next/cache"

import AgeCounter from "@/app/components/age-counter"
import { withSiteTitle } from "@/app/config"

export const metadata: Metadata = {
  title: withSiteTitle("Age"),
  robots: { index: false, follow: false },
}

const counterClass =
  "text-lg text-[var(--color-text)] tabular-nums sm:text-2xl"

export default async function AgePage() {
  "use cache"
  cacheLife("max")

  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center px-6 sm:px-10">
      <Suspense fallback={<span className={counterClass}>—</span>}>
        <AgeCounter className={counterClass} />
      </Suspense>
    </div>
  )
}
