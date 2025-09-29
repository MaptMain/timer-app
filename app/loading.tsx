import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin">
        <Loader2 className="w-12 h-12 text-primary" />
      </div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  )
}

