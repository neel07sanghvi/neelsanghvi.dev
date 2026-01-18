import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  location: string;
  tech: string[];
  highlights: string[];
  align?: 'left' | 'right';
}

const ExperienceCard = ({ 
  company, 
  role, 
  period, 
  location, 
  tech, 
  highlights,
  align = 'left'
}: ExperienceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-experience-accent/50 transition-colors duration-300 ${align === 'right' ? 'md:text-right' : ''}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-experience-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        {/* Company & Role */}
        <div className={`flex flex-col ${align === 'right' ? 'md:items-end' : 'items-start'}`}>
          <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-experience-accent transition-colors">
            {company}
          </h3>
          <div className={`flex items-center gap-2 mt-1 text-experience-accent ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <Briefcase className="w-4 h-4" />
            <span className="font-medium">{role}</span>
          </div>
        </div>

        {/* Meta info */}
        <div className={`flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground ${align === 'right' ? 'md:justify-end' : ''}`}>
          <div className={`flex items-center gap-1.5 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>{period}</span>
          </div>
          <div className={`flex items-center gap-1.5 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <MapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
        </div>

        {/* Tech stack */}
        <div className={`flex flex-wrap gap-2 mt-4 ${align === 'right' ? 'md:justify-end' : ''}`}>
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
        <ul className={`mt-4 space-y-2 ${align === 'right' ? 'md:text-right' : ''}`}>
          {highlights.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`text-sm text-muted-foreground leading-relaxed flex items-start gap-2 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
            >
              <span className="text-experience-accent mt-1.5 flex-shrink-0">•</span>
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
