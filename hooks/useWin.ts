export function useWin(onWin: () => void) {
  const check = () => {
    const hero = document.getElementById('hero')?.getBoundingClientRect();
    const finish = document.getElementById('finishLine')?.getBoundingClientRect();
    if (hero && finish && !(hero.right < finish.left || hero.left > finish.right || hero.bottom < finish.top || hero.top > finish.bottom)) {
      onWin();
    }
  };
  return { checkWin: check };
}