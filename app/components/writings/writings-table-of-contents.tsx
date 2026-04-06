"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { cn } from "@/app/lib/utils"

const ARTICLE_SELECTOR = "[data-writings-article]"

/** Depth: h2 → 2, h3 → 3 (offset for sidebar dot + indent). */
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
  const [, setMeasureTick] = useState(0)
  const isAccordion = variant === "accordion"

  useLayoutEffect(() => {
    if (isAccordion) return
    setMeasureTick((t) => t + 1)
  }, [toc, activeIndex, isAccordion])

  const safeIndex = Math.min(
    Math.max(0, activeIndex),
    Math.max(0, toc.length - 1),
  )
  const depthNow = toc[safeIndex]?.depth ?? 2

  return (
    <div className="relative">
      <ul className="relative flex flex-col text-sm">
        {!isAccordion ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute size-3 rounded-full bg-[var(--color-toc-active)]"
            initial={false}
            animate={{
              left: 2 + (depthNow - 2) * 12,
              top:
                itemRefs.current[safeIndex] != null
                  ? itemRefs.current[safeIndex]!.offsetTop +
                    itemRefs.current[safeIndex]!.offsetHeight / 2
                  : 0,
              y: "-50%",
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        ) : null}

        {toc.map((item, index) => {
          const depth = item.depth - 2
          const isActive = !isAccordion && index === safeIndex

          return (
            <li
              key={item.url}
              ref={(el) => {
                if (!isAccordion) {
                  itemRefs.current[index] = el
                }
              }}
              className="relative"
              style={{
                paddingLeft: `${depth * 12 + 24}px`,
              }}
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

export function WritingsTableOfContents() {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: string }[]
  >([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const collect = useCallback(() => {
    const container = document.querySelector(ARTICLE_SELECTOR)
    if (!container) return []

    const isElementVisible = (el: Element) => {
      const element = el as HTMLElement
      const style = window.getComputedStyle(element)
      if (style.display === "none" || style.visibility === "hidden")
        return false
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    }

    const found = Array.from(container.querySelectorAll("h2, h3"))
      .filter((heading) => heading.id && isElementVisible(heading))
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent?.trim() || "",
        level: heading.tagName.toLowerCase(),
      }))

    const seen = new Set<string>()
    return found.filter((h) => {
      if (seen.has(h.id)) return false
      seen.add(h.id)
      return true
    })
  }, [])

  const tocItems: TocItem[] = useMemo(
    () =>
      headings.map((h) => ({
        url: `#${h.id}`,
        title: h.text,
        depth: h.level === "h2" ? 2 : 3,
      })),
    [headings],
  )

  const activeIndex = useMemo(() => {
    if (!activeId || tocItems.length === 0) return 0
    const idx = tocItems.findIndex((item) => item.url === `#${activeId}`)
    return idx >= 0 ? idx : 0
  }, [activeId, tocItems])

  useEffect(() => {
    setHeadings(collect())
  }, [collect, pathname])

  useEffect(() => {
    const root = document.querySelector(ARTICLE_SELECTOR)
    if (!root) return

    const ro = new MutationObserver(() => {
      setHeadings(collect())
    })
    ro.observe(root, { childList: true, subtree: true, characterData: true })

    return () => {
      ro.disconnect()
    }
  }, [collect, pathname])

  useEffect(() => {
    if (tocItems.length === 0) return

    const offset = 112
    /** When the document cannot scroll further, headings never reach `offset`; pin to last item. */
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

      let active = tocItems[0] ? tocItems[0].url.slice(1) : null
      for (const item of tocItems) {
        const id = item.url.slice(1)
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= offset) active = id
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
    return null
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
