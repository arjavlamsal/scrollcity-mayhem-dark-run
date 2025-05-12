type WinScreenProps = {
  time: string;
  bestTime: string;
  onRestart: () => void;
};

export default function WinScreen({ time, bestTime, onRestart }: WinScreenProps) {
  return (
    <div className="screen win">
      <div className="main-title row d-flex justify-content-center align-items-center">
        <h1 className="col-12 text-center">Congratulations!</h1>
        <p className="col-12 text-center">You arrived home alive.</p>
        <button
          className="btn btn-light restartButton mt-3 mb-4"
          onClick={onRestart}
        >
          Restart
        </button>
        <div className="col-12 scores text-center">
          <p>Time: <span className="chronometer">{time}</span></p>
          <p>Best Time: <span className="highestScore">{bestTime}</span></p>
        </div>
      </div>
    </div>
  );
}