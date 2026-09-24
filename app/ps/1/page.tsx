import type { Metadata } from "next"
import { cacheLife } from "next/cache"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { withSiteTitle } from "@/app/config"

export const metadata: Metadata = {
  title: withSiteTitle("Securing microservice communication"),
  robots: { index: false, follow: false },
}

export default async function SecuringMicroserviceCommunicationPage() {
  "use cache"
  cacheLife("max")

  return (
    <main className="mx-auto flex w-full min-w-0 max-w-4xl flex-1 flex-col items-center px-6 pt-12 pb-24 sm:px-10 sm:pt-32 lg:px-12">
      <div className="w-full max-w-2xl">
        <Link
          href="/ps"
          className="writings-back-link group mb-4 inline-flex w-fit items-center gap-2 text-[var(--color-text-soft)] no-underline transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>
        <h1 className="mb-6 text-lg font-medium leading-[1.3] sm:text-xl">
          Securing microservice communication
        </h1>

        <div className="space-y-4 text-base leading-relaxed text-[var(--color-text)]">
          <p>
            In a microservices environment, services run on virtual machines or
            Kubernetes pods across cloud platforms such as AWS, Azure, or GCP.
            Access to secret stores and key management systems may be
            centralized through a dedicated service or granted directly through
            workload identities.
          </p>
          <p>
            If an attacker compromises a service and gains code execution
            within its runtime, they may access its credentials or use its
            existing identity to make authenticated requests. Those requests
            can originate from the expected network, carry valid credentials,
            and fall within the service&apos;s assigned permissions.
          </p>
          <p>
            <strong>
              The core problem: how can sensitive resources remain protected
              when a legitimate workload becomes an attacker-controlled caller?
            </strong>
          </p>
          <p>Conventional approaches already considered include:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Removing the centralized secrets intermediary to avoid an
              additional potential single point of failure.
            </li>
            <li>
              Assigning narrowly scoped IAM roles or equivalent identities to
              individual pods and workloads.
            </li>
            <li>
              Using OAuth 2.0 client credentials, short-lived tokens, mTLS, or
              identity-based service authentication.
            </li>
            <li>
              Binding operations to signed user intent, transaction context, or
              scheduled job manifests.
            </li>
            <li>
              Isolating credentials in agents, sidecars, or protected execution
              environments and exposing operations instead of raw secrets.
            </li>
            <li>
              Using workload attestation, runtime integrity signals, and
              external security telemetry to influence authorization.
            </li>
            <li>
              Enforcing capability manifests, behavioral baselines, rate
              limits, and anomaly detection.
            </li>
            <li>
              Requiring independent approvals for sensitive operations and
              using canary secrets, revocation, or quarantine for containment.
            </li>
          </ul>
          <p>
            These are established approaches or combinations of existing
            controls. Recommending them individually, repackaging them, or
            combining them without a distinct additional security benefit is
            outside the scope of this problem.
          </p>
          <p>
            <strong>
              Is there a materially different mechanism that could reduce abuse
              by a compromised workload operating through its valid identity?
            </strong>
          </p>
          <p>A proposed solution should explain:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              What new security property it provides beyond the approaches
              listed above.
            </li>
            <li>
              What independent evidence allows it to distinguish authorized
              activity from attacker-driven activity.
            </li>
            <li>
              Which components must remain trusted and what happens if those
              components are compromised.
            </li>
            <li>
              Whether it addresses credential theft, misuse of legitimate
              permissions, or both.
            </li>
            <li>
              What remains possible when malicious activity is indistinguishable
              from legitimate execution.
            </li>
            <li>
              How it handles plaintext that the application must legitimately
              process.
            </li>
            <li>
              How it could operate across cloud providers and runtime
              environments with practical latency, availability, and
              integration costs.
            </li>
          </ul>
          <p>
            Could this remaining gap support a standalone security product with
            a measurable advantage over existing solutions? Identify a concrete
            initial use case and a testable security claim. If no fundamentally
            different approach is feasible under these assumptions, explain the
            limiting boundary and what assumption would need to change.
          </p>
        </div>
      </div>
    </main>
  )
}
