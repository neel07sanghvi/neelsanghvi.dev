import GenerativeCanvas from '@/components/GenerativeCanvas';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GenerativeCanvas />
      
      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-purple-400/80">
            Frontend Developer
          </p>
          
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-8xl">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>
          
          <p className="mx-auto max-w-md text-lg text-white/50">
            Move your cursor around to interact with the particles
          </p>

          <div className="mt-12 flex gap-4 justify-center">
            <button className="group relative px-8 py-3 overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white transition-all hover:bg-white/10 hover:border-purple-500/50">
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-transform hover:scale-105">
              Contact Me
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-6 w-4 rounded-full border-2 border-white/20 flex justify-center pt-1">
            <div className="h-1.5 w-0.5 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
