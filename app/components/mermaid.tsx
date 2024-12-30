'use client'

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  diagram: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ diagram }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.init(
        {
          startOnLoad: true,
        },
        mermaidRef.current
      );
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div ref={mermaidRef} className="mermaid">
        {diagram}
      </div>
    </div>
  );
};

export default MermaidDiagram;