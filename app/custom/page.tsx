"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronUp, ChevronDown, Star } from "lucide-react"
import { addFavorite } from "@/services/favorites"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PageWrapper } from "@/components/page-wrapper"

export default function CustomTimer() {
  const router = useRouter()
  const [minutes, setMinutes] = useState(10)
  const [isEditing, setIsEditing] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [favoriteName, setFavoriteName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const incrementMinutes = () => {
    setMinutes((prev) => Math.min(prev + 1, 60))
  }

  const decrementMinutes = () => {
    setMinutes((prev) => Math.max(prev - 1, 1))
  }

  const startTimer = () => {
    router.push(`/timer/${minutes}`)
  }

  const saveAsFavorite = () => {
    if (favoriteName.trim()) {
      addFavorite(favoriteName.trim(), minutes)
      setShowSaveDialog(false)
      setFavoriteName("")
      router.push("/home") // Navigate back to home after saving
    }
  }

  const handleNumberClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setMinutes(Math.min(Math.max(value, 1), 60))
    }
  }

  const handleInputBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setIsEditing(false)
      startTimer()
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center app-content p-4">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="flex flex-col items-center">
            <button className="p-4" onClick={incrementMinutes}>
              <ChevronUp size={48} />
            </button>

            <div className="text-[12rem] font-bold leading-none relative">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="number"
                  value={minutes}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full text-center bg-transparent border-none focus:outline-none focus:ring-0"
                  min="1"
                  max="60"
                  style={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    lineHeight: "inherit",
                    padding: 0,
                    margin: 0,
                    appearance: "textfield",
                  }}
                />
              ) : (
                <div onClick={handleNumberClick} className="cursor-text" role="button" tabIndex={0}>
                  {minutes}
                </div>
              )}
            </div>

            <button className="p-4" onClick={decrementMinutes}>
              <ChevronDown size={48} />
            </button>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="action-button" onClick={startTimer}>
              Start Timer
            </button>

            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <DialogTrigger asChild>
                <button
                  className="p-4 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  onClick={() => setShowSaveDialog(true)}
                >
                  <Star className="w-6 h-6" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save as Favorite</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Input
                      id="name"
                      placeholder="Name your timer"
                      value={favoriteName}
                      onChange={(e) => setFavoriteName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && favoriteName.trim()) {
                          saveAsFavorite()
                        }
                      }}
                      autoFocus
                    />
                  </div>
                  <button className="action-button w-full" onClick={saveAsFavorite}>
                    Save
                  </button>
                </div>
              </DialogContent>
            </Dialog>
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
    </PageWrapper>
  )
}

