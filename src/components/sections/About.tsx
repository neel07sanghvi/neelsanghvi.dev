import { motion } from 'framer-motion';
import FloatingOrbs from '@/components/ui/FloatingOrbs';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import TextReveal from '@/components/ui/TextReveal';

const stats = [
  { end: 3, suffix: '+', label: 'Years Experience' },
  { end: 500, suffix: '+', label: 'LeetCode Problems' },
  { end: 2020, suffix: '', label: 'ICPC Regionalist' },
];

const achievements = [
  { 
    title: 'Frontend Developer Certificate', 
    source: 'HackerRank',
    url: 'https://www.hackerrank.com/certificates/f4cd71c80533'
  },
  { 
    title: 'Problem Solving Intermediate', 
    source: 'HackerRank',
    url: 'https://www.hackerrank.com/certificates/8efc8c0c075b'
  },
  { 
    title: 'Why C++ is Best for Competitive Programming?', 
    source: 'GeeksforGeeks Article',
    url: 'https://www.geeksforgeeks.org/cpp/why-cpp-is-best-for-competitive-programming/'
  },
];

const About = () => {
  return (
    <section id="about" className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-about">
      {/* Floating orbs background */}
      <FloatingOrbs count={6} />

      {/* Gradient overlay - sunrise effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent-blue/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-accent-blue/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <TextReveal className="mb-16">
          <motion.span 
            className="text-accent-blue text-sm font-medium uppercase tracking-[0.3em] mb-4 block"
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
            The Developer Behind
            <br />
            <span className="text-muted-foreground">The Code</span>
          </h2>
        </TextReveal>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Bio text - left side */}
          <div className="space-y-6">
            <TextReveal delay={0.1}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a <span className="text-foreground font-medium">Full Stack Developer</span> with 3+ years of experience building 
                modern web and mobile applications. I specialize in React, Next.js, 
                Node.js, and cloud technologies.
              </p>
            </TextReveal>

            <TextReveal delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a B.Tech in Information Technology from Gujarat Technological 
                University <span className="text-accent-blue">(CGPA: 9.11)</span>, I've built everything from enterprise analytics 
                dashboards to real-time tracking systems and LLM-powered automation.
              </p>
            </TextReveal>

            <TextReveal delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I love solving complex problems and creating efficient, scalable 
                solutions. When I'm not coding, I'm competing in programming contests 
                or mentoring others in DSA.
              </p>
            </TextReveal>

            {/* Decorative line */}
            <TextReveal delay={0.4}>
              <div className="pt-6">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  className="h-px bg-gradient-to-r from-accent-blue/50 via-accent-blue to-transparent origin-left"
                />
              </div>
            </TextReveal>
          </div>

          {/* Stats grid - right side */}
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <AnimatedCounter
                  key={stat.label}
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                  duration={2 + index * 0.2}
                />
              ))}
            </div>

            {/* Certificates & Articles */}
            <TextReveal delay={0.5}>
              <div className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-accent-blue mb-4">
                  Certifications & Publications
                </h3>
                {achievements.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="group block p-4 rounded-lg border border-accent-blue/20 bg-accent-blue/5 hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-all duration-300"
                  >
                    <p className="text-foreground font-medium group-hover:text-accent-blue transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.source}
                    </p>
                  </motion.a>
                ))}
              </div>
            </TextReveal>
          </div>
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-sm text-muted-foreground/50 uppercase tracking-widest">
            Scroll to explore my journey
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
