import { useState, useEffect, useRef, useCallback } from 'react';
import { useTimer } from './useTimer';
import { useMovement } from './useMovement';
import { useJump } from './useJump';
import { useCollision } from './useCollision';
import { useWin } from './useWin';
import { useSilhouette } from './useSilhouette';

export type GameStatus = 'start' | 'running' | 'win' | 'over';

export interface Positions {
  heroState: string;
  hammers: number[];
  saws: number[];
  trees: { src: string; left: number }[];
  bushPositions: number[];
  bushToggleTimes: [number, number][];
  birdPositions: { left: number; top: string }[];
  houseLeft: number;
  finishLineLeft: number;
  spiderLeft?: number;
}

export default function useGameLogic() {
  const [status, setStatus] = useState<GameStatus>('start');
  const [heroClass, setHeroClass] = useState('idle-right');
  const [time, setTime] = useState('00:00');
  const [best, setBest] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bestTime') || '00:00';
    }
    return '00:00';
  });
  const startRef = useRef<number>(0);
  const scrollActiveRef = useRef(false);

  // Initialize game positions
  const positionsRef = useRef<Positions>({
    heroState: 'idle-right',
    hammers: [1500, 1600, 1700, 4000, 4100, 4200, 4300, 4400, 7700],
    saws: [2600, 5500],
    trees: [
      { src: 'https://drive.google.com/thumbnail?id=1SSZ8Gl9nSo96RhvWDNlxsaYSWUFQu6h4&sz=w1000', left: 800 },
      { src: 'https://drive.google.com/thumbnail?id=1LItLexgTPQ9Fno_TgPMJIZb0StcqxgD6&sz=w1000', left: 2000 },
      { src: 'https://drive.google.com/thumbnail?id=1iQRUmpRWMGjesukrLxJXxQvkAehk_k8P&sz=w1000', left: 3000 },
      { src: 'https://drive.google.com/thumbnail?id=1o-QjWIBLe95xX303qKG6zE1NitfCrgUT&sz=w2000', left: 5000 },
      { src: 'https://drive.google.com/thumbnail?id=1o-QjWIBLe95xX303qKG6zE1NitfCrgUT&sz=w2000', left: 6000 }
    ],
    bushPositions: [3500, 5200, 6000, 6500, 6800],
    bushToggleTimes: [
      [3000, 4000], 
      [4000, 5000], 
      [5000, 6500], 
      [3500, 4000], 
      [6000, 7000]
    ],
    birdPositions: [
      { left: 700, top: '40%' },
      { left: 500, top: '50%' },
      { left: 100, top: '60%' },
      { left: 200, top: '75%' },
    ],
    houseLeft: 10000,
    finishLineLeft: 10000,
    spiderLeft: 7700
  });

  const pad = (n:number) => n.toString().padStart(2,'0');

  const { start, stop } = useTimer(elapsed => {
    const m = Math.floor(elapsed/60000), s = Math.floor((elapsed%60000)/1000);
    setTime(`${pad(m)}:${pad(s)}`);
  });

  const onGameOver = useCallback(() => {
    if (status === 'running') {
      setStatus('over');
      stop();
    }
  }, [status, stop]);

  const onGameWin = useCallback(() => {
    if (status === 'running') {
      setStatus('win');
      stop();
      
      if (time !== '00:00') {
        // Compare times as mm:ss
        const [bm, bs] = best.split(':').map(Number);
        const [cm, cs] = time.split(':').map(Number);
        const bestSeconds = bm * 60 + bs;
        const currentSeconds = cm * 60 + cs;
        if (best === '00:00' || currentSeconds < bestSeconds) {
          setBest(time);
          if (typeof window !== 'undefined') {
            localStorage.setItem('bestTime', time);
          }
        }
      }
    }
  }, [time, best, status, stop]);

  const { checkCollision } = useCollision(onGameOver);
  const { checkWin } = useWin(onGameWin);
  const { checkSilhouette } = useSilhouette();

  const idle = useCallback(() => {
    scrollActiveRef.current = false;
    const cls = heroClass.includes('left') ? 'idle-left' : 'idle-right';
    setHeroClass(cls);
  }, [heroClass]);

  const move = useCallback((dir:number) => {
    if (!startRef.current || status !== 'running') return;
    
    scrollActiveRef.current = true;
    const cls = dir<0? 'running-right':'running-left';
    setHeroClass(cls);
    
    // Use larger scroll speed for smoother movement (like in jQuery)
    const scrollSpeed = 20;
    
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('.obstacle,.bush,.floor,.object,#finishLine').forEach(el => {
        const l = parseFloat(el.style.left || '0'); 
        el.style.left = `${l - dir * scrollSpeed}px`;
      });
      checkCollision(); 
      checkWin(); 
      checkSilhouette();
    });
  }, [checkCollision, checkWin, checkSilhouette, status]);

  const { handleScroll } = useMovement(move, idle);
  const { handleJump } = useJump();

  const onStart = useCallback(() => {
    setStatus('running'); 
    startRef.current = Date.now(); 
    start();
    
    // Hide start screen if visible
    const startScreen = document.querySelector('.start');
    if (startScreen) {
      (startScreen as HTMLElement).style.display = 'none';
    }
  }, [start]);
  
  const onRestart = useCallback(() => {
    window.location.reload();
  }, []);

  // Create the touch start Y ref at the top level of the hook
  const touchStartYRef = useRef<number>(0);
  
  useEffect(() => {
    // Update screen visibility based on game state
    const screens = {
      start: document.querySelector('.start.screen'),
      win: document.querySelector('.win.screen'),
      gameOver: document.querySelector('.game-over.screen')
    };

    if (screens.start && screens.win && screens.gameOver) {
      if (status === 'start') {
        (screens.start as HTMLElement).style.display = 'block';
        (screens.win as HTMLElement).style.display = 'none';
        (screens.gameOver as HTMLElement).style.display = 'none';
      } else if (status === 'win') {
        (screens.start as HTMLElement).style.display = 'none';
        (screens.win as HTMLElement).style.display = 'flex';
        (screens.gameOver as HTMLElement).style.display = 'none';
      } else if (status === 'over') {
        (screens.start as HTMLElement).style.display = 'none';
        (screens.win as HTMLElement).style.display = 'none';
        (screens.gameOver as HTMLElement).style.display = 'flex';
      } else {
        (screens.start as HTMLElement).style.display = 'none';
        (screens.win as HTMLElement).style.display = 'none';
        (screens.gameOver as HTMLElement).style.display = 'none';
      }
    }

    const wheel = (e:WheelEvent) => {
      if (status === 'start') {
        onStart();
      } else if (status === 'running') {
        handleScroll(e.deltaY>0?1:-1);
      }
    };

    const key = (e:KeyboardEvent) => {
      if ((e.key === 'ArrowUp' || e.key === ' ' || e.key === 'Spacebar') && status === 'running') {
        e.preventDefault(); // Prevent default actions like page scrolling
        handleJump();
      }
    };

    // Touch handler for vertical swipes to trigger jumps
    const touchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].pageY;
    };
    
    const touchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 0) return;
      const touchEndY = e.changedTouches[0].pageY;
      
      // If vertical swipe up is detected and game is running
      if (touchStartYRef.current - touchEndY > 50 && status === 'running') {
        handleJump();
      }
      
      // If the game hasn't started yet, start it on any touch
      if (status === 'start') {
        onStart();
      }
    };
    
    window.addEventListener('wheel', wheel);
    window.addEventListener('keydown', key);
    window.addEventListener('touchstart', touchStart);
    window.addEventListener('touchend', touchEnd);
    
    return () => { 
      window.removeEventListener('wheel', wheel); 
      window.removeEventListener('keydown', key);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchend', touchEnd);
    };
  }, [handleScroll, handleJump, status, onStart]);

  // Set up collision detection interval
  useEffect(() => {
    if (status === 'running') {
      const interval = setInterval(() => {
        checkCollision();
        checkWin();
        checkSilhouette();
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [status, checkCollision, checkWin, checkSilhouette]);

  // Expose jump functionality for the UI components
  const onJump = useCallback(() => {
    if (status === 'running') {
      handleJump();
    }
  }, [status, handleJump]);

  return { 
    gameStatus: status, 
    heroState: heroClass, 
    time, 
    bestTime: best, 
    onStart, 
    onRestart, 
    onJump,
    positions: positionsRef.current 
  };
}