'use client';

import React, { useState, useCallback } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
    threshold?: number;
    duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    threshold = 0.1,
    duration = 700,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useIntersectionObserver(
        useCallback(() => {
            // Small delay to prevent immediate triggering if needed,
            // but primarily using the CSS transition-delay
            setIsVisible(true);
        }, []),
        { threshold }
    );

    const getTransformClass = () => {
        switch (direction) {
            case 'up':
                return 'translate-y-10';
            case 'down':
                return '-translate-y-10';
            case 'left':
                return 'translate-x-10';
            case 'right':
                return '-translate-x-10';
            case 'none':
            default:
                return '';
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all ease-out ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate(0, 0)' : direction !== 'none' ? undefined : 'none',
            }}
        >
            <div className={`${isVisible ? '' : getTransformClass()} transition-transform duration-[inherit] h-full`}>
                {children}
            </div>
        </div>
    );
};
