import { useRef, useCallback } from 'react';

export function useMovement(onMove: (dir: number) => void, onIdle: () => void) {
  const lastTime = useRef<number>(0);
  const idleTimeout = useRef<number | undefined>(undefined);
  
  const handleScroll = useCallback((dir: number) => {
    const now = Date.now();
    if (now - lastTime.current < 16) return;
    lastTime.current = now;
    onMove(dir);
    clearTimeout(idleTimeout.current);
    idleTimeout.current = window.setTimeout(onIdle, 200);
  }, [onMove, onIdle]);

  return { handleScroll };
}
