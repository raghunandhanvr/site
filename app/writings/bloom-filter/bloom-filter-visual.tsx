"use client"

import * as React from "react"
import { motion } from "framer-motion"

const BloomFilterVisual: React.FC = () => {
  const [bitArray, setBitArray] = React.useState(Array(10).fill(0))
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [step, setStep] = React.useState(0)
  const [speed, setSpeed] = React.useState(1)
  const [username, setUsername] = React.useState("devninja42")

  React.useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setStep((prev) => (prev === 3 ? 0 : prev + 1))

      if (step === 0) {
        setBitArray(Array(10).fill(0))
        setUsername("devninja42")
      } else if (step === 1) {
        setBitArray([0, 0, 1, 0, 0, 0, 0, 0, 0, 0])
      } else if (step === 2) {
        setBitArray([0, 0, 1, 0, 0, 1, 0, 0, 0, 0])
      } else if (step === 3) {
        setBitArray([0, 0, 1, 0, 0, 1, 0, 0, 0, 1])
        setUsername("coolcoder123")
      }
    }, 3000 / speed)

    return () => clearInterval(timer)
  }, [isPlaying, step, speed])

  const getStepDescription = () => {
    switch (step) {
      case 0:
        return "Empty Bloom Filter: All bits are set to 0"
      case 1:
        return "Adding username 'devninja42': Set bit at position 2 (hash1)"
      case 2:
        return "Adding username 'devninja42': Set bit at position 5 (hash2)"
      case 3:
        return "Adding username 'devninja42': Set bit at position 9 (hash3)"
      default:
        return ""
    }
  }

  return (
    <div className="container p-4 sm:p-8 relative bg-white border border-gray-200 rounded-md">
      <div className="flex flex-col items-center space-y-8">
        <h3 className="text-lg font-semibold text-center">Username Availability Checker</h3>

        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md font-mono">Username: "{username}"</div>

        <div className="flex justify-center items-center w-full">
          <div className="flex space-x-1">
            {bitArray.map((bit, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: 1,
                  backgroundColor: bit === 1 ? "#3b82f6" : "#f3f4f6",
                }}
                transition={{ duration: 0.3 }}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md border ${
                  bit === 1 ? "border-blue-600 text-white" : "border-gray-300 text-gray-700"
                }`}
              >
                {bit}
              </motion.div>
            ))}
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
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm text-gray-600"
        >
          {getStepDescription()}
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

export default BloomFilterVisual
