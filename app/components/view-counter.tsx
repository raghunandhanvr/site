import { Suspense } from "react"
import { CalendarIcon, EyeIcon } from "lucide-react"
import { format } from "date-fns"

import { getViewCount, incrementViewCount } from "@/app/lib/redis"

async function Views({ slug }: { slug: string }) {
  const [views] = await Promise.all([
    getViewCount(slug),
    incrementViewCount(slug),
  ])
  return <span>{views.toLocaleString()} views</span>
}

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
        <Suspense fallback={<span>— views</span>}>
          <Views slug={slug} />
        </Suspense>
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
