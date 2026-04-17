import { CalendarIcon, EyeIcon } from "lucide-react"
import { format } from "date-fns"

import { ViewsClient } from "@/app/components/views-client"

export function BlogViewCounter({
  slug,
  createdAt,
}: {
  slug: string
  createdAt: Date
}) {
  return (
    <div className="flex items-center space-x-3 text-xs text-[var(--color-text-soft)]">
      <span className="flex items-center">
        <EyeIcon className="w-3 h-3 mr-1.5" aria-hidden="true" />
        <ViewsClient slug={slug} />
      </span>
      <span className="flex items-center">
        <CalendarIcon className="w-3 h-3 mr-1.5" aria-hidden="true" />
        <time dateTime={createdAt.toISOString()}>
          {format(createdAt, "MMM d, yyyy")}
        </time>
      </span>
    </div>
  )
}
