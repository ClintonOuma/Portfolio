'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[101] h-0.5 bg-transparent pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform duration-150 ease-out origin-left"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
