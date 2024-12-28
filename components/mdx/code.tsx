'use client'

import { useTheme } from 'next-themes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface ClientMermaidDiagramProps {
    children: React.ReactNode;
}

export default function Code({ children, className, ...props }) {
  const { resolvedTheme } = useTheme()
  const language = className?.replace('language-', '')

  if (language === 'mermaid') {
    return <_clientMermaidDiagram>{children}</_clientMermaidDiagram>
  }

  const style = resolvedTheme === 'dark' ? oneDark : oneLight

  const customStyle = {
    ...style,
    'pre[class*="language-"]': {
      ...style['pre[class*="language-"]'],
      background: 'transparent',
    },
    'code[class*="language-"]': {
      ...style['code[class*="language-"]'],
      background: 'transparent',
    },
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={customStyle}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  )
}
  
function _clientMermaidDiagram({ children }: ClientMermaidDiagramProps) {
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
        <div className="flex justify-center">
        <div className="mermaid" ref={ref}>
            {children}
        </div>
        </div>
    );
}