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
  Mail,
  MapPin,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  Zap,
  FileText,
  Book,
  Shield,
  Phone,
} from 'lucide-react';
import { PageTransition } from '../../../components/ui/PageTransition';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const tQA = useTranslations('quickAccess');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    reason: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        reason: '',
        message: '',
      });
    }, 3000);
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
              href: '#contact-form',
            }}
            secondaryCTA={{
              text: t('hero.secondaryCTA'),
              href: '/questions-and-answers',
            }}
            backgroundImage="/images/contact-hero-bg.jpg"
            backgroundVariant="radial"
          />
          <InteractiveGridPulse />
        </div>{' '}
        {/* Contact Form & Map - Operational */}
        <section id="contact-form" className="py-24 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Contact Information */}
              <div className="mt-12 space-y-6">
                <FadeIn direction="right">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {t('information.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      {t('information.lead')}
                    </p>

                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
                      {t('information.contactDetailsTitle')}
                    </h4>

                    <div className="space-y-8">
                      <div className="flex items-start">
                        <Mail className="w-6 h-6 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                        <div className="ml-3">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                            {t('information.email.title')}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 font-mono text-sm mt-1">
                            {t('information.email.address')}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('information.email.hint')}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 mt-8">
                <FadeIn direction="up" delay={200}>
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {t('form.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm">
                      {t('form.description')}
                    </p>

                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {t('form.success.title')}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">{t('form.success.message')}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              {t('form.firstName')} {t('form.required')}
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={t('form.firstNamePlaceholder')}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="lastName"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              {t('form.lastName')} {t('form.required')}
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={t('form.lastNamePlaceholder')}
                            />
                          </div>
                        </div>

                        {/* Email and Company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              {t('form.email')} {t('form.required')}
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={t('form.emailPlaceholder')}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="company"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              {t('form.company')}
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={t('form.companyPlaceholder')}
                            />
                          </div>
                        </div>

                        {/* Reason */}
                        <div>
                          <label
                            htmlFor="reason"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            {t('form.reason')}
                          </label>
                          <select
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">{t('form.reason')}</option>
                            <option value="technical">{t('form.reasonOptions.technical')}</option>
                            <option value="privacy">{t('form.reasonOptions.privacy')}</option>
                            <option value="billing">{t('form.reasonOptions.billing')}</option>
                            <option value="api">{t('form.reasonOptions.api')}</option>
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            {t('form.message')} {t('form.required')}
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t('form.messagePlaceholder')}
                          />
                          <p className="mt-4 text-xs text-yellow-800 dark:text-yellow-200 bg-yellow-50 dark:bg-yellow-900/40 p-3 rounded-md border border-yellow-200 dark:border-yellow-800">
                            {t('form.disclaimer')}
                          </p>
                        </div>

                        {/* Submit Button */}
                        <div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                {t('form.sending')}
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5 mr-2" />
                                {t('form.sendMessage')}
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Info Grid - Operational */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              title={t('alternativeContact.title')}
              description={t('alternativeContact.subtitle')}
            />

            <StaggeredGrid columns={3} className="mt-12">
              {/* WhatsApp Concierge */}
              <HoverCard className="p-8 text-center h-full group">
                <MessageSquare className="w-12 h-12 text-gray-900 dark:text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('alternativeContact.whatsapp.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('alternativeContact.whatsapp.description')}
                </p>
                <a
                  href="https://wa.me/18156620760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-block"
                >
                  {t('alternativeContact.whatsapp.action')}
                </a>
              </HoverCard>

              {/* Billing */}
              <HoverCard className="p-8 text-center h-full group">
                <FileText className="w-12 h-12 text-gray-900 dark:text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('alternativeContact.billing.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('alternativeContact.billing.description')}
                </p>
                <a
                  href="mailto:hello@cyboring.com?subject=Consulta de Facturación"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-block"
                >
                  {t('alternativeContact.billing.action')}
                </a>
              </HoverCard>

              {/* Docs */}
              <HoverCard className="p-8 text-center h-full group">
                <Book className="w-12 h-12 text-gray-900 dark:text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('alternativeContact.docs.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('alternativeContact.docs.description')}
                </p>
                <a
                  href="#"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-block"
                >
                  {t('alternativeContact.docs.action')}
                </a>
              </HoverCard>
            </StaggeredGrid>
          </div>
        </section>

        {/* FAQ Quick Access - Operational */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              title={tQA('title')}
              description={tQA('description')}
            />

            <FadeIn direction='up'>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton href="/questions-and-answers" variant="primary" size="lg">
                  {tQA('cta1')}
                </CTAButton>
                <CTAButton href="/our-services" variant="secondary" size="lg">
                  {tQA('cta2')}
                </CTAButton>
              </div>
            </FadeIn>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {tQA('guaranteeTitle')}
              </h3>
              <StaggeredGrid columns={3} className="text-left">
                <HoverCard className="p-6">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{tQA('features.privacy.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{tQA('features.privacy.description')}</p>
                </HoverCard>

                <HoverCard className="p-6">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{tQA('features.efficiency.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{tQA('features.efficiency.description')}</p>
                </HoverCard>

                <HoverCard className="p-6">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{tQA('features.sovereignty.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{tQA('features.sovereignty.description')}</p>
                </HoverCard>
              </StaggeredGrid>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout >
  );
}
