import { works } from "./work-data";
import { CategoryBadge, CurrentTag } from "./work-data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description: "Some of my works",
  openGraph: {
    images: [
      {
        url: `/api/og?title=Work+Experience`,
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
      <p className="text-sm text-gray-500 mb-8">Some of my works and industry experience</p>
      
      <div className="space-y-8">
        {works.map((work, index) => (
          <div key={index} className="group">
            <Link
              href={work.url}
              className="block hover:opacity-80 transition-opacity duration-200 work-link"
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
