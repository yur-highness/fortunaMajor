import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRightIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

interface SubService {
  name: string;
  detail: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  subServices: SubService[];
}

const servicesData: ServiceCategory[] = [
  {
    id: '01',
    title: "Custom Software Engineering",
    description: "End-to-end development of scalable, high-performance applications tailored to your business logic.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    subServices: [
        { name: "Enterprise Web Apps", detail: "React, Next.js, and Node.js solutions built for scale." },
        { name: "Mobile Development", detail: "Native-feel iOS and Android apps using React Native." },
        { name: "Legacy Modernization", detail: "Transforming outdated systems into modern cloud-native architectures." },
        { name: "UI/UX Design Systems", detail: "Consistent, accessible, and beautiful interfaces that drive engagement." }
    ]
  },
  {
    id: '02',
    title: "AI & Data Intelligence",
    description: "Leverage the power of Generative AI and predictive analytics to automate and optimize.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    subServices: [
        { name: "LLM Integration", detail: "Custom implementation of Gemini and OpenAI models into your workflow." },
        { name: "Predictive Analytics", detail: "Forecasting trends using your historical business data." },
        { name: "Intelligent Chatbots", detail: "24/7 customer support agents with natural language understanding." },
        { name: "Data Pipelines", detail: "Robust ETL processes to centralize and clean your organization's data." }
    ]
  },
  {
    id: '03',
    title: "Cloud Infrastructure",
    description: "Secure, scalable, and cost-effective cloud foundations for your digital products.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    subServices: [
        { name: "Cloud Migration", detail: "Seamless transition of on-premise assets to AWS, Azure, or GCP." },
        { name: "DevOps Automation", detail: "CI/CD pipelines to speed up deployment and reduce errors." },
        { name: "Serverless Architecture", detail: "Cost-efficient backends that scale automatically with traffic." },
        { name: "Security Audits", detail: "Comprehensive vulnerability assessments and compliance checks." }
    ]
  }
];

const ServiceAccordionItem: React.FC<{ 
    item: ServiceCategory; 
    isOpen: boolean; 
    onClick: () => void;
    index: number;
}> = ({ item, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Use layout effect to handle animations and prevent FOUC
  useLayoutEffect(() => {
    if (!contentRef.current || !cardRef.current) return;
    
    const ctx = gsap.context(() => {
        if (isOpen) {
            gsap.to(contentRef.current, { 
                height: "auto", 
                opacity: 1,
                duration: 0.5, 
                ease: "power3.out",
                onStart: () => {
                     // Ensure clipped during animation
                     if(cardRef.current) cardRef.current.style.overflow = "hidden";
                     if(contentRef.current) contentRef.current.style.overflow = "hidden";
                },
                onComplete: () => {
                    // Allow tooltip overflow after animation
                    if(cardRef.current) cardRef.current.style.overflow = "visible";
                    if(contentRef.current) contentRef.current.style.overflow = "visible";
                    ScrollTrigger.refresh();
                }
            });
        } else {
            // Immediately clip for closing animation
            if(cardRef.current) cardRef.current.style.overflow = "hidden";
            if(contentRef.current) contentRef.current.style.overflow = "hidden";
            
            gsap.to(contentRef.current, { 
                height: 0, 
                opacity: 0,
                duration: 0.4, 
                ease: "power3.inOut",
                onComplete: () => ScrollTrigger.refresh()
            });
        }
    });
    
    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div 
        ref={cardRef}
        className={`service-row group relative glass-card rounded-2xl border transition-all duration-500 overflow-hidden ${isOpen ? 'border-paradigm-accent/30 bg-white/5 shadow-[0_0_30px_rgba(0,209,255,0.05)] z-20' : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02] z-10'}`}
    >
        {/* Trigger */}
        <button 
            onClick={onClick}
            className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none z-10 relative bg-transparent"
        >
            <div className="flex items-center gap-6 md:gap-8">
                <span className="font-mono text-paradigm-accent/50 text-xl hidden md:block w-8">{item.id}</span>
                {/* Icon Container with Zoom Effect */}
                <div className={`p-3 rounded-xl border transition-all duration-500 ease-out ${isOpen ? 'bg-paradigm-accent text-black border-paradigm-accent scale-110 shadow-[0_0_15px_rgba(0,209,255,0.4)]' : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20'}`}>
                    {item.icon}
                </div>
                <div>
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                        {item.title}
                    </h3>
                    <p className={`text-sm mt-1 max-w-md hidden md:block transition-colors duration-300 ${isOpen ? 'text-gray-300' : 'text-gray-500'}`}>{item.description}</p>
                </div>
            </div>
            
            <div className={`transform transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`}>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-paradigm-accent text-paradigm-accent bg-paradigm-accent/10' : 'border-white/10 text-gray-400 group-hover:border-white/30 group-hover:text-white'}`}>
                    <ChevronRightIcon className="w-5 h-5" />
                 </div>
            </div>
        </button>

        {/* Big Dropdown Content */}
        <div ref={contentRef} className="relative z-10" style={{ height: 0, opacity: 0 }}>
            <div className="p-6 md:p-8 md:pt-0 border-t border-white/5 mx-6 md:mx-8">
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.subServices.map((sub, idx) => (
                        <div key={idx} className="relative group/sub cursor-help p-4 rounded-xl hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-white/5">
                             <div className="flex items-center gap-3 justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-paradigm-accent opacity-50 group-hover/sub:opacity-100 transition-opacity shadow-[0_0_8px_rgba(0,209,255,0.5)]"></div>
                                    <h4 className="text-white font-medium group-hover/sub:text-paradigm-accent transition-colors">{sub.name}</h4>
                                </div>
                                {/* Info Icon hint */}
                                <div className="opacity-0 group-hover/sub:opacity-50 text-paradigm-accent transition-opacity">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                             </div>
                             
                             {/* Floating Tooltip */}
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 bg-[#0a0f16] border border-paradigm-accent/30 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] opacity-0 translate-y-2 group-hover/sub:opacity-100 group-hover/sub:translate-y-0 transition-all duration-200 ease-out pointer-events-none z-50 backdrop-blur-xl">
                                <div className="text-paradigm-accent text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                                  <span className="w-1 h-1 bg-paradigm-accent rounded-full"></span>
                                  {sub.name}
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">{sub.detail}</p>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-[#0a0f16]"></div>
                             </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                    <button className="text-sm font-medium text-paradigm-accent hover:text-white transition-colors flex items-center gap-2 group/btn">
                        Explore {item.title} capabilities
                        <ChevronRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
        
        {/* Decorative Glow */}
        <div className={`absolute inset-0 bg-gradient-to-b from-paradigm-accent/5 to-transparent pointer-events-none transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
}

export const Services: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(prev => prev === index ? null : index);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".service-row", 
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        once: true
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out"
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 relative z-20">
             {/* Background Element */}
            <div className="absolute top-1/2 right-0 w-1/3 h-full bg-paradigm-accent/5 blur-[120px] pointer-events-none rounded-full transform translate-x-1/2"></div>

            <div className="max-w-5xl mx-auto">
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <span className="text-paradigm-accent text-sm font-semibold tracking-wider uppercase mb-2 block">Our Expertise</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Capabilities designed for impact.</h2>
                    <p className="text-gray-400 text-lg">We combine cutting-edge low-code platforms with custom engineering to deliver robust software solutions in record time.</p>
                </div>
                
                <div className="flex flex-col gap-4">
                    {servicesData.map((service, idx) => (
                        <ServiceAccordionItem 
                            key={service.id} 
                            item={service} 
                            index={idx}
                            isOpen={openIndex === idx}
                            onClick={() => handleToggle(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};