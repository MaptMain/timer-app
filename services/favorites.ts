"use client"

export interface FavoriteTimer {
  id: string
  name: string
  minutes: number
}

export const getFavorites = (): FavoriteTimer[] => {
  if (typeof window === "undefined") return []

  const favorites = localStorage.getItem("favoriteTimers")
  return favorites ? JSON.parse(favorites) : []
}

export const addFavorite = (name: string, minutes: number): FavoriteTimer => {
  const favorites = getFavorites()
  const newFavorite = {
    id: Date.now().toString(),
    name,
    minutes,
  }

  localStorage.setItem("favoriteTimers", JSON.stringify([...favorites, newFavorite]))
  return newFavorite
}

export const removeFavorite = (id: string): void => {
  const favorites = getFavorites()
  const updatedFavorites = favorites.filter((fav) => fav.id !== id)
  localStorage.setItem("favoriteTimers", JSON.stringify(updatedFavorites))
}

