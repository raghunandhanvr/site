import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Protocol",
  description: "Just for my reference",
  alternates: {
    canonical: "/p",
  },
  openGraph: {
    images: [
      {
        url: `/api/og?title=Protocol`,
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function ProtocolPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[var(--color-page)] p-4 text-[var(--color-text)]">
      <section className="mb-3">
        <h2 className="mb-2 border-b border-[var(--color-border)] pb-1 text-sm font-medium">Daily Targets</h2>
        <div className="grid grid-cols-2 lg:grid-cols-8 gap-2 text-xs">
          <div className="rounded bg-[var(--color-surface-muted)] p-2">
            <span className="text-[var(--color-text-soft)]">Maintenance:</span>
            <span className="ml-1 font-medium text-[var(--color-text)]">~3300</span>
          </div>
          <div className="rounded bg-[var(--color-surface-muted)] p-2">
            <span className="text-[var(--color-text-soft)]">Eat:</span>
            <span className="ml-1 font-medium text-[var(--color-text)]">2500</span>
          </div>
          <div className="rounded bg-[var(--color-surface-muted)] p-2">
            <span className="text-[var(--color-text-soft)]">Cardio:</span>
            <span className="ml-1 font-medium text-[var(--color-text)]">450</span>
          </div>
          <div className="rounded bg-[var(--color-surface-muted)] p-2">
            <span className="text-[var(--color-text-soft)]">Workout:</span>
            <span className="ml-1 font-medium text-[var(--color-text)]">450</span>
          </div>
          <div className="rounded bg-[var(--color-surface-muted)] p-2">
            <span className="text-[var(--color-text-soft)]">Protein:</span>
            <span className="ml-1 font-medium text-[var(--color-text)]">195g</span>
          </div>
          <div className="rounded bg-[var(--color-surface-muted)] p-2">
            <span className="text-[var(--color-text-soft)]">Carb:</span>
            <span className="ml-1 font-medium text-[var(--color-text)]">300g</span>
          </div>
          <div className="rounded bg-[var(--color-surface-muted)] p-2">
            <span className="text-[var(--color-text-soft)]">Fat:</span>
            <span className="ml-1 font-medium text-[var(--color-text)]">69g</span>
          </div>
          <div className="rounded bg-[var(--color-surface-muted)] p-2">
            <span className="text-[var(--color-text-soft)]">Fibre:</span>
            <span className="ml-1 font-medium text-[var(--color-text)]">30g</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <h2 className="mb-2 border-b border-[var(--color-border)] pb-1 text-sm font-medium">Diet</h2>
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            <div className="rounded border border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] p-2">
              <div className="text-[11px] text-[var(--color-warning-text)]">
                <b>Note:</b> Targeting daily intake below maintenance to stay in a calorie deficit for fat loss.
              </div>
            </div>
            <div className="rounded bg-[var(--color-surface-muted)] p-2">
              <div className="text-xs font-medium text-[var(--color-text)]">Every Meal (x4)</div>
              <div className="text-xs text-[var(--color-text-muted)]">150g chicken, 150g rice, 150g veggies</div>
              <div className="text-[10px] text-[var(--color-text-soft)]">Per meal: ~37g protein, ~50g carbs, ~6g fat, ~400 cal</div>
              <div className="text-[10px] text-[var(--color-text-soft)]">Total: ~148g protein, ~200g carbs, ~24g fat, ~1600 cal</div>
            </div>
            
            <div className="rounded bg-[var(--color-surface-muted)] p-2">
              <div className="text-xs font-medium text-[var(--color-text)]">Others</div>
              <div className="text-xs text-[var(--color-text-muted)]">6 egg whites, Fruits, Dry Fruits, Small snacks</div>
              <div className="text-[10px] text-[var(--color-text-soft)]">6 eggs: ~21g protein, ~1g carbs, ~90 cal</div>
              <div className="text-[10px] text-[var(--color-text-soft)]">Fruits/Dry fruits/Snacks: ~3g protein, ~90g carbs, ~30g fat, ~600 cal</div>
            </div>
            
            <div className="rounded bg-[var(--color-surface-muted)] p-2">
              <div className="text-xs font-medium text-[var(--color-text)]">Supplements</div>
              <div className="text-xs text-[var(--color-text-muted)]">1-2 scoop whey, Omega 3, Creatine, D3</div>
              <div className="text-[10px] text-[var(--color-text-soft)]">1 scoop: ~25g protein, ~3g carbs, ~120 cal</div>
              <div className="text-[10px] text-[var(--color-text-soft)]">2 scoop: ~50g protein, ~6g carbs, ~240 cal</div>
            </div>

            <div className="rounded border border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] p-2">
              <div className="text-xs font-medium text-[var(--color-text)]">Daily Total</div>
              <div className="text-[10px] text-[var(--color-text-muted)]">With 1 scoop: ~197g protein, ~294g carbs, ~54g fat, ~2410 cal</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden">
          <h2 className="mb-2 border-b border-[var(--color-border)] pb-1 text-sm font-medium">Workout</h2>
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            <ul className="mb-2 list-disc space-y-0.5 pl-4 text-xs text-[var(--color-text-muted)]">
              <li>Every workout: 1 warmup + 3 working sets</li>
              <li>Compound exercises: 6-12 reps</li>
              <li>Isolation exercises: 15-20 reps</li>
              <li>Go for dropset in the last set if there&apos;s energy</li>
            </ul>

            <div>
              <h3 className="rounded bg-[var(--color-surface-emphasis)] px-2 py-1 text-xs font-medium text-[var(--color-text)]">Push</h3>
              <ol className="mt-1 list-decimal space-y-0 pl-4 text-xs text-[var(--color-text-muted)]">
                  <li>Warmup: Pushups</li>
                  <li>Incline Smith Machine</li>
                  <li>Overhead Dumbbell Press</li>
                  <li>Chest Press Machine</li>
                  <li>Cable Crossover High to Low</li>
                  <li>Lateral Raises</li>
                  <li>Tricep Pushdowns</li>
                  <li>Tricep Overhead Extension</li>
                  <li>Optional: Dips, Upright Rows</li>
              </ol>
            </div>

            <div>
              <h3 className="rounded bg-[var(--color-surface-emphasis)] px-2 py-1 text-xs font-medium text-[var(--color-text)]">Pull</h3>
              <ol className="mt-1 list-decimal space-y-0 pl-4 text-xs text-[var(--color-text-muted)]">
                  <li>Warmup: Pullups</li>
                  <li>Wide Grip Lat Pulldown</li>
                  <li>Close Reverse Grip Lat Pulldown</li>
                  <li>T-Bar Rows</li>
                  <li>Barbell 21s</li>
                  <li>Dumbbell Curls</li>
                  <li>Reverse Pec Dec</li>
                  <li>Shrugs</li>
                  <li>Optional: Chinups, One Arm Pulldowns</li>
              </ol>
            </div>

            <div>
              <h3 className="rounded bg-[var(--color-surface-emphasis)] px-2 py-1 text-xs font-medium text-[var(--color-text)]">Legs</h3>
              <ol className="mt-1 list-decimal space-y-0 pl-4 text-xs text-[var(--color-text-muted)]">
                  <li>Walking Lunges</li>
                  <li>Pendulum/Hack/Barbell Squats</li>
                  <li>Romanian Deadlifts</li>
                  <li>Leg Curls</li>
                  <li>Leg Extensions</li>
                  <li>Calf Raises</li>
              </ol>
            </div>

            <div>
              <h3 className="rounded bg-[var(--color-surface-emphasis)] px-2 py-1 text-xs font-medium text-[var(--color-text)]">ABS</h3>
              <ol className="mt-1 list-decimal space-y-0 pl-4 text-xs text-[var(--color-text-muted)]">
                <li>Hanging leg raise</li>
                <li>Crunches</li>
                <li>Side hyperextension for obliques</li>
              </ol>
            </div>

            <div>
              <h3 className="rounded bg-[var(--color-surface-emphasis)] px-2 py-1 text-xs font-medium text-[var(--color-text)]">Cardio</h3>
              <ol className="mt-1 list-decimal space-y-0 pl-4 text-xs text-[var(--color-text-muted)]">
                <li>6% incline, 6kmph, 50mins</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}