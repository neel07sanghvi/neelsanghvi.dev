import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillNodeProps {
  name: string;
  color: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  x: number;
  y: number;
  delay?: number;
}

const sizeConfig = {
  sm: { dot: 8, ring: 16, glow: 24, fontSize: '9px' },
  md: { dot: 12, ring: 22, glow: 40, fontSize: '10px' },
  lg: { dot: 16, ring: 30, glow: 60, fontSize: '11px' },
  xl: { dot: 22, ring: 40, glow: 100, fontSize: '12px' },
};

const SkillNode = ({ name, color, size = 'md', x, y, delay = 0 }: SkillNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = sizeConfig[size];

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Large ambient glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: config.glow,
            height: config.glow,
            background: `radial-gradient(circle, ${color}40 0%, ${color}20 40%, transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0.6,
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: config.ring,
            height: config.ring,
            border: `2px solid ${color}`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.6,
          }}
          animate={{
            opacity: isHovered ? 0.9 : 0.5,
            boxShadow: isHovered ? `0 0 15px ${color}` : 'none',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Core dot */}
        <div
          className="rounded-full relative z-10"
          style={{
            width: config.dot,
            height: config.dot,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}50`,
          }}
        />

        {/* Label */}
        <span
          className="mt-3 font-medium whitespace-nowrap pointer-events-none text-center"
          style={{
            color: color,
            fontSize: config.fontSize,
            opacity: isHovered ? 1 : 0.8,
            textShadow: isHovered ? `0 0 10px ${color}` : 'none',
          }}
        >
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SkillNode;
