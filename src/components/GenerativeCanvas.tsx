import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
}

const GenerativeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const cols = Math.floor(canvas.width / 50);
      const rows = Math.floor(canvas.height / 50);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * 50 + 25;
          const y = j * 50 + 25;
          particlesRef.current.push({
            x,
            y,
            originalX: x,
            originalY: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 1,
            color: `hsla(${260 + Math.random() * 60}, 70%, 60%, ${0.3 + Math.random() * 0.4})`,
          });
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 2;
          p.vy -= Math.sin(angle) * force * 2;
        }

        // Return to original position
        p.vx += (p.originalX - p.x) * 0.02;
        p.vy += (p.originalY - p.y) * 0.02;

        // Friction
        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 112, 219, ${0.15 * (1 - d / 60)})`;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)' }}
    />
  );
};

export default GenerativeCanvas;
