import React, { useEffect, useRef } from 'react';
import { ChevronRightIcon } from './Icons';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(visualRef.current, {
        opacity: 0,
        scale: 0.8,
        rotationX: 20,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.8");

    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!visualRef.current || !titleRef.current) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized position (-1 to 1)
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;

    // Parallax Effect
    gsap.to(visualRef.current, {
        rotationY: x * 10, // Rotate based on X
        rotationX: -y * 10, // Rotate based on Y
        x: x * 20,
        y: y * 20,
        duration: 1,
        ease: "power2.out"
    });

    // Subtle movement for text to create depth
    gsap.to(titleRef.current, {
        x: x * 10,
        y: y * 10,
        duration: 1.2,
        ease: "power2.out"
    });
    
    gsap.to(textRef.current, {
        x: x * 5,
        y: y * 5,
        duration: 1.2,
        ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to([visualRef.current, titleRef.current, textRef.current], {
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
  };

  return (
    <div 
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-10 px-4 overflow-hidden perspective-1000"
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-60"></div>
      
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.07]" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Main Glass Card */}
      <div ref={containerRef} className="relative z-10 glass-card rounded-[3rem] p-1 px-1 border border-white/10 max-w-6xl w-full mx-auto backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        
        {/* Inner Content Container */}
        <div className="bg-[#050a10]/80 rounded-[2.8rem] px-8 py-20 md:py-32 md:px-16 flex flex-col items-center text-center relative overflow-hidden h-full min-h-[60vh] justify-center">
           
           {/* Subtle side glows */}
           <div className="absolute top-1/4 -left-20 w-40 h-40 bg-paradigm-accent/20 blur-[100px] animate-pulse"></div>
           <div className="absolute top-1/4 -right-20 w-40 h-40 bg-purple-500/20 blur-[100px] animate-pulse"></div>

          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-8 tracking-tight leading-[1.1] glow-text will-change-transform">
            Custom low-code<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-paradigm-accent to-white">software solutions</span>
          </h1>
          
          <p ref={textRef} className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed will-change-transform">
            Delivering enterprise-grade solutions at startup speed.<br className="hidden md:block" />
            Built with quality that empowers your tomorrow.
          </p>
          
          <button ref={buttonRef} className="group relative flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-medium hover:border-paradigm-accent/50 hover:bg-white/10 transition-all duration-300 overflow-hidden backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-paradigm-accent/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <span className="relative z-10">Start your project</span>
            <ChevronRightIcon className="w-4 h-4 text-paradigm-accent group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
          
          {/* Tech Visual Decoration at Bottom of Card */}
          <div ref={visualRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 md:h-64 opacity-60 pointer-events-none will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
             {/* Abstract Wireframe Laptop/Base */}
             <div className="w-full h-full relative perspective-1000">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2/3 bg-gradient-to-t from-paradigm-accent/10 to-transparent border-t border-paradigm-accent/30 rounded-t-xl transform perspective-[1000px] rotate-x-12"></div>
                {/* Simulated Grid Lines */}
                <div className="absolute bottom-4 left-1/4 w-1/2 h-px bg-paradigm-accent/50 shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
                <div className="absolute bottom-12 left-[20%] w-[60%] h-px bg-paradigm-accent/20"></div>
                <div className="absolute bottom-24 left-[35%] w-[30%] h-px bg-paradigm-accent/10"></div>
                
                {/* Vertical decorative lines */}
                <div className="absolute bottom-0 left-1/2 h-32 w-px bg-gradient-to-t from-paradigm-accent/50 to-transparent"></div>
                <div className="absolute bottom-0 left-[45%] h-24 w-px bg-gradient-to-t from-paradigm-accent/30 to-transparent"></div>
                <div className="absolute bottom-0 right-[45%] h-24 w-px bg-gradient-to-t from-paradigm-accent/30 to-transparent"></div>
                
                {/* Floating Particles (CSS Animation) */}
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-10 right-1/4 w-1 h-1 bg-paradigm-accent rounded-full animate-bounce"></div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};