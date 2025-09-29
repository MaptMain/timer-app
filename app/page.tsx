"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main screen after 2 seconds
    const timer = setTimeout(() => {
      router.push("/home")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ marginTop: 0 }}>
      <div className="flex flex-col items-center justify-center flex-1">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/timer-logo-EQxGDfOUmeE31IiITPlqxmNSVEjpev.png"
          alt="Timer Logo"
          width={150}
          height={150}
          priority
        />
        <h1 className="mt-4 text-5xl font-bold">timer</h1>
      </div>
      <div className="flex justify-between w-full p-4">
        <span className="text-gray-400">v0.1.0.0</span>
        <a
          href="https://travisalan.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          by travis dykes
        </a>
      </div>
    </div>
  )
}

