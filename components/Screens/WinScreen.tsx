'use client';

type WinScreenProps = {
  time: string;
  bestTime: string;
  onRestart: () => void;
};

export default function WinScreen({ time, bestTime, onRestart }: WinScreenProps) {
  return (
    <div className="win screen">
      <div className="main-title row d-flex justify-content-center align-items-center">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <h1>Congratulations!</h1>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <p>You arrived home alive.</p>
          </div>
        </div>
        <div className="col-12 mt-3 mb-4">
          <div className="d-flex justify-content-center">
            <button className="btn btn-light restartButton" onClick={onRestart}>
              Restart
            </button>
          </div>
        </div>
        <div className="col-12 scores">
          <div className="d-flex justify-content-center">
            <p>Time: <span className="chronometer">{time}</span></p>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <p>Best Time: <span className="highestScore">{bestTime}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}