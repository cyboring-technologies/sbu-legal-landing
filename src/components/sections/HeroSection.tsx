'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '../Hero';

// Dynamic imports for heavy interactive grid components
const InteractiveGridAnimatedRadialInward = dynamic(
  () =>
    import('../InteractiveGridAnimatedRadialInward').then(
      (m) => m.InteractiveGridAnimatedRadialInward
    ),
  { ssr: false }
);

const InteractiveGridPulse = dynamic(
  () => import('../InteractiveGridPulse').then((m) => m.InteractiveGridPulse),
  { ssr: false }
);

interface HeroSectionProps {
  translations: {
    title: string;
    subtitle: string;
    description: string;
    primaryCTA: string;
    secondaryCTA: string;
    badge1: { value: string; label: string };
    badge2: { value: string; label: string };
    badge3: { value: string; label: string };
  };
}

export function HeroSection({ translations }: HeroSectionProps) {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Fade in hero on first load
    setHeroVisible(true);
  }, []);

  return (
    <div
      className="relative"
      style={{
        opacity: heroVisible ? 1 : 0,
        transition: 'opacity 0.2s ease-in',
      }}
    >
      <Hero
        title={translations.title}
        subtitle={translations.subtitle}
        description={translations.description}
        primaryCTA={{
          text: translations.primaryCTA,
          href: '/login?method=google',
        }}
        secondaryCTA={{
          text: translations.secondaryCTA,
          href: '/our-services',
        }}
        backgroundImage="/images/hero-bg.jpg"
        backgroundVariant="radial"

      />
      <InteractiveGridAnimatedRadialInward />
      <InteractiveGridPulse />
    </div>
  );
}
