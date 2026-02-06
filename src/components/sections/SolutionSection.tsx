'use client';

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useIntersectionObserver,
  useStaggeredIntersectionObserver,
} from '../../hooks/useIntersectionObserver';
import { CTAButton } from '../CTAButtons';
import { Zap, Trophy, Layers, Crown } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const [isSolutionHeaderVisible, setIsSolutionHeaderVisible] = useState(false);
  const [solutionCardVisibility, setSolutionCardVisibility] = useState([
    false,
    false,
    false,
    false,
  ]);

  const solutionHeaderRef = useIntersectionObserver(
    useCallback(() => setIsSolutionHeaderVisible(true), [])
  );

  const solutionCardRefs = useStaggeredIntersectionObserver(
    4,
    useCallback((index: number) => {
      setSolutionCardVisibility((prev) => {
        const newVisibility = [...prev];
        newVisibility[index] = true;
        return newVisibility;
      });
    }, [])
  );

  const tSolution = useTranslations('solution');

  const solutionCards = [
    { icon: Zap, gradient: 'from-blue-400 to-blue-600', key: 'planning' },
    { icon: Trophy, gradient: 'from-yellow-400 to-yellow-600', key: 'technology' },
    { icon: Layers, gradient: 'from-purple-400 to-purple-600', key: 'support' },
    { icon: Crown, gradient: 'from-amber-400 to-amber-600', key: 'freedom' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={solutionHeaderRef}
          className={`text-center mb-16 transition-all duration-1000 ${isSolutionHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {tSolution('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
            {tSolution('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {solutionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                ref={solutionCardRefs[index]}
                className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${solutionCardVisibility[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {tSolution(`${card.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tSolution(`${card.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/contact" variant="primary" size="lg" ctaType="cta-2">
            {tSolution('getStarted')}
          </CTAButton>
          <CTAButton href="/our-services" variant="secondary" size="lg" ctaType="cta-2">
            {tSolution('learnMore')}
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
