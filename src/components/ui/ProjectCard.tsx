import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative"
    >
      {/* Main card */}
      <div className="relative h-full bg-card/80 backdrop-blur-sm border border-border/50 group-hover:border-border rounded-2xl p-6 md:p-8 overflow-hidden transition-colors duration-300">
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with title and links */}
          <div className="flex items-start justify-between mb-4">
            <h3 
              className="text-xl md:text-2xl font-heading font-bold text-foreground group-hover:text-accent-purple transition-colors duration-300"
              style={{ transform: "translateZ(30px)" }}
            >
              {project.title}
            </h3>
            
            <div className="flex gap-3" style={{ transform: "translateZ(40px)" }}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-accent-purple/20 border border-border/50 hover:border-accent-purple/50 transition-all duration-300 hover:scale-110"
                aria-label="View source code"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-accent-blue/20 border border-border/50 hover:border-accent-blue/50 transition-all duration-300 hover:scale-110"
                  aria-label="View live demo"
                >
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              )}
            </div>
          </div>
          
          {/* Tech stack tags */}
          <div 
            className="flex flex-wrap gap-2 mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-accent-purple/10 text-accent-purple border border-accent-purple/30 rounded-full hover:bg-accent-purple/20 hover:border-accent-purple/50 transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--accent-purple)/0.3)]"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Description */}
          <p 
            className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 flex-grow"
            style={{ transform: "translateZ(15px)" }}
          >
            {project.description}
          </p>
          
          {/* Highlights */}
          <ul 
            className="space-y-2"
            style={{ transform: "translateZ(10px)" }}
          >
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-amber shrink-0" />
                <span className="group-hover:text-foreground/80 transition-colors duration-300">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
