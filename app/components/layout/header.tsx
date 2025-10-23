import Link from "next/link"
import { NameTransition } from "../ui/name-transition"
import { Breadcrumbs } from "../ui/breadcrumbs"

const navItems = [
  { name: "about", path: "/" },
  { name: "works", path: "/work" },
  { name: "writings", path: "/writings" },
]

export default async function Header() {
  'use cache'
  
  return (
    <>
      <div className="mb-6">
        <header className="mb-8 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-auto">
              <NameTransition />
            </div>

            <nav className="text-sm">
              <ul className="flex space-x-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="work-link transition-colors hover:text-blue-600 font-normal text-gray-600"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
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

        <Breadcrumbs />
      </div>
    </>
  )
}