type ObstaclesProps = {
  hammers: number[];
  saws: number[];
};
export default function Obstacles({ hammers, saws }: ObstaclesProps) {
  return (
    <>
      {hammers.map((left, i) => (
        <div key={`hammer-${i}`} className="obstacle hammer" style={{ left: `${left}px` }} />
      ))}
      {saws.map((left, i) => (
        <div key={`saw-${i}`} className="obstacle saw" style={{ left: `${left}px` }} />
      ))}
    </>
  );
}