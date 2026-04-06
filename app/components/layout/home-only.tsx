"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

export function HomeOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname !== "/") return null
  return <>{children}</>
}

/** Space between header and body on routes other than `/`. */
export function HeaderMainGap() {
  const pathname = usePathname()
  if (!pathname || pathname === "/") return null
  return <div className="mb-10 shrink-0 sm:mb-6" aria-hidden />
}
