'use client';

import React from 'react';
import { Link } from '../i18n/navigation';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import {
  Rocket,
  Mail,
  MessageCircle,
  Facebook,
  Linkedin,
  Youtube,
  Lock,
  Code2,
  ShieldCheck,
  Cloud,

} from 'lucide-react';

// Azure Icon SVG Component
const AzureIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 96 96"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M33.338 6.544h26.038l-27.03 80.455a4.152 4.152 0 0 1-3.933 2.824H8.149a4.145 4.145 0 0 1-3.928-5.47L29.404 9.368a4.152 4.152 0 0 1 3.934-2.825z" />
    <path d="M71.175 60.261H41.29a1.911 1.911 0 0 0-1.305 3.309l26.532 24.764a4.171 4.171 0 0 0 2.846 1.121h23.586z" />
    <path d="M33.338 6.544a4.118 4.118 0 0 0-3.943 2.879L4.252 84.078a4.146 4.146 0 0 0 3.916 5.545h20.646a4.443 4.443 0 0 0 3.587-2.616l6.082-17.089 22.324 20.849a4.236 4.236 0 0 0 2.628 1.037h23.053L62.83 61.106l-30.475-.043L59.47 6.544z" />
  </svg>
);

// Microsoft AI Foundry Icon SVG Component
const AIFoundryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// SOC Compliance Icon SVG Component
const SOCIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
  </svg>
);

const TrustBadges = ({ className = '' }: { className?: string }) => {
  const t = useTranslations('footer.trustBadges');

  const badges = [
    { icon: ShieldCheck, label: t('secureByDesign') },
    { icon: Cloud, label: t('cloudAgnostic') },
    { icon: Code2, label: t('nativeCode') },
    { icon: AIFoundryIcon, label: t('orchestration') },
    { icon: Lock, label: t('ssl') },
    { icon: SOCIcon, label: t('soc') },
  ];

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
        {badges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 grayscale hover:grayscale-0 transition-all duration-300"
              title={badge.label}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:inline">{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const locale = useLocale();

  const footerLinks = {
    company: [
      { name: t('companyLinks.about'), href: '/about-us' },
      { name: t('companyLinks.services'), href: '/our-services' },
      { name: t('companyLinks.prices'), href: '/prices' },
      { name: t('companyLinks.blog'), href: '/blog' },
      { name: t('companyLinks.contact'), href: '/contact' },
    ],
    support: [
      { name: t('supportLinks.faq'), href: '/questions-and-answers' },
      { name: t('supportLinks.help'), href: '/questions-and-answers' },
      { name: t('supportLinks.privacy'), href: '/privacy' },
      { name: t('supportLinks.terms'), href: '/terms' },
    ],
    services: [
      { name: t('servicesLinks.document'), href: '/our-services#document' },
      { name: t('servicesLinks.analytics'), href: '/our-services#analytics' },
      { name: t('servicesLinks.ai'), href: '/our-services#ai' },
      { name: t('servicesLinks.automation'), href: '/our-services#automation' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com' },
  ];

  return (
    <footer className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl text-gray-900 dark:text-white border-t border-gray-200/20 dark:border-gray-700/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={(e) => {
                  if (
                    window.location.pathname === `/${locale}` ||
                    window.location.pathname === `/${locale}/`
                  ) {
                    e.preventDefault();
                    window.location.href = `/${locale}`;
                  }
                }}
              >
                <span className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src="/logo-light-mode.svg"
                    alt="Documentos.legal Logo"
                    width={32}
                    height={32}
                    className="absolute inset-0 block dark:hidden"
                  />
                  <Image
                    src="/logo-dark-mode.svg"
                    alt="Documentos.legal Logo"
                    width={32}
                    height={32}
                    className="absolute inset-0 hidden dark:block"
                  />
                </span>
                <span className="text-2xl font-logo font-semibold">Documentos.legal</span>
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line">{t('slogan')}</p>
            <div className="space-y-2">

              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a
                  href="mailto:hello@cyboring.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  hello@cyboring.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a
                  href="https://wa.me/18156620760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('support')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-8">
          <TrustBadges className="mb-8" />
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center">
              {t.rich('copyright', {
                year: currentYear.toString(),
                companyLink: (chunks) => (
                  <a
                    href="https://www.cyboring.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
