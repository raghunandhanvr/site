import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function ClientMermaidDiagram({ children, theme }) {
  const ref = useRef(null);

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
