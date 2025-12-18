import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tilt Card Component for 3D Hover Effect
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (clamped to keep it subtle)
        const rotateX = ((y - centerY) / centerY) * -4; // Max 4deg tilt
        const rotateY = ((x - centerX) / centerX) * 4;

        gsap.to(cardRef.current, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });
    };

    const handleLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
        });
    }

    return (
        <div 
            ref={cardRef} 
            onMouseMove={handleMove} 
            onMouseLeave={handleLeave} 
            className={`${className} transition-none will-change-transform`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    )
}

export const SaaSShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards staggering in
      gsap.from(".bento-card-wrapper", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Animate internal UI elements
      gsap.to(".ui-bar", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        height: "random(30, 90) + '%'",
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.1
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative z-10 perspective-1000">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <span className="text-paradigm-accent text-sm font-semibold tracking-wider uppercase mb-2 block">SaaS Product Studio</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">We build software that sells.</h2>
          <p className="text-gray-400 text-lg">From complex dashboards to high-performance mobile apps, we design and develop the entire ecosystem of your SaaS product.</p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Dashboard Analytics (Large) */}
          <TiltCard className="bento-card-wrapper col-span-1 md:col-span-2 md:row-span-2 glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden group min-h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <h3 className="text-2xl font-semibold text-white mb-2 relative z-10 transform-style-3d group-hover:translate-z-10 transition-transform">Analytics Dashboards</h3>
            <p className="text-gray-400 text-sm mb-8 relative z-10 transform-style-3d group-hover:translate-z-5 transition-transform">Real-time data visualization with <br/>responsive interactive charts.</p>
            
            {/* Visual: Dashboard Skeleton */}
            <div className="relative w-full h-full bg-[#0a0f16] rounded-tl-2xl border-t border-l border-white/10 p-6 shadow-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 transform-style-3d">
               {/* Header */}
               <div className="flex justify-between items-center mb-6">
                 <div className="w-32 h-4 bg-white/10 rounded-full"></div>
                 <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/5"></div>
                    <div className="w-8 h-8 rounded-full bg-paradigm-accent/20"></div>
                 </div>
               </div>
               {/* Chart Area */}
               <div className="flex items-end space-x-4 h-48 mb-6 border-b border-white/5 pb-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="ui-bar w-full bg-gradient-to-t from-paradigm-accent/50 to-paradigm-accent rounded-t-sm opacity-80" style={{ height: '10%' }}></div>
                  ))}
               </div>
               {/* Data Rows */}
               <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="w-1/3 h-2 bg-white/10 rounded-full"></div>
                        <div className="w-1/6 h-2 bg-paradigm-accent/50 rounded-full"></div>
                     </div>
                  ))}
               </div>
            </div>
          </TiltCard>

          {/* Card 2: Mobile Responsive (Square) */}
          <TiltCard className="bento-card-wrapper col-span-1 glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden group min-h-[250px]">
            <h3 className="text-xl font-semibold text-white mb-2 relative z-10 transform-style-3d group-hover:translate-z-10 transition-transform">Mobile First</h3>
            <p className="text-gray-400 text-sm mb-4 relative z-10 transform-style-3d group-hover:translate-z-5 transition-transform">Native-grade performance on all devices.</p>
            
            <div className="absolute bottom-[-20px] right-8 w-24 h-48 bg-[#0a0f16] border border-white/10 rounded-2xl p-2 transform rotate-[-12deg] group-hover:rotate-0 transition-transform duration-500 shadow-xl transform-style-3d">
               <div className="w-full h-full bg-white/5 rounded-xl flex flex-col items-center pt-4 gap-2">
                  <div className="w-12 h-12 rounded-full bg-paradigm-accent/20"></div>
                  <div className="w-16 h-2 bg-white/20 rounded-full"></div>
                  <div className="w-full h-px bg-white/10 mt-2"></div>
                  <div className="w-16 h-16 rounded-lg bg-white/5 mt-1"></div>
               </div>
            </div>
            <div className="absolute bottom-[-20px] right-[-20px] w-24 h-48 bg-[#050a10] border border-white/10 rounded-2xl p-2 transform rotate-[12deg] group-hover:rotate-[5deg] transition-transform duration-500 shadow-2xl z-10 transform-style-3d">
               <div className="w-full h-full bg-gradient-to-br from-paradigm-accent/10 to-transparent rounded-xl flex flex-col pt-3 px-2 gap-2">
                   <div className="w-full h-8 rounded bg-white/10"></div>
                   <div className="w-full h-8 rounded bg-white/10"></div>
                   <div className="w-2/3 h-2 bg-paradigm-accent/50 rounded mt-auto mb-2"></div>
               </div>
            </div>
          </TiltCard>

          {/* Card 3: Secure API (Square) */}
          <TiltCard className="bento-card-wrapper col-span-1 glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden group flex flex-col min-h-[250px]">
            <h3 className="text-xl font-semibold text-white mb-2 relative z-10 transform-style-3d group-hover:translate-z-10 transition-transform">Secure API</h3>
            <p className="text-gray-400 text-sm mb-4 relative z-10 transform-style-3d group-hover:translate-z-5 transition-transform">Scalable backend infrastructure.</p>
            
            <div className="flex-1 bg-[#0a0f16] rounded-xl border border-white/10 p-4 font-mono text-[10px] text-gray-400 overflow-hidden relative transform-style-3d group-hover:scale-105 transition-transform duration-500">
               <div className="absolute top-0 left-0 w-full h-1 bg-paradigm-accent"></div>
               <p><span className="text-purple-400">const</span> <span className="text-yellow-300">server</span> = <span className="text-blue-300">await</span> init();</p>
               <p className="pl-2 text-gray-500">// Initializing secure handshake</p>
               <p><span className="text-purple-400">return</span> <span className="text-green-400">200 OK</span>;</p>
               
               {/* Scanning line animation */}
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-paradigm-accent/10 to-transparent transform -translate-y-full animate-[pulse-slow_3s_ease-in-out_infinite]"></div>
            </div>
          </TiltCard>

          {/* Card 4: Automated Workflows (Square) */}
          <TiltCard className="bento-card-wrapper col-span-1 glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden group min-h-[250px]">
             <h3 className="text-xl font-semibold text-white mb-2 relative z-10 transform-style-3d group-hover:translate-z-10 transition-transform">Automated Workflows</h3>
             <p className="text-gray-400 text-sm mb-4 relative z-10 transform-style-3d group-hover:translate-z-5 transition-transform">Trigger complex actions instantly.</p>
             
             {/* Visual: Node Connector */}
             <div className="absolute bottom-6 right-6 w-32 h-20 bg-[#0a0f16] rounded-xl border border-white/10 p-3 transform-style-3d group-hover:scale-110 transition-transform shadow-lg">
                <div className="flex items-center justify-between h-full relative">
                    <div className="w-3 h-3 rounded-full bg-paradigm-accent/50"></div>
                    <div className="w-full h-0.5 bg-white/10 absolute top-1/2 left-0 -z-10"></div>
                    <div className="w-3 h-3 rounded-full bg-purple-500/50"></div>
                    
                    {/* Moving packet */}
                    <div className="absolute top-1/2 left-0 w-2 h-2 bg-white rounded-full -translate-y-1/2 animate-[ping_2s_linear_infinite]"></div>
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500/20 text-green-400 text-[8px] px-1.5 py-0.5 rounded border border-green-500/30">Active</div>
             </div>
          </TiltCard>

          {/* Card 5: Real-time Collaboration (Wide) */}
          <TiltCard className="bento-card-wrapper col-span-1 md:col-span-2 glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden group min-h-[250px] flex flex-col md:flex-row items-center gap-8">
              <div className="z-10 relative flex-1">
                 <h3 className="text-2xl font-semibold text-white mb-2 transform-style-3d group-hover:translate-z-10 transition-transform">Real-time Collaboration</h3>
                 <p className="text-gray-400 text-sm max-w-sm transform-style-3d group-hover:translate-z-5 transition-transform">Multiplayer editing and live sync built-in. Connect your team instantly.</p>
              </div>

              {/* Visual: Cursors and Chat */}
              <div className="relative w-full md:w-1/2 h-32 bg-[#0a0f16] rounded-xl border border-white/10 p-4 transform-style-3d group-hover:translate-x-[-10px] transition-transform overflow-hidden shadow-2xl">
                 <div className="absolute top-4 left-4 flex items-center gap-2 bg-paradigm-accent/10 px-2 py-1 rounded text-xs text-paradigm-accent border border-paradigm-accent/20">
                    <div className="w-1.5 h-1.5 bg-paradigm-accent rounded-full animate-pulse"></div>
                    <span>User A is typing...</span>
                 </div>
                 
                 {/* Cursor 1 */}
                 <svg className="absolute top-12 left-1/3 w-4 h-4 text-purple-500 fill-current animate-bounce" viewBox="0 0 24 24"><path d="M5.5 3.21l10.8 5.4c.73.37.73 1.42 0 1.78l-4.5 2.25 2.25 4.5c.37.73-.69 1.78-1.42 1.42l-2.25-4.5-4.5 2.25c-.73.37-1.78-.69-1.42-1.42l5.4-10.8c.37-.73 1.42-.73 1.78 0z" /></svg>
                 
                 {/* Cursor 2 */}
                  <svg className="absolute bottom-4 right-1/4 w-4 h-4 text-green-500 fill-current animate-pulse" viewBox="0 0 24 24" style={{ animationDelay: '0.5s'}}><path d="M5.5 3.21l10.8 5.4c.73.37.73 1.42 0 1.78l-4.5 2.25 2.25 4.5c.37.73-.69 1.78-1.42 1.42l-2.25-4.5-4.5 2.25c-.73.37-1.78-.69-1.42-1.42l5.4-10.8c.37-.73 1.42-.73 1.78 0z" /></svg>

                 {/* Text Lines */}
                 <div className="mt-8 space-y-2 opacity-30">
                    <div className="w-full h-2 bg-white/20 rounded"></div>
                    <div className="w-2/3 h-2 bg-white/20 rounded"></div>
                    <div className="w-3/4 h-2 bg-white/20 rounded"></div>
                 </div>
              </div>
           </TiltCard>

        </div>
      </div>
    </section>
  );
};