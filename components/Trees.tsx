type TreesProps = {
  images: string[];
  positions: number[];
};

export default function Trees({ images, positions }: TreesProps) {
  return (
    <div className="trees">
      {images.map((src, i) => (
        <img
          key={`tree-${i}`}
          src={src}
          className="object tree"
          style={{ left: `${positions[i]}px` }}
        />
      ))}
    </div>
  );
}