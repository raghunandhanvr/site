'use client'

import React, { useEffect, useRef, useState } from 'react'
import { LoadingComponent } from '@/app/components/ui/loader'

interface SimpleMermaidDiagramProps {
  diagram: string
}

const MermaidDiagram: React.FC<SimpleMermaidDiagramProps> = ({ diagram }) => {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true

    const renderDiagram = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        
        if (isMounted && mermaidRef.current) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            themeVariables: {
              background: 'transparent',
            },
            securityLevel: 'loose',
          })
          
          mermaidRef.current.innerHTML = ''
          
          const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`
          
          try {
            const { svg } = await mermaid.render(id, diagram)
            if (isMounted && mermaidRef.current) {
              mermaidRef.current.innerHTML = svg
              setIsLoaded(true)
            }
          } catch (err) {
            console.error('Mermaid rendering error:', err)
          }
        }
      } catch (err) {
        console.error('Mermaid loading error:', err)
      }
    }

    renderDiagram()

    return () => {
      isMounted = false
    }
  }, [diagram])

  return (
    <div className="flex justify-center items-center overflow-x-auto my-6">
      {!isLoaded && <LoadingComponent />}
      <div 
        ref={mermaidRef} 
        className={`mermaid-wrapper w-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      />
    </div>
  )
}

MermaidDiagram.displayName = 'MermaidDiagram'

export default MermaidDiagram
