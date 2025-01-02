import { EyeIcon, CalendarIcon } from 'lucide-react'
import { getViewCount, incrementViewCount } from '@/app/lib/redis'
import { format } from 'date-fns'

interface BlogViewCounterProps {
  slug: string
  createdAt: Date
}

export async function BlogViewCounter({ slug, createdAt }: BlogViewCounterProps) {
  const views = await getViewCount(slug)
  await incrementViewCount(slug)

  return (
    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
      <span className="flex items-center">
        <EyeIcon className="w-3 h-3 mr-1.5" aria-hidden="true" />
        <span>{views.toLocaleString()} views</span>
      </span>
      <span className="flex items-center">
        <CalendarIcon className="w-3 h-3 mr-1.5" aria-hidden="true" />
        <time dateTime={createdAt.toISOString()}>
          {format(createdAt, 'MMM d, yyyy')}
        </time>
      </span>
    </div>
  )
}

