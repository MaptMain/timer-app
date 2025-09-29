"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Star, X } from "lucide-react"
import { getFavorites, removeFavorite, type FavoriteTimer } from "@/services/favorites"
import { PageWrapper } from "@/components/page-wrapper"

export default function Home() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteTimer[]>([])

  const presets = [5, 10, 15, 20, 25]

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const startTimer = (minutes: number) => {
    router.push(`/timer/${minutes}`)
  }

  const openCustomTimer = () => {
    router.push("/custom")
  }

  const handleRemoveFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeFavorite(id)
    setFavorites(getFavorites())
  }

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center gap-6 px-2 py-6">
        {favorites.length > 0 && (
          <div className="w-full max-w-md flex-shrink-0">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2" /> Favorites
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {favorites.map((fav) => (
                <button key={fav.id} className="timer-button relative" onClick={() => startTimer(fav.minutes)}>
                  <span className="text-xs absolute top-2 left-3 text-muted-foreground">{fav.name}</span>
                  {fav.minutes}
                  <button
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-secondary-foreground/10"
                    onClick={(e) => handleRemoveFavorite(fav.id, e)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-md flex-shrink-0">
          <h2 className="text-xl font-bold mb-3">Presets</h2>
          <div className="grid grid-cols-2 gap-4">
            {presets.map((minutes) => (
              <button key={minutes} className="timer-button" onClick={() => startTimer(minutes)}>
                {minutes}
              </button>
            ))}
            <button className="timer-button" onClick={openCustomTimer}>
              <Plus size={48} />
            </button>
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <button className="footer-button" onClick={() => router.push("/feedback")}>
          feedback
        </button>
        <a href="https://travisalan.co" target="_blank" rel="noopener noreferrer" className="footer-button">
          by travis dykes
        </a>
        <button className="footer-button" onClick={() => router.push("/settings")}>
          settings
        </button>
      </footer>
    </PageWrapper>
  )
}

