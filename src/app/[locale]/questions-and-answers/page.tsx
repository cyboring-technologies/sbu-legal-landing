'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Layout from '../../../components/Layout';
import Hero from '../../../components/Hero';
import { InteractiveGridPulse } from '../../../components/InteractiveGridPulse';
import { CTAButton } from '../../../components/CTAButtons';
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
      {/* Search and Categories */}
      <section className="py-16 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                      ? 'bg-blue-600 text-white'
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

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
              ))
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
      {/* Popular Topics */}
      <section className="py-16 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('popularTopics.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('popularTopics.description')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-lg">
              <Zap className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('popularTopics.technology.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('popularTopics.technology.description')}
              </p>
              <button
                onClick={() => setSelectedCategory('general')}
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
              >
                {t('popularTopics.technology.link')}
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-lg">
              <Shield className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('popularTopics.security.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('popularTopics.security.description')}
              </p>
              <button
                onClick={() => setSelectedCategory('security')}
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-800 dark:hover:text-green-300"
              >
                {t('popularTopics.security.link')}
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-lg">
              <Zap className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('popularTopics.workflow.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('popularTopics.workflow.description')}
              </p>
              <button
                onClick={() => setSelectedCategory('process')}
                className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300"
              >
                {t('popularTopics.workflow.link')}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Help Resources */}
      <section className="py-16 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('helpResources.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('helpResources.description')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('helpResources.whatsapp.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('helpResources.whatsapp.description')}
              </p>
              <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
                {t('helpResources.whatsapp.action')}
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm text-center">
              <FileText className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('helpResources.billing.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('helpResources.billing.description')}
              </p>
              <button className="bg-purple-600 dark:bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors">
                {t('helpResources.billing.action')}
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm text-center">
              <Book className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('helpResources.docs.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('helpResources.docs.description')}
              </p>
              <button className="bg-green-600 dark:bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors">
                {t('helpResources.docs.action')}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Knowledge Base Preview */}
      <section className="py-16 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('knowledgeBase.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {t('knowledgeBase.description')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('knowledgeBase.gettingStarted.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('knowledgeBase.gettingStarted.description')}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {t('knowledgeBase.gettingStarted.cta')} →
                </a>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('knowledgeBase.bestPractices.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('knowledgeBase.bestPractices.description')}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {t('knowledgeBase.bestPractices.cta')} →
                </a>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('knowledgeBase.advanced.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('knowledgeBase.advanced.description')}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {t('knowledgeBase.advanced.cta')} →
                </a>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('knowledgeBase.troubleshooting.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('knowledgeBase.troubleshooting.description')}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {t('knowledgeBase.troubleshooting.cta')} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Evolution Protocol - New Section */}
      <section className="py-16 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('evolutionProtocol.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('evolutionProtocol.description')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <Activity className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('evolutionProtocol.reportFriction.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                {t('evolutionProtocol.reportFriction.description')}
              </p>
              <button className="bg-orange-600 dark:bg-orange-700 text-white px-6 py-2 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-800 transition-colors">
                {t('evolutionProtocol.reportFriction.cta')}
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <Lightbulb className="w-12 h-12 text-yellow-500 dark:text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('evolutionProtocol.newSupply.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                {t('evolutionProtocol.newSupply.description')}
              </p>
              <button className="bg-yellow-500 dark:bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors">
                {t('evolutionProtocol.newSupply.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Contact CTA */}
      <section className="py-16 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{t('cta.title')}</h2>
          <div className="mt-4 text-lg text-gray-600 dark:text-gray-300 space-y-4">
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
        </div>
      </section>
    </Layout>
  );
}
