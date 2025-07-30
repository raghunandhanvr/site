"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, Breadcrumb } from "@/app/types";
import { routes } from "@/app/config";
import { kebabToTitle } from "@/app/lib/utils";
import { NameTransition } from "../ui/name-transition";

export default function Header() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: "about", path: routes.home },
    { name: "works", path: routes.work },
    { name: "writings", path: routes.writings },
  ];

  const generateBreadcrumbs = (): Breadcrumb[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [{ name: "home", path: routes.home }];

    paths.forEach((path, index) => {
      const fullPath = "/" + paths.slice(0, index + 1).join("/");
      let name = path;

      if (path === "work") {
        name = "works";
      } else if (path === "writings") {
        name = "writings";
      } else {
        name = kebabToTitle(path);
      }

      breadcrumbs.push({ name, path: fullPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const showBreadcrumb = pathname !== routes.home;

  const isActiveLink = (itemPath: string): boolean => {
    return itemPath === routes.home
      ? pathname === routes.home
      : pathname.startsWith(itemPath);
  };

  return (
    <div className="mb-10">
      <header className={`mb-8 ${showBreadcrumb ? "pt-2" : "pt-2"}`}>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-auto">
            <NameTransition />
          </div>

          <nav className="text-sm">
            <ul className="flex space-x-4">
              {navItems.map((item) => {
                const isActive = isActiveLink(item.path);

                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`work-link transition-colors hover:text-blue-600 ${
                        isActive
                          ? "font-[450] text-black"
                          : "font-normal text-gray-600"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href={routes.resume}
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
                {index > 0 && (
                  <span className="mx-1 opacity-50" aria-hidden="true">
                    /
                  </span>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span
                    className="text-gray-600 font-normal"
                    aria-current="page"
                  >
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="work-link hover:text-gray-700 transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}