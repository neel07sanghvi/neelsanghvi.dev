import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import TextReveal from "@/components/ui/TextReveal";
import SkillNode from "@/components/ui/SkillNode";
import SkillLegend from "@/components/ui/SkillLegend";

// Each skill defines its own connections by ID
const skillsData = [
  // Languages cluster (top-center)
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    x: 48,
    y: 12,
    size: "lg" as const,
    connections: ["javascript", "python", "golang", "c"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Languages",
    x: 38,
    y: 18,
    size: "md" as const,
    connections: ["typescript", "cpp", "sql"],
  },
  {
    id: "python",
    name: "Python",
    category: "Languages",
    x: 58,
    y: 18,
    size: "md" as const,
    connections: ["typescript", "c"],
  },
  {
    id: "cpp",
    name: "C++",
    category: "Languages",
    x: 32,
    y: 10,
    size: "sm" as const,
    connections: ["javascript", "golang"],
  },
  {
    id: "c",
    name: "C",
    category: "Languages",
    x: 64,
    y: 10,
    size: "sm" as const,
    connections: ["typescript", "python"],
  },
  {
    id: "golang",
    name: "Golang",
    category: "Languages",
    x: 52,
    y: 6,
    size: "sm" as const,
    connections: ["typescript", "cpp"],
  },
  { id: "sql", name: "SQL", category: "Languages", x: 44, y: 22, size: "sm" as const, connections: ["javascript"] },

  // Frontend cluster (left side)
  {
    id: "react",
    name: "React",
    category: "Frontend",
    x: 18,
    y: 38,
    size: "lg" as const,
    connections: ["nextjs", "reactnative", "redux"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    x: 28,
    y: 32,
    size: "lg" as const,
    connections: ["react", "redux", "tailwindcss"],
  },
  {
    id: "reactnative",
    name: "React Native",
    category: "Frontend",
    x: 12,
    y: 48,
    size: "md" as const,
    connections: ["react", "recoil"],
  },
  {
    id: "redux",
    name: "Redux",
    category: "Frontend",
    x: 24,
    y: 46,
    size: "md" as const,
    connections: ["react", "nextjs", "zustand", "tailwindcss"],
  },
  {
    id: "recoil",
    name: "Recoil",
    category: "Frontend",
    x: 8,
    y: 56,
    size: "sm" as const,
    connections: ["reactnative", "zustand", "mui"],
  },
  {
    id: "zustand",
    name: "Zustand",
    category: "Frontend",
    x: 18,
    y: 58,
    size: "sm" as const,
    connections: ["redux", "recoil", "shadcn"],
  },
  {
    id: "tailwindcss",
    name: "TailwindCSS",
    category: "Frontend",
    x: 32,
    y: 54,
    size: "md" as const,
    connections: ["nextjs", "redux", "shadcn"],
  },
  {
    id: "mui",
    name: "MUI",
    category: "Frontend",
    x: 10,
    y: 66,
    size: "sm" as const,
    connections: ["recoil", "shadcn"],
  },
  {
    id: "shadcn",
    name: "Shadcn",
    category: "Frontend",
    x: 22,
    y: 68,
    size: "sm" as const,
    connections: ["zustand", "tailwindcss", "mui"],
  },

  // Backend cluster (right side)
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    x: 78,
    y: 36,
    size: "lg" as const,
    connections: ["nestjs", "express"],
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "Backend",
    x: 86,
    y: 44,
    size: "md" as const,
    connections: ["nodejs", "websocket", "webrtc"],
  },
  {
    id: "express",
    name: "Express",
    category: "Backend",
    x: 72,
    y: 48,
    size: "md" as const,
    connections: ["nodejs", "webrtc"],
  },
  {
    id: "websocket",
    name: "WebSocket",
    category: "Backend",
    x: 90,
    y: 54,
    size: "sm" as const,
    connections: ["nestjs", "webrtc"],
  },
  {
    id: "webrtc",
    name: "WebRTC",
    category: "Backend",
    x: 82,
    y: 58,
    size: "sm" as const,
    connections: ["nestjs", "express", "websocket"],
  },

  // Database cluster (center-bottom)
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    x: 48,
    y: 52,
    size: "lg" as const,
    connections: ["mongodb", "firebase", "prisma"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    x: 56,
    y: 46,
    size: "md" as const,
    connections: ["postgresql", "prisma"],
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Database",
    x: 40,
    y: 60,
    size: "md" as const,
    connections: ["postgresql", "mysql", "supabase"],
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "Database",
    x: 58,
    y: 58,
    size: "sm" as const,
    connections: ["postgresql", "mongodb", "supabase"],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    x: 44,
    y: 68,
    size: "sm" as const,
    connections: ["firebase", "supabase"],
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Database",
    x: 54,
    y: 66,
    size: "md" as const,
    connections: ["firebase", "prisma", "mysql"],
  },

  // DevOps cluster (bottom-right)
  {
    id: "aws",
    name: "AWS",
    category: "DevOps",
    x: 76,
    y: 72,
    size: "lg" as const,
    connections: ["docker", "cicd", "vercel"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    x: 68,
    y: 78,
    size: "md" as const,
    connections: ["aws", "cloudflare", "cicd"],
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "DevOps",
    x: 84,
    y: 80,
    size: "sm" as const,
    connections: ["aws", "docker", "netlify", "vercel"],
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "DevOps",
    x: 72,
    y: 86,
    size: "sm" as const,
    connections: ["docker", "netlify"],
  },
  { id: "vercel", name: "Vercel", category: "DevOps", x: 88, y: 68, size: "sm" as const, connections: ["aws", "cicd"] },
  {
    id: "netlify",
    name: "Netlify",
    category: "DevOps",
    x: 80,
    y: 88,
    size: "sm" as const,
    connections: ["cicd", "cloudflare"],
  },

  // Tools cluster (bottom-left)
  {
    id: "llms",
    name: "LLMs",
    category: "Tools",
    x: 22,
    y: 80,
    size: "md" as const,
    connections: ["langchain", "kafka", "serverless", "redis"],
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "Tools",
    x: 14,
    y: 86,
    size: "sm" as const,
    connections: ["llms", "kafka", "graphql"],
  },
  {
    id: "redis",
    name: "Redis",
    category: "Tools",
    x: 30,
    y: 88,
    size: "sm" as const,
    connections: ["llms", "serverless", "graphql"],
  },
  {
    id: "kafka",
    name: "Kafka",
    category: "Tools",
    x: 8,
    y: 78,
    size: "sm" as const,
    connections: ["llms", "langchain"],
  },
  {
    id: "serverless",
    name: "Serverless",
    category: "Tools",
    x: 36,
    y: 82,
    size: "sm" as const,
    connections: ["llms", "redis"],
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Tools",
    x: 26,
    y: 92,
    size: "sm" as const,
    connections: ["langchain", "redis"],
  },
];

// Category colors
const categoryColors: Record<string, { primary: string; glow: string }> = {
  Languages: { primary: "hsl(263, 70%, 71%)", glow: "hsla(263, 70%, 71%, 0.6)" },
  Frontend: { primary: "hsl(217, 92%, 69%)", glow: "hsla(217, 92%, 69%, 0.6)" },
  Backend: { primary: "hsl(160, 84%, 52%)", glow: "hsla(160, 84%, 52%, 0.6)" },
  Database: { primary: "hsl(330, 71%, 66%)", glow: "hsla(330, 71%, 66%, 0.6)" },
  DevOps: { primary: "hsl(27, 96%, 61%)", glow: "hsla(27, 96%, 61%, 0.6)" },
  Tools: { primary: "hsl(45, 93%, 58%)", glow: "hsla(45, 93%, 58%, 0.6)" },
};

// Generate connections from skill data (each connection only once)
const generateConnections = () => {
  const connections: {
    from: (typeof skillsData)[0];
    to: (typeof skillsData)[0];
  }[] = [];
  const added = new Set<string>();

  skillsData.forEach((skill) => {
    skill.connections.forEach((connId) => {
      const connSkill = skillsData.find((s) => s.id === connId);
      if (connSkill) {
        // Create unique key to avoid duplicates (A-B same as B-A)
        const key = [skill.id, connId].sort().join("-");
        if (!added.has(key)) {
          added.add(key);
          connections.push({ from: skill, to: connSkill });
        }
      }
    });
  });

  return connections;
};

// ConstellationLines component
const ConstellationLines = ({
  connections,
  activeCategory,
  hoveredSkill,
}: {
  connections: { from: (typeof skillsData)[0]; to: (typeof skillsData)[0] }[];
  activeCategory: string | null;
  hoveredSkill: string | null;
}) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connections.map((conn, index) => {
        const isHovered = hoveredSkill === conn.from.id || hoveredSkill === conn.to.id;
        const isFiltered =
          activeCategory && conn.from.category !== activeCategory && conn.to.category !== activeCategory;
        const opacity = isFiltered ? 0.05 : isHovered ? 0.8 : 0.4;
        const color = categoryColors[conn.from.category].primary;

        return (
          <motion.line
            key={`${conn.from.id}-${conn.to.id}`}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke={color}
            strokeWidth={isHovered ? 2 : 1.5}
            strokeOpacity={opacity}
            strokeLinecap="round"
            filter={isHovered ? "url(#glow)" : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: opacity }}
            transition={{
              duration: 1.5,
              delay: index * 0.02,
              ease: "easeOut",
            }}
          />
        );
      })}
    </svg>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const connections = useMemo(() => generateConnections(), []);

  const categories = useMemo(() => {
    const cats = [...new Set(skillsData.map((s) => s.category))];
    return cats.map((cat) => ({
      name: cat,
      color: categoryColors[cat].primary,
      count: skillsData.filter((s) => s.category === cat).length,
    }));
  }, []);

  // Filter skills based on active category
  const filteredSkills = activeCategory ? skillsData.filter((s) => s.category === activeCategory) : skillsData;

  // Get connected skill IDs for hover effect
  const connectedSkillIds = useMemo(() => {
    if (!hoveredSkill) return [];
    const skill = skillsData.find((s) => s.id === hoveredSkill);
    return skill?.connections || [];
  }, [hoveredSkill]);

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "hsl(var(--skills-bg))" }}
    >
      {/* Static distant stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + (i % 3)}s`,
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
          <ConstellationLines connections={connections} activeCategory={activeCategory} hoveredSkill={hoveredSkill} />

          {/* Skill nodes */}
          {filteredSkills.map((skill, index) => (
            <SkillNode
              key={skill.id}
              name={skill.name}
              category={skill.category}
              color={categoryColors[skill.category].primary}
              size={skill.size}
              x={skill.x}
              y={skill.y}
              delay={index * 0.03}
              isHovered={hoveredSkill === skill.id}
              isConnected={connectedSkillIds.includes(skill.id)}
              onHover={() => setHoveredSkill(skill.id)}
              onLeave={() => setHoveredSkill(null)}
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
