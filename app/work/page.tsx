import { works } from "./work-data";
import { CategoryBadge, CurrentTag } from "./work-data";
import type { Metadata } from "next";
import { AnimatedName } from "../components/animated-name";
import { Link } from 'next-view-transitions';

export const metadata: Metadata = {
  title: "Work",
  description: "My Works",
  openGraph: {
    images: [
      {
        url: `/api/og?title=My+Works`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: '/work',
  },
};

export default function Works() {
  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="font-medium pt-12 mb-0 fade-in">Works</h1>
      <AnimatedName />
      <div className="space-y-8 mt-8">
        {works.map((work, index) => (
          <div key={index} className="group">
            <Link
              href={work.url}
              className="block hover:opacity-80 transition-opacity duration-200"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <h2 className="text-gray-800 font-medium mb-1 sm:mb-0">
                      {work.title}
                    </h2>
                    <div className="flex items-center sm:ml-2">
                      <CategoryBadge category={work.category} />
                      {work.current && <CurrentTag />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 mt-1 sm:mt-0">
                    {work.year}
                  </span>
                </div>
                <p className="text-neutral-700 text-sm">
                  {work.description}
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Tech Stack:</span> {work.techStack}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

