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

              {/* Information We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.informationCollect.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.informationCollect.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.informationCollect.items.personal')}</li>
                  <li>{t('sections.informationCollect.items.usage')}</li>
                  <li>{t('sections.informationCollect.items.device')}</li>
                  <li>{t('sections.informationCollect.items.cookies')}</li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.howWeUse.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.howWeUse.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.howWeUse.items.provide')}</li>
                  <li>{t('sections.howWeUse.items.improve')}</li>
                  <li>{t('sections.howWeUse.items.communicate')}</li>
                  <li>{t('sections.howWeUse.items.security')}</li>
                  <li>{t('sections.howWeUse.items.legal')}</li>
                </ul>
              </section>

              {/* Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.dataSecurity.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('sections.dataSecurity.content')}
                </p>
              </section>

              {/* Data Sharing */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.dataSharing.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.dataSharing.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.dataSharing.items.providers')}</li>
                  <li>{t('sections.dataSharing.items.legal')}</li>
                  <li>{t('sections.dataSharing.items.business')}</li>
                </ul>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.yourRights.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('sections.yourRights.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>{t('sections.yourRights.items.access')}</li>
                  <li>{t('sections.yourRights.items.correction')}</li>
                  <li>{t('sections.yourRights.items.deletion')}</li>
                  <li>{t('sections.yourRights.items.portability')}</li>
                  <li>{t('sections.yourRights.items.optOut')}</li>
                </ul>
              </section>

              {/* Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.cookies.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{t('sections.cookies.content')}</p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('sections.children.title')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{t('sections.children.content')}</p>
              </section>

              {/* Changes to Policy */}
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
