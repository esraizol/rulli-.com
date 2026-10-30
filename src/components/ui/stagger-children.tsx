'use client';

import { type ReactNode, Children } from 'react';
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/use-intersection';
import { cn } from '@/lib/utils';
import { EASINGS } from '@/lib/constants';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  direction?: 'up' | 'left' | 'right';
  distance?: number;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  duration = 0.7,
  direction = 'up',
  distance = 30,
}: StaggerChildrenProps) {
  const [ref, isVisible] = useIntersection();

  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'left': return { opacity: 0, x: -distance };
      case 'right': return { opacity: 0, x: distance };
    }
  };

  return (
    <div ref={ref} className={cn(className)}>
      {Children.map(children, (child, index) => (
        <motion.div
          initial={getInitial()}
          animate={isVisible ? { opacity: 1, x: 0, y: 0 } : getInitial()}
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: EASINGS.outExpo,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
