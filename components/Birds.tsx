type BirdPos = { left: number; top: string };

interface BirdsProps { positions?: BirdPos[]; }
export default function Birds({ positions = [] }: BirdsProps) {
  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={`bird-${i}`}
          className="obstacle bird"
          style={{ left: `${pos.left}px`, top: pos.top }}
        />
      ))}
    </>
  );
}