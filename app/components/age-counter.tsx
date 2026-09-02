"use client"

import { useEffect, useState } from "react"
import * as stylex from "@stylexjs/stylex"
import type { StyleXStyles } from "@stylexjs/stylex"

import { styles } from "@/app/styles/ui"

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

export default function AgeCounter({ style }: { style?: StyleXStyles }) {
  const [age, setAge] = useState(compute)

  useEffect(() => {
    setAge(compute())
    const id = setInterval(() => setAge(compute()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span {...stylex.props(styles.ageFade, style)}>
      {age.years}y {age.days}d {age.hours}h {age.minutes}m {age.seconds}s
    </span>
  )
}
