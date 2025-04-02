export const LoadingComponent = () => (
    <div className="relative h-48 w-full overflow-hidden rounded-md before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-100/30 before:to-transparent">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-5 w-5 rounded-full border border-gray-300 border-t-gray-600 animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    </div>
)