import { Suspense } from "react"
import type { Metadata } from "next"
import { cacheLife } from "next/cache"
import * as stylex from "@stylexjs/stylex"

import AgeCounter from "@/app/components/age-counter"
import { withSiteTitle } from "@/app/config"
import { styles } from "@/app/styles/ui"

export const metadata: Metadata = {
  title: withSiteTitle("Age"),
  robots: { index: false, follow: false },
}

export default async function AgePage() {
  "use cache"
  cacheLife("max")

  return (
    <div {...stylex.props(styles.box, styles.agePage)}>
      <Suspense
        fallback={<span {...stylex.props(styles.ageValue)}>{"\u2014"}</span>}
      >
        <AgeCounter style={styles.ageValue} />
      </Suspense>
    </div>
  )
}
