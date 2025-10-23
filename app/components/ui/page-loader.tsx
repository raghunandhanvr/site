export default function PageLoader() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-3 h-3">
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-slate-900 border-r-slate-900 animate-spin"
                style={{ animationDuration: "0.8s" }}
              />
              <div className="absolute inset-1 rounded-full border border-slate-200 opacity-20" />
            </div>
          </div>
        </div>
      )
}

