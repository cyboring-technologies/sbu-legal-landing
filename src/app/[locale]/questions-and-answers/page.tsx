'use client';

import React, { useState } from 'react';
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
import { PageTransition } from '../../../components/ui/PageTransition';

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
    // Plans & Support (Commercial & Availability)
    {
      id: 9,
      question: t('faq.plans.q1.question'),
      answer: t('faq.plans.q1.answer'),
      category: 'plans',
    },
    {
      id: 10,
      question: t('faq.plans.q2.question'),
      answer: t('faq.plans.q2.answer'),
      category: 'plans',
    },
    {
      id: 11,
      question: t('faq.plans.q3.question'),
      answer: t('faq.plans.q3.answer'),
      category: 'plans',
    },
  ];

  const categories = [
    { id: 'all', name: t('categories.all'), icon: HelpCircle },
    { id: 'general', name: t('categories.general'), icon: MessageCircle },
    { id: 'security', name: t('categories.security'), icon: Shield },
    { id: 'process', name: t('categories.process'), icon: Zap },
    { id: 'plans', name: t('categories.plans'), icon: Users },
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
              text: t('hero.primaryCTA'),
              href: 'http://localhost:3000',
            }}
            secondaryCTA={{
              text: t('hero.secondaryCTA'),
              href: '/our-services',
            }}
            backgroundImage="/images/faq-hero-bg.jpg"
            backgroundVariant="radial"
          />
          <InteractiveGridPulse />
        </div>{' '}
        {/* Search and Categories - Operational */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn direction='up'>
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
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                <Zap className="w-12 h-12 text-gray-900 dark:text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('popularTopics.technology.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('popularTopics.technology.description')}
                </p>
                <button
                  onClick={() => setSelectedCategory('general')}
                  className="text-primary font-medium hover:text-primary/80"
                >
                  {t('popularTopics.technology.link')}
                </button>
              </HoverCard>

              <HoverCard className="p-6 group">
                <Shield className="w-12 h-12 text-gray-900 dark:text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('popularTopics.security.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('popularTopics.security.description')}
                </p>
                <button
                  onClick={() => setSelectedCategory('security')}
                  className="text-primary font-medium hover:text-primary/80"
                >
                  {t('popularTopics.security.link')}
                </button>
              </HoverCard>

              <HoverCard className="p-6 group">
                <Zap className="w-12 h-12 text-gray-900 dark:text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('popularTopics.workflow.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('popularTopics.workflow.description')}
                </p>
                <button
                  onClick={() => setSelectedCategory('process')}
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
                <MessageCircle className="w-12 h-12 text-gray-900 dark:text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('helpResources.whatsapp.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('helpResources.whatsapp.description')}
                </p>
                <a
                  href="https://wa.me/18156620760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-block"
                >
                  {t('helpResources.whatsapp.action')}
                </a>
              </HoverCard>

              <HoverCard className="p-8 text-center group">
                <FileText className="w-12 h-12 text-gray-900 dark:text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('helpResources.billing.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('helpResources.billing.description')}
                </p>
                <a
                  href="mailto:hello@cyboring.com?subject=Consulta de Facturación"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-block"
                >
                  {t('helpResources.billing.action')}
                </a>
              </HoverCard>

              <HoverCard className="p-8 text-center group">
                <Book className="w-12 h-12 text-gray-900 dark:text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('helpResources.docs.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('helpResources.docs.description')}
                </p>
                <a
                  href="#"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-block"
                >
                  {t('helpResources.docs.action')}
                </a>
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
                  <a
                    href="#"
                    className="text-primary font-medium hover:text-primary/80"
                  >
                    {t('knowledgeBase.gettingStarted.cta')} →
                  </a>
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
                  <a
                    href="#"
                    className="text-primary font-medium hover:text-primary/80"
                  >
                    {t('knowledgeBase.bestPractices.cta')} →
                  </a>
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
                  <a
                    href="#"
                    className="text-primary font-medium hover:text-primary/80"
                  >
                    {t('knowledgeBase.advanced.cta')} →
                  </a>
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
                  <a
                    href="#"
                    className="text-primary font-medium hover:text-primary/80"
                  >
                    {t('knowledgeBase.troubleshooting.cta')} →
                  </a>
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
                <Activity className="w-12 h-12 text-gray-900 dark:text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('evolutionProtocol.reportFriction.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {t('evolutionProtocol.reportFriction.description')}
                </p>
                <a
                  href="mailto:hello@cyboring.com?subject=Reporte de Fricción Técnica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-block"
                >
                  {t('evolutionProtocol.reportFriction.cta')}
                </a>
              </HoverCard>

              <HoverCard className="p-8 flex flex-col items-center text-center group">
                <Lightbulb className="w-12 h-12 text-gray-900 dark:text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('evolutionProtocol.newSupply.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {t('evolutionProtocol.newSupply.description')}
                </p>
                <a
                  href="mailto:hello@cyboring.com?subject=Propuesta de Nuevo Módulo Documental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-block"
                >
                  {t('evolutionProtocol.newSupply.cta')}
                </a>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>
        {/* Contact CTA - Closing */}
        <section className="py-16 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <SectionHeader
              title={t('cta.title')}
            />
            <FadeIn direction='up' delay={100}>
              <div className="mt-4 text-lg text-gray-600 dark:text-gray-300 space-y-4 mb-4">
                <p>{t('cta.description1')}</p>
                <p>
                  {t.rich('cta.description2', {
                    strong: (chunks) => <strong className="font-bold text-gray-900 dark:text-white">{chunks}</strong>,
                  })}
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                >
                  {t('cta.primaryButton')}
                </CTAButton>
                <CTAButton
                  href="/contact"
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
