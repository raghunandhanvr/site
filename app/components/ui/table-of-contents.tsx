"use client";

import { cn } from "@/app/lib/utils";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

function TOCInner() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: string }[]
  >([]);
  const [visibleHeadings, setVisibleHeadings] = useState<Set<string>>(
    new Set(),
  );
  const [isOpen, setIsOpen] = useState(false);

  const getHeadings = useCallback(() => {
    const container = document.querySelector("main.container");
    if (!container) return [];

    const isElementVisible = (el: Element) => {
      const element = el as HTMLElement;
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden")
        return false;
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const found = Array.from(container.querySelectorAll("h1, h2, h3"))
      .filter((heading) => heading.id && isElementVisible(heading))
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase(),
      }));

    // Ensure unique by id (defensive against duplicates during transitions)
    const seen = new Set<string>();
    return found.filter((h) => {
      if (seen.has(h.id)) return false;
      seen.add(h.id);
      return true;
    });
  }, []);

  useEffect(() => {
    const collectedHeadings = getHeadings();
    setHeadings(collectedHeadings);
    setVisibleHeadings(new Set());
  }, [getHeadings]);

  useEffect(() => {
    if (!headings.length) return;

    const observerOptions = { root: null, threshold: 0 } as const;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      setVisibleHeadings((prev) => {
        const next = new Set(prev);
        for (const entry of entries) {
          const headingId = (entry.target as HTMLElement).id;
          if (!headingId) continue;
          if (entry.isIntersecting) next.add(headingId);
          else next.delete(headingId);
        }
        return next;
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );
    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const scroll = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.setAttribute("data-highlight", "false");
    void element.offsetWidth;
    element.setAttribute("data-highlight", "true");

    const top = element.offsetTop - 20;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const hasHeadings = useMemo(() => headings.length > 1, [headings.length]);

  if (!hasHeadings) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="article-toc my-8 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)]"
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:text-[var(--color-text-muted)]"
      >
        <h3 className="text-sm font-medium text-[var(--color-text-soft)]">
          Table of Contents
        </h3>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-[var(--color-text-soft)] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="px-4 py-3">
          <div className="flex flex-col">
            {headings.slice(1).map((heading) => (
              <button
                key={heading.id}
                type="button"
                onClick={() => scroll(heading.id)}
                className={cn(
                  "block w-full cursor-pointer py-1 text-left text-sm transition-colors",
                  "text-[var(--color-text-muted)] hover:text-[var(--color-text-soft)]",
                  visibleHeadings.has(heading.id) && "font-medium text-[var(--color-text)]",
                  heading.level === "h2" && "pl-4",
                  heading.level === "h3" && "pl-7",
                )}
                data-active={visibleHeadings.has(heading.id) ? "true" : "false"}
              >
                {heading.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}

export const TableOfContents = () => {
  const pathname = usePathname();
  return <TOCInner key={pathname} />;
};
