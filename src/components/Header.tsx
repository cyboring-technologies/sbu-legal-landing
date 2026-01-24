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

      // Update scrolled state
      setIsScrolled(currentScrollY > 10);

      // Show/hide based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide header
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show header when mouse is near the top (within 100px)
      if (e.clientY < 100) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Throttle scroll to 100ms for better performance
    const throttledScroll = throttle(handleScroll, 100);
    // Throttle mousemove to 50ms
    const throttledMouseMove = throttle(handleMouseMove, 50);

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, [lastScrollY]);

  const navigation = [
    { name: t('services'), href: '/our-services' },
    { name: t('prices'), href: '/prices' },
    { name: t('about'), href: '/about-us' },
    { name: t('faq'), href: '/questions-and-answers' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
        : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-md border-b border-gray-200/10 dark:border-gray-700/10'
        } ${isVisible || isHovered ? 'translate-y-0' : '-translate-y-full'}`}
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
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <ThemeToggle iconSize={20} />
            </div>
            <Link
              href="/login"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium shadow-md transition-all duration-200 hover:bg-primary/80 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {t('access')}
            </Link>
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium ${isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/login"
                className="bg-primary text-primary-foreground block px-3 py-2 rounded-md text-base font-medium mt-4 shadow-md transition-all duration-200 hover:bg-primary/80 hover:shadow-xl hover:scale-105 active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('access')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
