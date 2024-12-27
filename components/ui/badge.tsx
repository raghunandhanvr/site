import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { type LucideIcon } from 'lucide-react'

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary-foreground",
        secondary: "bg-secondary/10 text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive-foreground",
        outline: "text-foreground border border-input",
        "Work Experience": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        "Internship": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        "Freelancing": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
        "Side Project": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        "Publication": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        current: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      },
    },
    defaultVariants: {
      variant: "default",
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
    <div className={cn(badgeVariants({ variant }), "badge", className)} {...props}>
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
