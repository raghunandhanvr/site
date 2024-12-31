'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function WavingHand() {
  const [isWaving, setIsWaving] = useState(false)

  const handShakeVariants = {
    wave: {
      rotate: [0, 15, -15, 15, -15, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
        ease: "easeInOut"
      }
    },
    rest: {
      rotate: 0
    }
  }

  return (
    <motion.span 
      className="inline-block cursor-pointer"
      onMouseEnter={() => setIsWaving(true)}
      onMouseLeave={() => setIsWaving(false)}
      animate={isWaving ? "wave" : "rest"}
      variants={handShakeVariants}
      aria-label={isWaving ? "Waving hand" : "Hand"}
    >
      👋🏼
    </motion.span>
  )
}

