import React from 'react';

// Resolved at build time by Next.js from NEXT_PUBLIC_ENGINE_URL.
// In dev: 'http://localhost:8788'  |  In prod: '' (same-origin — CDN routes /engine/ to the engine worker)
const ENGINE_BASE = process.env.NEXT_PUBLIC_ENGINE_URL ?? '';
import { Link } from '../i18n/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { useModal } from './providers/ModalProvider';

// CTA Architecture v1.1 Normative Types
export type CTAType = 'cta-1' | 'cta-2' | 'cta-3' | 'cta-4';

interface BaseCTAProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
  onClick?: () => void;
  // Metadata for audit tracking
  'data-cta-label'?: string;
  note?: string;
  tooltip?: boolean;
}

type CTAButtonProps = BaseCTAProps &
  (
    | { ctaType: 'cta-1'; href?: string; target?: '_blank'; rel?: string }
    | { ctaType: 'cta-2'; href: string; target?: '_blank' | '_self'; rel?: string }
    | { ctaType: 'cta-3'; href: string; target?: '_blank' | '_self'; rel?: string }
    | { ctaType: 'cta-4'; href?: string; target?: '_blank' | '_self'; rel?: string }
  );

const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
  onClick,
  target,
  rel,
  ctaType,
  note,
  tooltip,
}) => {
  const { theme } = useTheme();
  const locale = useLocale();
  const { openSecurityModal } = useModal();

  // ARCHITECTURE v1.1: Centralized Routing Enforcement
  let finalHref = ctaType === 'cta-1' ? `${ENGINE_BASE}/` : href;
  const finalTarget = ctaType === 'cta-1' ? '_blank' : target;
  const finalRel = ctaType === 'cta-1' ? 'noopener noreferrer' : rel;

  // Ephemeral Theme/Lang Handover for CTA-1
  if (ctaType === 'cta-1') {
    const params = new URLSearchParams();
    if (theme) params.set('theme', theme);
    params.set('lang', locale);
    finalHref = `${ENGINE_BASE}/?${params.toString()}`;
  }

  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-95',
    secondary:
      'bg-background text-primary dark:text-primary-foreground border-2 border-border hover:bg-secondary focus:ring-ring',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-2" />
      )}
    </>
  );

  const buttonContent = (
    <div className="relative inline-flex flex-col group/cta">
      {/* If href is not provided, or an onClick handler is present, render a button */}
      {!href || onClick || ctaType === 'cta-2' ? (
        <button
          onClick={(e) => {
            if (ctaType === 'cta-2') {
              e.preventDefault();
              openSecurityModal();
            }
            if (onClick) onClick();
          }}
          className={`${classes} group`}
        >
          {content}
        </button>
      ) : finalHref?.startsWith('http') ? (
        <a
          href={finalHref}
          className={`${classes} group`}
          target={finalTarget}
          rel={finalRel}
          data-cta-type={ctaType}
        >
          {content}
        </a>
      ) : (
        <Link
          href={finalHref || '#'}
          className={`${classes} group`}
          target={finalTarget}
          rel={finalRel}
          data-cta-type={ctaType}
        >
          {content}
        </Link>
      )}

      {note && !tooltip && (
        <p className="mt-2 text-xs text-muted-foreground/80 leading-snug max-w-[240px]">{note}</p>
      )}

      {note && tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 invisible group-hover/cta:visible opacity-0 group-hover/cta:opacity-100 transition-all duration-200 z-50">
          <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded text-[10px] leading-tight w-max max-w-[200px] shadow-2xl border border-white/10">
            {note}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900 dark:border-t-gray-800" />
          </div>
        </div>
      )}
    </div>
  );

  return buttonContent;
};

// Secondary CTA Button (different style)
interface BaseCTA2Props {
  children: React.ReactNode;
  variant?: 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  note?: string;
  tooltip?: boolean;
}

type CTAButton2Props = BaseCTA2Props &
  (
    | { ctaType: 'cta-1'; href?: string; target?: '_blank'; rel?: string }
    | { ctaType: 'cta-2'; href: string; target?: '_blank' | '_self'; rel?: string }
    | { ctaType: 'cta-3'; href: string; target?: '_blank' | '_self'; rel?: string }
    | { ctaType: 'cta-4'; href?: string; target?: '_blank' | '_self'; rel?: string }
  );

const CTAButton2: React.FC<CTAButton2Props> = ({
  href,
  children,
  variant = 'outline',
  size = 'md',
  className = '',
  onClick,
  target,
  rel,
  ctaType,
  note,
  tooltip,
}) => {
  const { theme } = useTheme();
  const locale = useLocale();
  const { openSecurityModal } = useModal();

  // ARCHITECTURE v1.1: Centralized Routing Enforcement
  let finalHref = ctaType === 'cta-1' ? `${ENGINE_BASE}/` : href;
  const finalTarget = ctaType === 'cta-1' ? '_blank' : target;
  const finalRel = ctaType === 'cta-1' ? 'noopener noreferrer' : rel;

  // Ephemeral Theme/Lang Handover for CTA-1
  if (ctaType === 'cta-1') {
    const params = new URLSearchParams();
    if (theme) params.set('theme', theme);
    params.set('lang', locale);
    finalHref = `${ENGINE_BASE}/?${params.toString()}`;
  }

  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 group';

  const variantClasses = {
    outline:
      'border-2 border-border bg-white text-gray-900 hover:border-primary hover:text-primary focus:ring-ring',
    ghost:
      'text-primary dark:text-gray-100 hover:text-primary/80 dark:hover:text-white hover:bg-accent/10 focus:ring-ring',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {children}
      <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </>
  );

  const buttonContent = (
    <div className="relative inline-flex flex-col group/cta">
      {/* Logic for button or link */}
      {onClick || ctaType === 'cta-2' ? (
        <button
          onClick={(e) => {
            if (ctaType === 'cta-2') {
              e.preventDefault();
              openSecurityModal();
            }
            if (onClick) onClick();
          }}
          className={classes}
        >
          {content}
        </button>
      ) : finalHref?.startsWith('http') ? (
        <a
          href={finalHref}
          className={classes}
          target={finalTarget}
          rel={finalRel}
          data-cta-type={ctaType}
        >
          {content}
        </a>
      ) : (
        <Link
          href={finalHref || '#'}
          className={classes}
          target={finalTarget}
          rel={finalRel}
          data-cta-type={ctaType}
        >
          {content}
        </Link>
      )}

      {note && !tooltip && (
        <p className="mt-2 text-xs text-muted-foreground/80 leading-snug max-w-[240px]">{note}</p>
      )}

      {note && tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 invisible group-hover/cta:visible opacity-0 group-hover/cta:opacity-100 transition-all duration-200 z-50">
          <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded text-[10px] leading-tight w-max max-w-[200px] shadow-2xl border border-white/10">
            {note}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900 dark:border-t-gray-800" />
          </div>
        </div>
      )}
    </div>
  );

  return buttonContent;
};

export { CTAButton, CTAButton2 };
