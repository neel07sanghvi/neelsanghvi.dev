import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Hero from '@/components/sections/Hero';

const Index = () => {
  return (
    <SmoothScrollProvider>
      {/* Noise texture overlay for cinematic feel */}
      <div className="noise-overlay" />
      
      <main className="relative">
        <Hero />
        
        {/* Placeholder sections - to be built */}
        <section id="about" className="min-h-screen bg-about flex items-center justify-center">
          <p className="text-muted-foreground text-lg">About Section - Coming Next</p>
        </section>
        
        <section id="experience" className="min-h-screen bg-experience flex items-center justify-center">
          <p className="text-muted-foreground text-lg">Experience Section</p>
        </section>
        
        <section id="skills" className="min-h-screen bg-skills flex items-center justify-center">
          <p className="text-muted-foreground text-lg">Skills Section</p>
        </section>
        
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
