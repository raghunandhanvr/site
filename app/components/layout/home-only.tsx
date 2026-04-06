"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

export function HomeOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname !== "/") return null
  return <>{children}</>
}

/** Space before page body on non-home routes — matches header `gap-3 sm:gap-6` above SiteIntro on `/`. */
export function HeaderMainGap() {
  const pathname = usePathname()
  if (!pathname || pathname === "/") return null
  return <div className="mb-10 shrink-0 sm:mb-6" aria-hidden />
}
