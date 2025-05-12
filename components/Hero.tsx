
'use client';

import { useRef, useEffect } from 'react';

type HeroProps = { state: string; };

export default function Hero({ state }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Initial position setup
  useEffect(() => {
    if (heroRef.current) {
      // Make sure the hero has the correct default position
      heroRef.current.style.top = 'calc(50% + 200px)';
    }
  }, []);

  return <div 
    id="hero" 
    ref={heroRef} 
    className={state} 
    data-testid="hero"
    style={{
      position: 'fixed',
      width: '32px',
      height: '44px',
      backgroundRepeat: 'no-repeat',
      top: 'calc(50% + 200px)',
      left: '10%',
      transform: 'translate(-50%, -50%)',
      marginTop: '-20px',
      zIndex: 99
    }}
  />;
}


