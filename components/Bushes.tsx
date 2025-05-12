import React, { useEffect } from 'react';

interface BushesProps {
  positions?: number[];
  toggleTimes?: [number, number][];
}
export default function Bushes({ positions = [], toggleTimes = [] }: BushesProps) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLDivElement>('.bush.silhouette');
    const timeouts: NodeJS.Timeout[] = [];

    elements.forEach((el, idx) => {
      const toggle = (isObstacle: boolean) => {
        el.classList.toggle('obstacle');
        el.classList.toggle('monster');
        const delay = isObstacle ? toggleTimes[idx][0] : toggleTimes[idx][1];
        const t = setTimeout(() => toggle(!isObstacle), delay);
        timeouts.push(t);
      };
      // start as obstacle
      toggle(true);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [positions, toggleTimes]);

  return (
    <>
      {positions.map((left, i) => (
        <div
          key={`bush-${i}`}
          className="bush silhouette obstacle"
          style={{ left: `${left}px` }}
        />
      ))}
    </>
  );
}