"use client"

import { useState } from "react"

interface TabsProps {
  tabs: string[]
  children: React.ReactNode[]
}

export function Tabs({ tabs, children }: TabsProps) {
  const [activeCategory, setActiveCategory] = useState(tabs[0])
  const activeIndex = tabs.indexOf(activeCategory)

  return (
    <div className="space-y-6">
      <div className="hide-scrollbar flex gap-2 overflow-x-auto border-b border-[var(--color-border)]">
        {tabs.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap text-left ${
              activeCategory === category
                ? "border-b-2 border-[var(--color-text)] text-[var(--color-text)]"
                : "text-[var(--color-text-soft)] hover:text-[var(--color-text-muted)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {children[activeIndex]}
      </div>
    </div>
  )
}

