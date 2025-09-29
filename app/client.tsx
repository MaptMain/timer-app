"use client"
import type React from "react"
import "./globals.css"
import { DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Head from "next/head"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
})

export const metadata = {
  title: "Timer App",
  description: "A minimalist timer application",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#ffffff",
  appleWebAppCapable: "yes",
  appleWebAppStatusBarStyle: "default",
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <body className={`${dmSans.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider defaultTheme="light" attribute="class" defaultSystemTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </>
  )
}

