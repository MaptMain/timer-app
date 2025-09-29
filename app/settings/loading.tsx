export default function SettingsLoading() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="flex-1">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border-b border-border flex items-center justify-between">
              <div className="space-y-2">
                <div className="w-32 h-6 bg-muted/20 rounded animate-pulse" />
                <div className="w-48 h-4 bg-muted/20 rounded animate-pulse" />
              </div>
              <div className="w-10 h-6 bg-muted/20 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <footer className="app-footer">
        <div className="w-16 h-6 bg-muted/20 rounded animate-pulse" />
      </footer>
    </div>
  )
}

