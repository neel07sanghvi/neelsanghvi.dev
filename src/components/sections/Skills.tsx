import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import TextReveal from "@/components/ui/TextReveal";
import SkillNode from "@/components/ui/SkillNode";
import ConstellationLines from "@/components/ui/ConstellationLines";
import SkillLegend from "@/components/ui/SkillLegend";

// Skill data with cleaner clustered positions
const skillsData = [
  // Languages cluster (top-center)
  { name: "TypeScript", category: "Languages", x: 48, y: 12, size: "lg" as const },
  { name: "JavaScript", category: "Languages", x: 38, y: 18, size: "md" as const },
  { name: "Python", category: "Languages", x: 58, y: 18, size: "md" as const },
  { name: "C++", category: "Languages", x: 32, y: 10, size: "sm" as const },
  { name: "C", category: "Languages", x: 64, y: 10, size: "sm" as const },
  { name: "Golang", category: "Languages", x: 52, y: 6, size: "sm" as const },
  { name: "SQL", category: "Languages", x: 44, y: 22, size: "sm" as const },

  // Frontend cluster (left side)
  { name: "React", category: "Frontend", x: 10, y: 30, size: "lg" as const },
  { name: "Next.js", category: "Frontend", x: 20, y: 30, size: "lg" as const },
  { name: "React Native", category: "Frontend", x: 12, y: 48, size: "md" as const },
  { name: "Redux", category: "Frontend", x: 24, y: 46, size: "md" as const },
  { name: "Recoil", category: "Frontend", x: 8, y: 56, size: "sm" as const },
  { name: "Zustand", category: "Frontend", x: 18, y: 58, size: "sm" as const },
  { name: "TailwindCSS", category: "Frontend", x: 32, y: 54, size: "md" as const },
  { name: "MUI", category: "Frontend", x: 10, y: 66, size: "sm" as const },
  { name: "Shadcn", category: "Frontend", x: 22, y: 68, size: "sm" as const },

  // Backend cluster (right side - moved up)
  { name: "Node.js", category: "Backend", x: 78, y: 28, size: "lg" as const },
  { name: "NestJS", category: "Backend", x: 86, y: 36, size: "md" as const },
  { name: "Express", category: "Backend", x: 72, y: 40, size: "md" as const },
  { name: "WebSocket", category: "Backend", x: 90, y: 44, size: "sm" as const },
  { name: "WebRTC", category: "Backend", x: 82, y: 48, size: "sm" as const },
  { name: "GraphQL", category: "Backend", x: 76, y: 54, size: "sm" as const },
  { name: "Kafka", category: "Backend", x: 88, y: 56, size: "sm" as const },
  { name: "LLMs", category: "Backend", x: 80, y: 60, size: "md" as const },
  { name: "LangChain", category: "Backend", x: 72, y: 64, size: "sm" as const },

  // Database cluster (center-bottom)
  { name: "PostgreSQL", category: "Database", x: 48, y: 50, size: "lg" as const },
  { name: "MongoDB", category: "Database", x: 56, y: 46, size: "md" as const },
  { name: "Firebase", category: "Database", x: 40, y: 60, size: "md" as const },
  { name: "Prisma ORM", category: "Database", x: 58, y: 58, size: "sm" as const },
  { name: "MySQL", category: "Database", x: 44, y: 68, size: "sm" as const },
  { name: "Supabase", category: "Database", x: 54, y: 66, size: "md" as const },
  { name: "Redis", category: "Database", x: 62, y: 64, size: "sm" as const },

  // DevOps cluster (bottom-right)
  { name: "AWS", category: "DevOps", x: 76, y: 82, size: "lg" as const },
  { name: "Docker", category: "DevOps", x: 68, y: 88, size: "md" as const },
  { name: "CI/CD", category: "DevOps", x: 84, y: 90, size: "sm" as const },
  { name: "Cloudflare", category: "DevOps", x: 72, y: 94, size: "sm" as const },
  { name: "Vercel", category: "DevOps", x: 88, y: 78, size: "sm" as const },
  { name: "Netlify", category: "DevOps", x: 80, y: 96, size: "sm" as const },
  { name: "Serverless", category: "DevOps", x: 90, y: 86, size: "sm" as const },
];

// Category colors
const categoryColors: Record<string, string> = {
  Languages: "hsl(263, 70%, 71%)", // purple
  Frontend: "hsl(217, 92%, 69%)", // blue
  Backend: "hsl(160, 84%, 52%)", // green
  Database: "hsl(330, 71%, 66%)", // pink
  DevOps: "hsl(27, 96%, 61%)", // orange
};

// Define explicit connections for each cluster (matching the reference design)
const explicitConnections = [
  // Languages cluster - star pattern from TypeScript
  { from: "TypeScript", to: "JavaScript" },
  { from: "TypeScript", to: "Python" },
  { from: "TypeScript", to: "Golang" },
  { from: "JavaScript", to: "C++" },
  { from: "JavaScript", to: "SQL" },
  { from: "Python", to: "C" },
  { from: "C++", to: "C" },

  // Frontend cluster - branching from React/Next.js
  { from: "React", to: "Next.js" },
  { from: "React", to: "React Native" },
  { from: "React", to: "Redux" },
  { from: "React Native", to: "Recoil" },
  { from: "Redux", to: "Zustand" },
  { from: "Next.js", to: "TailwindCSS" },
  { from: "Recoil", to: "MUI" },
  { from: "Zustand", to: "Shadcn" },
  { from: "TailwindCSS", to: "Shadcn" },

  // Backend cluster - branching from Node.js
  { from: "Node.js", to: "NestJS" },
  { from: "Node.js", to: "Express" },
  { from: "NestJS", to: "WebSocket" },
  { from: "Express", to: "WebRTC" },
  { from: "WebSocket", to: "WebRTC" },
  { from: "Express", to: "GraphQL" },
  { from: "NestJS", to: "Kafka" },
  { from: "GraphQL", to: "LLMs" },
  { from: "LLMs", to: "LangChain" },
  { from: "Kafka", to: "LLMs" },

  // Database cluster - branching from PostgreSQL
  { from: "PostgreSQL", to: "MongoDB" },
  { from: "PostgreSQL", to: "Firebase" },
  { from: "MongoDB", to: "Prisma ORM" },
  { from: "Firebase", to: "MySQL" },
  { from: "Prisma ORM", to: "Supabase" },
  { from: "MySQL", to: "Supabase" },
  { from: "Prisma ORM", to: "Redis" },
  { from: "Supabase", to: "Redis" },

  // DevOps cluster - branching from AWS
  { from: "AWS", to: "Docker" },
  { from: "AWS", to: "Vercel" },
  { from: "AWS", to: "CI/CD" },
  { from: "Docker", to: "Cloudflare" },
  { from: "CI/CD", to: "Netlify" },
  { from: "Cloudflare", to: "Netlify" },
  { from: "Vercel", to: "Serverless" },
  { from: "CI/CD", to: "Serverless" },
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
