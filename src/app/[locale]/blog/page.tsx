'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Layout from '../../../components/Layout';
import Hero from '../../../components/Hero';
import { InteractiveGridPulse } from '../../../components/InteractiveGridPulse';
import { CTAButton } from '../../../components/CTAButtons';
import { Calendar, Clock, Tag, ArrowRight, Mail } from 'lucide-react';
import { PageTransition } from '../../../components/ui/PageTransition';

export default function BlogPage() {
    const t = useTranslations('blog');

    const posts = [
        {
            id: 'post1',
            image: '/images/blog/legal-tech-1.jpg', // Placeholder, using solid color div for now if image missing
            fallbackColor: 'bg-gray-800',
        },
        {
            id: 'post2',
            image: '/images/blog/security.jpg',
            fallbackColor: 'bg-gray-700',
        },
        {
            id: 'post3',
            image: '/images/blog/update.jpg',
            fallbackColor: 'bg-gray-900',
        },
    ];

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
                            href: '#newsletter',
                        }}
                        secondaryCTA={{
                            text: t('hero.secondaryCTA'),
                            href: '/rss.xml',
                        }}
                        // Uses existing hero background or a specific one if available
                        backgroundImage="/images/blog-hero-bg.jpg"
                        backgroundVariant="radial"
                    />
                    <InteractiveGridPulse />
                </div>

                {/* Blog Grid Section - Content */}
                <section className="py-32 bg-background border-b border-border relative overflow-hidden">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Image Placeholder */}
                                    <div className={`h-48 w-full ${post.fallbackColor} relative`}>
                                        {/* In a real app, use next/image here. Using a colored div for immediate visual feedback without assets. */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800/90 text-white backdrop-blur-sm">
                                                <Tag className="w-3 h-3 mr-1" />
                                                {t(`posts.${post.id}.tag`)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {t(`posts.${post.id}.date`)}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {t(`posts.${post.id}.readTime`)}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                            {t(`posts.${post.id}.title`)}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                                            {t(`posts.${post.id}.description`)}
                                        </p>

                                        <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium group-hover:translate-x-1 transition-transform cursor-pointer">
                                            {t('readArticle')} <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Section - Functional */}
                <section id="newsletter" className="py-24 bg-gray-50 dark:bg-gray-900/50 border-b border-border relative">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="flex items-center justify-center p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-full transition-transform duration-300 hover:scale-110">
                                <Mail className="w-6 h-6 text-gray-900 dark:text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {t('newsletter.title')}
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            {t('newsletter.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder={t('newsletter.placeholder')}
                                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-500 dark:focus:border-gray-500 outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-all"
                            />
                            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors shadow-lg">
                                {t('newsletter.cta')}
                            </button>
                        </div>
                    </div>
                </section>
            </PageTransition>
        </Layout>
    );
}
