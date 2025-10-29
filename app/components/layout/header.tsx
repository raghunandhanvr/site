import Link from "next/link"
import { Logo } from "../ui/logo"
import { Breadcrumbs } from "../ui/breadcrumbs"
import { siteConfig } from "@/app/config"

const navItems = [
  { name: "about", path: "/" },
  { name: "works", path: "/work" },
  { name: "writings", path: "/writings" },
]

function XIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" className="inline-flex fill-current" width={12} height={12} {...props}>
      <g>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
      </g>
    </svg>
  );
}

export default async function Header() {
  'use cache'
  
  return (
    <>
      <div className="mb-10">
        <header className="mb-8 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-auto">
              <Logo />
            </div>

            <nav className="text-sm">
              <ul className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <li key={item.name} className="group">
                    <Link
                      href={item.path}
                      className="work-link font-normal text-gray-600"
                    >
                      <span className="group-hover:bg-gray-200 transition-all py-0.5 px-1.5 inline-block">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="group">
                  <a
                    href="https://raghu.app/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-link font-normal text-gray-600"
                  >
                    <span className="group-hover:bg-gray-200 transition-all py-0.5 px-1.5 inline-block">
                      resume
                    </span>
                  </a>
                </li>
                <li className="group">
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-link"
                  >
                    <span className="group-hover:bg-gray-200 transition-all py-0.5 px-1.5 inline-flex items-center gap-1 text-gray-600 font-normal">
                      <XIcon />
                      <span>Follow me</span>
                    </span>
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