export function useSilhouette() {
  const check = () => {
    const hero = document.getElementById('hero')?.getBoundingClientRect();
    if (!hero) return;
    let front = false;
    document.querySelectorAll<HTMLElement>('.silhouette').forEach(el => {
      const r = el.getBoundingClientRect();
      if (!(hero.right < r.left || hero.left > r.right || hero.bottom < r.top || hero.top > r.bottom)) {
        front = true;
      }
    });
    const heroEl = document.getElementById('hero');
    if (front) heroEl?.classList.add('invert'); else heroEl?.classList.remove('invert');
  };
  return { checkSilhouette: check };
}