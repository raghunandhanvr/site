import type React from "react"

/**
 * Individual posts only; the writings list lives on the home page (`/`).
 * Full-bleed doc-style pages without the global site Header.
 */
export default function WritingsArticleRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 min-w-0 w-full max-w-full -mt-12 sm:-mt-16 [-webkit-tap-highlight-color:transparent]">
      {children}
    </main>
  )
}
