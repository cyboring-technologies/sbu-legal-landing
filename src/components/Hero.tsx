import React, { useState, useEffect } from 'react';
import { Link } from '../i18n/navigation';
import { CTAButton } from './CTAButtons';
import { HtmlContent } from './HtmlContent';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  prompt?: string;
  foundersGrant?: string;
  incineratorProtocol?: string;
  chips?: {
    response: string;
    complaint: string;
    lease: string;
    notification: string;
  };
  backgroundImage?: string;
  className?: string;
  backgroundVariant?: 'default' | 'animated-gradient' | 'mesh' | 'geometric' | 'radial' | 'diagonal';
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  prompt,
  foundersGrant,
  incineratorProtocol,
  chips,
  backgroundImage,
  className = '',
  backgroundVariant = 'default',
}) => {
  return (
    <section
      className={`relative bg-background text-foreground pt-32 pb-32 overflow-hidden min-h-[600px] border-b border-border ${className}`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          {/* Subtitle */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full border border-border">
              {subtitle}
            </span>
          </div>

          {/* Main Title */}
          <div className="font-logo">
            <HtmlContent
              content={title}
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-sans font-semibold mb-8 leading-tight tracking-tight text-foreground"
            />
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Interaction Block */}
          {chips && (
            <div className="mb-8">
              <p className="text-lg font-medium text-muted-foreground mb-4 font-sans">{prompt}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { key: 'response', text: chips.response },
                  { key: 'complaint', text: chips.complaint },
                  { key: 'lease', text: chips.lease },
                  { key: 'notification', text: chips.notification },
                ].map(({ key, text }) => (
                  <Link
                    key={key}
                    href={`/login?intent=${key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-background border border-gray-300 dark:border-gray-700 rounded-full text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 font-sans text-sm md:text-base font-medium"
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Primary Conversion Trigger */}
          <div className="flex flex-col items-center gap-4 mb-0">
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <CTAButton
                href={primaryCTA.href}
                variant="primary"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-8 py-4 text-lg w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                {primaryCTA.text}
              </CTAButton>
              {secondaryCTA && (
                <CTAButton
                  href={secondaryCTA.href}
                  variant="secondary"
                  size="lg"
                  className="bg-background border-2 border-border text-foreground hover:border-primary hover:text-primary px-8 py-4 text-lg w-full sm:w-auto"
                >
                  {secondaryCTA.text}
                </CTAButton>
              )}
            </div>
          </div>

          {/* Trust Block (Grouped) */}
          <div className="mt-24 pt-8 border-t border-border/50 flex flex-col items-center gap-6">
            {foundersGrant && (
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {foundersGrant}
              </p>
            )}

            {incineratorProtocol && (
              <p className="text-sm text-muted-foreground font-mono bg-transparent inline-block px-4 py-2 rounded-lg">
                {incineratorProtocol}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
