"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { cn } from "@/app/lib/utils"

export default function AgeCounter({ className }: { className?: string }) {
  const [age, setAge] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const birthday = new Date('2002-06-21T05:30:00');

    const updateAge = () => {
      const now = new Date();
      const difference = now.getTime() - birthday.getTime();

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setAge({ years, days, hours, minutes, seconds });
    };

    updateAge();
    const timer = setInterval(updateAge, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "font-mono text-xs transition-colors text-[var(--color-text-soft)]",
        className,
      )}
    >
      {age.years}y {age.days}d {age.hours}h {age.minutes}m {age.seconds}s
    </motion.span>
  )
}