'use client';

import React, { useState, useCallback, Children, isValidElement } from 'react';
import { useStaggeredIntersectionObserver } from '../../../hooks/useIntersectionObserver';

interface StaggeredGridProps {
    children: React.ReactNode;
    staggerDelay?: number;
    className?: string;
    columns?: 1 | 2 | 3 | 4;
}

export const StaggeredGrid: React.FC<StaggeredGridProps> = ({
    children,
    staggerDelay = 100,
    className = '',
    columns,
}) => {
    const count = Children.count(children);
    const [visibility, setVisibility] = useState<boolean[]>(new Array(count).fill(false));

    const refs = useStaggeredIntersectionObserver(
        count,
        useCallback((index: number) => {
            setVisibility((prev) => {
                const newVis = [...prev];
                newVis[index] = true;
                return newVis;
            });
        }, []),
        staggerDelay
    );

    const getGridCols = () => {
        switch (columns) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-1 md:grid-cols-2';
            case 3:
                return 'grid-cols-1 md:grid-cols-3';
            case 4:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
            default:
                return '';
        }
    };

    return (
        <div className={`grid ${columns ? getGridCols() : ''} gap-8 ${className}`}>
            {Children.map(children, (child, index) => {
                if (!isValidElement(child)) return child;

                return (
                    <div
                        ref={refs[index]}
                        className={`transition-all duration-700 ease-out`}
                        style={{
                            opacity: visibility[index] ? 1 : 0,
                            transform: visibility[index] ? 'translateY(0)' : 'translateY(20px)',
                        }}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
};
