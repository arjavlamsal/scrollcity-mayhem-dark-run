type ScoreBoardProps = { time: string; bestTime: string; };

export default function ScoreBoard({ time, bestTime }: ScoreBoardProps) {
  return (
    <div id="scores">
      <p>Time: <span id="chronometer">{time}</span></p>
      <p className="bestTime">Best Time: <span id="highestScore">{bestTime}</span></p>
    </div>
  );
}