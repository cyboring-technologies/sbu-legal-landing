'use client';

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useIntersectionObserver,
  useStaggeredIntersectionObserver,
} from '../../hooks/useIntersectionObserver';

export const TestimonialsSection: React.FC = () => {
  const [isTestimonialsHeaderVisible, setIsTestimonialsHeaderVisible] = useState(false);
  const [testimonialsCardVisibility, setTestimonialsCardVisibility] = useState([
    false,
    false,
    false,
  ]);
  const [openModal, setOpenModal] = useState(false);

  const testimonialsHeaderRef = useIntersectionObserver(
    useCallback(() => setIsTestimonialsHeaderVisible(true), [])
  );

  const testimonialsCardRefs = useStaggeredIntersectionObserver(
    3,
    useCallback((index: number) => {
      setTestimonialsCardVisibility((prev) => {
        const newVisibility = [...prev];
        newVisibility[index] = true;
        return newVisibility;
      });
    }, [])
  );

  const tTestimonials = useTranslations('testimonials');
  const tExecutionVideo = useTranslations('executionVideo');

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-blue-900/20 dark:to-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={testimonialsHeaderRef}
          className={`text-center mb-16 transition-all duration-1000 ${isTestimonialsHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {tTestimonials('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {tTestimonials('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((num, index) => (
            <div
              key={num}
              ref={testimonialsCardRefs[index]}
              className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 ${testimonialsCardVisibility[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {tTestimonials(`client${num}.name`)}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                &ldquo;{tTestimonials(`client${num}.quote`)}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="relative w-full max-w-[900px]">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
              <iframe
                width="100%"
                height="506"
                src="https://www.youtube.com/embed/zDObk6cPUdc?autoplay=1"
                title="Complete execution flow"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="block w-full max-h-[80vh] aspect-video sm:h-[506px]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
