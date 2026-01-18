import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  location: string;
  tech: string[];
  highlights: string[];
}

const ExperienceCard = ({ 
  company, 
  role, 
  period, 
  location, 
  tech, 
  highlights
}: ExperienceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative w-full max-w-md p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-experience-accent/50 transition-colors duration-300"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-experience-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        {/* Company & Role */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-experience-accent transition-colors">
            {company}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-experience-accent">
            <Briefcase className="w-4 h-4" />
            <span className="font-medium">{role}</span>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{period}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tech.map((t, i) => (
            <span 
              key={i}
              className="px-2.5 py-1 text-xs font-mono rounded-full bg-experience-accent/10 text-experience-accent border border-experience-accent/20"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="mt-4 space-y-2">
          {highlights.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
            >
              <span className="text-experience-accent flex-shrink-0 leading-relaxed">•</span>
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
