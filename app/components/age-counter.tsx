"use client"

import { useEffect, useState } from "react"

import { cn } from "@/app/lib/utils"

const BIRTHDAY = new Date("2002-06-21T05:30:00")
const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25
const DAY_MS = 1000 * 60 * 60 * 24
const HOUR_MS = 1000 * 60 * 60
const MIN_MS = 1000 * 60

function compute() {
  const diff = Date.now() - BIRTHDAY.getTime()
  return {
    years: Math.floor(diff / YEAR_MS),
    days: Math.floor((diff % YEAR_MS) / DAY_MS),
    hours: Math.floor((diff % DAY_MS) / HOUR_MS),
    minutes: Math.floor((diff % HOUR_MS) / MIN_MS),
    seconds: Math.floor((diff % MIN_MS) / 1000),
  }
}

export default function AgeCounter({ className }: { className?: string }) {
  const [age, setAge] = useState(compute)

  useEffect(() => {
    setAge(compute())
    const id = setInterval(() => setAge(compute()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className={cn(
        "fade-in font-mono text-xs text-[var(--color-text-soft)] transition-colors",
        className,
      )}
    >
      {age.years}y {age.days}d {age.hours}h {age.minutes}m {age.seconds}s
    </span>
  )
}
