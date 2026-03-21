"use client";

import React, { useEffect, useRef, useId } from "react";

interface SimpleMermaidDiagramProps {
  diagram: string;
}

const SimpleMermaidDiagram: React.FC<SimpleMermaidDiagramProps> = ({
  diagram,
}) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "");

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidRef.current) {
        // Clear previous content
        mermaidRef.current.innerHTML = "";

        const mermaid = (await import("mermaid")).default;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const rootStyles = getComputedStyle(document.documentElement);

        const colorValue = (name: string, fallback: string) =>
          rootStyles.getPropertyValue(name).trim() || fallback;

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            curve: "basis",
            padding: 20,
            nodeSpacing: 50,
            rankSpacing: 60,
          },
          sequence: {
            useMaxWidth: false,
            boxMargin: 20,
            boxTextMargin: 10,
            noteMargin: 15,
            messageMargin: 45,
          },
          themeVariables: {
            background: "transparent",
            primaryColor: colorValue("--color-accent-soft", prefersDark ? "#0f172a" : "#dbeafe"),
            primaryTextColor: colorValue("--color-text", prefersDark ? "#fafafa" : "#050505"),
            primaryBorderColor: colorValue("--color-accent", prefersDark ? "#60a5fa" : "#2563eb"),
            lineColor: colorValue("--color-border-strong", prefersDark ? "#404040" : "#d4d4d4"),
            secondaryColor: colorValue("--color-surface-muted", prefersDark ? "#0a0a0a" : "#f5f5f5"),
            tertiaryColor: colorValue("--color-surface-emphasis", prefersDark ? "#111111" : "#ededed"),
            mainBkg: colorValue("--color-surface-muted", prefersDark ? "#0a0a0a" : "#f5f5f5"),
            secondBkg: colorValue("--color-surface", prefersDark ? "#000000" : "#ffffff"),
            tertiaryBkg: colorValue("--color-surface-emphasis", prefersDark ? "#111111" : "#ededed"),
            primaryTextColorDark: colorValue("--color-text", prefersDark ? "#fafafa" : "#050505"),
            edgeLabelBackground: colorValue("--color-surface", prefersDark ? "#000000" : "#ffffff"),
            clusterBkg: colorValue("--color-surface-muted", prefersDark ? "#0a0a0a" : "#f5f5f5"),
            clusterBorder: colorValue("--color-border", prefersDark ? "#262626" : "#e5e5e5"),
            actorBkg: colorValue("--color-surface-muted", prefersDark ? "#0a0a0a" : "#f5f5f5"),
            actorBorder: colorValue("--color-border-strong", prefersDark ? "#404040" : "#d4d4d4"),
            actorTextColor: colorValue("--color-text", prefersDark ? "#fafafa" : "#050505"),
            signalColor: colorValue("--color-text", prefersDark ? "#fafafa" : "#050505"),
            signalTextColor: colorValue("--color-text", prefersDark ? "#fafafa" : "#050505"),
            labelBoxBkgColor: colorValue("--color-surface", prefersDark ? "#000000" : "#ffffff"),
            labelBoxBorderColor: colorValue("--color-border", prefersDark ? "#262626" : "#e5e5e5"),
            labelTextColor: colorValue("--color-text", prefersDark ? "#fafafa" : "#050505"),
            fontSize: "16px",
            fontFamily: "inherit",
          },
        });

        try {
          const { svg } = await mermaid.render(`mermaid-${uniqueId}`, diagram);
          mermaidRef.current.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid rendering error:", error);
          mermaidRef.current.innerHTML = `<pre>${diagram}</pre>`;
        }
      }
    };

    renderDiagram();
  }, [diagram, uniqueId]);

  return (
    <div className="mermaid-wrapper my-8 -mx-4 sm:-mx-6 md:mx-0 md:relative md:w-[calc(100vw-2rem)] md:left-1/2 md:-translate-x-1/2 lg:w-[min(100vw-4rem,1200px)]">
      <div
        className="overflow-x-auto overflow-y-hidden py-4 px-4 sm:px-6"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex justify-center min-w-max md:min-w-0">
          <div
            ref={mermaidRef}
            className="mermaid-container article-visual p-4 sm:p-6"
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleMermaidDiagram;
