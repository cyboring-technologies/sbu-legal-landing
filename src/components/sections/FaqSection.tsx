'use client';

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { CTAButton } from '../CTAButtons';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isFaqHeaderVisible, setIsFaqHeaderVisible] = useState(false);

  const faqHeaderRef = useIntersectionObserver(useCallback(() => setIsFaqHeaderVisible(true), []));

  const tFaq = useTranslations('faq');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-blue-900/10 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={faqHeaderRef}
          className={`text-center mb-16 transition-all duration-1000 ${isFaqHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {tFaq('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {tFaq('description')}
          </p>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-8">
                  {tFaq(`q${index}.question`)}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${
                    openFaq === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-600 dark:text-gray-300">{tFaq(`q${index}.answer`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/questions-and-answers" variant="primary" size="lg">
            {tFaq('viewAll')}
          </CTAButton>
          <CTAButton href="/contact" variant="secondary" size="lg">
            {tFaq('askQuestion')}
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
