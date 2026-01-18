import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TimelinePathProps {
  children: React.ReactNode;
}

const TimelinePath = ({ children }: TimelinePathProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline track (background) */}
      <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted/30" />
      
      {/* Animated path (foreground) */}
      <motion.div 
        className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-experience-accent via-experience-accent to-experience-accent/50"
        style={{ height: pathHeight }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 w-1 -translate-x-[1px] bg-experience-accent/50 blur-sm" />
      </motion.div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default TimelinePath;
