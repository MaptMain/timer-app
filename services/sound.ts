"use client"

class TimerSound {
  private audioContext: AudioContext | null = null
  private gainNode: GainNode | null = null
  private initialized = false
  private initializationPromise: Promise<void> | null = null

  private async createAudioContext() {
    if (!this.audioContext) {
      try {
        // Create context with suspended state for iOS
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        this.gainNode = this.audioContext.createGain()
        this.gainNode.connect(this.audioContext.destination)

        // Initialize audio context if needed
        if (this.audioContext.state === "suspended") {
          await this.initializeAudioContext()
        }
      } catch (error) {
        console.error("Failed to create audio context:", error)
      }
    }
  }

  private async initializeAudioContext() {
    if (!this.audioContext || this.initialized) return

    if (!this.initializationPromise) {
      this.initializationPromise = new Promise<void>((resolve) => {
        // Function to resume audio context
        const resumeAudioContext = async () => {
          try {
            if (this.audioContext?.state === "suspended") {
              await this.audioContext.resume()
            }
            this.initialized = true

            // Remove event listeners once initialized
            document.removeEventListener("touchstart", resumeAudioContext)
            document.removeEventListener("touchend", resumeAudioContext)
            document.removeEventListener("click", resumeAudioContext)

            resolve()
          } catch (error) {
            console.error("Failed to resume audio context:", error)
          }
        }

        // Add event listeners for user interaction
        document.addEventListener("touchstart", resumeAudioContext)
        document.addEventListener("touchend", resumeAudioContext)
        document.addEventListener("click", resumeAudioContext)
      })
    }

    return this.initializationPromise
  }

  private async playNote(frequency: number, startTime: number, duration: number, volume: number) {
    if (!this.audioContext || !this.gainNode) return

    try {
      const oscillator = this.audioContext.createOscillator()
      const noteGain = this.audioContext.createGain()

      oscillator.connect(noteGain)
      noteGain.connect(this.gainNode)

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(frequency, startTime)

      noteGain.gain.setValueAtTime(0, startTime)
      noteGain.gain.linearRampToValueAtTime(volume, startTime + 0.1)
      noteGain.gain.linearRampToValueAtTime(0, startTime + duration)

      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    } catch (error) {
      console.error("Failed to play note:", error)
    }
  }

  async playComplete() {
    try {
      await this.createAudioContext()
      if (!this.audioContext) return

      const now = this.audioContext.currentTime

      // Play a pleasant C major arpeggio
      this.playNote(523.25, now, 0.2, 0.3) // C5
      this.playNote(659.25, now + 0.1, 0.2, 0.3) // E5
      this.playNote(783.99, now + 0.2, 0.4, 0.3) // G5
    } catch (error) {
      console.error("Failed to play completion sound:", error)
    }
  }
}

const timerSound = new TimerSound()

export const playTimerCompleteSound = async () => {
  if (isSoundEnabled()) {
    await timerSound.playComplete()
  }
}

export const isSoundEnabled = (): boolean => {
  if (typeof window === "undefined") return true
  return localStorage.getItem("soundEnabled") !== "false"
}

export const setSoundEnabled = (enabled: boolean): void => {
  localStorage.setItem("soundEnabled", enabled.toString())
}

export const isVibrationEnabled = (): boolean => {
  if (typeof window === "undefined") return true
  return localStorage.getItem("vibrationEnabled") !== "false"
}

export const setVibrationEnabled = (enabled: boolean): void => {
  localStorage.setItem("vibrationEnabled", enabled.toString())
}

export const vibrateDevice = () => {
  if (typeof navigator !== "undefined" && navigator.vibrate && isVibrationEnabled()) {
    navigator.vibrate([200, 100, 200])
  }
}

