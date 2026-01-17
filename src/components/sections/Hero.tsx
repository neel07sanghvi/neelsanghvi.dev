import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from '@/components/ui/FloatingParticles';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isTaglineVisible, setIsTaglineVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Staggered reveal animation
  useEffect(() => {
    const timer1 = setTimeout(() => setIsNameVisible(true), 300);
    const timer2 = setTimeout(() => setIsSubtitleVisible(true), 1000);
    const timer3 = setTimeout(() => setIsTaglineVisible(true), 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero">
      {/* Floating particles background */}
      <FloatingParticles count={60} mousePosition={mousePosition} />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-hero/80 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--accent-blue) / 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Name with typewriter effect */}
        <div className="overflow-hidden mb-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isNameVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base font-medium uppercase tracking-[0.3em] text-muted-foreground mb-6"
          >
            Full Stack Developer
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={isNameVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-foreground mb-6"
          >
            <span className="relative inline-block">
              Neel Sanghvi
              {/* Subtle glow on hover */}
              <motion.span
                className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight blur-2xl opacity-0 text-accent-blue"
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              >
                Neel Sanghvi
              </motion.span>
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isSubtitleVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8"
        >
          Building modern web experiences with clean code and creativity
        </motion.p>

        {/* Tagline / CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isTaglineVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full border border-border/50 text-foreground font-medium text-sm 
                         transition-all duration-300 hover:border-accent-blue/50 hover:bg-accent-blue/5"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full bg-accent-blue text-primary-foreground font-medium text-sm 
                         transition-all duration-300 hover:bg-accent-blue/90"
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ opacity: [1, 0], y: [0, 8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-muted-foreground/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
