'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GridCell {
  x: number;
  y: number;
  active: boolean;
}

// Prices Page - Animated grid with organic wave pattern
export const InteractiveGridAnimated: React.FC = () => {
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

  // Animated wave with organic, non-uniform shape
  useEffect(() => {
    if (cells.length === 0) return;

    const interval = setInterval(() => {
      setAnimationOffset((prev) => (prev + 1) % 300);
    }, 30);

    return () => clearInterval(interval);
  }, [cells.length]);

  useEffect(() => {
    if (cells.length === 0) return;

    setCells((prev) =>
      prev.map((cell) => {
        const diagonalPosition = (cell.x + cell.y) / gridSize;
        const wavePosition = animationOffset / 1.5;

        // Add organic variation to the wave using sine waves
        const xVariation = Math.sin((cell.x / gridSize) * 0.3 + animationOffset * 0.1) * 3;
        const yVariation = Math.sin((cell.y / gridSize) * 0.4 + animationOffset * 0.08) * 2;
        const organicWavePosition = wavePosition + xVariation + yVariation;

        const distance = Math.abs(diagonalPosition - organicWavePosition);

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
