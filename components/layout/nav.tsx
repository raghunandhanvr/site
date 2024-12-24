import Link from "next/link";
import { NameTransition } from "@/components/name-transition";
import { NavItems } from "@/components/layout/nav-items";

export function Navbar() {
  return (
    <nav className="lg:mb-2 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center relative">
          <Link href="/" className="text-3xl font-semibold tracking-tight inline-block overflow-hidden">
            <NameTransition />
          </Link>
        </div>
        <NavItems />
      </div>
    </nav>
  );
}