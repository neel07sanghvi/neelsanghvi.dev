import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';

const Index = () => {
  return (
    <SmoothScrollProvider>
      {/* Noise texture overlay for cinematic feel */}
      <div className="noise-overlay" />
      
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        
        <section id="projects" className="min-h-screen bg-projects flex items-center justify-center">
          <p className="text-muted-foreground text-lg">Projects Section</p>
        </section>
        
        <section id="contact" className="min-h-screen bg-contact flex items-center justify-center">
          <p className="text-muted-foreground text-lg">Contact Section</p>
        </section>
      </main>
    </SmoothScrollProvider>
  );
};

export default Index;
