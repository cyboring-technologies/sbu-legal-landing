'use client';

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useIntersectionObserver,
  useStaggeredIntersectionObserver,
} from '../../hooks/useIntersectionObserver';
import { CTAButton } from '../CTAButtons';
import { Scale, Target, Cpu, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [isServicesHeaderVisible, setIsServicesHeaderVisible] = useState(false);
  const [servicesCardVisibility, setServicesCardVisibility] = useState([false, false, false]);

  const servicesHeaderRef = useIntersectionObserver(
    useCallback(() => setIsServicesHeaderVisible(true), [])
  );

  const servicesCardRefs = useStaggeredIntersectionObserver(
    3,
    useCallback((index: number) => {
      setServicesCardVisibility((prev) => {
        const newVisibility = [...prev];
        newVisibility[index] = true;
        return newVisibility;
      });
    }, [])
  );

  const tServices = useTranslations('services');

  const serviceCards = [
    { icon: Scale, gradient: 'from-blue-500 to-blue-700', key: 'digitalTransformation' },
    { icon: Target, gradient: 'from-green-500 to-green-700', key: 'cybersecurity' },
    { icon: Cpu, gradient: 'from-purple-500 to-purple-700', key: 'customDevelopment' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-purple-900/10 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={servicesHeaderRef}
          className={`text-center mb-16 transition-all duration-1000 ${isServicesHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {tServices('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {tServices('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                ref={servicesCardRefs[index]}
                className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${servicesCardVisibility[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${card.gradient} text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tServices(`${card.key}.title`)}
                </h3>
                <p className="text-gray-600 mb-4">{tServices(`${card.key}.description`)}</p>
                <a
                  href="/our-services"
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
                >
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/our-services" variant="primary" size="lg">
            {tServices('viewAll')}
          </CTAButton>
          <CTAButton href="/contact" variant="secondary" size="lg">
            {tServices('getQuote')}
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
