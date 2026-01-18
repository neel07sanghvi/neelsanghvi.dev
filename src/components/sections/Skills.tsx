import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import TextReveal from '@/components/ui/TextReveal';
import SkillNode from '@/components/ui/SkillNode';
import ConstellationLines from '@/components/ui/ConstellationLines';
import SkillLegend from '@/components/ui/SkillLegend';

// Skill data organized in clean rows by category
const skillsData = [
  // Row 1: Languages (top)
  { name: 'JavaScript', category: 'Languages', x: 15, y: 8, size: 'md' as const },
  { name: 'TypeScript', category: 'Languages', x: 28, y: 8, size: 'lg' as const },
  { name: 'C', category: 'Languages', x: 41, y: 8, size: 'sm' as const },
  { name: 'C++', category: 'Languages', x: 52, y: 8, size: 'sm' as const },
  { name: 'Golang', category: 'Languages', x: 64, y: 8, size: 'sm' as const },
  { name: 'Python', category: 'Languages', x: 76, y: 8, size: 'md' as const },
  { name: 'SQL', category: 'Languages', x: 88, y: 8, size: 'sm' as const },

  // Row 2: Frontend (upper-middle)
  { name: 'React', category: 'Frontend', x: 10, y: 28, size: 'lg' as const },
  { name: 'Next.js', category: 'Frontend', x: 22, y: 28, size: 'lg' as const },
  { name: 'React Native', category: 'Frontend', x: 36, y: 28, size: 'md' as const },
  { name: 'Redux', category: 'Frontend', x: 50, y: 28, size: 'md' as const },
  { name: 'Recoil', category: 'Frontend', x: 62, y: 28, size: 'sm' as const },
  { name: 'Zustand', category: 'Frontend', x: 74, y: 28, size: 'sm' as const },
  { name: 'TailwindCSS', category: 'Frontend', x: 86, y: 28, size: 'md' as const },
  { name: 'MUI', category: 'Frontend', x: 10, y: 42, size: 'sm' as const },
  { name: 'Shadcn', category: 'Frontend', x: 22, y: 42, size: 'sm' as const },

  // Row 3: Backend (middle)
  { name: 'Node.js', category: 'Backend', x: 36, y: 42, size: 'lg' as const },
  { name: 'NestJS', category: 'Backend', x: 50, y: 42, size: 'md' as const },
  { name: 'Express', category: 'Backend', x: 64, y: 42, size: 'md' as const },
  { name: 'WebSocket', category: 'Backend', x: 78, y: 42, size: 'sm' as const },
  { name: 'WebRTC', category: 'Backend', x: 90, y: 42, size: 'sm' as const },

  // Row 4: Databases (lower-middle)
  { name: 'MongoDB', category: 'Database', x: 12, y: 58, size: 'md' as const },
  { name: 'PostgreSQL', category: 'Database', x: 26, y: 58, size: 'lg' as const },
  { name: 'Firebase', category: 'Database', x: 42, y: 58, size: 'md' as const },
  { name: 'Prisma ORM', category: 'Database', x: 56, y: 58, size: 'md' as const },
  { name: 'MySQL', category: 'Database', x: 70, y: 58, size: 'sm' as const },
  { name: 'Supabase', category: 'Database', x: 84, y: 58, size: 'md' as const },

  // Row 5: DevOps (lower)
  { name: 'Docker', category: 'DevOps', x: 18, y: 74, size: 'md' as const },
  { name: 'CI/CD', category: 'DevOps', x: 32, y: 74, size: 'sm' as const },
  { name: 'AWS', category: 'DevOps', x: 46, y: 74, size: 'lg' as const },
  { name: 'Cloudflare', category: 'DevOps', x: 60, y: 74, size: 'sm' as const },
  { name: 'Vercel', category: 'DevOps', x: 74, y: 74, size: 'sm' as const },
  { name: 'Netlify', category: 'DevOps', x: 86, y: 74, size: 'sm' as const },

  // Row 6: Tools & Other (bottom)
  { name: 'LLMs', category: 'Tools', x: 14, y: 90, size: 'md' as const },
  { name: 'LangChain', category: 'Tools', x: 28, y: 90, size: 'sm' as const },
  { name: 'Redis', category: 'Tools', x: 42, y: 90, size: 'sm' as const },
  { name: 'Kafka', category: 'Tools', x: 54, y: 90, size: 'sm' as const },
  { name: 'Serverless', category: 'Tools', x: 68, y: 90, size: 'sm' as const },
  { name: 'GraphQL', category: 'Tools', x: 82, y: 90, size: 'sm' as const },
];

// Category colors
const categoryColors: Record<string, string> = {
  Languages: 'hsl(263, 70%, 71%)',    // purple
  Frontend: 'hsl(217, 92%, 69%)',     // blue
  Backend: 'hsl(160, 84%, 52%)',      // green
  Database: 'hsl(330, 71%, 66%)',     // pink
  DevOps: 'hsl(27, 96%, 61%)',        // orange
  Tools: 'hsl(45, 93%, 58%)',         // gold
};

// Generate simple horizontal connections within same row
const generateConnections = () => {
  const connections: { from: { x: number; y: number }; to: { x: number; y: number }; color: string }[] = [];
  
  // Group by Y position (row)
  const rows = [8, 28, 42, 58, 74, 90];
  
  rows.forEach(y => {
    const rowSkills = skillsData.filter(s => s.y === y).sort((a, b) => a.x - b.x);
    
    for (let i = 0; i < rowSkills.length - 1; i++) {
      const current = rowSkills[i];
      const next = rowSkills[i + 1];
      
      // Only connect if same category
      if (current.category === next.category) {
        connections.push({
          from: { x: current.x, y: current.y },
          to: { x: next.x, y: next.y },
          color: categoryColors[current.category],
        });
      }
    }
  });

  return connections;
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const connections = useMemo(() => generateConnections(), []);
  
  const categories = useMemo(() => {
    const cats = [...new Set(skillsData.map(s => s.category))];
    return cats.map(cat => ({
      name: cat,
      color: categoryColors[cat],
      count: skillsData.filter(s => s.category === cat).length,
    }));
  }, []);

  const filteredSkills = activeCategory 
    ? skillsData.filter(s => s.category === activeCategory)
    : skillsData;

  const filteredConnections = activeCategory
    ? connections.filter(c => {
        const skill1 = skillsData.find(s => s.x === c.from.x && s.y === c.from.y);
        const skill2 = skillsData.find(s => s.x === c.to.x && s.y === c.to.y);
        return skill1?.category === activeCategory || skill2?.category === activeCategory;
      })
    : connections;

  return (
    <section 
      id="skills" 
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--skills-bg))' }}
    >
      {/* Static distant stars background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Nebula glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl bg-gradient-radial from-accent-purple/30 via-accent-blue/20 to-transparent" />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <TextReveal>
            <motion.span 
              className="inline-block px-4 py-1.5 text-sm font-mono text-accent-purple border border-accent-purple/30 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              The Constellation
            </motion.span>
          </TextReveal>
          
          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
              Skills & Technologies
            </h2>
          </TextReveal>
          
          <TextReveal delay={0.2}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A universe of tools and technologies I work with
            </p>
          </TextReveal>
        </div>

        {/* Legend */}
        <div className="mb-8">
          <SkillLegend 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryHover={setActiveCategory}
          />
        </div>

        {/* Constellation Container */}
        <motion.div 
          className="relative w-full aspect-[16/10] md:aspect-[2/1] min-h-[400px] md:min-h-[500px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Connection lines */}
          <ConstellationLines connections={filteredConnections} />

          {/* Skill nodes */}
          {filteredSkills.map((skill, index) => (
            <SkillNode
              key={skill.name}
              name={skill.name}
              category={skill.category}
              color={categoryColors[skill.category]}
              size={skill.size}
              x={skill.x}
              y={skill.y}
              delay={index * 0.03}
            />
          ))}
        </motion.div>

        {/* Total skills count */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-sm font-mono text-muted-foreground">
            {skillsData.length} technologies across {categories.length} domains
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
