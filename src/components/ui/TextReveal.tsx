import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const TextReveal = ({ children, className = '', delay = 0 }: TextRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TextReveal;
