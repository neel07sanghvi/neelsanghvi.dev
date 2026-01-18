import { motion } from 'framer-motion';

interface TimelineNodeProps {
  isActive?: boolean;
  children: React.ReactNode;
  index: number;
}

const TimelineNode = ({ children, index }: TimelineNodeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }}
      className="relative grid grid-cols-[32px_1fr] md:grid-cols-[1fr_64px_1fr] gap-4 md:gap-8 pb-16 last:pb-0"
    >
      {/* Left content (desktop) */}
      <div className={`hidden md:block ${index % 2 === 0 ? '' : 'order-3'}`}>
        {index % 2 === 0 && children}
      </div>

      {/* Node */}
      <div className="relative flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.4, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3
          }}
          className="relative z-10"
        >
          {/* Outer glow ring */}
          <motion.div 
            className="absolute inset-0 w-4 h-4 rounded-full bg-experience-accent/30 blur-md"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Main node */}
          <div className="w-4 h-4 rounded-full bg-experience-accent border-4 border-experience shadow-lg shadow-experience-accent/50" />
        </motion.div>
      </div>

      {/* Right content (desktop) / Main content (mobile) */}
      <div className={`${index % 2 === 0 ? 'md:order-3' : ''}`}>
        {index % 2 !== 0 ? children : <div className="hidden md:block">{children}</div>}
        <div className="md:hidden">{children}</div>
      </div>
    </motion.div>
  );
};

export default TimelineNode;
