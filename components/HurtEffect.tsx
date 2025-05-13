import { useEffect, useState } from 'react';

export default function HurtEffect({ isActive }: { isActive: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Ensure the effect is hidden when isActive is false
      setVisible(false);
    }
  }, [isActive]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        pointerEvents: 'none',
        zIndex: 1000,
        animation: 'flash 0.3s forwards'
      }}
    />
  );
}
