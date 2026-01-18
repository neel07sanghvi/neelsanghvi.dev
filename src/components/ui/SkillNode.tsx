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
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node container - centered at the coordinate */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer glow */}
        <motion.div
          className={`absolute rounded-full blur-md ${glowSizes[size]}`}
          style={{ 
            backgroundColor: color,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            opacity: isHovered ? 0.9 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Core star */}
        <div
          className={`rounded-full ${sizeClasses[size]}`}
          style={{ 
            backgroundColor: color,
            boxShadow: isHovered 
              ? `0 0 20px ${color}, 0 0 40px ${color}` 
              : `0 0 10px ${color}`,
          }}
        />

        {/* Permanent label below the node */}
        <span
          className="mt-2 text-[10px] font-medium whitespace-nowrap pointer-events-none"
          style={{ 
            color: color,
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SkillNode;
