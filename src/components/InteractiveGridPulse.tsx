'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GridCell {
  x: number;
  y: number;
  active: boolean;
  intensity: number;
}

// Throttle helper function
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

interface GridPulseProps {
  cellWidth?: number;
  cellHeight?: number;
}

// Contact Page - Pulsing ripple effect with gradient intensity
const InteractiveGridPulseComponent: React.FC<GridPulseProps> = ({
  cellWidth = 53,
  cellHeight = 74,
}) => {
  const [cells, setCells] = useState<GridCell[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateGrid = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const cols = Math.ceil(rect.width / cellWidth);
      const rows = Math.ceil(rect.height / cellHeight);

      const newCells: GridCell[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          newCells.push({
            x: x * cellWidth,
            y: y * cellHeight,
            active: false,
            intensity: 0,
          });
        }
      }
      setCells(newCells);
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, [cellWidth, cellHeight]);

  useEffect(() => {
    const updateCells = (mouseX: number, mouseY: number, rect?: DOMRect) => {
      setCells((prev) => {
        if (!rect) return prev;

        const isInside =
          mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height;

        if (!isInside) {
          const hasActivity = prev.some((c) => c.active || c.intensity > 0);
          if (!hasActivity) return prev;
          return prev.map((c) => ({ ...c, active: false, intensity: 0 }));
        }

        return prev.map((cell) => {
          const distance = Math.sqrt(
            Math.pow(cell.x + cellWidth / 2 - mouseX, 2) +
            Math.pow(cell.y + cellHeight / 2 - mouseY, 2)
          );
          const maxDistance = 150;
          const intensity = distance < maxDistance ? 1 - distance / maxDistance : 0;

          return {
            ...cell,
            active: distance < maxDistance,
            intensity: intensity,
          };
        });
      });
    };

    // Throttle the heavy calculation part
    const throttledUpdate = throttle((x: number, y: number, r: DOMRect) => {
      updateCells(x, y, r);
    }, 16);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const isInside = mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height;

      if (isInside) {
        throttledUpdate(mouseX, mouseY, rect);
      } else {
        // If outside, force update immediately (debounced/throttled check built into setState updater)
        // We call updateCells directly to ensure we don't miss the "exit" event due to throttling
        updateCells(mouseX, mouseY, rect);
      }
    };

    const handleMouseLeaveWindow = () => {
      // Force reset when leaving window
      setCells((prev) => {
        const hasActivity = prev.some((c) => c.active || c.intensity > 0);
        if (!hasActivity) return prev;
        return prev.map((c) => ({ ...c, active: false, intensity: 0 }));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {cells.map((cell, index) => (
        <div
          key={index}
          className="absolute border transition-all duration-500 ease-out pointer-events-none"
          style={{
            left: cell.x,
            top: cell.y,
            width: cellWidth,
            height: cellHeight,
            backgroundColor: cell.active
              ? `rgba(37, 99, 235, ${0.15 * cell.intensity})`
              : 'transparent',
            borderColor: cell.active
              ? `rgba(37, 99, 235, ${0.5 * cell.intensity})`
              : 'rgba(37, 99, 235, 0.1)',
            transform: cell.active ? `scale(${1 + 0.15 * cell.intensity})` : 'scale(1)',
            boxShadow: cell.active
              ? `0 0 ${20 * cell.intensity}px rgba(37, 99, 235, ${0.3 * cell.intensity})`
              : 'none',
          }}
        />
      ))}
    </div>
  );
};

// Wrap in React.memo to prevent unnecessary re-renders
export const InteractiveGridPulse = React.memo(InteractiveGridPulseComponent);
