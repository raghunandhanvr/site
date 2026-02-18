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

        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
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
            primaryColor: "#3b82f6",
            primaryTextColor: "#1f2937",
            primaryBorderColor: "#2563eb",
            lineColor: "#6b7280",
            secondaryColor: "#eff6ff",
            tertiaryColor: "#dbeafe",
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
            className="mermaid-container p-4 sm:p-6 rounded-lg"
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleMermaidDiagram;
