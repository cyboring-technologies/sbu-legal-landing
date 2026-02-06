import React from 'react';
import { Link } from '../i18n/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';

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
}

type CTAButtonProps = BaseCTAProps & (
  | { ctaType: 'cta-1'; href?: '/engine'; target?: '_blank'; rel?: string }
  | { ctaType: 'cta-2'; href: string; target?: '_blank' | '_self'; rel?: string }
  | { ctaType: 'cta-3'; href: string; target?: '_blank' | '_self'; rel?: string }
  | { ctaType: 'cta-4'; href?: string; target?: '_blank' | '_self'; rel?: string }
  | { ctaType?: never; href?: string; target?: '_blank' | '_self'; rel?: string } // Legacy support
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
}) => {
  const { theme } = useTheme();

  // ARCHITECTURE v1.1: Centralized Routing Enforcement
  let finalHref = ctaType === 'cta-1' ? '/engine' : href;
  const finalTarget = ctaType === 'cta-1' ? '_blank' : target;
  const finalRel = ctaType === 'cta-1' ? 'noopener noreferrer' : rel;

  // Ephemeral Theme Handover
  if (ctaType === 'cta-1' && theme) {
    finalHref = `/engine?theme=${theme}`;
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


  // If href is not provided, or an onClick handler is present, render a button
  if (!href || onClick) {
    return (
      <button onClick={onClick} className={`${classes} group`}>
        {content}
      </button>
    );
  }

  // If href starts with http, render a standard anchor tag
  if (finalHref?.startsWith('http')) {
    return (
      <a
        href={finalHref}
        className={`${classes} group`}
        target={finalTarget}
        rel={finalRel}
        data-cta-type={ctaType}
      >
        {content}
      </a>
    );
  }

  // Otherwise, render a Next.js Link component
  return (
    <Link
      href={finalHref || '#'}
      className={`${classes} group`}
      target={finalTarget}
      rel={finalRel}
      data-cta-type={ctaType}
    >
      {content}
    </Link>
  );
};

// Secondary CTA Button (different style)
interface BaseCTA2Props {
  children: React.ReactNode;
  variant?: 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

type CTAButton2Props = BaseCTA2Props & (
  | { ctaType: 'cta-1'; href?: '/engine'; target?: '_blank'; rel?: string }
  | { ctaType: 'cta-2'; href: string; target?: '_blank' | '_self'; rel?: string }
  | { ctaType: 'cta-3'; href: string; target?: '_blank' | '_self'; rel?: string }
  | { ctaType: 'cta-4'; href?: string; target?: '_blank' | '_self'; rel?: string }
  | { ctaType?: never; href?: string; target?: '_blank' | '_self'; rel?: string }
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
}) => {
  const { theme } = useTheme();

  // ARCHITECTURE v1.1: Centralized Routing Enforcement
  let finalHref = ctaType === 'cta-1' ? '/engine' : href;
  const finalTarget = ctaType === 'cta-1' ? '_blank' : target;
  const finalRel = ctaType === 'cta-1' ? 'noopener noreferrer' : rel;

  // Ephemeral Theme Handover
  if (ctaType === 'cta-1' && theme) {
    finalHref = `/engine?theme=${theme}`;
  }

  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 group';

  const variantClasses = {
    outline:
      'border-2 border-border text-foreground hover:border-primary hover:text-primary focus:ring-ring',
    ghost:
      'text-primary hover:text-primary/80 hover:bg-accent/10 focus:ring-ring',
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


  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  if (finalHref?.startsWith('http')) {
    return (
      <a
        href={finalHref}
        className={classes}
        target={finalTarget}
        rel={finalRel}
        data-cta-type={ctaType}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={finalHref || '#'}
      className={classes}
      target={finalTarget}
      rel={finalRel}
      data-cta-type={ctaType}
    >
      {content}
    </Link>
  );
};

export { CTAButton, CTAButton2 };
