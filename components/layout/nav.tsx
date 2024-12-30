import Link from "next/link";
import { NameTransition } from "@/components/name-transition";
import { NavItems } from "@/components/layout/nav-items";

export function Navbar() {
  return (
    <nav className="flex mt-4 sm:mt-0 items-center">
      <div className="flex items-center relative">
        <Link href="/" className="text-3xl font-semibold tracking-tight inline-block overflow-hidden">
          <NameTransition />
        </Link>
      </div>
      <NavItems />
    </nav>
  );
}

