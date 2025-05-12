'use client';

type SpiderProps = { 
  left: number;
};

export default function Spider({ left }: SpiderProps) {
  return (
    <div 
      className="obstacle spider silhouette" 
      style={{ left: `${left}px` }}
    />
  );
}
