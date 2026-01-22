'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GridCell {
  x: number;
  y: number;
  active: boolean;
}

// Prices Page - Animated grid with organic wave pattern from center to outside
export const InteractiveGridAnimatedRadial: React.FC = () => {
  const [cells, setCells] = useState<GridCell[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridSize = 50;
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const updateGrid = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const cols = Math.ceil(rect.width / gridSize);
      const rows = Math.ceil(rect.height / gridSize);

      const newCells: GridCell[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          newCells.push({ x: x * gridSize, y: y * gridSize, active: false });
        }
      }
      setCells(newCells);
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);

    return () => {
      window.removeEventListener('resize', updateGrid);
    };
  }, []);

  // Animated wave with organic, non-uniform shape - radial movement (center to outside)
  useEffect(() => {
    if (cells.length === 0) return;

    const interval = setInterval(() => {
      setAnimationOffset((prev) => (prev + 1) % 300);
    }, 50);

    return () => clearInterval(interval);
  }, [cells.length]);

  useEffect(() => {
    if (cells.length === 0 || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCells((prev) =>
      prev.map((cell) => {
        // Calculate distance from center
        const dx = cell.x + gridSize / 2 - centerX;
        const dy = cell.y + gridSize / 2 - centerY;
        const distanceFromCenter = Math.sqrt(dx * dx + dy * dy) / gridSize;

        // Wave expands from center
        const waveRadius = animationOffset / 2;

        // Add organic variation to the wave using sine waves
        const angle = Math.atan2(dy, dx);
        const angleVariation = Math.sin(angle * 3 + animationOffset * 0.1) * 2;
        const radialVariation = Math.sin(distanceFromCenter * 0.5 + animationOffset * 0.08) * 1.5;
        const organicWaveRadius = waveRadius + angleVariation + radialVariation;

        const distance = Math.abs(distanceFromCenter - organicWaveRadius);

        return {
          ...cell,
          active: distance < 4,
        };
      })
    );
  }, [animationOffset, gridSize, cells.length]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {cells.map((cell, index) => (
        <div
          key={index}
          className="absolute border border-indigo-400 transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: cell.x,
            top: cell.y,
            width: gridSize,
            height: gridSize,
            backgroundColor: cell.active ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
            borderColor: cell.active ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.05)',
            transform: cell.active ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  );
};
