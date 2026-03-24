"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { cn } from "@/app/lib/utils"

const toggleOrder = {
  system: "dark",
  dark: "light",
  light: "dark",
} as const

export default function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? (theme ?? "system") : "system"
  const nextTheme = toggleOrder[currentTheme as keyof typeof toggleOrder] ?? "dark"

  const Icon = mounted && resolvedTheme === "dark" ? Moon : Sun

  return (
    <button
      type="button"
      aria-label={`Switch theme (current: ${currentTheme}, next: ${nextTheme})`}
      title={`Theme: ${currentTheme}`}
      onClick={() => setTheme(nextTheme)}
      className={cn(
        "work-link inline-flex cursor-pointer items-center justify-center px-1.5 py-0.5",
        "text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-emphasis)] hover:text-[var(--color-text)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]",
      )}
    >
      <Icon className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
    </button>
  )
}
