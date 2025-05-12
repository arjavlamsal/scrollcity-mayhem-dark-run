import { useRef, useEffect } from 'react';

export function useJump() {
  const jumping = useRef<boolean>(false);
  const touchStartY = useRef<number>(0);

  const handleJump = () => {
    if (jumping.current) return;
    jumping.current = true;

    // Apply jumping inline style directly
    const hero = document.getElementById('hero');
    if (hero) {
      // Get current position
      const currentTop = hero.style.top || 'calc(50% + 200px)';
      
      // Store original position for reference
      hero.dataset.originalTop = currentTop;
      
      // Apply jumping animation using CSS transitions instead of animation
      hero.style.transition = 'top 0.25s ease-out';
      
      // Jump up
      hero.style.top = 'calc(50% + 50px)';
      
      setTimeout(() => {
        // Fall down
        hero.style.transition = 'top 0.25s ease-in';
        hero.style.top = 'calc(50% + 200px)';
        
        setTimeout(() => {
          // Reset everything
          hero.style.transition = '';
          jumping.current = false;
        }, 250);
      }, 250);
    } else {
      jumping.current = false;
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].pageY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 0) return;
      const touchEndY = e.changedTouches[0].pageY;
      if (touchStartY.current - touchEndY > 50) {
        // Swipe up detected
        handleJump();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return { handleJump };
}