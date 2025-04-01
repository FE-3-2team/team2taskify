import { useEffect, useRef } from 'react';

export default function TrailParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999]" />;
}
