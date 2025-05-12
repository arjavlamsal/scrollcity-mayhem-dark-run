
type TreesProps = {
  images: string[];
  positions: number[];
};

export default function Trees({ images, positions }: TreesProps) {
  return (
    <>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`tree-${i}`}
          src={src}
          className={`object tree ${i >= 3 ? 'silhouette' : ''}`}
          style={{ left: `${positions[i]}px` }}
          alt={`Tree ${i+1}`}
        />
      ))}
    </>
  );
}