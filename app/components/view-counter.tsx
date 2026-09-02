import { CalendarIcon, EyeIcon } from "lucide-react"
import { format } from "date-fns"
import * as stylex from "@stylexjs/stylex"

import { ViewsClient } from "@/app/components/views-client"
import { styles } from "@/app/styles/ui"

export function BlogViewCounter({
  slug,
  createdAt,
}: {
  slug: string
  createdAt: Date
}) {
  return (
    <div {...stylex.props(styles.box, styles.views)}>
      <span {...stylex.props(styles.viewsItem)}>
        <EyeIcon {...stylex.props(styles.viewsIcon)} aria-hidden="true" />
        <ViewsClient slug={slug} />
      </span>
      <span {...stylex.props(styles.viewsItem)}>
        <CalendarIcon {...stylex.props(styles.viewsIcon)} aria-hidden="true" />
        <time dateTime={createdAt.toISOString()}>
          {format(createdAt, "MMM d, yyyy")}
        </time>
      </span>
    </div>
  )
}
