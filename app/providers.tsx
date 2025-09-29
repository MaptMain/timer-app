"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider defaultTheme="light" attribute="class">
        {children}
      </ThemeProvider>
    </Suspense>
  )
}

