import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react'

import { cn } from '@/app/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary-foreground',
        secondary: 'bg-secondary/10 text-secondary-foreground',
        destructive: 'bg-destructive/10 text-destructive-foreground',
        outline: 'text-foreground border border-input',
        'Work Experience': 'bg-blue-100 text-blue-800',
        'Internship': 'bg-purple-100 text-purple-800',
        'Freelancing': 'bg-orange-100 text-orange-800',
        'Side Project': 'bg-green-100 text-green-800',
        'Publication': 'bg-red-100 text-red-800',
        'Security Research': 'bg-indigo-100 text-indigo-800',
        'Leadership': 'bg-amber-100 text-amber-800',
        current: 'bg-yellow-100 text-yellow-800',
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
