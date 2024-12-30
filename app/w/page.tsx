import type { Metadata } from "next";
import { works, Work } from "@/data/work-data";
import { socialLinks } from "@/app/config";
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Laptop, Rocket, BookOpen, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: "Work",
  description: "My Works",
};

const categoryIcons = {
  "Work Experience": Briefcase,
  "Internship": GraduationCap,
  "Freelancing": Laptop,
  "Side Project": Rocket,
  "Publication": BookOpen,
};

const CategoryBadge: React.FC<{ category: Work['category'] }> = ({ category }) => (
  <Badge variant={category} icon={categoryIcons[category]} className="text-xs">
    {category}
  </Badge>
);

const CurrentTag: React.FC = () => (
  <Badge variant="current" icon={Star} className="text-xs ml-2">
    Current
  </Badge>
);

export default function Works() {
  return (
    <section className="mt-5">
      <div className="space-y-8">
        {works.map((work, index) => (
          <a
            key={index}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group hover:opacity-80 transition-opacity duration-200"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <h2 className="text-lg font-medium text-black dark:text-white">
                    {work.title}
                  </h2>
                  <div className="flex items-center mt-1 sm:mt-0 sm:ml-2">
                    <CategoryBadge category={work.category} />
                    {work.current && <CurrentTag />}
                  </div>
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 sm:mt-0">
                  {work.year}
                </span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {work.description}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Tech Stack:</span> {work.techStack}
              </p>
            </div>
          </a>
        ))}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-10">
        Check out some of my simple works on my {" "}  
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="underline">
          GitHub.
        </a>
      </p>
    </section>
  );
}

