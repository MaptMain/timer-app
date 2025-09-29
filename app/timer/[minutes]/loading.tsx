export default function TimerLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-[12rem] font-bold leading-none relative text-muted/20 animate-pulse">00</div>
        <div className="text-4xl font-bold mt-4 text-muted/20 animate-pulse">00:00</div>
      </div>

      <footer className="app-footer">
        <div className="w-16 h-6 bg-muted/20 rounded animate-pulse" />
        <div className="w-16 h-6 bg-muted/20 rounded animate-pulse" />
      </footer>
    </div>
  )
}

