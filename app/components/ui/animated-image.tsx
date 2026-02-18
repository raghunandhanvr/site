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
    <div className="image-fade-in">
      <Image
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        unoptimized={unoptimized}
        priority={priority}
      />
    </div>
  );
}
