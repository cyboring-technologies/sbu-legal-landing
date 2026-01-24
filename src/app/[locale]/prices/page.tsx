'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Layout from '../../../components/Layout';
import Hero from '../../../components/Hero';
import { InteractiveGridPulse } from '../../../components/InteractiveGridPulse';
import { CTAButton } from '../../../components/CTAButtons';
import { FadeIn } from '../../../components/ui/animations/FadeIn';
import { StaggeredGrid } from '../../../components/ui/animations/StaggeredGrid';
import { HoverCard } from '../../../components/ui/animations/HoverCard';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import {
  Check,
  X,
  Star,
  Zap,
  Shield,
  Users,
  Phone,
  Mail,
  ArrowRight,
  CreditCard,
  FileText,
  Building2,
  ScrollText,
} from 'lucide-react';

export default function PricesPage() {
  const t = useTranslations('prices');

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
            href: '/login',
          }}
          secondaryCTA={{
            text: t('hero.secondaryCTA'),
            href: '#packages',
          }}
          foundersGrant={t('hero.microcopy')}
          backgroundImage="/images/pricing-hero-bg.jpg"
          backgroundVariant="radial"
        />
        <InteractiveGridPulse />
      </div>{' '}
      {/* Credit System Explanation */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            title={t('creditSystem.title')}
            subtitle={t('creditSystem.pretitle')}
            description={t('creditSystem.description')}
          />

          {/* Complexity Cards */}
          <StaggeredGrid columns={3} className="mt-12 mb-12">
            {/* Low Complexity */}
            <HoverCard className="p-6 text-left">
              <div className="flex items-center mb-4 text-primary">
                <FileText className="w-8 h-8 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('creditSystem.items.low.title')}
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('creditSystem.items.low.example')}
              </p>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('creditSystem.items.low.cost')}
              </div>
            </HoverCard>

            {/* Medium Complexity */}
            <HoverCard className="p-6 text-left">
              <div className="flex items-center mb-4 text-primary">
                <ScrollText className="w-8 h-8 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('creditSystem.items.medium.title')}
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('creditSystem.items.medium.example')}
              </p>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('creditSystem.items.medium.cost')}
              </div>
            </HoverCard>

            {/* High Complexity */}
            <HoverCard className="p-6 text-left">
              <div className="flex items-center mb-4 text-primary">
                <Building2 className="w-8 h-8 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('creditSystem.items.high.title')}
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('creditSystem.items.high.example')}
              </p>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('creditSystem.items.high.cost')}
              </div>
            </HoverCard>
          </StaggeredGrid>

          <FadeIn direction='up' delay={400}>
            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-4xl mx-auto space-y-2">
              <p>{t('creditSystem.microcopy1')}</p>
              <p>{t('creditSystem.microcopy2')}</p>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* Supply Packs */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden" id="packages">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title={t('packages.title')}
            subtitle={t('packages.pretitle')}
            description={t('packages.description')}
          />

          <StaggeredGrid columns={4}>
            {/* Founder's Grant */}
            <HoverCard className="flex flex-col h-full overflow-hidden">
              <div className="px-6 py-8 flex-grow">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('packages.items.founder.title')}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 h-10">
                    {t('packages.items.founder.subtitle')}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {t('packages.items.founder.price')}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.founder.features.0')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.founder.features.1')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.founder.features.2')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.founder.features.3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-8">
                <CTAButton href="/contact" variant="secondary" size="md" className="w-full justify-center">
                  {t('packages.items.founder.cta')}
                </CTAButton>
              </div>
            </HoverCard>

            {/* Solo Pack */}
            <HoverCard className="flex flex-col h-full overflow-hidden">
              <div className="px-6 py-8 flex-grow">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('packages.items.solo.title')}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 h-10">
                    {t('packages.items.solo.subtitle')}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {t('packages.items.solo.price')}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.solo.features.0')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.solo.features.1')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.solo.features.2')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.solo.features.3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-8">
                <CTAButton href="/contact" variant="primary" size="md" className="w-full justify-center">
                  {t('packages.items.solo.cta')}
                </CTAButton>
              </div>
            </HoverCard>

            {/* Firm Pack */}
            <HoverCard className="flex flex-col h-full overflow-hidden border-2 border-primary transform scale-105 z-10">
              <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-bold uppercase tracking-wider">
                {t('packages.items.firm.badge')}
              </div>
              <div className="px-6 py-8 flex-grow">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('packages.items.firm.title')}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 h-10">
                    {t('packages.items.firm.subtitle')}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {t('packages.items.firm.price')}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.firm.features.0')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.firm.features.1')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.firm.features.2')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.firm.features.3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-8">
                <CTAButton href="/contact" variant="primary" size="md" className="w-full justify-center">
                  {t('packages.items.firm.cta')}
                </CTAButton>
              </div>
            </HoverCard>

            {/* Factory Pack */}
            <HoverCard className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-gray-800">
              <div className="px-6 py-8 flex-grow">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('packages.items.factory.title')}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 h-10">
                    {t('packages.items.factory.subtitle')}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {t('packages.items.factory.price')}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.factory.features.0')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.factory.features.1')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.factory.features.2')}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{t('packages.items.factory.features.3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-8">
                <CTAButton href="/contact" variant="primary" size="md" className="w-full justify-center">
                  {t('packages.items.factory.cta')}
                </CTAButton>
              </div>
            </HoverCard>
          </StaggeredGrid>

          <div className="text-sm text-gray-500 dark:text-gray-400 max-w-4xl mx-auto space-y-2 text-center mt-12">
            <p>{t('packages.microcopy1')}</p>
            <p>{t('packages.microcopy2')}</p>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t('faq.title')}
            subtitle={t('faq.pretitle')}
            description={t('faq.description')}
          />

          <StaggeredGrid columns={2}>
            <HoverCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q1.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q1.answer')}</p>
            </HoverCard>

            <HoverCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q2.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q2.answer')}</p>
            </HoverCard>

            <HoverCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q3.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q3.answer')}</p>
            </HoverCard>

            <HoverCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q4.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q4.answer')}</p>
            </HoverCard>

            <HoverCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q5.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q5.answer')}</p>
            </HoverCard>

            <HoverCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q6.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q6.answer')}</p>
            </HoverCard>
          </StaggeredGrid>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-center sm:justify-start">
                <Check className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                <span className="text-lg font-medium">{t('faq.badges.badge1')}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Check className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                <span className="text-lg font-medium">{t('faq.badges.badge2')}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Check className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                <span className="text-lg font-medium">{t('faq.badges.badge3')}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Check className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                <span className="text-lg font-medium">{t('faq.badges.badge4')}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* Footer CTA */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            title={t('cta.title')}
            subtitle={t('cta.pretitle')}
            description={t('cta.description')}
          />

          <FadeIn direction='up' delay={200}>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <CTAButton
                href="https://wa.me/18156620760"
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('cta.cta1')}
              </CTAButton>
              <CTAButton
                href="mailto:hello@cyboring.com"
                variant="secondary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5 mr-2" />
                {t('cta.cta2')}
              </CTAButton>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {t('cta.microcopy')}
            </p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
