type GameOverScreenProps = { onRestart: () => void; };

export default function GameOverScreen({ onRestart }: GameOverScreenProps) {
  return (
    <div className="screen game-over">
      <div className="main-title row d-flex justify-content-center align-items-center">
        <h1 className="col-12 text-center">Game Over</h1>
        <p className="col-12 text-center">You&apos;re Dead.</p>
        <button className="btn btn-light restartButton" onClick={onRestart}>
          Restart
        </button>
      </div>
    </div>
  );
}