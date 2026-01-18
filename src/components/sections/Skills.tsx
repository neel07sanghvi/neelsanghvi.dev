import { motion } from 'framer-motion';
import TextReveal from '@/components/ui/TextReveal';
import SkillNode from '@/components/ui/SkillNode';

// Scattered skill positions across the space
const skillsData = [
  // Languages (purple) - upper area
  { name: 'TypeScript', category: 'Language', x: 42, y: 14, size: 'lg' as const },
  { name: 'Python', category: 'Language', x: 48, y: 8, size: 'md' as const },
  { name: 'C++', category: 'Language', x: 58, y: 12, size: 'sm' as const },
  { name: 'JavaScript', category: 'Language', x: 50, y: 24, size: 'md' as const },
  { name: 'Golang', category: 'Language', x: 35, y: 10, size: 'sm' as const },
  { name: 'SQL', category: 'Language', x: 62, y: 6, size: 'sm' as const },
  { name: 'C', category: 'Language', x: 28, y: 8, size: 'sm' as const },

  // Frontend (blue) - left side
  { name: 'React', category: 'Frontend', x: 14, y: 32, size: 'lg' as const },
  { name: 'Next.js', category: 'Frontend', x: 22, y: 20, size: 'lg' as const },
  { name: 'React Native', category: 'Frontend', x: 8, y: 58, size: 'md' as const },
  { name: 'Redux', category: 'Frontend', x: 6, y: 44, size: 'sm' as const },
  { name: 'Tailwind', category: 'Frontend', x: 26, y: 38, size: 'md' as const },
  { name: 'Zustand', category: 'Frontend', x: 16, y: 52, size: 'sm' as const },
  { name: 'Recoil', category: 'Frontend', x: 10, y: 68, size: 'sm' as const },
  { name: 'MUI', category: 'Frontend', x: 20, y: 62, size: 'sm' as const },
  { name: 'Shadcn', category: 'Frontend', x: 28, y: 50, size: 'sm' as const },

  // Backend (green) - right side
  { name: 'Node.js', category: 'Backend', x: 72, y: 32, size: 'lg' as const },
  { name: 'NestJS', category: 'Backend', x: 82, y: 18, size: 'md' as const },
  { name: 'Express', category: 'Backend', x: 88, y: 38, size: 'md' as const },
  { name: 'WebSocket', category: 'Backend', x: 70, y: 44, size: 'sm' as const },
  { name: 'WebRTC', category: 'Backend', x: 78, y: 50, size: 'sm' as const },

  // AI (gold/yellow) - center
  { name: 'LLMs', category: 'AI', x: 48, y: 48, size: 'xl' as const },
  { name: 'LangChain', category: 'AI', x: 38, y: 56, size: 'sm' as const },
  { name: 'Kafka', category: 'Other', x: 55, y: 62, size: 'sm' as const },

  // Database (pink) - right-bottom
  { name: 'PostgreSQL', category: 'Database', x: 72, y: 62, size: 'lg' as const },
  { name: 'MongoDB', category: 'Database', x: 86, y: 54, size: 'md' as const },
  { name: 'Redis', category: 'Database', x: 64, y: 72, size: 'sm' as const },
  { name: 'Prisma', category: 'Database', x: 78, y: 70, size: 'sm' as const },
  { name: 'Firebase', category: 'Database', x: 56, y: 78, size: 'sm' as const },
  { name: 'MySQL', category: 'Database', x: 68, y: 82, size: 'sm' as const },
  { name: 'Supabase', category: 'Database', x: 82, y: 78, size: 'sm' as const },

  // DevOps (orange) - bottom-left
  { name: 'Docker', category: 'DevOps', x: 32, y: 72, size: 'md' as const },
  { name: 'AWS', category: 'DevOps', x: 22, y: 82, size: 'lg' as const },
  { name: 'CI/CD', category: 'DevOps', x: 42, y: 84, size: 'sm' as const },
  { name: 'Cloudflare', category: 'DevOps', x: 28, y: 90, size: 'sm' as const },
  { name: 'Vercel', category: 'DevOps', x: 52, y: 88, size: 'sm' as const },
  { name: 'Netlify', category: 'DevOps', x: 38, y: 92, size: 'sm' as const },

  // Other
  { name: 'GraphQL', category: 'Other', x: 44, y: 68, size: 'sm' as const },
  { name: 'Serverless', category: 'Other', x: 18, y: 76, size: 'sm' as const },
];

// Category colors
const categoryColors: Record<string, string> = {
  Language: 'hsl(263, 70%, 71%)',     // purple
  Frontend: 'hsl(210, 100%, 66%)',    // bright blue
  Backend: 'hsl(152, 76%, 52%)',      // green
  Database: 'hsl(330, 71%, 66%)',     // pink
  DevOps: 'hsl(27, 96%, 61%)',        // orange
  AI: 'hsl(45, 93%, 58%)',            // gold
  Other: 'hsl(220, 15%, 60%)',        // gray
};

const legendItems = [
  { name: 'Frontend', color: categoryColors.Frontend },
  { name: 'Backend', color: categoryColors.Backend },
  { name: 'Database', color: categoryColors.Database },
  { name: 'DevOps', color: categoryColors.DevOps },
  { name: 'Language', color: categoryColors.Language },
  { name: 'AI', color: categoryColors.AI },
  { name: 'Other', color: categoryColors.Other },
];

// Generate random but consistent star positions
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: (i * 7.3) % 100,
      y: (i * 11.7) % 100,
      size: (i % 3) + 1,
      opacity: 0.2 + (i % 5) * 0.1,
    });
  }
  return stars;
};

const backgroundStars = generateStars(80);

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--skills-bg))' }}
    >
      {/* Background stars */}
      <div className="absolute inset-0">
        {backgroundStars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Nebula glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl bg-accent-blue" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl bg-accent-purple" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl bg-yellow-500" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
              Skills Constellation
            </h2>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="mt-4 text-lg text-muted-foreground">
              Hover over stars to explore connections
            </p>
          </TextReveal>
        </div>

        {/* Constellation Container */}
        <motion.div
          className="relative w-full aspect-[16/12] md:aspect-[16/10] min-h-[500px] md:min-h-[600px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Skill nodes */}
          {skillsData.map((skill, index) => (
            <SkillNode
              key={skill.name}
              name={skill.name}
              color={categoryColors[skill.category]}
              size={skill.size}
              x={skill.x}
              y={skill.y}
              delay={index * 0.02}
            />
          ))}
        </motion.div>

        {/* Legend at bottom */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {legendItems.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
