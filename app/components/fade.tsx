import * as React from "react"

import { cn } from "@/app/lib/utils"
import styles from "./fade.module.css"

type FadeProps = {
  stop?: string
  blur?: string
  side: "top" | "bottom" | "left" | "right"
  className?: string
  background: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}

export function Fade({
  stop,
  blur,
  side = "top",
  className,
  background,
  style,
  ref,
}: FadeProps) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(styles.root, className)}
      data-side={side}
      style={
        {
          "--stop": stop,
          "--blur": blur,
          "--background": background,
          ...style,
        } as React.CSSProperties
      }
    />
  )
}
