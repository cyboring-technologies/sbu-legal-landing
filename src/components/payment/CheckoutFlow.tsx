'use client';

import React, { useState } from 'react';

interface CheckoutFlowProps {
    // No props required for Sovereign Handoff
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isBlocked, setIsBlocked] = useState(false);

    React.useEffect(() => {
        // Auto-redirect to remove "middle step" interaction
        const handle = window.open('/engine', '_blank');

        if (handle) {
            // Success: Close the parent modal to remove "Launching..." message
            // We find the "Close" button which is a sibling in the parent container
            setTimeout(() => {
                const parent = containerRef.current?.parentElement;
                const closeBtn = parent?.querySelector('button');
                // The parent container in page.tsx has the Close button as the first child
                if (closeBtn && closeBtn.textContent === 'Close') {
                    closeBtn.click();
                }
            }, 500); // Short delay to ensure tab opening registers visually
        } else {
            // Popup blocked: Fallback to manual click
            setIsBlocked(true);
        }
    }, []);

    const openEngine = () => {
        window.open('/engine', '_blank');
    };

    if (!isBlocked) {
        // While redirecting (or if successful and waiting to close), show minimal loader
        return (
            <div ref={containerRef} className="w-full max-w-md mx-auto p-6 flex flex-col items-center justify-center">
                <div className="animate-in fade-in zoom-in duration-300">
                    <div className="flex flex-col items-center gap-4 opacity-50">
                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                        <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">Launching...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Fallback if blocked
    return (
        <div ref={containerRef} className="w-full max-w-md mx-auto p-6 flex flex-col items-center justify-center">
            <button
                onClick={openEngine}
                className="w-full py-6 flex flex-col justify-center items-center text-gray-500 hover:text-blue-600 transition-colors group gap-4"
            >
                <div className="relative">
                    <svg className="w-16 h-16 transform transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <span className="text-sm font-medium">
                    Click to Open Engine
                </span>
            </button>
        </div>
    );
};

