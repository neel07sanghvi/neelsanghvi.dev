import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import TextReveal from '@/components/ui/TextReveal';
import SkillNode from '@/components/ui/SkillNode';
import ConstellationLines from '@/components/ui/ConstellationLines';
import SkillLegend from '@/components/ui/SkillLegend';

// Skill data with positions for constellation layout
const skillsData = [
  // Frontend cluster (left-center area)
  { name: 'React', category: 'Frontend', x: 20, y: 35, size: 'lg' as const },
  { name: 'Next.js', category: 'Frontend', x: 28, y: 28, size: 'lg' as const },
  { name: 'React Native', category: 'Frontend', x: 15, y: 45, size: 'md' as const },
  { name: 'Redux', category: 'Frontend', x: 25, y: 50, size: 'md' as const },
  { name: 'Zustand', category: 'Frontend', x: 12, y: 55, size: 'sm' as const },
  { name: 'Tailwind', category: 'Frontend', x: 32, y: 42, size: 'md' as const },
  { name: 'MUI', category: 'Frontend', x: 18, y: 62, size: 'sm' as const },

  // Backend cluster (right-center area)
  { name: 'Node.js', category: 'Backend', x: 72, y: 30, size: 'lg' as const },
  { name: 'NestJS', category: 'Backend', x: 80, y: 38, size: 'md' as const },
  { name: 'Express', category: 'Backend', x: 68, y: 42, size: 'md' as const },
  { name: 'WebSocket', category: 'Backend', x: 85, y: 28, size: 'sm' as const },

  // Database cluster (bottom-center area)
  { name: 'PostgreSQL', category: 'Database', x: 45, y: 70, size: 'lg' as const },
  { name: 'MongoDB', category: 'Database', x: 55, y: 75, size: 'md' as const },
  { name: 'Prisma', category: 'Database', x: 38, y: 78, size: 'md' as const },
  { name: 'Redis', category: 'Database', x: 62, y: 68, size: 'sm' as const },
  { name: 'Firebase', category: 'Database', x: 50, y: 82, size: 'sm' as const },

  // Languages cluster (top-center area)
  { name: 'TypeScript', category: 'Languages', x: 50, y: 20, size: 'lg' as const },
  { name: 'JavaScript', category: 'Languages', x: 42, y: 28, size: 'md' as const },
  { name: 'Python', category: 'Languages', x: 58, y: 25, size: 'md' as const },
  { name: 'C++', category: 'Languages', x: 48, y: 12, size: 'sm' as const },
  { name: 'Java', category: 'Languages', x: 55, y: 15, size: 'sm' as const },

  // DevOps cluster (right area)
  { name: 'Docker', category: 'DevOps', x: 82, y: 55, size: 'md' as const },
  { name: 'AWS', category: 'DevOps', x: 88, y: 48, size: 'lg' as const },
  { name: 'CI/CD', category: 'DevOps', x: 78, y: 62, size: 'sm' as const },
  { name: 'Cloudflare', category: 'DevOps', x: 85, y: 68, size: 'sm' as const },

  // AI/Other cluster (left-bottom area)
  { name: 'LLMs', category: 'AI/ML', x: 25, y: 75, size: 'lg' as const },
  { name: 'Kafka', category: 'AI/ML', x: 15, y: 70, size: 'sm' as const },
  { name: 'WebRTC', category: 'AI/ML', x: 30, y: 82, size: 'sm' as const },
  { name: 'Serverless', category: 'AI/ML', x: 18, y: 82, size: 'sm' as const },
];

// Category colors
const categoryColors: Record<string, string> = {
  Frontend: 'hsl(217, 92%, 69%)',     // blue
  Backend: 'hsl(160, 84%, 52%)',      // green
  Database: 'hsl(330, 71%, 66%)',     // pink
  Languages: 'hsl(263, 70%, 71%)',    // purple
  DevOps: 'hsl(27, 96%, 61%)',        // orange
  'AI/ML': 'hsl(45, 93%, 58%)',       // gold
};

// Generate connections between related skills
const generateConnections = () => {
  const connections: { from: { x: number; y: number }; to: { x: number; y: number }; color: string }[] = [];
  
  // Connect within same category (nearby skills)
  const categories = [...new Set(skillsData.map(s => s.category))];
  
  categories.forEach(category => {
    const categorySkills = skillsData.filter(s => s.category === category);
    const color = categoryColors[category];
    
    for (let i = 0; i < categorySkills.length - 1; i++) {
      connections.push({
        from: { x: categorySkills[i].x, y: categorySkills[i].y },
        to: { x: categorySkills[i + 1].x, y: categorySkills[i + 1].y },
        color,
      });
    }
  });

  // Add some cross-category connections for "full-stack" feel
  // TypeScript to React
  connections.push({
    from: { x: 50, y: 20 },
    to: { x: 20, y: 35 },
    color: 'hsl(263, 70%, 71%)',
  });
  // TypeScript to Node.js
  connections.push({
    from: { x: 50, y: 20 },
    to: { x: 72, y: 30 },
    color: 'hsl(263, 70%, 71%)',
  });
  // Node.js to PostgreSQL
  connections.push({
    from: { x: 72, y: 30 },
    to: { x: 45, y: 70 },
    color: 'hsl(160, 84%, 52%)',
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
      {/* Distant stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
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
