"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Pause, Play } from "lucide-react"
import { playTimerCompleteSound, vibrateDevice } from "@/services/sound"
import { PageWrapper } from "@/components/page-wrapper"

export default function Timer({ params }: { params: { minutes: string } }) {
  const router = useRouter()
  const initialMinutes = Number.parseInt(params.minutes, 10) || 1 // Provide fallback value

  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [timerComplete, setTimerComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Format the time left into minutes and seconds
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  // Update current time
  useEffect(() => {
    if (!isClient) return

    const updateTime = () => {
      try {
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const formattedHours = hours % 12 || 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
        setCurrentTime(`${formattedHours}:${formattedMinutes}`)
      } catch (error) {
        console.error("Error updating time:", error)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [isClient])

  // Timer logic
  useEffect(() => {
    if (!isClient) return

    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && !timerComplete) {
      setIsRunning(false)
      setTimerComplete(true)

      try {
        playTimerCompleteSound()
        vibrateDevice()

        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
          new Notification("Timer Complete!", {
            body: `Your ${initialMinutes} minute timer has finished.`,
            icon: "/icon.png",
          })
        }
      } catch (error) {
        console.error("Error handling timer completion:", error)
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, timerComplete, initialMinutes, isClient])

  // Request notification permission
  useEffect(() => {
    if (!isClient) return

    try {
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
        Notification.requestPermission()
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error)
    }
  }, [isClient])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimeLeft(initialMinutes * 60)
    setIsRunning(false)
    setTimerComplete(false)
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return null
  }

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center app-content p-4">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-[12rem] font-bold leading-none relative">{minutes}</div>
          <div className="text-4xl font-bold mt-4">
            {minutes}:{formattedSeconds}
          </div>

          <button className="control-button mt-8" onClick={toggleTimer}>
            {isRunning ? (
              <>
                <Pause className="w-6 h-6 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-2" /> {timerComplete ? "Restart" : "Start"}
              </>
            )}
          </button>
        </div>
      </div>

      <footer className="app-footer">
        <button className="footer-button" onClick={() => router.push("/home")}>
          back
        </button>
        <a href="https://travisalan.co" target="_blank" rel="noopener noreferrer" className="footer-button">
          by travis dykes
        </a>
        <button className="footer-button" onClick={resetTimer}>
          reset
        </button>
      </footer>
    </PageWrapper>
  )
}

