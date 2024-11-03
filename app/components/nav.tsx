'use client'

import Link from "next/link"
import { ThemeSwitch } from "./theme-switch"
import { metaData } from "../config"
import { useState } from 'react'

const navItems = {
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },

}

function NameTransition() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <h1 
      className="font-medium text-3xl transition-element"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="sr-only">{metaData.title}</span>
      <span aria-hidden="true" className="block overflow-hidden">
        <span 
          className={`inline-block transition-all duration-300 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          {metaData.title}
        </span>
        <span 
          className={`inline-block absolute left-0 transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          {metaData.name}
        </span>
      </span>
    </h1>
  )
}

export function Navbar() {
  return (
    <nav className="lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center relative">
          <Link href="/" className="text-3xl font-semibold tracking-tight inline-block">
            <NameTransition />
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
