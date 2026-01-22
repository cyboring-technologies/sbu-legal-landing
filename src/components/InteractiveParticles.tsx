'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export const InteractiveParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only create particles if mouse is within container bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setMousePos({ x, y });

        // Create new particle
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x,
          y,
          opacity: 1,
          scale: 1,
        };

        setParticles((prev) => [...prev, newParticle]);

        // Remove particle after animation
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 1500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Cursor glow effect */}
      <div
        className="absolute w-96 h-96 rounded-full bg-purple-400 opacity-40 blur-3xl transition-all duration-200 ease-out pointer-events-none"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Particle trail */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-4 h-4 rounded-full bg-white animate-particle-fade pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(147, 51, 234, 0.6)',
          }}
        />
      ))}

      <style jsx>{`
        @keyframes particle-fade {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), 40px) scale(0.2) rotate(180deg);
          }
        }

        .animate-particle-fade {
          animation: particle-fade 1.2s ease-out forwards;
          --tx: calc(var(--random) * 30px - 15px);
        }

        .animate-particle-fade:nth-child(2n) {
          --tx: 20px;
        }

        .animate-particle-fade:nth-child(2n + 1) {
          --tx: -20px;
        }
      `}</style>
    </div>
  );
};
