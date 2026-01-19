import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";

// Projects data - easily extendable
const projects: Project[] = [
  {
    title: "Roast My GitHub",
    description:
      "AI-powered GitHub profile analyzer that processes repositories in parallel with real-time streaming to deliver code analysis and personalized feedback.",
    tech: ["Next.js", "TypeScript", "Vercel AI SDK", "GitHub API", "Groq (Llama 3.3)", "Tailwind CSS"],
    highlights: [
      "Processes 100+ repositories in parallel with real-time SSE streaming",
      "Delivers code analysis and feedback in under 8 seconds",
      "Attracted 100+ users within the first week of launch",
    ],
    githubUrl: "https://github.com/neel07sanghvi/Roast-My-Github",
    liveUrl: "https://roast-my-github-pi.vercel.app/",
  },
  {
    title: "Time Tracker",
    description:
      "Comprehensive employee time tracking platform with admin dashboard, web app, and Electron desktop client featuring JWT auth and real-time sync.",
    tech: ["Turborepo", "Next.js", "React", "TypeScript", "Supabase", "Electron", "PostgreSQL"],
    highlights: [
      "Monorepo architecture with admin dashboard, web app, and desktop client",
      "JWT authentication and real-time sync across platforms",
      "Automated screenshot capture with secure storage",
    ],
    githubUrl: "https://github.com/neel07sanghvi/Time-Tracker",
  },
  {
    title: "AI Chat PDF",
    description:
      "PDF RAG application that processes documents into searchable vector embeddings, enabling fast and contextually relevant query responses.",
    tech: ["Next.js", "Clerk", "Node.js", "Express.js", "LangChain", "OpenAI", "BullMQ", "Qdrant", "Docker"],
    highlights: [
      "LangChain + Qdrant for vector embeddings and semantic search",
      "Handles large document collections with efficient processing",
      "Fast contextually relevant query responses",
    ],
    githubUrl: "https://github.com/neel07sanghvi/AI_Chat_PDF",
  },
  {
    title: "Sa Re Ga Ma",
    description:
      "Comprehensive Discord music bot with full playback control and an automated recommendation system powered by YouTube's algorithm.",
    tech: ["Node.js", "Puppeteer", "Discord.js"],
    highlights: [
      "Play, Pause, Resume, Skip, and Stop commands for seamless control",
      "Automated recommendation system using YouTube's algorithm",
      "Achieved 10x user growth through enhanced UX",
    ],
    githubUrl: "https://github.com/neel07sanghvi/Sa-Re-Ga-Ma",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "hsl(var(--projects-bg))" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--accent-purple) / 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--accent-purple) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-radial from-accent-purple/20 via-accent-purple/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-radial from-accent-blue/20 via-accent-blue/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <TextReveal>
            <motion.span
              className="inline-block px-4 py-1.5 text-sm font-mono text-accent-cyan border border-accent-cyan/30 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              The Gallery
            </motion.span>
          </TextReveal>

          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
              Featured Projects
            </h2>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work — from AI-powered tools to full-stack applications
            </p>
          </TextReveal>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Projects count */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm font-mono text-muted-foreground">
            {projects.length} projects showcased • More on{" "}
            <a
              href="https://github.com/neel07sanghvi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:text-accent-cyan/80 underline underline-offset-4 transition-colors"
            >
              GitHub
            </a>
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
