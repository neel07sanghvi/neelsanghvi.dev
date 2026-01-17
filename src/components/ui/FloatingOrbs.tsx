import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingOrbsProps {
  count?: number;
}

const FloatingOrbs = ({ count = 8 }: FloatingOrbsProps) => {
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 300 + 100, // 100-400px
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15, // 15-35s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle at 30% 30%, hsl(var(--accent-blue) / ${orb.opacity}), transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
