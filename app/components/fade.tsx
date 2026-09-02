import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import type { StyleXStyles } from "@stylexjs/stylex"

import { styles } from "@/app/styles/ui"

type FadeProps = {
  stop?: string
  blur?: string
  side: "top" | "bottom" | "left" | "right"
  style?: StyleXStyles
  background: string
  ref?: React.Ref<HTMLDivElement>
}

const sideStyles = {
  top: styles.fadeTop,
  bottom: styles.fadeBottom,
  left: styles.fadeLeft,
  right: styles.fadeRight,
} as const

export function Fade({
  stop = "25%",
  blur = "4px",
  side = "top",
  style,
  background,
  ref,
}: FadeProps) {
  return (
    <div
      ref={ref}
      aria-hidden
      {...stylex.props(styles.fadeRoot, sideStyles[side](background, stop, blur), style)}
    />
  )
}
