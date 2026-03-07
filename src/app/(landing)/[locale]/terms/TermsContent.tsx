'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Layout from '../../../../components/Layout';
import { CTAButton } from '../../../../components/CTAButtons';
import { FadeIn } from '../../../../components/ui/animations/FadeIn';

export default function TermsContent() {
  const t = useTranslations('terms');

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header */}
          <FadeIn direction="up">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{t('lastUpdated')}</p>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="up" delay={200}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* 1. Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.introduction.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('sections.introduction.content')}
                </p>
              </section>

              {/* 2. Acceptance of Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.acceptance.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.acceptance.content')}
                </p>
              </section>

              {/* 3. Description of Service */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.description.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.description.content')}
                </p>
              </section>

              {/* 4. One-Shot Execution Model */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.oneShotModel.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.oneShotModel.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>{t('sections.oneShotModel.items.ephemeral')}</li>
                  <li>{t('sections.oneShotModel.items.noAccounts')}</li>
                  <li>{t('sections.oneShotModel.items.noStorage')}</li>
                  <li>{t('sections.oneShotModel.items.incineration')}</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.oneShotModel.conclusion')}
                </p>
              </section>

              {/* 4. Payment Authorization */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.paymentAuthorization.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.paymentAuthorization.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.paymentAuthorization.items.authority')}</li>
                  <li>{t('sections.paymentAuthorization.items.singleUse')}</li>
                  <li>{t('sections.paymentAuthorization.items.nonRefundable')}</li>
                  <li>{t('sections.paymentAuthorization.items.token')}</li>
                </ul>
              </section>

              {/* 5. No Accounts or Persistent Services */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.noAccounts.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.noAccounts.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.noAccounts.items.noUserAccounts')}</li>
                  <li>{t('sections.noAccounts.items.noStorage')}</li>
                  <li>{t('sections.noAccounts.items.noDashboard')}</li>
                  <li>{t('sections.noAccounts.items.noHistory')}</li>
                  <li>{t('sections.noAccounts.items.noSubscription')}</li>
                </ul>
              </section>

              {/* 6. User Responsibilities */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.userResponsibilities.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.userResponsibilities.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.userResponsibilities.items.accurateInput')}</li>
                  <li>{t('sections.userResponsibilities.items.lawfulUse')}</li>
                  <li>{t('sections.userResponsibilities.items.noHarm')}</li>
                  <li>{t('sections.userResponsibilities.items.backup')}</li>
                </ul>
              </section>

              {/* 7. Prohibited Uses */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.prohibitedUses.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.prohibitedUses.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.prohibitedUses.items.illegal')}</li>
                  <li>{t('sections.prohibitedUses.items.harmful')}</li>
                  <li>{t('sections.prohibitedUses.items.infringe')}</li>
                  <li>{t('sections.prohibitedUses.items.interfere')}</li>
                  <li>{t('sections.prohibitedUses.items.unauthorized')}</li>
                </ul>
              </section>

              {/* 8. Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.intellectualProperty.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.intellectualProperty.content')}
                </p>
              </section>

              {/* 9. Data Handling and Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.dataHandling.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.dataHandling.content1')}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.dataHandling.content2')}
                </p>
              </section>

              {/* 10. Disclaimer of Warranties */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.disclaimer.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 uppercase font-medium">
                  {t('sections.disclaimer.content')}
                </p>
              </section>

              {/* 10. Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.liability.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.liability.content')}
                </p>
              </section>

              {/* 11. Indemnification */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.indemnification.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.indemnification.content')}
                </p>
              </section>

              {/* 12. Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.governingLaw.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.governingLaw.content')}
                </p>
              </section>

              {/* 13. Operating Entity */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.operatingEntity.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.operatingEntity.intro')}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.operatingEntity.companyName')}<br />
                  {t('sections.operatingEntity.state')}
                </p>
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
                    {t('sections.operatingEntity.registeredOfficeTitle')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('sections.operatingEntity.addressLine1')}<br />
                    {t('sections.operatingEntity.addressLine2')}<br />
                    {t('sections.operatingEntity.addressLine3')}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('sections.operatingEntity.infrastructureTitle')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('sections.operatingEntity.infrastructureContent')}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('sections.operatingEntity.paymentProcessingTitle')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('sections.operatingEntity.paymentProcessingContent')}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('sections.operatingEntity.executionInfrastructureTitle')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('sections.operatingEntity.executionInfrastructureContent')}
                  </p>
                </div>
              </section>

              {/* 14. Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.changes.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{t('sections.changes.content')}</p>
              </section>

              {/* 15. Contact Us */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.contact.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.contact.content')}
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {t('sections.contact.companyName')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('sections.contact.email')}:{' '}
                    <CTAButton
                      href="mailto:legal@cyboring.com"
                      target="_blank"
                      variant="secondary"
                      size="sm"
                      ctaType="cta-4"
                      className="p-0 h-auto bg-transparent hover:bg-transparent text-blue-600 dark:text-blue-400 border-none inline"
                    >
                      legal@cyboring.com
                    </CTAButton>
                  </p>
                </div>
              </section>
            </div>
          </FadeIn>
        </div>
      </div>
    </Layout>
  );
}
