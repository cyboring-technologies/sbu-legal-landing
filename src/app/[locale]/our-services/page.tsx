'use client';

import React from 'react';
import Image from 'next/image';
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

export default function OurServicesPage() {
  const t = useTranslations('ourServices');

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
          foundersGrant={t('hero.foundersGrant')}
          backgroundImage="/images/services-hero-bg.jpg"
          backgroundVariant="radial"
        />
        <InteractiveGridPulse />
      </div>{' '}
      {/* Services Overview */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title={t('overview.title')}
            description={t('overview.description')}
          />

          <StaggeredGrid columns={3} className="mt-12">
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
                  <span><span className="font-semibold">Capacidades:</span> {t('draftingEngine.capabilities')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span><span className="font-semibold">Rigor:</span> {t('draftingEngine.rigor')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span><span className="font-semibold">HITL:</span> {t('draftingEngine.hitl')}</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="w-full text-center py-3 rounded-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
              >
                {t('draftingEngine.cta')}
              </a>
            </HoverCard>

            {/* 2. Contract Engineering */}
            <HoverCard className="p-8 flex flex-col h-full group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('contractEngineering.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                {t('contractEngineering.description')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span><span className="font-semibold">Documentos:</span> {t('contractEngineering.supportedDocs')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span><span className="font-semibold">Eficiencia:</span> {t('contractEngineering.efficiency')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span><span className="font-semibold">Auto-Detección:</span> {t('contractEngineering.autoDetection')}</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="w-full text-center py-3 rounded-lg font-medium bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                {t('contractEngineering.cta')}
              </a>
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
                  <span><span className="font-semibold">Eliminación:</span> {t('infrastructure.totalDeletion')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span><span className="font-semibold">Orquestación:</span> {t('infrastructure.orchestration')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span><span className="font-semibold">Arquitectura:</span> {t('infrastructure.architecture')}</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="w-full text-center py-3 rounded-lg font-medium bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                {t('infrastructure.cta')}
              </a>
            </HoverCard>
          </StaggeredGrid>
        </div>
      </section>
      {/* Service Process */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title={t('process.title')}
            description={t('process.description')}
          />

          <StaggeredGrid columns={4} className="mt-12">
            <HoverCard className="p-6 text-center h-full">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('process.step1.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('process.step1.description')}</p>
            </HoverCard>

            <HoverCard className="p-6 text-center h-full">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('process.step2.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('process.step2.description')}</p>
            </HoverCard>

            <HoverCard className="p-6 text-center h-full">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('process.step3.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('process.step3.description')}</p>
            </HoverCard>

            <HoverCard className="p-6 text-center h-full">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('process.step4.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{t('process.step4.description')}</p>
            </HoverCard>
          </StaggeredGrid>
        </div>
      </section>
      {/* Technologies We Use */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title={t('technologies.title')}
            description={t('technologies.description')}
          />

          <StaggeredGrid columns={3} className="mb-16">
            {/* Foundation */}
            <HoverCard className="p-8 group">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="w-6 h-6 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
                {t('technologies.foundation.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('technologies.foundation.description')}
              </p>
            </HoverCard>

            {/* Security */}
            <HoverCard className="p-8 group">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <ShieldCheck className="w-6 h-6 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
                {t('technologies.security.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('technologies.security.description')}
              </p>
            </HoverCard>

            {/* Efficiency */}
            <HoverCard className="p-8 group">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
                {t('technologies.efficiency.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('technologies.efficiency.description')}
              </p>
            </HoverCard>
          </StaggeredGrid>

          {/* Tech Stack List */}
          <FadeIn direction='up' delay={200}>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {t('technologies.techStack.title')}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('technologies.techStack.intro')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-5xl mx-auto">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{t('technologies.techStack.frontend')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{t('technologies.techStack.businessLogic')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{t('technologies.techStack.intelligence')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{t('technologies.techStack.orchestration')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{t('technologies.techStack.infrastructure')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{t('technologies.techStack.security')}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* Service Benefits */}
      <section className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title={t('benefits.title')}
            description={t('benefits.description')}
          />

          <StaggeredGrid columns={2}>
            {/* Benefit 1 */}
            <HoverCard className="p-8 group">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-primary" />
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
                <p className="text-sm font-semibold text-primary">
                  <span className="uppercase tracking-wider text-xs opacity-70 block mb-1">{t('benefits.impactLabel')}</span>
                  {t('benefits.benefit1.impact')}
                </p>
              </div>
            </HoverCard>

            {/* Benefit 2 */}
            <HoverCard className="p-8 group">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-primary" />
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
                <p className="text-sm font-semibold text-primary">
                  <span className="uppercase tracking-wider text-xs opacity-70 block mb-1">{t('benefits.impactLabel')}</span>
                  {t('benefits.benefit2.impact')}
                </p>
              </div>
            </HoverCard>

            {/* Benefit 3 */}
            <HoverCard className="p-8 group">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-primary" />
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
                <p className="text-sm font-semibold text-primary">
                  <span className="uppercase tracking-wider text-xs opacity-70 block mb-1">{t('benefits.impactLabel')}</span>
                  {t('benefits.benefit3.impact')}
                </p>
              </div>
            </HoverCard>

            {/* Benefit 4 */}
            <HoverCard className="p-8 group">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-primary" />
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
                <p className="text-sm font-semibold text-primary">
                  <span className="uppercase tracking-wider text-xs opacity-70 block mb-1">{t('benefits.impactLabel')}</span>
                  {t('benefits.benefit4.impact')}
                </p>
              </div>
            </HoverCard>
          </StaggeredGrid>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title={t('cta.title')}
            description={t('cta.subtitle')}
          />

          <StaggeredGrid columns={3}>
            {/* 1. Founder's Grant */}
            <HoverCard className="p-8 flex flex-col h-full relative overflow-hidden border-t-2 border-t-primary">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('cta.grant.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow">{t('cta.grant.description')}</p>
              <div className="mb-4">
                <a
                  href="/contact"
                  className="w-full block text-center py-3 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  {t('cta.grant.button')}
                </a>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
                {t('cta.grant.microcopy')}
              </p>
            </HoverCard>

            {/* 2. WhatsApp Bridge */}
            <HoverCard className="p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('cta.whatsapp.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow">{t('cta.whatsapp.description')}</p>
              <div className="mb-4">
                <a
                  href="https://wa.me/18156620760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 px-6 rounded-lg bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  {t('cta.whatsapp.button')}
                </a>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
                {t('cta.whatsapp.microcopy')}
              </p>
            </HoverCard>

            {/* 3. Incinerator Protocol */}
            <HoverCard className="p-8 flex flex-col bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('cta.protocol.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm italic">
                {t('cta.protocol.description')}
              </p>
              <div className="space-y-4 mt-auto">
                <div className="flex items-start">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{t('cta.protocol.guarantee')}</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('cta.protocol.infrastructure')}</p>
                </div>
              </div>
            </HoverCard>
          </StaggeredGrid>
        </div>
      </section>
    </Layout >
  );
}
