import React from 'react';
import { Link } from '../i18n/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
  onClick?: () => void;
  target?: '_blank' | '_self';
  rel?: string;
}

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
}) => {
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

  if (onClick) {
    return (
      <button onClick={onClick} className={`${classes} group`}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={`${classes} group`} target={target} rel={rel}>
      {content}
    </Link>
  );
};

// Secondary CTA Button (different style)
interface CTAButton2Props {
  href: string;
  children: React.ReactNode;
  variant?: 'outline' | 'ghost';
  target?: '_blank' | '_self';
  rel?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const CTAButton2: React.FC<CTAButton2Props> = ({
  href,
  children,
  variant = 'outline',
  size = 'md',
  className = '',
  onClick,
  target,
  rel,
}) => {
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

  return (
    <Link href={href} className={classes} target={target} rel={rel}>
      {content}
    </Link>
  );
};

export { CTAButton, CTAButton2 };
