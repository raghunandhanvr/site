"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/shared/config";
import { ROUTES } from "@/shared/constants";

interface NameTransitionProps {
  className?: string;
}

export function NameTransition({ className }: NameTransitionProps) {
  return (
    <Link href={ROUTES.HOME} className={className} aria-label="Go to homepage">
      <motion.h1
        className="text-2xl font-bold tracking-tight text-gray-900 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {siteConfig.shortName}
      </motion.h1>
    </Link>
  );
}