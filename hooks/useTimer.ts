import { useRef, useCallback } from 'react';

export function useTimer(onTick: (elapsed: number) => void) {
  const intervalRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number>(0);

  const start = useCallback(() => {
    startRef.current = Date.now();
    intervalRef.current = window.setInterval(() => {
      onTick(Date.now() - startRef.current);
    }, 100);
  }, [onTick]);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { start, stop };
}