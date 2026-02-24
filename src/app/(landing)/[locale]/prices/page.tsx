'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Layout from '../../../../components/Layout';
import Hero from '../../../../components/Hero';
import { InteractiveGridPulse } from '../../../../components/InteractiveGridPulse';
import { CTAButton } from '../../../../components/CTAButtons';
import { FadeIn } from '../../../../components/ui/animations/FadeIn';
import { StaggeredGrid } from '../../../../components/ui/animations/StaggeredGrid';
import { HoverCard } from '../../../../components/ui/animations/HoverCard';
import { SectionHeader } from '../../../../components/ui/SectionHeader';
import {
  ShieldCheck,
  Cpu,
  Search,
  CheckCircle,
  XCircle,
  ArrowRight,
  Lock,
  Trash2,
  History,
  TrendingUp,
  AlertCircle,
  Scale,
  Zap,
  Check,
  X,
} from 'lucide-react';
import { PageTransition } from '../../../../components/ui/PageTransition';

export default function PricesPage() {
  const t = useTranslations('prices');

  return (
    <Layout>
      <PageTransition>
        {/* Hero Section */}
        <div className="relative">
          <Hero
            title={t('hero.title')}
            subtitle={t('hero.subtitle')}
            description={t('hero.description')}
            primaryCTA={{
              text: t('hero.cta_1_primary'),
              href: '/engine',
            }}
            backgroundImage="/images/pricing-hero-bg.jpg"
            backgroundVariant="radial"
          />
          <InteractiveGridPulse />
        </div>

        {/* Authorization & Exclusions Split Section - NOW SECOND */}
        <section className="py-24 bg-muted/30 border-b border-border relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* What Payment Authorizes */}
              <FadeIn direction="right">
                <div className="h-full">
                  <div className="flex items-center mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mr-4" />
                    <h3 className="text-2xl font-bold text-foreground">
                      {t('authorization.title')}
                    </h3>
                  </div>
                  <p className="text-lg text-muted-foreground mb-8">
                    {t('authorization.description')}
                  </p>

                  <div className="bg-background dark:bg-card rounded-2xl p-8 border border-border shadow-sm h-fit transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20">
                    <ul className="space-y-6">
                      <li className="flex items-start">
                        <div className="bg-emerald-500/10 p-2 rounded-full mr-4 mt-1">
                          <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-lg font-medium text-foreground">
                          {t('authorization.items.0')}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-emerald-500/10 p-2 rounded-full mr-4 mt-1">
                          <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-lg font-medium text-foreground">
                          {t('authorization.items.1')}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-emerald-500/10 p-2 rounded-full mr-4 mt-1">
                          <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-lg font-medium text-foreground">
                          {t('authorization.items.2')}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-emerald-500/10 p-2 rounded-full mr-4 mt-1">
                          <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-lg font-medium text-foreground">
                          {t('authorization.items.3')}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* What is NOT Sold - COMPACTED */}
              <FadeIn direction="left" delay={200}>
                <div className="h-full">
                  <div className="flex items-center mb-6">
                    <XCircle className="w-8 h-8 text-red-600 mr-4" />
                    <h3 className="text-2xl font-bold text-foreground">{t('exclusions.title')}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground mb-8">
                    {t('exclusions.description')}
                  </p>
                  {/* Changed to 2-column grid for compactness */}
                  <div className="bg-background dark:bg-card rounded-2xl p-8 border border-border shadow-sm h-fit transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20">
                    <ul className="space-y-6">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-red-500/10 p-2 rounded-full mr-4 mt-1">
                            <X className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="text-lg font-medium text-foreground">
                            {t(`exclusions.items.${index}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Mechanics Block - How Price is Determined - NOW THIRD */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('mechanics.title')} description={t('mechanics.description')} />

            <StaggeredGrid columns={3} className="mt-16">
              {/* Analysis */}
              <HoverCard className="p-8 text-left group border-primary/20">
                <div className="flex items-center mb-6 text-primary">
                  <Search className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">
                  {t('mechanics.items.analysis.title')}
                </h4>
                <p className="text-muted-foreground">{t('mechanics.items.analysis.description')}</p>
              </HoverCard>

              {/* Complexity */}
              <HoverCard className="p-8 text-left group border-primary/20">
                <div className="flex items-center mb-6 text-primary">
                  <Cpu className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">
                  {t('mechanics.items.complexity.title')}
                </h4>
                <p className="text-muted-foreground">
                  {t('mechanics.items.complexity.description')}
                </p>
              </HoverCard>

              {/* Certainty */}
              <HoverCard className="p-8 text-left group border-primary/20">
                <div className="flex items-center mb-6 text-primary">
                  <ShieldCheck className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">
                  {t('mechanics.items.certainty.title')}
                </h4>
                <p className="text-muted-foreground">
                  {t('mechanics.items.certainty.description')}
                </p>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>

        {/* Historical Cost Context - Anchors & Disclaimer - NOW FOURTH */}
        <section className="py-24 bg-muted/20 border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              title={t('historicalContext.title')}
              description={t('historicalContext.description')}
            />

            <StaggeredGrid columns={3} className="mt-16 mb-16">
              {/* Compute Floor */}
              <HoverCard className="p-8 text-left group border-primary/20 bg-background">
                <div className="flex items-center mb-6 text-primary">
                  <Cpu className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {t('historicalContext.items.floor.title')}
                </h4>
                <div className="text-4xl font-bold text-primary my-6">
                  {' '}
                  {/* Increased padding/size */}
                  {t('historicalContext.items.floor.price')}
                </div>
                <p className="text-muted-foreground text-sm">
                  {t('historicalContext.items.floor.description')}
                </p>
              </HoverCard>

              {/* Standard Spectrum */}
              <HoverCard className="p-8 text-left group border-primary/20 bg-background ring-1 ring-primary/10">
                <div className="flex items-center mb-6 text-primary">
                  <Scale className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {t('historicalContext.items.standard.title')}
                </h4>
                <div className="text-4xl font-bold text-primary my-6">
                  {' '}
                  {/* Increased padding/size */}
                  {t('historicalContext.items.standard.price')}
                </div>
                <p className="text-muted-foreground text-sm">
                  {t('historicalContext.items.standard.description')}
                </p>
              </HoverCard>

              {/* High Density */}
              <HoverCard className="p-8 text-left group border-primary/20 bg-background">
                <div className="flex items-center mb-6 text-primary">
                  <TrendingUp className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {t('historicalContext.items.highDensity.title')}
                </h4>
                <div className="text-4xl font-bold text-primary my-6">
                  {' '}
                  {/* Increased padding/size */}
                  {t('historicalContext.items.highDensity.price')}
                </div>
                <p className="text-muted-foreground text-sm">
                  {t('historicalContext.items.highDensity.description')}
                </p>
              </HoverCard>
            </StaggeredGrid>

            {/* Validity Disclaimer - Mandatory Override - REFRAMED */}
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl p-8 max-w-4xl mx-auto shadow-sm">
              <div className="flex items-start">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-foreground mb-4">
                    {t('validityDisclaimer.title')}
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-slate-600 dark:text-muted-foreground text-sm flex items-start">
                      <span className="mr-2">•</span>
                      {t('validityDisclaimer.items.0')}
                    </li>
                    <li className="text-slate-600 dark:text-muted-foreground text-sm flex items-start">
                      <span className="mr-2">•</span>
                      {t('validityDisclaimer.items.1')}
                    </li>
                    <li className="text-slate-900 dark:text-foreground font-medium text-sm flex items-start">
                      <span className="mr-2">•</span>
                      {t('validityDisclaimer.items.2')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-background relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>

            <FadeIn direction="up" delay={200}>
              <CTAButton
                href="/engine"
                variant="primary"
                size="lg"
                ctaType="cta-1"
                className="w-full sm:w-auto"
              >
                {t('cta.button')}
              </CTAButton>
            </FadeIn>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
