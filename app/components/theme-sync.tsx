"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

import { darkThemeClassName } from "@/app/styles/themes"

const darkClasses = darkThemeClassName()
  .split(/\s+/)
  .filter(Boolean)

function applyDark(enabled: boolean) {
  const root = document.documentElement
  for (const cls of darkClasses) {
    root.classList.toggle(cls, enabled)
  }
  root.style.colorScheme = enabled ? "dark" : "light"
}

export function ThemeSync() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    applyDark(resolvedTheme === "dark")
  }, [resolvedTheme])

  return null
}
