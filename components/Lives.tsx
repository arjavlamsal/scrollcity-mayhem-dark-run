import Image from "next/image";

export default function Lives({ lives }: { lives: number }) {
  const maxLives = 5;
  const fullHearts = Array(lives).fill(0);
  const emptyHearts = Array(maxLives - lives).fill(0);

  return (
    <div className="lives">
      {fullHearts.map((_, i) => (
        <Image
          key={`full-${i}`}
          src="/images/heart.png"
          width={24}
          height={24}
          alt="life"
        />
      ))}
      {emptyHearts.map((_, i) => (
        <Image
          key={`empty-${i}`}
          src="/images/heart_empty.png"
          width={24}
          height={24}
          alt="lost life"
        />
      ))}
    </div>
  );
}