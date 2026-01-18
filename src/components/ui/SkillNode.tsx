import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillNodeProps {
  name: string;
  category: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  x: number;
  y: number;
  delay?: number;
}

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const glowSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const SkillNode = ({ name, color, size = 'md', x, y, delay = 0 }: SkillNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer flex flex-col items-center"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node container */}
      <motion.div
        className="relative"
        animate={{
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer glow */}
        <motion.div
          className={`absolute rounded-full blur-md -translate-x-1/2 -translate-y-1/2 ${glowSizes[size]}`}
          style={{ backgroundColor: color }}
          animate={{
            opacity: isHovered ? 0.9 : 0.4,
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Core star */}
        <motion.div
          className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]}`}
          style={{ backgroundColor: color }}
          animate={{
            boxShadow: isHovered 
              ? `0 0 20px ${color}, 0 0 40px ${color}` 
              : `0 0 10px ${color}`,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Twinkle animation */}
        <motion.div
          className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]}`}
          style={{ backgroundColor: 'white' }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      </motion.div>

      {/* Permanent label below the node */}
      <motion.span
        className="mt-4 text-[10px] font-medium whitespace-nowrap pointer-events-none"
        style={{ color: color }}
        animate={{
          opacity: isHovered ? 1 : 0.7,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

export default SkillNode;
