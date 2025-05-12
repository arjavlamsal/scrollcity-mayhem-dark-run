type StartScreenProps = { onStart: () => void; };

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="screen start">
      <div className="main-title row d-flex justify-content-center align-items-center">
        <h1 className="col-12 text-center">Scroll Game: Dark Run</h1>
        <p className="col-12 text-center">
          A Horizontal Scrolling Journey Through the Darkness to Find Home. Scroll to Start.
        </p>
        <div className="col-12 mt-5 text-center">
          <div className="mouse-scroll" onClick={onStart}>
            <div className="mouse">
              <div className="wheel" />
            </div>
            <div className="arrow-left" />
            <div className="arrow-right" />
          </div>
        </div>
      </div>
    </div>
  );
}