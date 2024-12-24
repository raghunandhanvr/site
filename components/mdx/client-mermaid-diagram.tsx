'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

interface ClientMermaidDiagramProps {
  children: React.ReactNode;
}

export default function ClientMermaidDiagram({ children }: ClientMermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
    });

    if (ref.current) {
      mermaid.init(undefined, ref.current);
    }
  }, [children, theme]);

  return (
    <div className="mermaid" ref={ref}>
      {children}
    </div>
  );
}