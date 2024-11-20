'use client'

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function ClientMermaidDiagram({ children }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.run({ nodes: [ref.current!] });
  }, [children]);

  return (
    <div className="mermaid" ref={ref}>
      {children}
    </div>
  );
}