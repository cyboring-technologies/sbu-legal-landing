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
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('introduction')}
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.acceptance.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.acceptance.content')}
                </p>
              </section>

              {/* Description of Service */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.description.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.description.content')}
                </p>
              </section>

              {/* User Accounts */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.accounts.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.accounts.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.accounts.items.accurate')}</li>
                  <li>{t('sections.accounts.items.security')}</li>
                  <li>{t('sections.accounts.items.notify')}</li>
                  <li>{t('sections.accounts.items.responsible')}</li>
                </ul>
              </section>

              {/* Acceptable Use */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.acceptableUse.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.acceptableUse.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.acceptableUse.items.illegal')}</li>
                  <li>{t('sections.acceptableUse.items.harmful')}</li>
                  <li>{t('sections.acceptableUse.items.infringe')}</li>
                  <li>{t('sections.acceptableUse.items.interfere')}</li>
                  <li>{t('sections.acceptableUse.items.unauthorized')}</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.intellectualProperty.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.intellectualProperty.content')}
                </p>
              </section>

              {/* User Content */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.userContent.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.userContent.content')}
                </p>
              </section>

              {/* Payment Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.payment.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{t('sections.payment.content')}</p>
              </section>

              {/* Termination */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.termination.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.termination.content')}
                </p>
              </section>

              {/* Disclaimer of Warranties */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.disclaimer.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 uppercase font-medium">
                  {t('sections.disclaimer.content')}
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.liability.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.liability.content')}
                </p>
              </section>

              {/* Indemnification */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.indemnification.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.indemnification.content')}
                </p>
              </section>

              {/* Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.governingLaw.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.governingLaw.content')}
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.changes.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{t('sections.changes.content')}</p>
              </section>

              {/* Data Processing Model */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Data Processing Model
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>documentos.legal</strong> operates under an ephemeral processing architecture.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Documents uploaded by users are processed exclusively in volatile memory during a single execution session.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The platform does not provide:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>user accounts</li>
                  <li>persistent storage</li>
                  <li>document libraries</li>
                  <li>historical access to processed files</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Once the execution cycle ends and the final document is delivered, all uploaded materials and intermediate drafts are permanently destroyed as part of the Incineration Protocol.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Cyboring Technologies LLC does not retain copies of processed documents after the execution session is terminated.
                </p>
              </section>

              {/* Operating Entity */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Operating Entity
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The infrastructure and services provided through <strong>documentos.legal</strong> are operated by the following legal entity:
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Cyboring Technologies LLC<br />
                  State of Delaware, United States
                </p>
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">Registered Office</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    131 Continental Dr, Suite 305<br />
                    Newark, DE 19713<br />
                    New Castle County
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Operating Infrastructure
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    documentos.legal is an autonomous execution infrastructure operated by Cyboring Technologies LLC.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Payment Processing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    All payments are processed through Stripe, Inc., a third-party payment processor.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Infrastructure
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The execution infrastructure operates on the Cloudflare Edge Network.
                  </p>
                </div>
              </section>


              {/* Contact Us */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.contact.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.contact.content')}
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    Cyboring Hexagonal Technologies LLC
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
