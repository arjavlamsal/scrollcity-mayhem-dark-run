type HouseProps = { left: number; };

export default function House({ left }: HouseProps) {
  return (
    <div className="object house" style={{ left: `${left}px` }}>
      <div className="chimney">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`smoke-${i}`} className="smoke" />
        ))}
      </div>
    </div>
  );
}