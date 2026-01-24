'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Layout from '../../../components/Layout';
import { FadeIn } from '../../../components/ui/animations/FadeIn';

export default function PrivacyContent() {
  const t = useTranslations('privacy');

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header */}
          <FadeIn direction='up'>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t('lastUpdated')}</p>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction='up' delay={200}>
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
                    <a
                      href="mailto:legal@cyboring.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      legal@cyboring.com
                    </a>
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
