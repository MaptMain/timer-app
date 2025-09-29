export default function HomeLoading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 gap-6">
        <div className="w-full max-w-md flex-shrink-0">
          <h2 className="text-xl font-bold mb-3">Presets</h2>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-36 rounded-lg bg-muted/20 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <div className="w-16 h-6 bg-muted/20 rounded animate-pulse" />
        <div className="w-16 h-6 bg-muted/20 rounded animate-pulse" />
      </footer>
    </>
  )
}

