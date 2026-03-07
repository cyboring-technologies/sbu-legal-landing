'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Layout from '../../../../components/Layout';
import { CTAButton } from '../../../../components/CTAButtons';
import { FadeIn } from '../../../../components/ui/animations/FadeIn';

export default function PrivacyContent() {
  const t = useTranslations('privacy');

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

              {/* Introduction */}
              <section className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('introduction')}
                </p>
              </section>

              {/* 1. Information We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.informationCollect.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.informationCollect.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.informationCollect.items.billing')}</li>
                  <li>{t('sections.informationCollect.items.device')}</li>
                  <li>{t('sections.informationCollect.items.analytics')}</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4 font-medium">
                  {t('sections.informationCollect.notCollected')}
                </p>
              </section>

              {/* 2. How We Process Documents */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.documentProcessing.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.documentProcessing.content1')}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.documentProcessing.content2')}
                </p>
              </section>

              {/* 3. Data Incineration Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.incineration.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.incineration.content1')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>{t('sections.incineration.items.volatile')}</li>
                  <li>{t('sections.incineration.items.noPersist')}</li>
                  <li>{t('sections.incineration.items.destroyed')}</li>
                  <li>{t('sections.incineration.items.noRetention')}</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.incineration.content2')}
                </p>
              </section>

              {/* 4. No Accounts or Persistent Storage */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.noAccounts.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.noAccounts.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.noAccounts.items.noProfiles')}</li>
                  <li>{t('sections.noAccounts.items.noStorage')}</li>
                  <li>{t('sections.noAccounts.items.noHistory')}</li>
                  <li>{t('sections.noAccounts.items.noCookieTracking')}</li>
                </ul>
              </section>

              {/* 5. Third-Party Services */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.thirdParty.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.thirdParty.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.thirdParty.items.stripe')}</li>
                  <li>{t('sections.thirdParty.items.cloudflare')}</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  {t('sections.thirdParty.disclaimer')}
                </p>
              </section>

              {/* 6. GDPR Compliance */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.gdpr.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.gdpr.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>{t('sections.gdpr.items.minimization')}</li>
                  <li>{t('sections.gdpr.items.purpose')}</li>
                  <li>{t('sections.gdpr.items.retention')}</li>
                  <li>{t('sections.gdpr.items.lawfulBasis')}</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.gdpr.rights.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.gdpr.rights.items.info')}</li>
                  <li>{t('sections.gdpr.rights.items.objection')}</li>
                  <li>{t('sections.gdpr.rights.items.complaint')}</li>
                </ul>
              </section>

              {/* 7. Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.dataSecurity.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.dataSecurity.content')}
                </p>
              </section>

              {/* 8. Children's Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.children.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{t('sections.children.content')}</p>
              </section>

              {/* 9. Changes to Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.changes.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{t('sections.changes.content')}</p>
              </section>

              {/* 10. Contact */}
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
