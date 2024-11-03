import React from "react";
import type { Metadata } from "next";
import { projects } from "./project-data";
import { socialLinks } from "../config";

export const metadata: Metadata = {
  title: "Projects",
  description: "My Projects",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">I love to build!</h1>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group hover:opacity-80 transition-opacity duration-200"
          >
            <div className="flex flex-col">
              <div className="w-full flex justify-between items-baseline">
                <span className="text-black dark:text-white font-medium tracking-tight">
                  {project.title}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                  {project.year}
                </span>
              </div>
              <p className="prose prose-neutral dark:prose-invert pt-3">
                {project.description}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                Tech Stack: {project.techStack}
              </p>
            </div>
          </a>
        ))}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-10">
          Checkout some of my simple works on my {" "}  
          <a href={socialLinks.github} target="_blank" className="underline"> GitHub.</a>
      </p>
    </section>
  );
}
