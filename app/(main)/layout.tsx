import type React from "react"

import { MainLayoutShell } from "@/app/(main)/main-layout-shell"
import { HeaderMainGap } from "@/app/components/layout/home-only"
import Header from "@/app/components/layout/header"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MainLayoutShell>
      <Header />
      <HeaderMainGap />
      {children}
    </MainLayoutShell>
  )
}
