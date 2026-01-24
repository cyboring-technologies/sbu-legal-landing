'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '../../../i18n/navigation';
import { useTranslations } from 'next-intl';
import Layout from '../../../components/Layout';
import Hero from '../../../components/Hero';
import { InteractiveGridPulse } from '../../../components/InteractiveGridPulse';
import { IncineratorProtocolSection } from '../../../components/sections';
import { CTAButton } from '../../../components/CTAButtons';
import { FadeIn } from '../../../components/ui/animations/FadeIn';
import { StaggeredGrid } from '../../../components/ui/animations/StaggeredGrid';
import { HoverCard } from '../../../components/ui/animations/HoverCard';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import {
  Target,
  Users,
  Award,
  TrendingUp,
  Heart,
  Shield,
  Lightbulb,
  Globe,
  MapPin,
  Calendar,
  Mail,
  Linkedin,
  Settings,
  Brain,
  Zap,
  Flame,
  Cloud,
  Ban,
} from 'lucide-react';
import { PageTransition } from '../../../components/ui/PageTransition';

export default function AboutUsPage() {
  const t = useTranslations('aboutUs');

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
              text: t('hero.primaryCTA'),
              href: '/privacy',
            }}
            secondaryCTA={{
              text: t('hero.secondaryCTA'),
              href: '/contact',
            }}
            backgroundImage="/images/about-hero-bg.jpg"
            backgroundVariant="radial"
          />
          <InteractiveGridPulse />
        </div>{' '}
        {/* Company Story - Narrative */}
        <section className="py-32 bg-background border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">

              {/* Left Column: Main Title & Logo */}
              <div className="lg:col-span-4 mb-12 lg:mb-0">
                <div className="sticky top-24">
                  <FadeIn direction="right">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-8">
                      {t('story.title')}
                    </h2>
                    <Link
                      href="https://www.cyboring.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-48 opacity-80 hover:opacity-100 transition-opacity block"
                    >
                      <Image
                        src="/cyboring-logo-light-mode.svg"
                        alt="Cyboring Technologies Logo"
                        width={200}
                        height={60}
                        className="w-full h-auto dark:hidden"
                      />
                      <Image
                        src="/cyboring-logo-dark-mode.svg"
                        alt="Cyboring Technologies Logo"
                        width={200}
                        height={60}
                        className="w-full h-auto hidden dark:block"
                      />
                    </Link>
                  </FadeIn>
                </div>
              </div>

              {/* Right Column: Content Stack */}
              <div className="lg:col-span-8 space-y-12">
                <StaggeredGrid columns={1} staggerDelay={150}>
                  {/* Origin */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {t('story.items.origin.title')}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('story.items.origin.body')}
                    </p>
                  </div>

                  {/* VBA Model */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {t('story.items.vba.title')}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('story.items.vba.body')}
                    </p>
                  </div>

                  {/* Philosophy */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {t('story.items.philosophy.title')}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('story.items.philosophy.body')}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <CTAButton
                      href="/contact"
                      variant="primary"
                      size="md"
                    >
                      {t('story.cta1')}
                    </CTAButton>
                    <CTAButton
                      href="/contact"
                      variant="secondary"
                      size="md"
                    >
                      {t('story.cta2')}
                    </CTAButton>
                  </div>
                </StaggeredGrid>
              </div>
            </div>
          </div>
        </section>
        {/* Mission & Vision - Narrative */}
        <section className="py-32 bg-background border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <StaggeredGrid columns={2}>
              {/* Mission */}
              <HoverCard className="p-8 group">
                <div className="flex items-center mb-6">
                  <Target className="w-12 h-12 text-gray-900 dark:text-white mr-4 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t('mission.title')}
                    </h3>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t('mission.headline')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {t('mission.description')}
                </p>
              </HoverCard>

              {/* Vision */}
              <HoverCard className="p-8 group">
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-12 h-12 text-gray-900 dark:text-white mr-4 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t('vision.title')}
                    </h3>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t('vision.headline')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {t('vision.description')}
                </p>
              </HoverCard>
            </StaggeredGrid>

            <FadeIn direction="up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <CTAButton
                  href="/login"
                  variant="primary"
                  size="lg"
                >
                  {t('missionVision.cta1')}
                </CTAButton>
                <CTAButton
                  href="/privacy"
                  variant="secondary"
                  size="lg"
                >
                  {t('missionVision.cta2')}
                </CTAButton>
              </div>
            </FadeIn>
          </div>
        </section>
        {/* Core Values - Conceptual */}
        <section className="py-32 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('values.title')} />

            <StaggeredGrid columns={2} className="mb-12">
              {/* 1. Rigor */}
              <HoverCard className="p-8 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('values.items.rigor.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('values.items.rigor.body')}
                    </p>
                  </div>
                </div>
              </HoverCard>

              {/* 2. Sovereignty */}
              <HoverCard className="p-8 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('values.items.sovereignty.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('values.items.sovereignty.body')}
                    </p>
                  </div>
                </div>
              </HoverCard>

              {/* 3. Trust */}
              <HoverCard className="p-8 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('values.items.trust.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('values.items.trust.body')}
                    </p>
                  </div>
                </div>
              </HoverCard>

              {/* 4. Speed */}
              <HoverCard className="p-8 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('values.items.speed.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('values.items.speed.body')}
                    </p>
                  </div>
                </div>
              </HoverCard>
            </StaggeredGrid>

            <FadeIn direction='up' delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href="/privacy"
                  variant="secondary"
                  size="lg"
                >
                  {t('values.cta1')}
                </CTAButton>
                <CTAButton
                  href="/login"
                  variant="primary"
                  size="lg"
                >
                  {t('values.cta2')}
                </CTAButton>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Company Stats - Operational */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('stats.title')} />

            <StaggeredGrid columns={2} className="mb-12">
              {/* Ephemeral */}
              <HoverCard className="p-8 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('stats.items.ephemeral.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('stats.items.ephemeral.body')}
                    </p>
                  </div>
                </div>
              </HoverCard>

              {/* Availability */}
              <HoverCard className="p-8 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('stats.items.availability.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('stats.items.availability.body')}
                    </p>
                  </div>
                </div>
              </HoverCard>

              {/* Zero Storage */}
              <HoverCard className="p-8 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Ban className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('stats.items.zero_storage.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('stats.items.zero_storage.body')}
                    </p>
                  </div>
                </div>
              </HoverCard>

              {/* Speed */}
              <HoverCard className="p-8 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('stats.items.speed.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('stats.items.speed.body')}
                    </p>
                  </div>
                </div>
              </HoverCard>
            </StaggeredGrid>

            <FadeIn direction='up' delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href="/privacy"
                  variant="secondary"
                  size="lg"
                >
                  {t('stats.cta1')}
                </CTAButton>
                <CTAButton
                  href="/login"
                  variant="primary"
                  size="lg"
                >
                  {t('stats.cta2')}
                </CTAButton>
              </div>
            </FadeIn>
          </div>
        </section>
        {/* Standards and Strategic Alliances */}
        <section className="py-20 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader title={t('standards.title')} />

            <StaggeredGrid columns={3} className="mb-12">
              {/* HITL */}
              <HoverCard className="p-8 group">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {t('standards.items.hitl.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {t('standards.items.hitl.body')}
                </p>
              </HoverCard>

              {/* Agnostic Intelligence */}
              <HoverCard className="p-8 group">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {t('standards.items.agnostic.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {t('standards.items.agnostic.body')}
                </p>
              </HoverCard>

              {/* Resilience */}
              <HoverCard className="p-8 group">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {t('standards.items.resilience.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {t('standards.items.resilience.body')}
                </p>
              </HoverCard>
            </StaggeredGrid>

            <FadeIn direction='up' delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href="/contact"
                  variant="secondary"
                  size="lg"
                >
                  {t('standards.cta1')}
                </CTAButton>
                <CTAButton
                  href="/login"
                  variant="primary"
                  size="lg"
                >
                  {t('standards.cta2')}
                </CTAButton>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Incinerator Protocol */}
        <IncineratorProtocolSection />

        {/* Contact Information - Closing */}
        <section className="py-16 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <SectionHeader
              title={t('cta.title')}
              subtitle={t('cta.subtitle')}
              description={t('cta.description')}
            />

            <FadeIn direction='up'>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                >
                  {t('cta.primaryButton')}
                </CTAButton>
                <CTAButton
                  href="/our-services"
                  variant="secondary"
                  size="lg"
                >
                  {t('cta.secondaryButton')}
                </CTAButton>
              </div>
            </FadeIn>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
