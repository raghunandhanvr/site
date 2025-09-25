"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NameTransition } from "../ui/name-transition"

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "about", path: "/" },
    { name: "works", path: "/work" },
    { name: "writings", path: "/writings" },
  ]

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

  return (
    <>
    <div className="mb-10">
        <header className={`mb-8 ${showBreadcrumb ? 'pt-2' : 'pt-2'}`}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-auto">
              <NameTransition />
            </div>

            <nav className="text-sm">
              <ul className="flex space-x-4">
                {navItems.map((item) => {
                  const isActive =
                    item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        className={`work-link transition-colors hover:text-blue-600 ${
                          isActive ? "font-[450] text-black" : "font-normal text-gray-600"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
                <li>
                  <a
                    href="https://raghu.app/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-link transition-colors hover:text-blue-600 font-normal text-gray-600"
                  >
                    resume
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {showBreadcrumb && (
          <nav className="text-[11px] text-gray-400 -mt-4">
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
        )}
      </div>
    </>
  )
}