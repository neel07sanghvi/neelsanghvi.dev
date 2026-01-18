import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import TimelinePath from "@/components/ui/TimelinePath";
import TimelineNode from "@/components/ui/TimelineNode";
import ExperienceCard from "@/components/ui/ExperienceCard";

const experiences = [
  {
    company: "Neomenta Ltd.",
    role: "Software Development Engineer",
    period: "02/2023 – 03/2025",
    location: "Ahmedabad, India",
    // tech: ["React", "TypeScript", "Redux", "MUI", "AWS", "LLMs", "React Native"],
    tech: [],
    highlights: [
      "Built modular UI component library, reducing manual effort by 50%",
      "Implemented WebSocket Pub/Sub for real-time collaboration",
      "Created LLM-based ticket categorization (99% accuracy, saved 600 min/month)",
      "Optimized React Native app with MMKV and SQLite",
    ],
  },
  {
    company: "ShopBonanza",
    role: "Frontend Developer Intern",
    period: "05/2022 – 07/2022",
    location: "Remote, India",
    tech: ["Next.js", "Tailwind CSS", "NextAuth"],
    highlights: [
      "Built responsive landing page with NextAuth authentication",
      "Created cart system with React Context API",
      "Improved SEO metrics by 40%",
    ],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "hsl(var(--experience))" }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-about/50 via-transparent to-transparent" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsl(var(--experience-accent)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <TextReveal>
            <motion.span
              className="inline-block px-4 py-1.5 text-sm font-mono text-experience-accent border border-experience-accent/30 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              The Journey
            </motion.span>
          </TextReveal>

          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">Experience</h2>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A path of growth, learning, and impactful contributions
            </p>
          </TextReveal>
        </div>

        {/* Timeline */}
        <TimelinePath>
          {experiences.map((exp, index) => (
            <TimelineNode key={index} index={index}>
              <ExperienceCard {...exp} />
            </TimelineNode>
          ))}
        </TimelinePath>

        {/* Path continuation hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-sm font-mono">The journey continues...</span>
            <motion.div
              className="w-0.5 h-8 bg-gradient-to-b from-experience-accent/50 to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
