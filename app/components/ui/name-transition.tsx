import { siteConfig } from "@/app/config";
import Link from "next/link";

export function NameTransition() {
  return (
    <h1 className="font-medium pt-12">
      <Link href="/" className="work-link">
        <span className="sr-only">{siteConfig.name}</span>
        <span aria-hidden="true" className="block overflow-hidden group relative">
          <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full">
            {siteConfig.name}
          </span>
          <span className="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
            raghu
          </span>
        </span>
      </Link>
    </h1>
  );
}