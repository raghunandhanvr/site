"use client"

import type { PropsWithChildren } from "react"
import { useCallback, useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import * as stylex from "@stylexjs/stylex"

import { styles } from "@/app/styles/ui"

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleToggle = useCallback(() => {
    const t = theme ?? "system"
    if (t === "light") setTheme("dark")
    else if (t === "dark") setTheme("system")
    else setTheme("light")
  }, [theme, setTheme])

  if (!mounted) {
    return (
      <button
        type="button"
        {...stylex.props(styles.themeToggle)}
        disabled
        aria-label="Toggle theme"
      >
        <Sun {...stylex.props(styles.themeIcon)} aria-hidden />
        <span {...stylex.props(styles.srOnly)}>Toggle theme</span>
      </button>
    )
  }

  const current = theme ?? "system"

  return (
    <button
      type="button"
      {...stylex.props(styles.themeToggle)}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <Sun
        {...stylex.props(
          styles.themeIcon,
          current === "light" ? styles.themeIconOn : styles.themeIconOff,
        )}
        aria-hidden
      />
      <Moon
        {...stylex.props(
          styles.themeIcon,
          current === "dark" ? styles.themeIconOn : styles.themeIconOff,
        )}
        aria-hidden
      />
      <Monitor
        {...stylex.props(
          styles.themeIcon,
          current === "system" ? styles.themeIconOn : styles.themeIconOff,
        )}
        aria-hidden
      />
      <span {...stylex.props(styles.srOnly)}>Toggle theme</span>
    </button>
  )
}
