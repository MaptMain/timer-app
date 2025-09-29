"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
import { isSoundEnabled, setSoundEnabled, isVibrationEnabled, setVibrationEnabled } from "@/services/sound"
import { PageWrapper } from "@/components/page-wrapper"

export default function Settings() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const [sound, setSound] = useState(true)
  const [vibration, setVibration] = useState(true)

  useEffect(() => {
    setSound(isSoundEnabled())
    setVibration(isVibrationEnabled())
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const toggleSound = (enabled: boolean) => {
    setSound(enabled)
    setSoundEnabled(enabled)
  }

  const toggleVibration = (enabled: boolean) => {
    setVibration(enabled)
    setVibrationEnabled(enabled)
  }

  return (
    <PageWrapper>
      <div className="flex flex-col flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="flex-1">
          <div className="space-y-4">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium">Sound</h2>
                <p className="text-muted-foreground">Timer completion sound</p>
              </div>
              <Switch checked={sound} onCheckedChange={toggleSound} />
            </div>

            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium">Vibration</h2>
                <p className="text-muted-foreground">Vibrate on timer completion</p>
              </div>
              <Switch checked={vibration} onCheckedChange={toggleVibration} />
            </div>

            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium">Dark Mode</h2>
                <p className="text-muted-foreground">Toggle dark/light theme</p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
          </div>
        </div>

        <footer className="app-footer">
          <button className="footer-button" onClick={() => router.push("/home")}>
            back
          </button>
          <a href="https://travisalan.co" target="_blank" rel="noopener noreferrer" className="footer-button">
            by travis dykes
          </a>
        </footer>
      </div>
    </PageWrapper>
  )
}

