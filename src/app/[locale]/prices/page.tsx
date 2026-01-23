'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Layout from '../../../components/Layout';
import Hero from '../../../components/Hero';
import { InteractiveGridPulse } from '../../../components/InteractiveGridPulse';
import { CTAButton } from '../../../components/CTAButtons';
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
            href: 'http://localhost:3000',
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
          <div className="mb-12">
            <h3 className="text-primary font-semibold tracking-wide uppercase mb-2">
              {t('creditSystem.pretitle')}
            </h3>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-6">
              {t('creditSystem.title')}
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              {t('creditSystem.description')}
            </p>
          </div>

          {/* Complexity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
            {/* Low Complexity */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow">
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
            </div>

            {/* Medium Complexity */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow">
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
            </div>

            {/* High Complexity */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow">
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
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 max-w-4xl mx-auto space-y-2">
            <p>{t('creditSystem.microcopy1')}</p>
            <p>{t('creditSystem.microcopy2')}</p>
          </div>
        </div>
      </section>
      {/* Supply Packs */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden" id="packages">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-primary font-semibold tracking-wide uppercase mb-2">
              {t('packages.pretitle')}
            </h3>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-6">
              {t('packages.title')}
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              {t('packages.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Founder's Grant */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
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
            </div>

            {/* Solo Pack */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
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
            </div>

            {/* Firm Pack */}
            <div className="bg-white dark:bg-gray-900 border-2 border-primary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col transform scale-105 z-10">
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
            </div>

            {/* Factory Pack */}
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
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
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 max-w-4xl mx-auto space-y-2 text-center mt-12">
            <p>{t('packages.microcopy1')}</p>
            <p>{t('packages.microcopy2')}</p>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-primary font-semibold tracking-wide uppercase mb-2">
              {t('faq.pretitle')}
            </h3>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('faq.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q1.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q1.answer')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q2.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q2.answer')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q3.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q3.answer')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q4.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q4.answer')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q5.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q5.answer')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('faq.q6.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('faq.q6.answer')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        </div>
      </section>
      {/* Footer CTA */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h3 className="text-primary font-semibold tracking-wide uppercase mb-2">
            {t('cta.pretitle')}
          </h3>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <a
              href="https://wa.me/18156620760"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              {t('cta.cta1')}
            </a>
            <a
              href="mailto:concierge@cyboring.com"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              {t('cta.cta2')}
            </a>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {t('cta.microcopy')}
          </p>
        </div>
      </section>
    </Layout>
  );
}
