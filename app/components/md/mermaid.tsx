'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  diagram: string
  theme?: 'default' | 'forest' | 'dark' | 'neutral'
  className?: string
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ diagram, theme = 'default', className = '' }) => {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: theme,
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      flowchart: {
        curve: 'basis',
        padding: 20,
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
      },
      themeVariables: {
        background: 'transparent',
        mainBkg: 'transparent',
        nodeBkg: 'transparent',
      },
    })

    const renderDiagram = async () => {
      if (mermaidRef.current) {
        try {
          const { svg } = await mermaid.render('mermaid-diagram', diagram)
          setSvg(svg)
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error)
        }
      }
    }

    renderDiagram()
  }, [diagram, theme])

  return (
    <div className={`flex justify-center items-center overflow-x-auto ${className}`}>
      <div
        ref={mermaidRef}
        className="mermaid"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  )
}

export default MermaidDiagram

