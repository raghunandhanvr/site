"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/app/lib/utils"

/** Matches `WritingsArticleLayout` inner column inset so home aligns with the Back control. */
export function MainLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <main
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col px-3 lg:px-12",
        isHome && "justify-start",
      )}
    >
      {children}
    </main>
  )
}
