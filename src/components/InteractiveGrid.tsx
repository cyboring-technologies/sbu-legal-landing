'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GridCell {
  x: number;
  y: number;
  active: boolean;
}

export const InteractiveGrid: React.FC = () => {
  const [cells, setCells] = useState<GridCell[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridSize = 50; // Increased size of each grid cell

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
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Only update if mouse is within the container bounds
      if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        setCells((prev) =>
          prev.map((cell) => {
            const distance = Math.sqrt(
              Math.pow(cell.x + gridSize / 2 - mouseX, 2) +
                Math.pow(cell.y + gridSize / 2 - mouseY, 2)
            );
            return {
              ...cell,
              active: distance < 100,
            };
          })
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
            backgroundColor: cell.active ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
            borderColor: cell.active ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.1)',
            transform: cell.active ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  );
};
