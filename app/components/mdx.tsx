'use client'

import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import Image from "next/image";
import { highlight } from "sugar-high";
import ClientMermaidDiagram from './client-mermaid-diagram';
import { useTheme } from 'next-themes';

const MDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), {
  ssr: false,
  loading: () => <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
  </div>
});

function CustomLink(props) {
  let href = props.href;
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return <a {...props} />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, className, ...props }) {
  const { theme } = useTheme();
  const language = className?.replace('language-', '');

  if (language === 'mermaid') {
    return <ClientMermaidDiagram theme={theme}>{children}</ClientMermaidDiagram>;
  }

  let codeHTML = highlight(children);
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className={className}
      {...props}
    />
  );
}

function getComponents(theme) {
  return {
    Image: RoundedImage,
    a: CustomLink,
    code: props => <Code {...props} theme={theme} />
  };
}

export function MDXContent({ source }) {
  const { theme } = useTheme();

  return (
    <div className="mdx">
      <MDXRemote {...source} components={getComponents(theme)} />
    </div>
  );
}
