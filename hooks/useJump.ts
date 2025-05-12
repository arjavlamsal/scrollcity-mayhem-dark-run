import { useRef } from 'react';

export function useJump() {
  const jumping = useRef<boolean>(false);

  const handleJump = () => {
    if (jumping.current) return;
    jumping.current = true;
    const hero = document.getElementById('hero');
    hero?.classList.add('jump');
    setTimeout(() => {
      hero?.classList.remove('jump');
      jumping.current = false;
    }, 500);
  };

  return { handleJump };
}