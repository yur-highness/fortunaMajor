import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export const AIWorkflow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];
    const particleCount = 40; // Keep it subtle

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Slow movement
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = 'rgba(0, 209, 255, 0.15)'; // Paradigm Accent Color
      ctx.strokeStyle = 'rgba(0, 209, 255, 0.05)'; // Very faint lines

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity based on distance
            const alpha = 1 - (dist / 120);
            ctx.strokeStyle = `rgba(0, 209, 255, ${alpha * 0.08})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate connection lines drawing
      gsap.to(".connection-line", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.2
      });

      // Pulse nodes
      gsap.to(".ai-node", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#020508]">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 z-10">
          <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 mb-6 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-white tracking-wide">LIVE INTEGRATION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Intelligent Agents,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-paradigm-accent to-purple-500">Not just Chatbots.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            We build custom AI agents that connect directly to your database, process documents, and execute actions. Move beyond simple Q&A to real autonomous workflows.
          </p>
          
          <ul className="space-y-4 mb-8">
            {['Context-aware memory', 'RAG (Retrieval-Augmented Generation)', 'Multi-modal inputs (Text, Image, Audio)'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-paradigm-accent/10 flex items-center justify-center text-paradigm-accent">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span>{item}</span>
                </li>
            ))}
          </ul>
        </div>

        {/* Right Visualization: Node Graph */}
        <div className="md:w-1/2 w-full h-[400px] relative glass-card rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center backdrop-blur-sm bg-black/20">
             
             {/* Central Brain Node */}
             <div className="ai-node absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black rounded-full border-2 border-paradigm-accent shadow-[0_0_30px_rgba(0,209,255,0.4)] flex items-center justify-center z-20 opacity-0 scale-50">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
             </div>

             {/* Connection Lines SVG */}
             <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {/* Lines radiating from center */}
                <path className="connection-line" d="M50% 50% L20% 20%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
                <path className="connection-line" d="M50% 50% L80% 20%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
                <path className="connection-line" d="M50% 50% L20% 80%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
                <path className="connection-line" d="M50% 50% L80% 80%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
                {/* New Nodes Connections */}
                <path className="connection-line" d="M50% 50% L50% 15%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
                <path className="connection-line" d="M50% 50% L50% 85%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
             </svg>

             {/* Satellite Nodes */}
             <div className="ai-node absolute top-[20%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 p-3 glass-card rounded-xl border border-white/10 z-10 opacity-0 scale-75">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">User</div>
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-2 bg-white/20 rounded"></div>
                </div>
             </div>

             <div className="ai-node absolute top-[20%] right-[20%] transform translate-x-1/2 -translate-y-1/2 p-3 glass-card rounded-xl border border-white/10 z-10 opacity-0 scale-75">
                <div className="text-[10px] text-paradigm-accent uppercase tracking-widest mb-1">Database</div>
                <div className="flex flex-col space-y-1">
                    <div className="w-8 h-1 bg-paradigm-accent/50 rounded"></div>
                    <div className="w-6 h-1 bg-paradigm-accent/30 rounded"></div>
                </div>
             </div>

             <div className="ai-node absolute bottom-[20%] left-[20%] transform -translate-x-1/2 translate-y-1/2 p-3 glass-card rounded-xl border border-white/10 z-10 opacity-0 scale-75">
                <div className="text-[10px] text-purple-400 uppercase tracking-widest mb-1">API</div>
                <div className="w-6 h-6 border border-purple-400/30 rounded flex items-center justify-center text-purple-400 text-[8px] font-mono">JSON</div>
             </div>

             <div className="ai-node absolute bottom-[20%] right-[20%] transform translate-x-1/2 translate-y-1/2 p-3 glass-card rounded-xl border border-white/10 z-10 opacity-0 scale-75">
                <div className="text-[10px] text-green-400 uppercase tracking-widest mb-1">Action</div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
             </div>
             
             {/* New Nodes */}
             <div className="ai-node absolute top-[15%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 p-3 glass-card rounded-xl border border-white/10 z-10 opacity-0 scale-75">
                <div className="text-[10px] text-orange-400 uppercase tracking-widest mb-1 whitespace-nowrap">Doc Proc</div>
                <div className="w-6 h-8 border border-orange-400/30 rounded mx-auto bg-orange-400/5 flex flex-col items-center justify-evenly">
                   <div className="w-4 h-0.5 bg-orange-400/50"></div>
                   <div className="w-4 h-0.5 bg-orange-400/50"></div>
                   <div className="w-2 h-0.5 bg-orange-400/50 mr-2"></div>
                </div>
             </div>

             <div className="ai-node absolute bottom-[15%] left-[50%] transform -translate-x-1/2 translate-y-1/2 p-3 glass-card rounded-xl border border-white/10 z-10 opacity-0 scale-75">
                <div className="text-[10px] text-pink-400 uppercase tracking-widest mb-1 whitespace-nowrap">Knowledge</div>
                <div className="w-6 h-6 border border-pink-400/30 rounded mx-auto bg-pink-400/5 grid grid-cols-2 gap-0.5 p-1">
                   <div className="bg-pink-400/40 rounded-sm"></div>
                   <div className="bg-pink-400/40 rounded-sm"></div>
                   <div className="bg-pink-400/40 rounded-sm"></div>
                   <div className="bg-pink-400/40 rounded-sm"></div>
                </div>
             </div>

             {/* Moving Particles */}
             <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full animate-[ping_3s_linear_infinite]" style={{ animationDelay: '1s' }}></div>

        </div>
      </div>
    </section>
  );
};
