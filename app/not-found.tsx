import { cacheLife } from "next/cache"

export default async function NotFound() {
  "use cache"
  cacheLife("max")

  return (
    <section className="flex min-h-svh items-center justify-center px-6 sm:px-10">
      <p className="text-md">404 | Page Not Found</p>
    </section>
  )
}
