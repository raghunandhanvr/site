"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface HashResult {
  item: string
  hashFunction: string
  result: number
  position: number
}

const FalsePositiveVisual: React.FC = () => {
  const [bitArray] = React.useState([0, 1, 0, 1, 1, 1, 0, 0, 0, 1])
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [speed, setSpeed] = React.useState(1)
  const [checkedPositions, setCheckedPositions] = React.useState<number[]>([])

  const hackerHashes: HashResult[] = [
    { item: "hacker99", hashFunction: "h1", result: 13, position: 3 },
    { item: "hacker99", hashFunction: "h2", result: 15, position: 5 },
    { item: "hacker99", hashFunction: "h3", result: 19, position: 9 },
  ]

  const steps = [
    { description: "Bloom filter contains 'admin', 'devninja42', 'webdev99', 'coolcoder123', 'raghu'", hashIndex: -1 },
    { description: "Checking if username 'hacker99' is available", hashIndex: -1 },
    { description: "Checking position 3: h1('hacker99') mod 10 = 3", hashIndex: 0 },
    { description: "Position 3 is 1 (set by 'admin')", hashIndex: 0, showSource: true },
    { description: "Checking position 5: h2('hacker99') mod 10 = 5", hashIndex: 1 },
    { description: "Position 5 is 1 (set by 'devninja42' and 'coolcoder123')", hashIndex: 1, showSource: true },
    { description: "Checking position 9: h3('hacker99') mod 10 = 9", hashIndex: 2 },
    { description: "Position 9 is 1 (set by 'webdev99')", hashIndex: 2, showSource: true },
    { description: "All positions are set to 1, 'hacker99' might be taken", hashIndex: -1 },
    {
      description: "FALSE POSITIVE: 'hacker99' was never added, but we need to check the database",
      hashIndex: -1,
      showResult: true,
    },
  ]

  React.useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
    }, 2000 / speed)

    return () => clearInterval(timer)
  }, [isPlaying, speed, steps.length])

  React.useEffect(() => {
    const step = steps[currentStep]

    if (step.hashIndex >= 0) {
      const hash = hackerHashes[step.hashIndex]
      setCheckedPositions((prev) => [...prev, hash.position])
    } else if (currentStep === 0 || currentStep === 1) {
      setCheckedPositions([])
    }
  }, [currentStep])

  const getCurrentHash = () => {
    const step = steps[currentStep]
    if (step.hashIndex === -1) return null

    return hackerHashes[step.hashIndex]
  }

  const currentHash = getCurrentHash()
  const showResult = steps[currentStep].showResult
  const showSource = steps[currentStep].showSource

  return (
    <div className="container p-4 sm:p-8 relative bg-white border border-gray-200 rounded-md">
      <div className="flex flex-col items-center space-y-8">
        <h3 className="text-lg font-semibold text-center">False Positive Example</h3>

        {currentStep > 0 && (
          <motion.div
            key={`item-hacker99-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-2 rounded-md font-mono bg-blue-100 text-blue-800"
          >
            Username: "hacker99"
          </motion.div>
        )}

        {currentHash && (
          <motion.div
            key={`hash-${currentHash.hashFunction}-${currentStep}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono bg-gray-100 px-3 py-1 rounded"
          >
            {currentHash.hashFunction}("hacker99") mod 10 = {currentHash.position}
          </motion.div>
        )}

        {showSource && currentHash && (
          <motion.div
            key={`source-${currentStep}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-medium px-3 py-1 rounded bg-yellow-100 text-yellow-800"
          >
            {currentHash.position === 3 && "This bit was set by 'admin'"}
            {currentHash.position === 5 && "This bit was set by 'devninja42' and 'coolcoder123'"}
            {currentHash.position === 9 && "This bit was set by 'webdev99'"}
          </motion.div>
        )}

        {showResult && (
          <motion.div
            key={`result-${currentStep}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-medium px-3 py-1 rounded bg-red-100 text-red-800"
          >
            False Positive: 'hacker99' was never added but we need a database check!
          </motion.div>
        )}

        <div className="flex justify-center items-center w-full">
          <div className="flex space-x-1">
            {bitArray.map((bit, index) => {
              const isCurrentlyChecked = currentHash && currentHash.position === index
              const wasChecked = checkedPositions.includes(index)

              return (
                <motion.div
                  key={index}
                  initial={{ scale: isCurrentlyChecked ? 0.8 : 1 }}
                  animate={{
                    scale: isCurrentlyChecked ? 1.1 : 1,
                    backgroundColor:
                      bit === 1
                        ? isCurrentlyChecked
                          ? "#86efac" // highlighted green
                          : wasChecked
                            ? "#bbf7d0" // previously checked green
                            : "#3b82f6" // normal blue
                        : isCurrentlyChecked
                          ? "#fecaca" // highlighted red
                          : wasChecked
                            ? "#fee2e2" // previously checked red
                            : "#f3f4f6", // normal gray
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md border ${
                    bit === 1
                      ? isCurrentlyChecked
                        ? "border-green-400 text-white"
                        : wasChecked
                          ? "border-green-300 text-white"
                          : "border-blue-600 text-white"
                      : isCurrentlyChecked
                        ? "border-red-400 text-gray-700"
                        : wasChecked
                          ? "border-red-300 text-gray-700"
                          : "border-gray-300 text-gray-700"
                  }`}
                >
                  {bit}
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center w-full">
          <div className="flex space-x-1">
            {bitArray.map((_, index) => (
              <div
                key={`index-${index}`}
                className="w-8 h-6 sm:w-10 sm:h-6 flex items-center justify-center text-xs text-gray-500"
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center pb-12">
        <motion.div
          key={`desc-${currentStep}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm text-gray-600"
        >
          {steps[currentStep].description}
        </motion.div>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        <button
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
          )}
        </button>
        <div className="flex space-x-1">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={`speed-${s}`}
              className={`px-2 py-1 text-xs rounded ${
                speed === s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              } hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
              onClick={() => setSpeed(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FalsePositiveVisual
