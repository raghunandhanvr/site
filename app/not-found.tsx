import { cacheLife } from "next/cache"
import * as stylex from "@stylexjs/stylex"

import { styles } from "@/app/styles/ui"

export default async function NotFound() {
  "use cache"
  cacheLife("max")

  return (
    <section {...stylex.props(styles.box, styles.notFound)}>
      <p {...stylex.props(styles.notFoundText)}>404 | Page Not Found</p>
    </section>
  )
}
