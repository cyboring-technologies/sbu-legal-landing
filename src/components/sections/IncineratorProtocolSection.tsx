'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CTAButton } from '../CTAButtons';
import { ShieldCheck, Trash2, Server } from 'lucide-react';

export const IncineratorProtocolSection: React.FC = () => {
    const t = useTranslations('aboutUs.incineratorProtocol');

    return (
        <section className="py-20 bg-background border-b border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        {t('title')}
                    </h2>
                    <div className="mt-4 h-1 w-24 bg-primary rounded-full mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Item 1 - Toxic Waste */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {t('items.item1.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('items.item1.description')}
                        </p>
                    </div>

                    {/* Item 2 - Binary Split */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                            <Server className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {t('items.item2.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('items.item2.description')}
                        </p>
                    </div>

                    {/* Item 3 - Infrastructure */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {t('items.item3.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('items.item3.description')}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CTAButton
                        href="/incinerator-protocol"
                        variant="primary"
                        size="lg"
                    >
                        {t('cta1')}
                    </CTAButton>
                    <CTAButton
                        href="/demo"
                        variant="secondary"
                        size="lg"
                    >
                        {t('cta2')}
                    </CTAButton>
                </div>
            </div>
        </section>
    );
};
