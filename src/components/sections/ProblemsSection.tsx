'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useStaggeredIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { HtmlContent } from '../HtmlContent';
import { Brain, AlertTriangle, MessageSquare, Clock } from 'lucide-react';

export const ProblemsSection: React.FC = () => {
  const problemsSectionRef = useRef<HTMLElement>(null);
  const [isProblemsVisible, setIsProblemsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cardVisibility, setCardVisibility] = useState([false, false, false, false]);

  const cardRefs = useStaggeredIntersectionObserver(
    4,
    useCallback((index: number) => {
      setCardVisibility((prev) => {
        const newVisibility = [...prev];
        newVisibility[index] = true;
        return newVisibility;
      });
    }, [])
  );

  const tProblems = useTranslations('problems');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasScrolled) {
            setIsProblemsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (problemsSectionRef.current) {
      observer.observe(problemsSectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (problemsSectionRef.current) {
        observer.unobserve(problemsSectionRef.current);
      }
    };
  }, [hasScrolled]);

  const problemCards = [
    { icon: Brain, color: 'red', key: 'slowTransformation' },
    { icon: AlertTriangle, color: 'orange', key: 'poorExperience' },
    { icon: MessageSquare, color: 'amber', key: 'security' },
    { icon: Clock, color: 'rose', key: 'opportunityCost' },
  ];

  return (
    <section
      ref={problemsSectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {!isProblemsVisible && (
        <div
          className="flex justify-center pt-0 pb-0 cursor-pointer relative z-20"
          onMouseEnter={() => {
            setHasScrolled(true);
            setIsProblemsVisible(true);
          }}
          onClick={() => {
            setHasScrolled(true);
            setIsProblemsVisible(true);
          }}
        >
          <svg
            className="w-12 h-12 text-indigo-400 dark:text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-300"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isProblemsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <HtmlContent
            content={tProblems('title')}
            as="h2"
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6"
          />
          <HtmlContent
            content={tProblems('description')}
            as="p"
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problemCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                ref={cardRefs[index]}
                className={`text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${cardVisibility[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br from-${card.color}-100 to-${card.color}-200 dark:from-${card.color}-900/30 dark:to-${card.color}-800/30 text-${card.color}-600 dark:text-${card.color}-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {tProblems(`${card.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tProblems(`${card.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
