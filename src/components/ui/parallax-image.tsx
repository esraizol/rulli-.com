'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useIsDesktop } from '@/hooks/use-media-query';

interface ParallaxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  width,
  height,
  speed = 0.15,
  className,
  containerClassName,
  priority = false,
}: ParallaxImageProps) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn('overflow-hidden', containerClassName)}>
      <motion.div style={isDesktop ? { y } : undefined}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn('w-full h-full object-cover', className)}
          priority={priority}
          quality={75}
        />
      </motion.div>
    </div>
  );
}
