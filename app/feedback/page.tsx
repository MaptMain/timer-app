"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageWrapper } from "@/components/page-wrapper"

export default function Feedback() {
  const router = useRouter()
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    alert("Thank you for your feedback!")
    setFeedback("")
    router.push("/home")
  }

  return (
    <PageWrapper>
      <div className="flex flex-col flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6">Feedback</h1>

        <form onSubmit={handleSubmit} className="flex-1">
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-lg mb-2">
              Share your thoughts with us
            </label>
            <textarea
              id="feedback"
              className="w-full h-40 p-3 border rounded-lg"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What do you think about the app?"
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-black text-white rounded-lg text-lg font-medium">
            Submit Feedback
          </button>
        </form>

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

