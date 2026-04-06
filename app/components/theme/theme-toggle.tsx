"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

import { cn } from "@/app/lib/utils"

const toggleButtonClass = cn(
  "theme-toggle-btn",
  "relative inline-flex size-9 shrink-0 items-center justify-center rounded-full",
  "fixed-safe-bottom-right text-[var(--color-text)]",
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]",
  "disabled:pointer-events-none disabled:opacity-50",
)

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = useCallback(() => {
    const t = theme ?? "system"
    if (t === "light") {
      setTheme("dark")
    } else if (t === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }, [theme, setTheme])

  if (!mounted) {
    return (
      <button
        type="button"
        className={toggleButtonClass}
        disabled
        aria-label="Toggle theme"
      >
        <Sun className="size-4" aria-hidden />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  const current = theme ?? "system"

  return (
    <button
      type="button"
      className={toggleButtonClass}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "absolute size-4 transition-all",
          current === "light" ? "scale-100 rotate-0" : "scale-0 rotate-90",
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all",
          current === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90",
        )}
        aria-hidden
      />
      <Monitor
        className={cn(
          "absolute size-4 transition-all",
          current === "system" ? "scale-100 rotate-0" : "scale-0 rotate-90",
        )}
        aria-hidden
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
