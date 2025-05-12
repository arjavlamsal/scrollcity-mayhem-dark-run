'use client';

import StartScreen from '@/components/Screens/StartScreen';
import WinScreen from '@/components/Screens/WinScreen';
import GameOverScreen from '@/components/Screens/GameOverScreen';
import Hero from '@/components/Hero';
import Obstacles from '@/components/Obstacles';
import Trees from '@/components/Trees';
import House from '@/components/House';
import Bushes from '@/components/Bushes';
import Birds from '@/components/Birds';
import Spider from '@/components/Spider';
import ScoreBoard from '@/components/ScoreBoard';
import BootstrapClient from '@/components/BootstrapClient';
import useGameLogic from '@/hooks/useGameLogic';
import Image from 'next/image';

export default function HomePage() {
  const {
    heroState,
    time,
    bestTime,
    onStart,
    onRestart,
    positions,
  } = useGameLogic();

  return (
    <>
      <BootstrapClient />
    
      <StartScreen onStart={onStart} />
      <WinScreen time={time} bestTime={bestTime} onRestart={onRestart} />
      <GameOverScreen onRestart={onRestart} />

      <div id="gameContainer">
        <div id="left-wall" className="obstacle" style={{ left: '-100px' }} />
        <Hero state={heroState} />
        <div className="object sign" style={{ position: 'absolute', zIndex: 0 }}>
          <Image
            src="https://drive.google.com/thumbnail?id=16xQ76yQgLy6N1Z0ERHa8I4Wluq2OGreF&sz=w1000"
            alt="Sign"
            width={100}
            height={100}
            unoptimized={true}
          />
        </div>
        <div className="trees">
          <Trees
            images={positions?.trees?.map(t => t.src) || []}
            positions={positions?.trees?.map(t => t.left) || []}
          />
          {positions.spiderLeft && <Spider left={positions.spiderLeft} />}
        </div>
        <House left={positions.houseLeft} />
        <Obstacles hammers={positions.hammers} saws={positions.saws} />
        <Bushes
          positions={positions.bushPositions}
          toggleTimes={positions.bushToggleTimes}
        />
        <Birds positions={[
          { left: 700, top: '40%' },
          { left: 500, top: '50%' },
          { left: 100, top: '60%' },
          { left: 200, top: '75%' },
        ]} />
        <div id="finishLine" style={{ left: `${positions.finishLineLeft}px` }} />
        <div className="floor" style={{ left: '0px', bottom: '0px' }} />
        <div id="top" style={{ left: '0px' }} />
      </div>

      <ScoreBoard time={time} bestTime={bestTime} />
    </>
  );
}




