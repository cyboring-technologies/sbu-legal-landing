'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Layout from '../../../../components/Layout';
import Hero from '../../../../components/Hero';
import { InteractiveGridAnimatedRadialInward } from '../../../../components/InteractiveGridAnimatedRadialInward';
import { InteractiveGridPulse } from '../../../../components/InteractiveGridPulse';
import { CTAButton } from '../../../../components/CTAButtons';
import { FadeIn } from '../../../../components/ui/animations/FadeIn';
import { StaggeredGrid } from '../../../../components/ui/animations/StaggeredGrid';
import { HoverCard } from '../../../../components/ui/animations/HoverCard';
import { SectionHeader } from '../../../../components/ui/SectionHeader';
import {
  Zap,
  ShieldCheck,
  Users,
  Code,
  FileText,
  Cloud,
  BarChart3,
  Smartphone,
  Database,
  CheckCircle,
  ArrowRight,
  Star,
} from 'lucide-react';
import { PageTransition } from '../../../../components/ui/PageTransition';

export default function OurServicesPage() {
  const t = useTranslations('ourServices');
  const [showRadialEffect, setShowRadialEffect] = React.useState(true);
  const [radialEffectOpacity, setRadialEffectOpacity] = React.useState(1);

  React.useEffect(() => {
    // Animation runs for approximately 300 offset units at 0.125 per frame
    // At ~60fps, that's about 300/0.125 = 2400 frames = ~40 seconds for full cycle
    // But the visible wave effect completes much faster, around 8-10 seconds
    // Let's use 10 seconds for the complete wave animation
    const animationDuration = 10000; // 10 seconds
    const fadeOutDuration = 1000; // 1 second

    // Start fade out after animation completes
    const fadeOutTimer = setTimeout(() => {
      setRadialEffectOpacity(0);
    }, animationDuration);

    // Remove component after fade out completes
    const removeTimer = setTimeout(() => {
      setShowRadialEffect(false);
    }, animationDuration + fadeOutDuration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

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
            secondaryCTA={{
              text: t('hero.cta_2_secondary'),
              href: '/privacy',
            }}
            backgroundImage="/images/services-hero-bg.jpg"
            backgroundVariant="radial"
          />
          {showRadialEffect && (
            <div
              style={{
                opacity: radialEffectOpacity,
                transition: 'opacity 1s ease-out',
              }}
            >
              <InteractiveGridAnimatedRadialInward startImmediately runOnce />
            </div>
          )}
          <InteractiveGridPulse />
        </div>{' '}
        {/* Service Catalog - New Section */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('serviceCatalog.title')} />
            <StaggeredGrid columns={2} className="gap-6 mt-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <HoverCard
                  key={item}
                  className="p-8 flex flex-col h-full group bg-card transition-all duration-300 hover:shadow-xl border border-border/50"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {t(`serviceCatalog.items.item${item}.title`)}
                  </h3>
                  <div className="mb-4">
                    <p className="text-primary font-semibold text-sm uppercase tracking-wide">
                      {t(`serviceCatalog.items.item${item}.action`)}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-grow">
                    {t(`serviceCatalog.items.item${item}.copy`)}
                  </p>
                  <div className="border-t border-border pt-4 mt-auto">
                    <p className="text-xs text-muted-foreground/80 italic font-mono">
                      {t(`serviceCatalog.items.item${item}.footer`)}
                    </p>
                  </div>
                </HoverCard>
              ))}
            </StaggeredGrid>
          </div>
        </section>
        {/* Service Process - Process/List */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('process.title')} description={t('process.description')} />

            <StaggeredGrid columns={4} className="mt-12">
              <HoverCard className="p-6 text-center h-full group">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-3">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('process.step1.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-left">
                  {t('process.step1.description')}
                </p>
              </HoverCard>

              <HoverCard className="p-6 text-center h-full group">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:-rotate-3">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('process.step2.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-left">
                  {t('process.step2.description')}
                </p>
              </HoverCard>

              <HoverCard className="p-6 text-center h-full group">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-3">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('process.step3.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-left">
                  {t('process.step3.description')}
                </p>
              </HoverCard>

              <HoverCard className="p-6 text-center h-full group">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:-rotate-3">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('process.step4.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-left">
                  {t('process.step4.description')}
                </p>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
        {/* Overview - Narrative */}
        <section className="py-32 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('overview.title')} description={t('overview.description')} />

            <StaggeredGrid columns={2} className="mt-12">
              {/* 1. Drafting Engine */}
              <HoverCard className="p-8 flex flex-col h-full group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('draftingEngine.title')}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {t('draftingEngine.description')}
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Capacidades:</span>{' '}
                      {t('draftingEngine.capabilities')}
                    </span>
                  </li>
                  <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Rigor:</span> {t('draftingEngine.rigor')}
                    </span>
                  </li>
                  <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">HITL:</span> {t('draftingEngine.hitl')}
                    </span>
                  </li>
                </ul>
              </HoverCard>

              {/* 3. Infrastructure */}
              <HoverCard className="p-8 flex flex-col h-full group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('infrastructure.title')}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {t('infrastructure.description')}
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Eliminación:</span>{' '}
                      {t('infrastructure.totalDeletion')}
                    </span>
                  </li>
                  <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Orquestación:</span>{' '}
                      {t('infrastructure.orchestration')}
                    </span>
                  </li>
                  <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Arquitectura:</span>{' '}
                      {t('infrastructure.architecture')}
                    </span>
                  </li>
                </ul>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
        {/* Technologies - List */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              title={t('technologies.title')}
              description={t('technologies.description')}
            />

            <StaggeredGrid columns={3} className="mb-16">
              {/* Foundation */}
              <HoverCard className="p-8 group">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300" />
                  {t('technologies.foundation.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('technologies.foundation.description')}
                </p>
              </HoverCard>

              {/* Security */}
              <HoverCard className="p-8 group">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <ShieldCheck className="w-6 h-6 mr-2 text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300" />
                  {t('technologies.security.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('technologies.security.description')}
                </p>
              </HoverCard>

              {/* Efficiency */}
              <HoverCard className="p-8 group">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300" />
                  {t('technologies.efficiency.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('technologies.efficiency.description')}
                </p>
              </HoverCard>
            </StaggeredGrid>


          </div>
        </section>
        {/* Service Benefits - List */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('benefits.title')} description={t('benefits.description')} />

            <StaggeredGrid columns={2}>
              {/* Benefit 1 */}
              <HoverCard className="p-8 group">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <h4 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {t('benefits.benefit1.title')}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[48px]">
                  {t('benefits.benefit1.description')}
                </p>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-semibold text-primary dark:text-white">
                    <span className="uppercase tracking-wider text-xs opacity-70 block mb-1">
                      {t('benefits.impactLabel')}
                    </span>
                    {t('benefits.benefit1.impact')}
                  </p>
                </div>
              </HoverCard>

              {/* Benefit 2 */}
              <HoverCard className="p-8 group">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <h4 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {t('benefits.benefit2.title')}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[48px]">
                  {t('benefits.benefit2.description')}
                </p>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-semibold text-primary dark:text-white">
                    <span className="uppercase tracking-wider text-xs opacity-70 block mb-1">
                      {t('benefits.impactLabel')}
                    </span>
                    {t('benefits.benefit2.impact')}
                  </p>
                </div>
              </HoverCard>

              {/* Benefit 3 */}
              <HoverCard className="p-8 group">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <h4 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {t('benefits.benefit3.title')}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[48px]">
                  {t('benefits.benefit3.description')}
                </p>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-semibold text-primary dark:text-white">
                    <span className="uppercase tracking-wider text-xs opacity-70 block mb-1">
                      {t('benefits.impactLabel')}
                    </span>
                    {t('benefits.benefit3.impact')}
                  </p>
                </div>
              </HoverCard>

              {/* Benefit 4 */}
              <HoverCard className="p-8 group">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <h4 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {t('benefits.benefit4.title')}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[48px]">
                  {t('benefits.benefit4.description')}
                </p>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-semibold text-primary dark:text-white">
                    <span className="uppercase tracking-wider text-xs opacity-70 block mb-1">
                      {t('benefits.impactLabel')}
                    </span>
                    {t('benefits.benefit4.impact')}
                  </p>
                </div>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
        {/* Call to Action - Closing */}
        <section
          id="contact"
          className="py-24 bg-background relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <SectionHeader title={t('cta.title')} description={t('cta.description')} />

            <FadeIn direction="up" delay={100} className="mt-8">
              <CTAButton
                href="/engine"
                variant="primary"
                size="lg"
                className="justify-center"
                ctaType="cta-1"
              >
                {t('cta.cta_1_primary')}
              </CTAButton>
            </FadeIn>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
