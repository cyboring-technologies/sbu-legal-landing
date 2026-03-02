'use client';

import React, { useState } from 'react';
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
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Search,
  Clock,
  Shield,
  Zap,
  Users,
  DollarSign,
  Activity,
  Lightbulb,
  FileText,
  Book,
} from 'lucide-react';
import { PageTransition } from '../../../../components/ui/PageTransition';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function QuestionsAndAnswersPage() {
  const t = useTranslations('questionsAndAnswers');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Build FAQ data from translations
  const faqData: FAQItem[] = [
    // General & Technology
    {
      id: 1,
      question: t('faq.general.q1.question'),
      answer: t('faq.general.q1.answer'),
      category: 'general',
    },
    {
      id: 2,
      question: t('faq.general.q2.question'),
      answer: t('faq.general.q2.answer'),
      category: 'general',
    },
    {
      id: 3,
      question: t('faq.general.q3.question'),
      answer: t('faq.general.q3.answer'),
      category: 'general',
    },
    {
      id: 4,
      question: t('faq.general.q4.question'),
      answer: t('faq.general.q4.answer'),
      category: 'general',
    },
    // Security & Privacy
    {
      id: 5,
      question: t('faq.security.q1.question'),
      answer: t('faq.security.q1.answer'),
      category: 'security',
    },
    {
      id: 6,
      question: t('faq.security.q2.question'),
      answer: t('faq.security.q2.answer'),
      category: 'security',
    },
    // Process & Accuracy
    {
      id: 7,
      question: t('faq.process.q1.question'),
      answer: t('faq.process.q1.answer'),
      category: 'process',
    },
    {
      id: 8,
      question: t('faq.process.q2.question'),
      answer: t('faq.process.q2.answer'),
      category: 'process',
    },
    // Billing & Model (Model & Billing)
    {
      id: 9,
      question: t('faq.billing.q1.question'),
      answer: t('faq.billing.q1.answer'),
      category: 'billing',
    },
    {
      id: 10,
      question: t('faq.billing.q2.question'),
      answer: t('faq.billing.q2.answer'),
      category: 'billing',
    },
    {
      id: 11,
      question: t('faq.billing.q3.question'),
      answer: t('faq.billing.q3.answer'),
      category: 'billing',
    },
  ];

  const categories = [
    { id: 'all', name: t('categories.all'), icon: HelpCircle },
    { id: 'general', name: t('categories.general'), icon: MessageCircle },
    { id: 'security', name: t('categories.security'), icon: Shield },
    { id: 'process', name: t('categories.process'), icon: Zap },
    { id: 'billing', name: t('categories.billing'), icon: DollarSign },
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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
              text: t('hero.cta_2_protocols'),
              href: '/privacy',
              ctaType: 'cta-2',
            }}
            backgroundImage="/images/faq-hero-bg.jpg"
            backgroundVariant="radial"
          />
          <InteractiveGridPulse />
        </div>{' '}
        {/* Search and Categories - Operational */}
        <section
          id="faq-content"
          className="py-24 bg-background border-b border-border relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn direction="up">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('search.placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-all border-2 ${selectedCategory === category.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary hover:text-primary'
                          }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                <StaggeredGrid columns={1}>
                  {filteredFAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h3>
                        {openFAQ === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {openFAQ === faq.id && (
                        <div className="px-6 pb-4">
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </StaggeredGrid>
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('search.noResults')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{t('search.tryDifferent')}</p>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* Popular Topics - Operational */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              title={t('popularTopics.title')}
              description={t('popularTopics.description')}
            />

            <StaggeredGrid columns={3} className="mt-12">
              <HoverCard className="p-6 group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('popularTopics.technology.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('popularTopics.technology.description')}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('general');
                    document.getElementById('faq-content')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-primary font-medium hover:text-primary/80"
                >
                  {t('popularTopics.technology.link')}
                </button>
              </HoverCard>

              <HoverCard className="p-6 group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('popularTopics.security.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('popularTopics.security.description')}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('security');
                    document.getElementById('faq-content')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-primary font-medium hover:text-primary/80"
                >
                  {t('popularTopics.security.link')}
                </button>
              </HoverCard>

              <HoverCard className="p-6 group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('popularTopics.workflow.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('popularTopics.workflow.description')}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('process');
                    document.getElementById('faq-content')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-primary font-medium hover:text-primary/80"
                >
                  {t('popularTopics.workflow.link')}
                </button>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
        {/* Help Resources - Operational */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              title={t('helpResources.title')}
              description={t('helpResources.description')}
            />

            <StaggeredGrid columns={3} className="mt-12">
              <HoverCard className="p-8 text-center group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('helpResources.whatsapp.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('helpResources.whatsapp.description')}
                </p>
                <CTAButton
                  href="https://wa.me/50687504770"
                  target="_blank"
                  variant="secondary"
                  size="md"
                  ctaType="cta-2"
                  note={t('helpResources.cta_3_note')}
                  className="mx-auto"
                >
                  {t('helpResources.whatsapp.cta_3_chat')}
                </CTAButton>
              </HoverCard>

              <HoverCard className="p-8 text-center group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('helpResources.billing.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('helpResources.billing.description')}
                </p>
                <CTAButton
                  href="mailto:hello@documentos.legal?subject=Consulta de Facturación"
                  target="_blank"
                  variant="secondary"
                  size="md"
                  ctaType="cta-4"
                  note={t('helpResources.cta_4_note')}
                  className="mx-auto"
                >
                  {t('helpResources.cta_4_send')}
                </CTAButton>
              </HoverCard>

              <HoverCard className="p-8 text-center group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Book className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('helpResources.docs.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('helpResources.docs.description')}
                </p>
                <CTAButton
                  href="/blog"
                  target="_blank"
                  variant="secondary"
                  size="md"
                  ctaType="cta-2"
                  className="mx-auto"
                >
                  {t('helpResources.docs.cta_2_explore')}
                </CTAButton>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
        {/* Knowledge Base Preview - Operational */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              title={t('knowledgeBase.title')}
              description={t('knowledgeBase.description')}
            />

            <StaggeredGrid columns={2} className="mt-12">
              <HoverCard className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('knowledgeBase.gettingStarted.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {t('knowledgeBase.gettingStarted.description')}
                </p>
                <div className="flex items-center justify-between">
                  <CTAButton
                    href="#"
                    variant="secondary"
                    size="sm"
                    ctaType="cta-2"
                    className="p-0 h-auto bg-transparent border-none hover:bg-transparent"
                  >
                    {t('knowledgeBase.gettingStarted.cta_2_read')}
                  </CTAButton>
                </div>
              </HoverCard>

              <HoverCard className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('knowledgeBase.bestPractices.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {t('knowledgeBase.bestPractices.description')}
                </p>
                <div className="flex items-center justify-between">
                  <CTAButton
                    href="#"
                    variant="secondary"
                    size="sm"
                    ctaType="cta-2"
                    className="p-0 h-auto bg-transparent border-none hover:bg-transparent"
                  >
                    {t('knowledgeBase.bestPractices.cta_2_read')}
                  </CTAButton>
                </div>
              </HoverCard>

              <HoverCard className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('knowledgeBase.advanced.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {t('knowledgeBase.advanced.description')}
                </p>
                <div className="flex items-center justify-between">
                  <CTAButton
                    href="#"
                    variant="secondary"
                    size="sm"
                    ctaType="cta-2"
                    className="p-0 h-auto bg-transparent border-none hover:bg-transparent"
                  >
                    {t('knowledgeBase.advanced.cta_2_read')}
                  </CTAButton>
                </div>
              </HoverCard>

              <HoverCard className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('knowledgeBase.troubleshooting.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {t('knowledgeBase.troubleshooting.description')}
                </p>
                <div className="flex items-center justify-between">
                  <CTAButton
                    href="#"
                    variant="secondary"
                    size="sm"
                    ctaType="cta-2"
                    className="p-0 h-auto bg-transparent border-none hover:bg-transparent"
                  >
                    {t('knowledgeBase.troubleshooting.cta_2_read')}
                  </CTAButton>
                </div>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
        {/* Evolution Protocol - Operational */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              title={t('evolutionProtocol.title')}
              description={t('evolutionProtocol.description')}
            />

            <StaggeredGrid columns={2} className="mt-12">
              <HoverCard className="p-8 flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('evolutionProtocol.reportFriction.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {t('evolutionProtocol.reportFriction.description')}
                </p>
                <CTAButton
                  href="mailto:hello@documentos.legal?subject=Reporte de Fricción Técnica"
                  target="_blank"
                  variant="secondary"
                  size="md"
                  ctaType="cta-4"
                  className="mx-auto"
                >
                  {t('evolutionProtocol.cta_4_send')}
                </CTAButton>
              </HoverCard>

              <HoverCard className="p-8 flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('evolutionProtocol.newSupply.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {t('evolutionProtocol.newSupply.description')}
                </p>
                <CTAButton
                  href="mailto:hello@documentos.legal?subject=Propuesta de Nuevo Módulo Documental"
                  target="_blank"
                  variant="secondary"
                  size="md"
                  ctaType="cta-4"
                  className="mx-auto"
                >
                  {t('evolutionProtocol.cta_4_send')}
                </CTAButton>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
        {/* Contact CTA - Closing */}
        <section className="py-16 bg-background border-b border-border relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <SectionHeader title={t('cta.title')} />
            <FadeIn direction="up" delay={100}>
              <div className="mt-4 text-lg text-gray-600 dark:text-gray-300 space-y-4 mb-4">
                <p>{t('cta.description1')}</p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href="/engine"
                  target="_blank"
                  variant="primary"
                  size="lg"
                  ctaType="cta-1"
                >
                  {t('cta.cta_1_primary')}
                </CTAButton>
              </div>
            </FadeIn>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
