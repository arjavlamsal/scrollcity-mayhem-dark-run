type HeroProps = { state: string; };

export default function Hero({ state }: HeroProps) {
  return <div id="hero" className={state} />;
}


