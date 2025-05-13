'use client';

type StartScreenProps = { onStart: () => void; };

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start screen">
      <div className="main-title row d-flex justify-content-center align-items-center">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <h1>ScrollCity Mayhem: Dark Run</h1>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <p>A Horizontal Scrolling Journey Through the Darkness to Find Home. Scroll to Start.</p>
          </div>
        </div>
        <div className="col-12 mt-5">
          <div className="d-flex justify-content-center">
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
    </div>
  );
}