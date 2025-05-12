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

  const positionsRef = useRef<Positions>({} as Positions);

  const pad = (n:number) => n.toString().padStart(2,'0');

  const { start, stop } = useTimer(elapsed => {
    const m = Math.floor(elapsed/60000), s = Math.floor((elapsed%60000)/1000);
    setTime(`${pad(m)}:${pad(s)}`);
  });

  const onGameOver = useCallback(() => setStatus('over'), []);
  const onGameWin = useCallback(() => {
    setStatus('win');
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
  }, [time, best]);

  const { checkCollision } = useCollision(onGameOver);
  const { checkWin } = useWin(onGameWin);
  const { checkSilhouette } = useSilhouette();

  const idle = useCallback(() => {
    const cls = heroClass.includes('left') ? 'idle-left' : 'idle-right';
    setHeroClass(cls);
  }, [heroClass]);

  const move = useCallback((dir:number) => {
    if (!startRef.current) return;
    const cls = dir<0? 'running-right':'running-left';
    setHeroClass(cls);
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('.obstacle,.bush,.floor,.object,#finishLine').forEach(el => {
        const l = parseFloat(el.style.left||'0'); el.style.left = `${l - dir*20}px`;
      });
      checkCollision(); checkWin(); checkSilhouette();
    });
  }, [checkCollision, checkWin, checkSilhouette]);

  const { handleScroll } = useMovement(move, idle);
  const { handleJump } = useJump();

  const onStart = useCallback(() => {
    setStatus('running'); startRef.current = Date.now(); start();
  }, [start]);
  const onRestart = useCallback(() => window.location.reload(), []);

  useEffect(() => {
    if (status !== 'running') stop();
  }, [status, stop]);

  useEffect(() => {
    const wheel = (e:WheelEvent) => handleScroll(e.deltaY>0?1:-1);
    const key = (e:KeyboardEvent) => e.key==='ArrowUp' && handleJump();
    window.addEventListener('wheel', wheel);
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('wheel', wheel); window.removeEventListener('keydown', key); };
  }, [handleScroll, handleJump]);

  return { gameStatus:status, heroState:heroClass, time, bestTime:best, onStart, onRestart, positions:positionsRef.current };
}