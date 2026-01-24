'use client';

import React, { useEffect, useRef, useState } from 'react';

interface InteractiveGridAnimatedRadialInwardProps {
    targetSelector?: string;
}

// Optimized Canvas version of the Square Wave Grid (Outside -> Center)
const InteractiveGridAnimatedRadialInwardComponent: React.FC<
    InteractiveGridAnimatedRadialInwardProps
> = ({ targetSelector }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        // Target position logic
        const updateTargetPosition = () => {
            if (!containerRef.current || !targetSelector) return;
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                setTargetPos({
                    x: targetRect.left + targetRect.width / 2 - containerRect.left,
                    y: targetRect.top + targetRect.height / 2 - containerRect.top,
                });
            }
        };

        updateTargetPosition();
        window.addEventListener('resize', updateTargetPosition);
        return () => window.removeEventListener('resize', updateTargetPosition);
    }, [targetSelector]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const gridSize = 50;
        let animationOffset = 0;
        let animationFrameId: number;

        const render = () => {
            if (!canvas || !container || !ctx) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            // Handle raw dimensions
            if (canvas.width !== width || canvas.height !== height) {
                // Handle high-DPI displays
                const dpr = window.devicePixelRatio || 1;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.scale(dpr, dpr);
            }

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            const centerX = targetPos ? targetPos.x : width / 2;
            const centerY = targetPos ? targetPos.y : height / 2;

            // Grid calculations
            const cols = Math.ceil(width / gridSize);
            const rows = Math.ceil(height / gridSize);

            // Animation logic (mimicking the original hook)
            // Original: setAnimationOffset((prev) => (prev + 1.5) % 300) every 80ms
            // 60fps is approx 16ms/frame.
            // User reverted to 0.125 for "premium/stable" feel.
            animationOffset = (animationOffset + 0.125) % 300;

            // Max Distance calculation (Manhattan)
            const maxDistanceX = Math.max(centerX, width - centerX) / gridSize;
            const maxDistanceY = Math.max(centerY, height - centerY) / gridSize;
            const maxDistance = Math.max(maxDistanceX, maxDistanceY);

            // Draw Loop
            const waveRadius = maxDistance - animationOffset / 2;

            ctx.lineWidth = 1;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const xPos = x * gridSize;
                    const yPos = y * gridSize;

                    // Manhattan distance logic
                    const dx = Math.abs(xPos + gridSize / 2 - centerX) / gridSize;
                    const dy = Math.abs(yPos + gridSize / 2 - centerY) / gridSize;
                    const distanceFromCenter = Math.max(dx, dy);

                    const distance = Math.abs(distanceFromCenter - waveRadius);

                    if (distance < 2) {
                        // Active Cell
                        ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
                        ctx.fillRect(xPos, yPos, gridSize, gridSize);

                        ctx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
                        ctx.strokeRect(xPos, yPos, gridSize, gridSize);
                    }
                    // Optional: Draw subtle grid for inactive cells if needed, 
                    // but original code didn't really show them much except maybe border?
                    // Original had: borderColor: cell.active ? 'rgba...' : 'rgba(..., 0.05)'
                    // Let's add the subtle border for all to match original feel if desired, 
                    // or keep it clean. Original had 'absolute border ...' for ALL cells.
                    // Let's draw subtle border for everyone to preserve the "grid" look.
                    else {
                        ctx.strokeStyle = 'rgba(37, 99, 235, 0.05)';
                        ctx.strokeRect(xPos, yPos, gridSize, gridSize);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Delay animation start by 3 seconds for better initial page load performance
        const timerId = setTimeout(() => {
            render();
        }, 3000);

        return () => {
            clearTimeout(timerId);
            cancelAnimationFrame(animationFrameId);
        };
    }, [targetPos]);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

// Wrap in React.memo
export const InteractiveGridAnimatedRadialInward = React.memo(
    InteractiveGridAnimatedRadialInwardComponent
);
