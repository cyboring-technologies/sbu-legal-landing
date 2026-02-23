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
                <CTAButton
                  href="/engine"
                  variant="primary"
                  className="w-full justify-center"
                  ctaType="cta-1"
                >
                  {t('draftingEngine.cta_1_start')}
                </CTAButton>
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
                <CTAButton
                  href="#contact"
                  variant="secondary"
                  className="w-full justify-center"
                  ctaType="cta-2"
                >
                  {t('infrastructure.cta_2_security')}
                </CTAButton>
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

            {/* Tech Stack List */}
            <FadeIn direction="up" delay={200}>
              <div className="mt-16 bg-muted/30 dark:bg-muted/10 rounded-3xl p-8 lg:p-12 border border-border/50 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

                <h3 className="text-3xl font-bold text-foreground mb-6 text-center relative z-10">
                  {t('technologies.techStack.title')}
                </h3>
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg leading-relaxed relative z-10">
                  {t.rich('technologies.techStack.intro', {
                    br: () => <br />,
                  })}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto relative z-10">
                  {/* Tech Stack Items */}
                  {[
                    'frontend',
                    'businessLogic',
                    'intelligence',
                    'orchestration',
                    'infrastructure',
                    'security',
                  ].map((key) => (
                    <div
                      key={key}
                      className="group p-6 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="mt-2 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-primary dark:bg-white shadow-sm group-hover:scale-125 transition-transform duration-300" />
                        <p className="text-foreground font-medium text-lg leading-relaxed group-hover:text-primary transition-colors duration-300">
                          {t(`technologies.techStack.${key}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
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
          className="py-16 bg-background border-b border-border relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('cta.title')} description={t('cta.subtitle')} />

            <StaggeredGrid columns={3}>
              {/* 1. Incinerator Protocol */}
              <HoverCard className="p-8 flex flex-col bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('cta.protocol.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm leading-relaxed">
                  {t('cta.protocol.description')}
                </p>
                <div className="space-y-4 mt-auto">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                      {t('cta.protocol.guarantee')}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                      {t('cta.protocol.infrastructure')}
                    </p>
                  </div>
                </div>
              </HoverCard>

              {/* 2. WhatsApp Bridge */}
              <HoverCard className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('cta.whatsapp.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow">
                  {t('cta.whatsapp.description')}
                </p>
                <div className="mb-4">
                  <CTAButton
                    href="https://wa.me/50687504770"
                    variant="secondary"
                    size="md"
                    className="w-full justify-center"
                    ctaType="cta-3"
                    note={t('cta.whatsapp.cta_3_note')}
                    target="_blank"
                  >
                    {t('cta.whatsapp.cta_3_chat')}
                  </CTAButton>
                </div>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
                  {t('cta.whatsapp.microcopy')}
                </p>
              </HoverCard>

              {/* 3. Founder's Grant */}
              <HoverCard className="p-8 flex flex-col h-full relative overflow-hidden border-t-2 border-t-primary">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('cta.grant.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow">
                  {t('cta.grant.description')}
                </p>
                <div className="mb-4">
                  <CTAButton
                    href="/engine"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    ctaType="cta-1"
                  >
                    {t('cta.grant.cta_1_activate')}
                  </CTAButton>
                </div>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
                  {t('cta.grant.microcopy')}
                </p>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
