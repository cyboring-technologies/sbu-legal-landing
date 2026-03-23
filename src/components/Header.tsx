'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '../i18n/navigation';
import dynamic from 'next/dynamic';
import { Menu, X, Rocket } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageToggle } from './LanguageToggle';

const ThemeToggle = dynamic(() => import('./ui/ThemeToggle').then((mod) => mod.ThemeToggle), {
  ssr: false,
});

// Throttle helper function
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

import { CTAButton2 } from './CTAButtons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled more than a threshold
      setIsScrolled(currentScrollY > 10);

      // Show header if scrolling up OR at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header if scrolling down and passed the header area
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [lastScrollY]);

  const navigation = [
    { name: t('services'), href: '/our-services' },
    { name: t('prices'), href: '/prices' },
    { name: t('about'), href: '/about-us' },
    { name: t('faq'), href: '/questions-and-answers' },
    { name: t('contact'), href: '/contact' },
  ];

  const headerVisible = isVisible || isHovered || isMenuOpen;

  return (
    <>
      {/* Top Sensor Area - Set to z-40 so it doesn't block header links (z-50) */}
      <div
        className="fixed top-0 left-0 w-full h-10 z-40 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
      />

      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed w-full top-0 z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-b border-gray-200/5 dark:border-gray-700/5 transition-transform duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={(e) => {
                  // Force page reload when clicking logo (industry standard)
                  if (
                    window.location.pathname === `/${locale}` ||
                    window.location.pathname === `/${locale}/`
                  ) {
                    e.preventDefault();
                    window.location.href = `/${locale}`;
                  }
                }}
              >
                <div className="relative w-8 h-8 flex-shrink-0">
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
                </div>
                <span className="text-2xl font-logo font-semibold tracking-tight text-foreground">
                  Documentos<span className="text-foreground">.legal</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                // Logic to check active state:
                // 1. Exact match
                // 2. Pathname starts with href (for subpages) - except for root "/"
                // 3. Handle locale prefix if present (e.g. /en/prices should match /prices)
                const normalizePath = (path: string) => {
                  // Remove locale prefix if present (assuming format /en/...)
                  return path.replace(/^\/[a-z]{2}(\/|$)/, '/');
                };

                // Normalize current pathname
                const currentPath = normalizePath(pathname);

                const isActive =
                  currentPath === item.href ||
                  (item.href !== '/' && currentPath.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Theme Toggle & Access */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageToggle />
              <CTAButton2 href="/engine" variant="ghost" size="sm" ctaType="cta-1">
                {t('cta_1_access')}
              </CTAButton2>
              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <ThemeToggle iconSize={20} />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageToggle />
              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <ThemeToggle iconSize={20} />
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-400"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg absolute w-full left-0 mt-0">
              <div className="px-4 py-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-3 text-base font-medium rounded-md ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <CTAButton2
                    href="/engine"
                    variant="ghost"
                    size="md"
                    ctaType="cta-1"
                    className="w-full justify-start text-gray-700 dark:text-gray-300 !transition-none opacity-80 hover:opacity-100 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-3 py-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('cta_1_access')}
                  </CTAButton2>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
