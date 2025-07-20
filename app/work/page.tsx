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
  const groupedWorks = works.reduce((acc, work) => {
    if (!acc[work.category]) {
      acc[work.category] = []
    }
    acc[work.category].push(work)
    return acc
  }, {} as Record<string, typeof works>)

  const categoryOrder = [
    'Publication', 
    'Work Experience',
    'Internship',
    'Security Research',
    'Leadership',
    'Side Project',
    'Freelancing'
  ]

  return (
    <section className="container">
      <div className="space-y-8">
        {categoryOrder.map((category) => {
          const categoryWorks = groupedWorks[category]
          if (!categoryWorks || categoryWorks.length === 0) return null

          return (
            <div key={category}>
              <h2 className="text-base font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {category}
              </h2>
              <div className="space-y-6">
                {categoryWorks.map((work, index) => (
                  <div key={index}>
                    <Link
                      href={work.url}
                      className="block hover:opacity-80 transition-opacity duration-200 work-link"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-gray-900 font-medium text-sm">
                          {work.title}
                        </h3>
                        <span className="text-xs text-gray-500 font-medium ml-4">
                          {work.year}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-3">
                        {work.techStack}
                      </div>
                      <ul className="text-gray-700 text-sm space-y-1 ml-4">
                        {work.description.map((item, idx) => (
                          <li key={idx} className="relative">
                            <span className="absolute -left-4">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}
