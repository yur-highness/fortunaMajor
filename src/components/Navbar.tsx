import React, { useState, useRef, useEffect } from 'react';
import { LogoIcon, ChevronRightIcon } from './Icons';
import gsap from 'gsap';

const servicesMenu = [
  {
    category: "Engineering",
    items: [
      { name: "Web Application Development", desc: "Scalable React & Node.js apps" },
      { name: "Mobile App Development", desc: "iOS & Android native solutions" },
      { name: "Legacy System Modernization", desc: "Transform monoliths to microservices" },
      { name: "UI/UX Design Strategy", desc: "User-centric interface design" }
    ]
  },
  {
    category: "AI & Intelligence",
    items: [
      { name: "Generative AI Integration", desc: "LLMs, RAG, and custom models" },
      { name: "Predictive Analytics", desc: "Data-driven business forecasting" },
      { name: "Intelligent Chatbots", desc: "24/7 automated support agents" },
      { name: "Computer Vision", desc: "Image analysis and processing" }
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "Cloud Migration", desc: "Seamless move to AWS/Azure/GCP" },
      { name: "DevOps Automation", desc: "CI/CD pipelines & IaC" },
      { name: "Serverless Architecture", desc: "Cost-effective auto-scaling" },
      { name: "Security & Compliance", desc: "Enterprise-grade protection" }
    ]
  }
];

export const Navbar: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isServicesOpen) {
      const tl = gsap.timeline();
      
      tl.fromTo(dropdownRef.current, 
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: "power3.out" }
      );
      
      tl.to(chevronRef.current, { rotation: 90, duration: 0.3 }, "<");

      // Stagger items entrance
      tl.fromTo(".service-item", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.03, ease: "power2.out" },
        "-=0.2"
      );

    } else {
      if (dropdownRef.current) {
         gsap.to(dropdownRef.current, { 
            height: 0, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power3.in" 
         });
         gsap.to(chevronRef.current, { rotation: 0, duration: 0.3 });
      }
    }
  }, [isServicesOpen]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[#050a10]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="px-6 py-5 md:px-12 flex justify-between items-center relative z-50 bg-[#050a10]/0">
        <div className="flex items-center space-x-2 text-white">
          <LogoIcon className="w-6 h-6 text-paradigm-accent" />
          <span className="font-semibold text-lg tracking-tight uppercase">Fortuna Major</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {/* Services Dropdown Trigger */}
          <button 
            className={`flex items-center space-x-1 text-sm font-medium transition-colors focus:outline-none ${isServicesOpen ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            onMouseEnter={() => setIsServicesOpen(true)}
          >
            <span>Services</span>
            <div ref={chevronRef}>
               <ChevronRightIcon className="w-3 h-3 transition-transform" />
            </div>
          </button>

          <a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors hover:text-paradigm-accent">Methodology</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors hover:text-paradigm-accent">About</a>
          <button className="px-6 py-2 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 hover:border-paradigm-accent transition-all duration-300">
            Let's talk
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white cursor-pointer hover:text-paradigm-accent">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <div 
        ref={dropdownRef} 
        className="hidden md:block absolute top-full left-0 w-full bg-[#050a10]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden shadow-2xl origin-top"
        onMouseLeave={() => setIsServicesOpen(false)}
        style={{ height: 0, opacity: 0 }}
      >
         <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-3 gap-12">
            {servicesMenu.map((section, idx) => (
                <div key={idx} className="space-y-6">
                    <h3 className="text-paradigm-accent text-sm font-semibold tracking-wider uppercase border-b border-white/10 pb-2">{section.category}</h3>
                    <ul className="space-y-4">
                        {section.items.map((item, i) => (
                            <li key={i} className="service-item group cursor-pointer" style={{ opacity: 0 }}>
                                <div className="text-white font-medium text-sm group-hover:text-paradigm-accent transition-colors mb-0.5 flex items-center gap-2">
                                  {item.name}
                                  <ChevronRightIcon className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{item.desc}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
         </div>
         {/* Bottom CTA Bar */}
         <div className="bg-white/5 py-4 px-12 border-t border-white/5 flex justify-between items-center">
             <div className="text-xs text-gray-400">
                 Looking for a custom solution? <span className="text-white underline cursor-pointer hover:text-paradigm-accent">Contact our solution architects.</span>
             </div>
             <div className="text-xs text-gray-400 flex items-center gap-4">
                 <span>Recent Work: FinTech Dashboard</span>
                 <span>•</span>
                 <span>Healthcare AI Agent</span>
             </div>
         </div>
      </div>
    </nav>
  );
};