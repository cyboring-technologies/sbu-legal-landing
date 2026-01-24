'use client';

import React from 'react';

interface HoverCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const HoverCard: React.FC<HoverCardProps> = ({ children, className = '', onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
        bg-white dark:bg-gray-900 
        rounded-2xl 
        shadow-lg hover:shadow-2xl 
        border border-gray-200 dark:border-gray-700 
        transition-all duration-300 
        hover:-translate-y-2
        ${className}
      `}
        >
            {children}
        </div>
    );
};
