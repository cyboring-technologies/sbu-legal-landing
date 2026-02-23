'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const InteractiveGridPulse = dynamic(
  () => import('./InteractiveGridPulse').then((m) => m.InteractiveGridPulse),
  { ssr: false }
);

export function HeroBackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Prioritize Main Content Paint
    // 2. Load effects only after hydration and a small delay/idle to allow CPU to breathe

    const loadEffects = () => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => setMounted(true));
      } else {
        setTimeout(() => setMounted(true), 500); // Fallback for no idle support
      }
    };

    // If document is already complete (SPA nav), simple timeout
    if (document.readyState === 'complete') {
      const t = setTimeout(loadEffects, 100);
      return () => clearTimeout(t);
    }

    // Otherwise wait for load
    window.addEventListener('load', loadEffects);
    return () => window.removeEventListener('load', loadEffects);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <InteractiveGridPulse />
    </div>
  );
}
