"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md" onClick={() => reset()}>
          Try again
        </button>
        <button
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
          onClick={() => router.push("/home")}
        >
          Return home
        </button>
      </div>
    </div>
  )
}

