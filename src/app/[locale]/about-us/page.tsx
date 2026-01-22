
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
} from 'lucide-react';

export default function AboutUsPage() {
  const t = useTranslations('aboutUs');

  return (
    <Layout>
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
      {/* Company Story */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">

            {/* Left Column: Main Title & Logo */}
            <div className="lg:col-span-4 mb-12 lg:mb-0">
              <div className="sticky top-24">
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
              </div>
            </div>

            {/* Right Column: Content Stack */}
            <div className="lg:col-span-8 space-y-12">

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
                  href="/vba-model"
                  variant="primary"
                  size="md"
                >
                  {t('story.cta1')}
                </CTAButton>
                <CTAButton
                  href="/infrastructure"
                  variant="secondary"
                  size="md"
                >
                  {t('story.cta2')}
                </CTAButton>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
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
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <Lightbulb className="w-12 h-12 text-purple-600 dark:text-purple-400 mr-4" />
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
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <CTAButton
              href="/start-document"
              variant="primary"
              size="lg"
            >
              {t('missionVision.cta1')}
            </CTAButton>
            <CTAButton
              href="/security-protocols"
              variant="secondary"
              size="lg"
            >
              {t('missionVision.cta2')}
            </CTAButton>
          </div>
        </div>
      </section>
      {/* Core Values */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* 1. Rigor */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">⚙️</span>
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
            </div>

            {/* 2. Sovereignty */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">🧠</span>
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
            </div>

            {/* 3. Trust */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">🛡️</span>
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
            </div>

            {/* 4. Speed */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">⚡</span>
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
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/security-docs"
              variant="secondary"
              size="lg"
            >
              {t('values.cta1')}
            </CTAButton>
            <CTAButton
              href="/new-project"
              variant="primary"
              size="lg"
            >
              {t('values.cta2')}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('stats.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Ephemeral */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">🔥</span>
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
            </div>

            {/* Availability */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">☁️</span>
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
            </div>

            {/* Zero Storage */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">🚫</span>
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
            </div>

            {/* Speed */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">⚡</span>
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
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/security-audit"
              variant="secondary"
              size="lg"
            >
              {t('stats.cta1')}
            </CTAButton>
            <CTAButton
              href="/new-document"
              variant="primary"
              size="lg"
            >
              {t('stats.cta2')}
            </CTAButton>
          </div>
        </div>
      </section>
      {/* Standards and Strategic Alliances */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('standards.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* HITL */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                {t('standards.items.hitl.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {t('standards.items.hitl.body')}
              </p>
            </div>

            {/* Agnostic Intelligence */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                {t('standards.items.agnostic.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {t('standards.items.agnostic.body')}
              </p>
            </div>

            {/* Resilience */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                {t('standards.items.resilience.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {t('standards.items.resilience.body')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/specs"
              variant="secondary"
              size="lg"
            >
              {t('standards.cta1')}
            </CTAButton>
            <CTAButton
              href="/welcome-credits"
              variant="primary"
              size="lg"
            >
              {t('standards.cta2')}
            </CTAButton>
          </div>
        </div>
      </section >
      {/* Incinerator Protocol */}
      < IncineratorProtocolSection />
      {/* Contact Information */}
      < section className="py-20 bg-background border-b border-border relative overflow-hidden" >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{t('cta.title')}</h2>
          <h3 className="mt-4 text-xl font-semibold text-blue-600 dark:text-blue-400">{t('cta.subtitle')}</h3>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('cta.description')}</p>

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
        </div>
      </section >
    </Layout >
  );
}
