import { useRef, useCallback, useEffect } from 'react';

export function useMovement(onMove: (dir: number) => void, onIdle: () => void, onJump?: () => void) {
  const lastTime = useRef<number>(0);
  const idleTimeout = useRef<number | undefined>(undefined);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  
  const handleScroll = useCallback((dir: number) => {
    const now = Date.now();
    if (now - lastTime.current < 16) return;
    lastTime.current = now;
    onMove(dir);
    clearTimeout(idleTimeout.current);
    idleTimeout.current = window.setTimeout(onIdle, 200);
  }, [onMove, onIdle]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY || -e.detail;
      const scrollDirection = delta > 0 ? 1 : -1;
      handleScroll(scrollDirection);
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && onJump) {
        onJump();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].pageX;
      touchStartY.current = e.touches[0].pageY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndX = e.touches[0].pageX;
      const touchEndY = e.touches[0].pageY;
      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const scrollDirection = deltaX < 0 ? 1 : -1;
        handleScroll(scrollDirection);
      } else if (deltaY < -50 && onJump) {
        // Swipe up for jump
        onJump();
      }
    };

    const handleTouchEnd = () => {
      // Reset movement on touch end
      onIdle();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleScroll, onJump, onIdle]);

  return { handleScroll };
}
