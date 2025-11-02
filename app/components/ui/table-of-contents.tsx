"use client";

import { cn } from "@/app/lib/utils";

import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function TOCInner() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: string }[]>([]);
  const [visibleHeadings, setVisibleHeadings] = useState<Set<string>>(new Set());
  const [shouldShow, setShouldShow] = useState(false);

  const getHeadings = useCallback(() => {
    const container = document.querySelector('main.container');
    if (!container) return [];

    const isElementVisible = (el: Element) => {
      const element = el as HTMLElement;
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") return false;
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

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [headings]);


  useEffect(() => {
    const checkOverlap = () => {
      const container = document.querySelector('main.container');
      if (!container) {
        setShouldShow(false);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      const tocWidth = 280;
      const tocMargin = 96;
      const tocTotalWidth = tocWidth + tocMargin;
      
      const rightSpace = viewportWidth - (containerRect.right);
      
      setShouldShow(rightSpace >= tocTotalWidth);
    };

    checkOverlap();
    window.addEventListener('resize', checkOverlap);
    
    const timer = setTimeout(checkOverlap, 100);

    return () => {
      window.removeEventListener('resize', checkOverlap);
      clearTimeout(timer);
    };
  }, []);

  const scroll = (id: string) => {
    for (const heading of Array.from(document.querySelectorAll("h1, h2, h3"))) {
      heading.setAttribute("data-highlight", "false");
    }

    const element = document.getElementById(id);

    if (element) {
      const top = element.offsetTop - 20;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });

      element.setAttribute("data-highlight", "true");

      setTimeout(() => {
        element.setAttribute("data-highlight", "false");
      }, 2000);
    }
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <React.Fragment>
      <motion.nav
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        exit={{ opacity: 0, }}     
        className={cn(
          "fixed top-[6rem] right-[1.3rem] mt-10 h-full justify-start space-y-4 transition",
          "max-w-xs w-auto z-20",
        )}
      >
        <div className="mt-0 flex flex-col gap-0">
          {headings.map((heading) => (
            <div key={heading.id} className="mt-0">
              <button
                type="button"
                onClick={() => scroll(heading.id)}
                className={cn({
                  "mt-0 ml-2 border-l border-l-gray-400 py-1 text-left text-gray-600 opacity-100 transition ease-in-out hover:opacity-50 text-sm cursor-pointer": true,
                  "text-bold text-gray-900": visibleHeadings.has(heading.id),
                  "pl-4": heading.level === "h1",
                  "pl-8": heading.level === "h2",
                  "pl-12": heading.level === "h3",
                  "border-l border-l-gray-900": visibleHeadings.has(heading.id),
                })}
                data-active={visibleHeadings.has(heading.id) ? "true" : "false"}
              >
                {heading.text}
              </button>
            </div>
          ))}
        </div>
      </motion.nav>
    </React.Fragment>
  );
}

export const TableOfContents = () => {
  const pathname = usePathname();
  return <TOCInner key={pathname} />;
};