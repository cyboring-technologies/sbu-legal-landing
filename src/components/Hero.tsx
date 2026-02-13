import React, { useState, useEffect } from 'react';
import { Link } from '../i18n/navigation';
import { CTAButton, CTAType } from './CTAButtons';
import { HtmlContent } from './HtmlContent';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
    onClick?: () => void;
    ctaType?: CTAType;
    target?: '_blank' | '_self';
    note?: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
    ctaType?: CTAType;
    target?: '_blank' | '_self';
    note?: string;
  };
  incineratorProtocol?: string;
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
  incineratorProtocol,
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
          <HtmlContent
            content={description}
            as="p"
            className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed"
          />

          {/* Primary Conversion Trigger */}
          <div className="flex flex-col items-center gap-4 mb-0">
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              {(() => {
                const isEngine = primaryCTA.href === '/engine' || primaryCTA.href?.includes('/engine?');
                const deducedType = primaryCTA.ctaType || (isEngine ? 'cta-1' : 'cta-2');
                const variant = deducedType === 'cta-2' ? 'secondary' : 'primary';

                return (
                  <CTAButton
                    href={deducedType === 'cta-1' ? '/engine' : primaryCTA.href}
                    variant={variant}
                    size="lg"
                    className={variant === 'primary' ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-8 py-4 text-lg w-full sm:w-auto' : 'bg-background border-2 border-border text-foreground hover:border-primary hover:text-primary px-8 py-4 text-lg w-full sm:w-auto'}
                    ctaType={deducedType as any}
                    onClick={primaryCTA.onClick}
                    target={primaryCTA.target}
                    note={primaryCTA.note}
                  >
                    {primaryCTA.text}
                  </CTAButton>
                );
              })()}
              {secondaryCTA && (
                <CTAButton
                  href={secondaryCTA.href}
                  variant="secondary"
                  size="lg"
                  className="bg-background border-2 border-border text-foreground hover:border-primary hover:text-primary px-8 py-4 text-lg w-full sm:w-auto"
                  ctaType={(secondaryCTA.ctaType || 'cta-2') as any}
                  target={secondaryCTA.target}
                  note={secondaryCTA.note}
                >
                  {secondaryCTA.text}
                </CTAButton>
              )}
            </div>
          </div>

          {/* Trust Block (Grouped) */}
          <div className="mt-24 pt-8 flex flex-col items-center gap-6">


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
