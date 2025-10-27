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
    <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 overflow-hidden">
      <section className="mb-3">
        <h2 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-1 mb-2">Daily Targets</h2>
        <div className="grid grid-cols-2 lg:grid-cols-8 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Maintenance:</span>
            <span className="ml-1 font-medium text-gray-900">~3300</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Eat:</span>
            <span className="ml-1 font-medium text-gray-900">2500</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Cardio:</span>
            <span className="ml-1 font-medium text-gray-900">450</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Workout:</span>
            <span className="ml-1 font-medium text-gray-900">450</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Protein:</span>
            <span className="ml-1 font-medium text-gray-900">195g</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Carb:</span>
            <span className="ml-1 font-medium text-gray-900">300g</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Fat:</span>
            <span className="ml-1 font-medium text-gray-900">69g</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Fibre:</span>
            <span className="ml-1 font-medium text-gray-900">30g</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-1 mb-2">Diet</h2>
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
              <div className="text-[11px] text-yellow-800">
                <b>Note:</b> Targeting daily intake below maintenance to stay in a calorie deficit for fat loss.
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium text-gray-900 text-xs">Every Meal (x4)</div>
              <div className="text-gray-700 text-xs">150g chicken, 150g rice, 150g veggies</div>
              <div className="text-gray-500 text-[10px]">Per meal: ~37g protein, ~50g carbs, ~6g fat, ~400 cal</div>
              <div className="text-gray-500 text-[10px]">Total: ~148g protein, ~200g carbs, ~24g fat, ~1600 cal</div>
            </div>
            
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium text-gray-900 text-xs">Others</div>
              <div className="text-gray-700 text-xs">6 egg whites, Fruits, Dry Fruits, Small snacks</div>
              <div className="text-gray-500 text-[10px]">6 eggs: ~21g protein, ~1g carbs, ~90 cal</div>
              <div className="text-gray-500 text-[10px]">Fruits/Dry fruits/Snacks: ~3g protein, ~90g carbs, ~30g fat, ~600 cal</div>
            </div>
            
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium text-gray-900 text-xs">Supplements</div>
              <div className="text-gray-700 text-xs">1-2 scoop whey, Omega 3, Creatine, D3</div>
              <div className="text-gray-500 text-[10px]">1 scoop: ~25g protein, ~3g carbs, ~120 cal</div>
              <div className="text-gray-500 text-[10px]">2 scoop: ~50g protein, ~6g carbs, ~240 cal</div>
            </div>

            <div className="bg-gray-50 p-2 rounded border-2 border-gray-200">
              <div className="font-medium text-gray-900 text-xs">Daily Total</div>
              <div className="text-gray-700 text-[10px]">With 1 scoop: ~197g protein, ~294g carbs, ~54g fat, ~2410 cal</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden">
          <h2 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-1 mb-2">Workout</h2>
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            <ul className="text-xs text-gray-600 space-y-0.5 list-disc pl-4 mb-2">
              <li>Every workout: 1 warmup + 3 working sets</li>
              <li>Compound exercises: 6-12 reps</li>
              <li>Isolation exercises: 15-20 reps</li>
              <li>Go for dropset in the last set if there&apos;s energy</li>
            </ul>

            <div>
              <h3 className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">Push</h3>
              <ol className="text-xs text-gray-700 space-y-0 pl-4 list-decimal mt-1">
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
              <h3 className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">Pull</h3>
              <ol className="text-xs text-gray-700 space-y-0 pl-4 list-decimal mt-1">
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
              <h3 className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">Legs</h3>
              <ol className="text-xs text-gray-700 space-y-0 pl-4 list-decimal mt-1">
                  <li>Walking Lunges</li>
                  <li>Pendulum/Hack/Barbell Squats</li>
                  <li>Romanian Deadlifts</li>
                  <li>Leg Curls</li>
                  <li>Leg Extensions</li>
                  <li>Calf Raises</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">ABS</h3>
              <ol className="text-xs text-gray-700 space-y-0 pl-4 list-decimal mt-1">
                <li>Hanging leg raise</li>
                <li>Crunches</li>
                <li>Side hyperextension for obliques</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">Cardio</h3>
              <ol className="text-xs text-gray-700 space-y-0 pl-4 list-decimal mt-1">
                <li>6% incline, 6kmph, 50mins</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}