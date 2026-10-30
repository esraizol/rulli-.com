'use client';

import { useCursor } from '@/hooks/use-cursor';
import { useIsClient } from '@/hooks/use-is-client';
import { createPortal } from 'react-dom';

export function CustomCursor() {
  const { cursorRef, isDesktop } = useCursor();
  const isClient = useIsClient();

  if (!isClient || !isDesktop) return null;

  return createPortal(
    <div ref={cursorRef} className="cursor pointer-events-none fixed top-0 left-0 z-[9999]" />,
    document.body
  );
}
