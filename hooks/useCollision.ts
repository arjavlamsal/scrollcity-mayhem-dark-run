import { useRef } from 'react';

export function useCollision(onGameOver: () => void) {
  // Track last collision time to prevent multiple collisions in quick succession
  const lastCollisionTimeRef = useRef<number>(0);
  
  const check = () => {
    const hero = document.getElementById('hero')?.getBoundingClientRect();
    if (!hero) return;
    
    const currentTime = Date.now();
    // Only check for collisions if enough time has passed since the last collision
    // This gives a brief immunity period after getting hit
    if (currentTime - lastCollisionTimeRef.current < 1000) {
      return;
    }
    
    document.querySelectorAll<HTMLElement>('.obstacle').forEach(el => {
      const r = el.getBoundingClientRect();
      const tol = 10;
      if (!(hero.right < r.left+tol || hero.left > r.right-tol || hero.bottom < r.top || hero.top > r.bottom)) {
        lastCollisionTimeRef.current = currentTime;
        onGameOver();
      }
    });
  };
  
  return { checkCollision: check };
}