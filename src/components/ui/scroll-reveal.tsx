'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/use-intersection';
import { cn } from '@/lib/utils';
import { EASINGS } from '@/lib/constants';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 40,
  once = true,
}: ScrollRevealProps) {
  const [ref, isVisible] = useIntersection({ triggerOnce: once });

  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: -distance };
      case 'right': return { opacity: 0, x: distance };
      case 'none': return { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={getInitial()}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : getInitial()}
      transition={{ duration, delay, ease: EASINGS.outExpo }}
    >
      {children}
    </motion.div>
  );
}
