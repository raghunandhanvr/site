import Link from "next/link"
import { NameTransition } from "./name-transition"
import { NavItems } from "./nav-items"

export function Navbar() {
  return (
    <nav className="lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center relative">
          <Link href="/" className="text-3xl font-semibold tracking-tight inline-block">
            <NameTransition />
          </Link>
        </div>
        <NavItems />
      </div>
    </nav>
  );
}