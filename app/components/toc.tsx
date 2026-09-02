"use client"

import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import * as stylex from "@stylexjs/stylex"

import { styles } from "@/app/styles/ui"

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
    <div {...stylex.props(styles.tocWrap)}>
      <ul {...stylex.props(styles.tocList)}>
        {!isAccordion ? (
          <span
            aria-hidden
            {...stylex.props(styles.tocDot(dot.top, dot.left))}
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
              {...stylex.props(styles.tocItem(depth * 12 + 24))}
            >
              <a
                href={item.url}
                {...stylex.props(
                  styles.tocLink,
                  isAccordion ? styles.tocLinkAccordion : styles.tocLinkSidebar,
                  isActive ? styles.tocLinkActive : styles.tocLinkIdle,
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
      <nav aria-hidden {...stylex.props(styles.box, styles.tocMobile)}>
        <div {...stylex.props(styles.tocMobileHead)}>
          <span {...stylex.props(styles.tocLabel)}>On this page</span>
          <ChevronDown {...stylex.props(styles.tocChevron)} aria-hidden />
        </div>
      </nav>
    )
  }

  return (
    <>
      <aside {...stylex.props(styles.tocSidebar)}>
        <nav {...stylex.props(styles.box, styles.tocNav)} aria-label="On this page">
          <TocList toc={tocItems} activeIndex={activeIndex} />
        </nav>
      </aside>

      <nav
        {...stylex.props(styles.box, styles.tocMobile)}
        aria-label="On this page"
      >
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          {...stylex.props(styles.tocMobileBtn)}
        >
          <span {...stylex.props(styles.tocLabel)}>On this page</span>
          <ChevronDown
            {...stylex.props(
              styles.tocChevron,
              mobileOpen && styles.tocChevronOpen,
            )}
            aria-hidden
          />
        </button>
        {mobileOpen ? (
          <div {...stylex.props(styles.tocAccordionBody)}>
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
