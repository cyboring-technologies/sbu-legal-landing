'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('securityModal');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-background border border-border rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 opacity-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-logo font-bold text-foreground leading-tight">
                {t('title')}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <ul className="space-y-4">
              {(t.raw('bullets') as string[]).map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-foreground/80 dark:text-gray-300 font-sans leading-relaxed text-sm sm:text-base">
                    {bullet}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-secondary text-secondary-fg border border-border font-medium rounded-lg hover:bg-secondary/80 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityModal;
