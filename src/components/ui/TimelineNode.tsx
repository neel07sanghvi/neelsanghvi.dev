import { motion } from 'framer-motion';

interface TimelineNodeProps {
  children: React.ReactNode;
  index: number;
}

const TimelineNode = ({ children, index }: TimelineNodeProps) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }}
      className="relative pb-16 last:pb-0"
    >
      {/* Mobile layout - single column */}
      <div className="md:hidden grid grid-cols-[32px_1fr] gap-4">
        {/* Node */}
        <div className="relative flex justify-center">
          <TimelineNodeDot />
        </div>
        {/* Content */}
        <div>{children}</div>
      </div>

      {/* Desktop layout - alternating sides */}
      <div className="hidden md:grid md:grid-cols-[1fr_64px_1fr] gap-8">
        {/* Left side */}
        <div className="flex justify-end">
          {isLeft && children}
        </div>
        
        {/* Center node */}
        <div className="relative flex justify-center">
          <TimelineNodeDot />
        </div>
        
        {/* Right side */}
        <div className="flex justify-start">
          {!isLeft && children}
        </div>
      </div>
    </motion.div>
  );
};

const TimelineNodeDot = () => (
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
);

export default TimelineNode;
