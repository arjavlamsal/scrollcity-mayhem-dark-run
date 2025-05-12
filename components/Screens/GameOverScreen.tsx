'use client';

type GameOverScreenProps = { onRestart: () => void; };

export default function GameOverScreen({ onRestart }: GameOverScreenProps) {
  return (
    <div className="game-over screen">
      <div className="main-title row d-flex justify-content-center align-items-center">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <h1>Game Over</h1>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <p>You&apos;re Dead.</p>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <button className="btn btn-light restartButton" onClick={onRestart}>
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}