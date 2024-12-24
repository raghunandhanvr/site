import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";

const navItems = {
  "/blog": { name: "Blog" },
  "/work": { name: "Work" },
};

export function NavItems() {
  return (
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
  );
}