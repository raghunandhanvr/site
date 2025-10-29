"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense } from "react"

export function Breadcrumbs() {
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
  const showBreadcrumb = pathname !== '/'

  if (!showBreadcrumb) return null

  return (
    <Suspense fallback={<div>...</div>}>
      <nav className="text-[11px] text-gray-400 -mt-4 sm:-mt-8">
        <ol className="flex items-center">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && <span className="mx-1 opacity-50">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-600 font-normal">{crumb.name}</span>
              ) : (
                <Link href={crumb.path} className="work-link hover:text-gray-700 transition-colors">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </Suspense>
  )
}

