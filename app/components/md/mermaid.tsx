'use client'

import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface SimpleMermaidDiagramProps {
  diagram: string
}

const SimpleMermaidDiagram: React.FC<SimpleMermaidDiagramProps> = ({ diagram }) => {
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        themeVariables: {
          background: 'transparent',
        },
      })
      mermaid.contentLoaded()
    }
  }, [diagram])

  return (
    <div className="flex justify-center items-center overflow-x-auto">
      <div ref={mermaidRef} className="mermaid">
        {diagram}
      </div>
    </div>
  )
}

export default SimpleMermaidDiagram
