'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  baseX: number;
  baseY: number;
}

export const FloatingOrbs: React.FC = () => {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Create initial orbs
    const colors = [
      'rgba(139, 92, 246, 0.6)', // purple
      'rgba(99, 102, 241, 0.6)', // indigo
      'rgba(236, 72, 153, 0.6)', // pink
      'rgba(168, 85, 247, 0.6)', // violet
    ];

    const newOrbs: Orb[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: 150 + Math.random() * 250,
      color: colors[i % colors.length],
      baseX: Math.random() * rect.width,
      baseY: Math.random() * rect.height,
    }));

    setOrbs(newOrbs);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only update if mouse is within container bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setMousePos({ x, y });

        // Update orb positions based on mouse
        setOrbs((prev) =>
          prev.map((orb) => {
            const dx = x - orb.baseX;
            const dy = y - orb.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 400; // Increased interaction distance

            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 80; // Increased force
              return {
                ...orb,
                x: orb.baseX + (dx / distance) * force,
                y: orb.baseY + (dy / distance) * force,
              };
            }

            // Return to base position slower for smoother motion
            return {
              ...orb,
              x: orb.baseX + (orb.x - orb.baseX) * 0.9,
              y: orb.baseY + (orb.y - orb.baseY) * 0.9,
            };
          })
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full mix-blend-multiply filter blur-3xl transition-all duration-200 ease-out"
          style={{
            left: orb.x - orb.size / 2,
            top: orb.y - orb.size / 2,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
          }}
        />
      ))}
    </div>
  );
};
