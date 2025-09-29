"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

export function Header() {
  const { theme } = useTheme()

  const logoUrl =
    theme === "dark"
      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/timer-logo-dark-mode-wVMWxnfnD0LWJbVrnLVYpryEUdMDuy.png"
      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/timer-logo-EQxGDfOUmeE31IiITPlqxmNSVEjpev.png"

  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center px-4 bg-background/80 backdrop-blur-sm border-b border-border z-10">
      <Link href="/home" className="flex items-center gap-2">
        <Image src={logoUrl || "/placeholder.svg"} alt="Timer Logo" width={32} height={32} priority />
        <span className="text-xl font-bold">timer</span>
      </Link>
    </header>
  )
}

