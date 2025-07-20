"use client";

import { usePathname } from 'next/navigation';
import { TableOfContents } from './table-of-contents';

export default function WritingsLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isWritingPage = pathname.startsWith('/writings/') && pathname !== '/writings';

  return (
    <>
      {children}
      {isWritingPage && <TableOfContents />}
    </>
  );
} 