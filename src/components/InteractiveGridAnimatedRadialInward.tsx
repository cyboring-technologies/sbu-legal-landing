'use client';

import React, { useEffect, useRef, useState } from 'react';

interface InteractiveGridAnimatedRadialInwardProps {
  targetSelector?: string;
  startImmediately?: boolean;
  runOnce?: boolean;
}

// Optimized Canvas version of the Square Wave Grid (Outside -> Center)
const InteractiveGridAnimatedRadialInwardComponent: React.FC<
  InteractiveGridAnimatedRadialInwardProps
> = ({ targetSelector, startImmediately = false, runOnce = false }) => {
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

    const cellWidth = 53;
    const cellHeight = 74;
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
      const cols = Math.ceil(width / cellWidth);
      const rows = Math.ceil(height / cellHeight);

      // Animation logic (mimicking the original hook)
      if (runOnce && animationOffset >= 300) {
        // Stop animation after one complete cycle
        cancelAnimationFrame(animationFrameId);
        return;
      }
      animationOffset = runOnce
        ? Math.min(animationOffset + 0.125, 300)
        : (animationOffset + 0.125) % 300;

      // Max Distance calculation (Manhattan)
      const maxDistanceX = Math.max(centerX, width - centerX) / cellWidth;
      const maxDistanceY = Math.max(centerY, height - centerY) / cellHeight;
      const maxDistance = Math.max(maxDistanceX, maxDistanceY);

      // Draw Loop
      const waveRadius = maxDistance - animationOffset / 2;

      ctx.lineWidth = 1;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const xPos = x * cellWidth;
          const yPos = y * cellHeight;

          // Manhattan distance logic (proportional to cell dimensions)
          const dx = Math.abs(xPos + cellWidth / 2 - centerX) / cellWidth;
          const dy = Math.abs(yPos + cellHeight / 2 - centerY) / cellHeight;
          const distanceFromCenter = Math.max(dx, dy);

          const distance = Math.abs(distanceFromCenter - waveRadius);

          if (distance < 2) {
            // Active Cell
            ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
            ctx.fillRect(xPos, yPos, cellWidth, cellHeight);

            ctx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
            ctx.strokeRect(xPos, yPos, cellWidth, cellHeight);
          } else {
            ctx.strokeStyle = 'rgba(37, 99, 235, 0.05)';
            ctx.strokeRect(xPos, yPos, cellWidth, cellHeight);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Use startImmediately to control delay
    const delay = startImmediately ? 0 : 3000;
    const timerId = setTimeout(() => {
      render();
    }, delay);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos, startImmediately, runOnce]);

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
