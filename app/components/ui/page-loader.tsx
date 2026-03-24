export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-3 h-3">
          <div
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-text)] border-r-[var(--color-text)]"
            style={{ animationDuration: "0.8s" }}
          />
          <div className="absolute inset-1 rounded-full border border-[var(--color-border)] opacity-40" />
        </div>
      </div>
    </div>
  );
}
