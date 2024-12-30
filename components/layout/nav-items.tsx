import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";

const navItems = {
  "/b": { name: "Blog" },
  "/w": { name: "Work" },
};

export function NavItems() {
  return (
    <div className="grow justify-end items-center flex gap-1 md:gap-3">
      {Object.entries(navItems).map(([path, { name }]) => (
        <Link
          key={path}
          href={path}
          className="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
        >
          {name}
        </Link>
      ))}
      <ThemeSwitch />
    </div>
  );
}