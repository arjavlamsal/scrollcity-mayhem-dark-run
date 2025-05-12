export function useCollision(onGameOver: () => void) {
  const check = () => {
    const hero = document.getElementById('hero')?.getBoundingClientRect();
    if (!hero) return;
    document.querySelectorAll<HTMLElement>('.obstacle').forEach(el => {
      const r = el.getBoundingClientRect();
      const tol = 10;
      if (!(hero.right < r.left+tol || hero.left > r.right-tol || hero.bottom < r.top || hero.top > r.bottom)) {
        onGameOver();
      }
    });
  };
  return { checkCollision: check };
}