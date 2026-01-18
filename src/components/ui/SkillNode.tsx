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

const SkillNode = ({ name, category, color, size = 'md', x, y, delay = 0 }: SkillNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow */}
      <motion.div
        className={`absolute rounded-full blur-md -translate-x-1/2 -translate-y-1/2 ${glowSizes[size]}`}
        style={{ backgroundColor: color }}
        animate={{
          opacity: isHovered ? 0.8 : 0.3,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Core star */}
      <motion.div
        className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]}`}
        style={{ backgroundColor: color }}
        animate={{
          scale: isHovered ? 1.3 : 1,
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

      {/* Tooltip */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 pointer-events-none whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm border"
          style={{ 
            backgroundColor: `${color}20`,
            borderColor: `${color}50`,
            color: color,
          }}
        >
          {name}
          <span className="block text-[10px] opacity-70 mt-0.5">{category}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillNode;
