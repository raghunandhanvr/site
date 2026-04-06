"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"

import { cn } from "@/app/lib/utils"

const pillSpring = { type: "spring" as const, stiffness: 380, damping: 32 }

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [pill, setPill] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  const measure = React.useCallback(() => {
    const list = listRef.current
    if (!list) return
    const active = list.querySelector<HTMLElement>(
      '[data-slot="tabs-trigger"][data-state="active"]',
    )
    if (!active) return
    setPill({
      left: active.offsetLeft,
      top: active.offsetTop,
      width: active.offsetWidth,
      height: active.offsetHeight,
    })
  }, [])

  React.useLayoutEffect(() => {
    measure()
  }, [measure])

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const mo = new MutationObserver(measure)
    mo.observe(list, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-state"],
    })

    const ro = new ResizeObserver(measure)
    ro.observe(list)
    for (const el of list.querySelectorAll('[data-slot="tabs-trigger"]')) {
      ro.observe(el)
    }

    window.addEventListener("resize", measure)
    return () => {
      mo.disconnect()
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "relative inline-flex h-9 w-fit items-center justify-center gap-0.5 rounded-lg bg-[var(--color-surface-muted)] p-[3px] text-[var(--color-text-soft)]",
        className,
      )}
      {...props}
    >
      {pill.width > 0 ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-0 rounded-md bg-[var(--color-surface)] shadow-sm"
          initial={false}
          animate={{
            left: pill.left,
            top: pill.top,
            width: pill.width,
            height: pill.height,
          }}
          transition={pillSpring}
        />
      ) : null}
      {children}
    </TabsPrimitive.List>
  )
}

const triggerClassName = cn(
  "relative z-10 inline-flex h-[calc(100%-1px)] shrink-0 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap outline-none transition-colors duration-200",
  "text-[var(--color-text-soft)]",
  "hover:text-[var(--color-text)]",
  "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]",
  "disabled:pointer-events-none disabled:opacity-50",
  "data-[state=active]:text-[var(--color-text)]",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
)

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(triggerClassName, className)}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
