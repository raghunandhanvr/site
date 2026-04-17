import type { Metadata } from "next"

import AgeCounter from "@/app/components/age-counter"
import { withSiteTitle } from "@/app/config"

export const metadata: Metadata = {
  title: withSiteTitle("Age"),
  robots: { index: false, follow: false },
}

export default function AgePage() {
  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center px-6 sm:px-10">
      <AgeCounter className="text-lg text-[var(--color-text)] tabular-nums sm:text-2xl" />
    </div>
  )
}
