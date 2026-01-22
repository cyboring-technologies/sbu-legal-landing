'use client';

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const ContactSection: React.FC = () => {
  const [isContactHeaderVisible, setIsContactHeaderVisible] = useState(false);

  const contactHeaderRef = useIntersectionObserver(
    useCallback(() => setIsContactHeaderVisible(true), [])
  );

  const tContact = useTranslations('contact');

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div
            ref={contactHeaderRef}
            className={`transition-all duration-1000 ${isContactHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
              {tContact('title')}
            </h2>
            <p className="mt-4 text-lg text-blue-100">{tContact('description')}</p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start text-blue-100">
                <span className="text-3xl mr-4 flex-shrink-0">{tContact('enterprise.icon')}</span>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">
                    {tContact('enterprise.title')}
                  </h3>
                  <p className="text-blue-100">{tContact('enterprise.description')}</p>
                </div>
              </div>
              <div className="flex items-start text-blue-100">
                <span className="text-3xl mr-4 flex-shrink-0">{tContact('partners.icon')}</span>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">
                    {tContact('partners.title')}
                  </h3>
                  <p className="text-blue-100">{tContact('partners.description')}</p>
                </div>
              </div>
              <div className="flex items-start text-blue-100">
                <span className="text-3xl mr-4 flex-shrink-0">{tContact('security.icon')}</span>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">
                    {tContact('security.title')}
                  </h3>
                  <p className="text-blue-100">{tContact('security.description')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {tContact('formTitle')}
              </h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={tContact('form.name')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={tContact('form.email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={tContact('form.company')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder={tContact('form.message')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {tContact('form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
