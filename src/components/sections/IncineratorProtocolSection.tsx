'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CTAButton } from '../CTAButtons';
import { HtmlContent } from '../HtmlContent';
import { ShieldCheck, Trash2, Server } from 'lucide-react';
import { HoverCard } from '../ui/animations/HoverCard';

export const IncineratorProtocolSection: React.FC = () => {


    const t = useTranslations('aboutUs.incineratorProtocol');

    return (
        <section className="py-20 bg-background border-b border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <HtmlContent
                        as="h2"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                        content={t('title')}
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Item 1 - Toxic Waste */}
                    <HoverCard className="p-8 group">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {t('items.item1.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('items.item1.description')}
                        </p>
                    </HoverCard>

                    {/* Item 2 - Binary Split */}
                    <HoverCard className="p-8 group">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Server className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {t('items.item2.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('items.item2.description')}
                        </p>
                    </HoverCard>

                    {/* Item 3 - Infrastructure */}
                    <HoverCard className="p-8 group">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {t('items.item3.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('items.item3.description')}
                        </p>
                    </HoverCard>
                </div>


            </div>
        </section>
    );
};
