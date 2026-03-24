"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

function BreadcrumbsComponent() {
  const pathname = usePathname()
  
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ name: 'home', path: '/' }]
    
    paths.forEach((path, index) => {
      const fullPath = '/' + paths.slice(0, index + 1).join('/')
      let name = path
      
      if (path === 'work') name = 'works'
      else if (path === 'writings') name = 'writings'
      else name = path.replace(/-/g, ' ')
      
      breadcrumbs.push({ name, path: fullPath })
    })
    
    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav className="mt-[-1rem] text-[11px] text-[var(--color-text-soft)] sm:mt-[-2rem]">
      <ol className="flex items-center">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && <span className="mx-1 opacity-50">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-normal text-[var(--color-text-muted)]">{crumb.name}</span>
            ) : (
              <Link
                href={crumb.path}
                className="work-link transition-colors hover:text-[var(--color-text)]"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

const breadcrumbsPlaceholder = (
  <nav
    className="mt-[-1rem] text-[11px] text-[var(--color-text-soft)] sm:mt-[-2rem]"
    aria-hidden
  >
    <ol className="flex items-center opacity-0">
      <li>home</li>
    </ol>
  </nav>
)

export function Breadcrumbs() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || pathname === '/') {
    return breadcrumbsPlaceholder
  }

  return <BreadcrumbsComponent />
}

