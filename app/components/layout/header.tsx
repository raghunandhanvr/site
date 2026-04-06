import { HomeOnly } from "@/app/components/layout/home-only"
import { SiteIntro } from "@/app/components/layout/site-intro"
import { Logo } from "@/app/components/ui/logo"

export default async function Header() {
  return (
    <header className="flex flex-col gap-8 sm:gap-6">
      <div className="min-w-0">
        <Logo />
      </div>

      <HomeOnly>
        <div className="min-w-0 w-full">
          <SiteIntro />
        </div>
      </HomeOnly>
    </header>
  )
}
