import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react'

import { cn } from '@/app/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text)]',
        secondary: 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]',
        destructive: 'border border-[var(--color-danger-border)] bg-[var(--color-danger-soft)] text-[var(--color-danger-text)]',
        outline: 'border border-[var(--color-border)] text-[var(--color-text)]',
        'Work Experience': 'border border-[var(--color-info-border)] bg-[var(--color-info-soft)] text-[var(--color-info-text)]',
        'Internship': 'border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] text-[var(--color-link)]',
        'Freelancing': 'border border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] text-[var(--color-warning-text)]',
        'Side Project': 'border border-[var(--color-success-border)] bg-[var(--color-success-soft)] text-[var(--color-success-text)]',
        'Publication': 'border border-[var(--color-danger-border)] bg-[var(--color-danger-soft)] text-[var(--color-danger-text)]',
        'Security Research': 'border border-[var(--color-border-strong)] bg-[var(--color-surface-emphasis)] text-[var(--color-text)]',
        'Leadership': 'border border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] text-[var(--color-warning-text)]',
        current: 'border border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] text-[var(--color-warning-text)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: LucideIcon
}

function Badge({ className, variant, icon: Icon, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), 'badge', className)} {...props}>
      {Icon && <Icon className='w-3 h-3 mr-1' />}
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
