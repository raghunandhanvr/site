import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Protocol",
  description: "Just for my reference",
  alternates: {
    canonical: "/protocol",
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
      {/* Daily Targets - Top Section */}
      <section className="mb-3">
        <h2 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-1 mb-2">Daily Targets</h2>
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Eat:</span>
            <span className="ml-1 font-medium text-gray-900">2500kcal</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Cardio:</span>
            <span className="ml-1 font-medium text-gray-900">450kcal</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Workout:</span>
            <span className="ml-1 font-medium text-gray-900">450kcal</span>
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

      {/* Two Column Layout - Diet and Workout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
        {/* Left Column - Diet */}
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-1 mb-2">Diet</h2>
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium text-gray-900 text-xs">Every Meal (x4)</div>
              <div className="text-gray-700 text-xs">150g chicken, 150g rice, 150g veggies</div>
              <div className="text-gray-500 text-[10px]">Per meal: ~37g protein, ~50g carbs, ~4g fat, ~395 cal</div>
              <div className="text-gray-500 text-[10px]">Total: ~148g protein, ~200g carbs, ~16g fat, ~1580 cal</div>
            </div>
            
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium text-gray-900 text-xs">Others</div>
              <div className="text-gray-700 text-xs">6 egg white, 1-2 scoop whey, Fruits, Dry Fruits</div>
              <div className="text-gray-500 text-[10px]">6 eggs: ~21g protein, ~1g carbs, ~90 cal</div>
              <div className="text-gray-500 text-[10px]">1 scoop: ~25g protein, ~3g carbs, ~120 cal</div>
              <div className="text-gray-500 text-[10px]">2 scoop: ~50g protein, ~6g carbs, ~240 cal</div>
            </div>
            
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium text-gray-900 text-xs">Supplements</div>
              <div className="text-gray-700 text-xs">Omega 3, Creatine, D3</div>
            </div>
          </div>
        </div>

        {/* Right Column - Workout */}
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-1 mb-2">Workout</h2>
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            <ul className="text-xs text-gray-600 space-y-0.5 list-disc pl-4 mb-2">
              <li>Every workout: 1 warmup + 3 working sets</li>
              <li>Go for dropset in the last set if there&apos;s energy</li>
            </ul>

            <div>
              <h3 className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">Push</h3>
              <ol className="text-xs text-gray-700 space-y-0 pl-4 list-decimal mt-1">
                <li>Pushups or Dips for warmup</li>
                <li>Incline DB Press</li>
                <li>Pec Dec Flies</li>
                <li>Cable flies or multi flight machine</li>
                <li>Overhead DB Press or Military Press</li>
                <li>Lateral raises</li>
                <li>Tricep pushdown</li>
                <li>Close grip bench press</li>
                <li>Upright row</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">Pull</h3>
              <ol className="text-xs text-gray-700 space-y-0 pl-4 list-decimal mt-1">
                <li>Pullups for warmups</li>
                <li>One hand lat pulldown</li>
                <li>Lat pulldown wide grip</li>
                <li>Reverse close grip pulldown</li>
                <li>Barbell row or T-bar row</li>
                <li>Barbell curls 21s</li>
                <li>Incline/Standing Barbell DB curls</li>
                <li>Reverse Pec Dec</li>
                <li>Shrugs</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">Legs</h3>
              <ol className="text-xs text-gray-700 space-y-0 pl-4 list-decimal mt-1">
                <li>Free squats for warmup</li>
                <li>Hack Squats</li>
                <li>Leg Press</li>
                <li>Walking Lunges</li>
                <li>Leg Extension</li>
                <li>Leg curls</li>
                <li>Calf raises</li>
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

            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium text-gray-900 text-xs">Cardio</div>
              <div className="text-gray-700 text-xs">6% incline, 6kmph, 50mins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

