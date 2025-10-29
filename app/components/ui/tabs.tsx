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
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto hide-scrollbar">
        {tabs.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap text-left ${
              activeCategory === category
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
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

