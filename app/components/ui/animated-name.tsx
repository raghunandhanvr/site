import { Link } from 'next-view-transitions';
import { siteConfig } from "@/app/config";

export function AnimatedName() {
  return (
    <Link href="/" className="flex font-medium text-gray-400 fade-in">
      {siteConfig.name}
    </Link>
  );
}
