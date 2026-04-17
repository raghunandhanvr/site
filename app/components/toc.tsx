"use client"

import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/app/lib/utils"

const ARTICLE_SELECTOR = "[data-writings-article]"

type TocItem = { url: string; title: string; depth: number }

function TocList({
  toc,
  activeIndex,
  variant = "sidebar",
}: {
  toc: TocItem[]
  activeIndex: number
  variant?: "sidebar" | "accordion"
}) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [dot, setDot] = useState({ top: 0, left: 2 })
  const isAccordion = variant === "accordion"

  const safeIndex = Math.min(
    Math.max(0, activeIndex),
    Math.max(0, toc.length - 1),
  )

  useEffect(() => {
    if (isAccordion) return
    const el = itemRefs.current[safeIndex]
    if (!el) return
    const depth = (toc[safeIndex]?.depth ?? 2) - 2
    setDot({ top: el.offsetTop + el.offsetHeight / 2, left: 2 + depth * 12 })
  }, [safeIndex, toc, isAccordion])

  return (
    <div className="relative">
      <ul className="relative flex flex-col text-sm">
        {!isAccordion ? (
          <span
            aria-hidden
            className="pointer-events-none absolute size-3 rounded-full bg-[var(--color-toc-active)] transition-[top,left] duration-300 ease-out"
            style={{
              top: dot.top,
              left: dot.left,
              transform: "translateY(-50%)",
            }}
          />
        ) : null}

        {toc.map((item, index) => {
          const depth = item.depth - 2
          const isActive = !isAccordion && index === safeIndex

          return (
            <li
              key={item.url}
              ref={(el) => {
                if (!isAccordion) itemRefs.current[index] = el
              }}
              className="relative"
              style={{ paddingLeft: `${depth * 12 + 24}px` }}
            >
              <a
                href={item.url}
                className={cn(
                  "writings-toc-link block no-underline transition-colors duration-200",
                  isAccordion ? "py-0.5 leading-snug" : "py-1.5",
                  isActive
                    ? "font-medium text-[var(--color-toc-active)]"
                    : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]",
                )}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function TableOfContents() {
  const pathname = usePathname()
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const container = document.querySelector(ARTICLE_SELECTOR)
    if (!container) return

    const items: TocItem[] = []
    const seen = new Set<string>()
    container.querySelectorAll<HTMLElement>("h2, h3").forEach((h) => {
      if (!h.id || seen.has(h.id)) return
      seen.add(h.id)
      items.push({
        url: `#${h.id}`,
        title: h.textContent?.trim() ?? "",
        depth: h.tagName === "H2" ? 2 : 3,
      })
    })
    setTocItems(items)
  }, [pathname])

  const activeIndex = useMemo(() => {
    if (!activeId || tocItems.length === 0) return 0
    const idx = tocItems.findIndex((item) => item.url === `#${activeId}`)
    return idx >= 0 ? idx : 0
  }, [activeId, tocItems])

  useEffect(() => {
    if (tocItems.length === 0) return

    const offset = 112
    const bottomThresholdPx = 120

    const updateActive = () => {
      const docEl = document.documentElement
      const scrollTop = window.scrollY
      const vp = window.innerHeight
      const docH = docEl.scrollHeight
      const scrollable = docH > vp + 48
      const nearBottom =
        scrollable && scrollTop + vp >= docH - bottomThresholdPx

      if (nearBottom) {
        setActiveId(tocItems[tocItems.length - 1]!.url.slice(1))
        return
      }

      let active = tocItems[0]!.url.slice(1)
      for (const item of tocItems) {
        const id = item.url.slice(1)
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) active = id
      }
      setActiveId(active)
    }

    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("resize", updateActive, { passive: true })
    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("resize", updateActive)
    }
  }, [tocItems])

  if (tocItems.length === 0) {
    return (
      <nav
        aria-hidden
        className="mb-10 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] 2xl:hidden"
      >
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm text-[var(--color-text-soft)]">
          <span className="font-medium">On this page</span>
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        </div>
      </nav>
    )
  }

  return (
    <>
      <aside className="pointer-events-none fixed left-8 top-32 z-20 hidden w-64 2xl:block">
        <nav
          className="pointer-events-auto max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 toc-scrollbar"
          aria-label="On this page"
        >
          <TocList toc={tocItems} activeIndex={activeIndex} />
        </nav>
      </aside>

      <nav
        className="mb-10 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] 2xl:hidden"
        aria-label="On this page"
      >
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-text)]"
        >
          <span className="font-medium">On this page</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform duration-200",
              mobileOpen && "rotate-180",
            )}
            aria-hidden
          />
        </button>
        {mobileOpen ? (
          <div className="border-t border-[var(--color-border)] px-1 py-5">
            <TocList
              toc={tocItems}
              activeIndex={activeIndex}
              variant="accordion"
            />
          </div>
        ) : null}
      </nav>
    </>
  )
}
