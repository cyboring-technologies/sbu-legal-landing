'use client';

import React from 'react';
import { FadeIn } from './animations/FadeIn';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    centered?: boolean;
    className?: string;
    titleGradient?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    description,
    centered = true,
    className = '',
    titleGradient = false,
}) => {
    return (
        <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}>
            <FadeIn>
                {/* Optional Subtitle/Tag */}
                {subtitle && (
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                        {subtitle}
                    </span>
                )}

                {/* Main Title */}
                <h2
                    className={`
            text-3xl md:text-4xl lg:text-5xl font-bold mb-6
            ${titleGradient
                            ? 'bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent'
                            : 'text-gray-900 dark:text-white'
                        }
          `}
                >
                    {title}
                </h2>

                {/* Description */}
                {description && (
                    <p className={`text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl ${centered ? 'mx-auto' : ''}`}>
                        {description}
                    </p>
                )}
            </FadeIn>
        </div>
    );
};
