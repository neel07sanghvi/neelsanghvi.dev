import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import TextReveal from "@/components/ui/TextReveal";
import SkillNode from "@/components/ui/SkillNode";
import ConstellationLines from "@/components/ui/ConstellationLines";
import SkillLegend from "@/components/ui/SkillLegend";

// Skill data with cleaner clustered positions
const skillsData = [
  // Languages cluster (top-left)
  { name: "JavaScript", category: "Languages", x: 12, y: 8, size: "lg" as const },
  { name: "TypeScript", category: "Languages", x: 22, y: 6, size: "md" as const },
  { name: "C", category: "Languages", x: 30, y: 10, size: "sm" as const },
  { name: "C++", category: "Languages", x: 36, y: 6, size: "sm" as const },
  { name: "Java", category: "Languages", x: 8, y: 16, size: "sm" as const },
  { name: "Python", category: "Languages", x: 18, y: 18, size: "md" as const },
  { name: "SQL", category: "Languages", x: 28, y: 18, size: "sm" as const },

  // Frontend cluster (top-center)
  { name: "ReactJs", category: "Frontend", x: 48, y: 6, size: "lg" as const },
  { name: "NextJs", category: "Frontend", x: 56, y: 10, size: "md" as const },
  { name: "React Native", category: "Frontend", x: 64, y: 6, size: "md" as const },
  { name: "Redux", category: "Frontend", x: 46, y: 16, size: "sm" as const },
  { name: "Recoil", category: "Frontend", x: 54, y: 18, size: "sm" as const },
  { name: "Zustand", category: "Frontend", x: 62, y: 16, size: "sm" as const },
  { name: "TailwindCSS", category: "Frontend", x: 70, y: 18, size: "sm" as const },
  { name: "MUI", category: "Frontend", x: 50, y: 24, size: "sm" as const },

  // Backend cluster (top-right)
  { name: "NodeJs", category: "Backend", x: 82, y: 6, size: "lg" as const },
  { name: "NestJs", category: "Backend", x: 88, y: 12, size: "md" as const },
  { name: "ExpressJs", category: "Backend", x: 94, y: 6, size: "md" as const },
  { name: "WebSocket", category: "Backend", x: 86, y: 20, size: "sm" as const },

  // Databases cluster (bottom-left)
  { name: "MongoDB", category: "Database", x: 10, y: 50, size: "lg" as const },
  { name: "PostgreSQL", category: "Database", x: 20, y: 46, size: "md" as const },
  { name: "Firebase", category: "Database", x: 28, y: 52, size: "md" as const },
  { name: "Prisma ORM", category: "Database", x: 8, y: 60, size: "sm" as const },
  { name: "MySQL", category: "Database", x: 18, y: 58, size: "sm" as const },

  // DevOps cluster (bottom-center)
  { name: "Docker", category: "DevOps", x: 44, y: 48, size: "lg" as const },
  { name: "CI/CD", category: "DevOps", x: 54, y: 44, size: "md" as const },
  { name: "AWS", category: "DevOps", x: 64, y: 48, size: "md" as const },
  { name: "Cloudflare Workers", category: "DevOps", x: 52, y: 56, size: "sm" as const },

  // Other Tools & Technologies cluster (bottom-right)
  { name: "LLMs", category: "Other", x: 78, y: 44, size: "lg" as const },
  { name: "Redis", category: "Other", x: 86, y: 48, size: "md" as const },
  { name: "Kafka", category: "Other", x: 94, y: 44, size: "sm" as const },
  { name: "Serverless", category: "Other", x: 76, y: 54, size: "sm" as const },
  { name: "WebRTC", category: "Other", x: 84, y: 58, size: "sm" as const },
  { name: "Supabase", category: "Other", x: 92, y: 56, size: "sm" as const },
];

// Category colors
const categoryColors: Record<string, string> = {
  Languages: "hsl(263, 70%, 71%)", // purple
  Frontend: "hsl(217, 92%, 69%)", // blue
  Backend: "hsl(160, 84%, 52%)", // green
  Database: "hsl(330, 71%, 66%)", // pink
  DevOps: "hsl(27, 96%, 61%)", // orange
  Other: "hsl(47, 96%, 61%)", // yellow/gold
};

// Define explicit connections for each cluster
const explicitConnections = [
  // Languages cluster - branching from JavaScript
  { from: "JavaScript", to: "TypeScript" },
  { from: "TypeScript", to: "C" },
  { from: "C", to: "C++" },
  { from: "JavaScript", to: "Java" },
  { from: "JavaScript", to: "Python" },
  { from: "Python", to: "SQL" },

  // Frontend cluster - branching from ReactJs
  { from: "ReactJs", to: "NextJs" },
  { from: "ReactJs", to: "React Native" },
  { from: "ReactJs", to: "Redux" },
  { from: "NextJs", to: "Recoil" },
  { from: "React Native", to: "Zustand" },
  { from: "Zustand", to: "TailwindCSS" },
  { from: "Redux", to: "MUI" },

  // Backend cluster - branching from NodeJs
  { from: "NodeJs", to: "NestJs" },
  { from: "NodeJs", to: "ExpressJs" },
  { from: "NestJs", to: "WebSocket" },

  // Database cluster - branching from MongoDB
  { from: "MongoDB", to: "PostgreSQL" },
  { from: "PostgreSQL", to: "Firebase" },
  { from: "MongoDB", to: "Prisma ORM" },
  { from: "Prisma ORM", to: "MySQL" },

  // DevOps cluster - branching from Docker
  { from: "Docker", to: "CI/CD" },
  { from: "CI/CD", to: "AWS" },
  { from: "Docker", to: "Cloudflare Workers" },

  // Other Tools cluster - branching from LLMs
  { from: "LLMs", to: "Redis" },
  { from: "Redis", to: "Kafka" },
  { from: "LLMs", to: "Serverless" },
  { from: "Serverless", to: "WebRTC" },
  { from: "Redis", to: "Supabase" },
];

// Generate connections from explicit definitions
const generateConnections = () => {
  const connections: { from: { x: number; y: number }; to: { x: number; y: number }; color: string }[] = [];

  explicitConnections.forEach((conn) => {
    const fromSkill = skillsData.find((s) => s.name === conn.from);
    const toSkill = skillsData.find((s) => s.name === conn.to);

    if (fromSkill && toSkill) {
      connections.push({
        from: { x: fromSkill.x, y: fromSkill.y },
        to: { x: toSkill.x, y: toSkill.y },
        color: categoryColors[fromSkill.category],
      });
    }
  });

  return connections;
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const connections = useMemo(() => generateConnections(), []);

  const categories = useMemo(() => {
    const cats = [...new Set(skillsData.map((s) => s.category))];
    return cats.map((cat) => ({
      name: cat,
      color: categoryColors[cat],
      count: skillsData.filter((s) => s.category === cat).length,
    }));
  }, []);

  const filteredSkills = activeCategory ? skillsData.filter((s) => s.category === activeCategory) : skillsData;

  const filteredConnections = activeCategory
    ? connections.filter((c) => {
        const skill1 = skillsData.find((s) => s.x === c.from.x && s.y === c.from.y);
        const skill2 = skillsData.find((s) => s.x === c.to.x && s.y === c.to.y);
        return skill1?.category === activeCategory || skill2?.category === activeCategory;
      })
    : connections;

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "hsl(var(--skills-bg))" }}
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
          <SkillLegend categories={categories} activeCategory={activeCategory} onCategoryHover={setActiveCategory} />
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
