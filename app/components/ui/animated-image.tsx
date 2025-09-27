'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  unoptimized?: boolean;
  priority?: boolean;
}

export default function AnimatedImage({
  src,
  alt,
  className,
  width,
  height,
  unoptimized,
  priority,
}: AnimatedImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Image
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        unoptimized={unoptimized}
        priority={priority}
      />
    </motion.div>
  );
}
