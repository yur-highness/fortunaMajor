import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the vertical line drawing down
            gsap.fromTo(lineRef.current, 
                { height: '0%' },
                {
                    height: '100%',
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    }
                }
            );

            // Fade in steps with improved stagger
            const steps = gsap.utils.toArray('.process-step');
            steps.forEach((step: any, i) => {
                gsap.from(step, {
                    opacity: 0,
                    y: 30,
                    x: i % 2 === 0 ? 30 : -30, // Alternate entry direction
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const steps = [
        { num: '01', title: 'Discovery', desc: 'We dive deep into your business logic to understand the core problem.' },
        { num: '02', title: 'Architecture', desc: 'Designing a scalable blueprint leveraging the best low-code tools.' },
        { num: '03', title: 'Development', desc: 'Rapid sprints with constant feedback loops to ensure alignment.' },
        { num: '04', title: 'Launch', desc: 'Seamless deployment and handover with comprehensive documentation.' }
    ];

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                     <span className="text-paradigm-accent text-sm font-semibold tracking-wider uppercase mb-2 block">How We Work</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">From concept to code.</h2>
                </div>

                <div className="relative">
                    {/* The animated line */}
                    <div className="absolute left-4 top-4 bottom-0 w-px bg-white/10 md:left-1/2 md:-ml-px"></div>
                    <div ref={lineRef} className="absolute left-4 top-4 w-px bg-paradigm-accent shadow-[0_0_10px_#00d1ff] md:left-1/2 md:-ml-px max-h-full"></div>

                    <div className="space-y-12">
                        {steps.map((step, idx) => (
                            <div key={idx} className={`process-step relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-1 md:w-1/2"></div>
                                
                                {/* Center Node */}
                                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#050a10] border-2 border-paradigm-accent z-10 shadow-[0_0_15px_rgba(0,209,255,0.5)] transition-transform hover:scale-125"></div>
                                
                                <div className={`pl-12 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 group">
                                        <div className="text-4xl font-bold text-white/5 mb-2 font-mono group-hover:text-paradigm-accent/20 transition-colors">{step.num}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-gray-400 text-sm">{step.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};