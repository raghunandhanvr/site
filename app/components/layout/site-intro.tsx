import { getCurrentAndPastEmployers } from "@/app/(main)/work/work-data"
import { LinkPreviewServer } from "@/app/components/link-preview/link-preview-server"
import { cn } from "@/app/lib/utils"

const listClass =
  "mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-[var(--color-text-muted)]"

const previewLinkClass =
  "text-[var(--color-text-muted)] underline decoration-[color-mix(in_srgb,var(--color-text-soft)_55%,transparent)] underline-offset-4"

function PastEmployersInline({
  employers,
}: {
  employers: { title: string; url: string }[]
}) {
  if (employers.length === 0) return null
  return (
    <>
      {" "}
      Previously at{" "}
      {employers.map((e, i) => (
        <span key={e.title}>
          {i > 0
            ? i === employers.length - 1
              ? " and "
              : ", "
            : null}
          <LinkPreviewServer href={e.url} className={previewLinkClass}>
            {e.title}
          </LinkPreviewServer>
        </span>
      ))}
    </>
  )
}

export async function SiteIntro({ className }: { className?: string }) {
  const roles = getCurrentAndPastEmployers()

  return (
    <div className={cn("min-w-0 w-full", className)}>
      <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
        Background across full-stack engineering, blockchain, and security; I&apos;m
        currently at{" "}
        {roles ? (
          <LinkPreviewServer
            href={roles.current.url}
            className={previewLinkClass}
          >
            {roles.current.title}
          </LinkPreviewServer>
        ) : (
          "Byzanlink"
        )}{"."}
        {roles ? <PastEmployersInline employers={roles.past} /> : null}.
      </p>
      <p className="mt-6 text-base font-medium leading-relaxed text-[var(--color-text)]">
        Some of my tech contributions:
      </p>
      <ul className={listClass}>
        <li>
          <strong className="font-medium text-[var(--color-text)]">
            IAM service
          </strong>{" "}
          in golang serving 100K+ users daily
        </li>
        <li>
          <strong className="font-medium text-[var(--color-text)]">
            Custom reverse proxy
          </strong>{" "}
          in golang handling 1M+ daily API requests
        </li>
        <li>
          <strong className="font-medium text-[var(--color-text)]">
            AI research
          </strong>{" "}
          on fake image detection (
          <LinkPreviewServer
            href="https://ieeexplore.ieee.org/document/10046797"
            className={previewLinkClass}
          >
            IEEE published
          </LinkPreviewServer>
          )
        </li>
        <li>
          <strong className="font-medium text-[var(--color-text)]">
            Bug bounties
          </strong>{" "}
          from Microsoft Azure, McAfee, Uber
        </li>
        <li>
          Top 50 finalist in{" "}
          <strong className="font-medium text-[var(--color-text)]">
            Smart India Hackathon 2022
          </strong>
        </li>
        <li>
          <strong className="font-medium text-[var(--color-text)]">
            Network infrastructure
          </strong>{" "}
          for{" "}
          <LinkPreviewServer
            href="https://www.kghospital.com/"
            className={previewLinkClass}
          >
            KG Hospital
          </LinkPreviewServer>
          , Coimbatore
        </li>
      </ul>
    </div>
  )
}
