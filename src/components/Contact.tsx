import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SendIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-anim", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate sending
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setIsSent(false), 3000);
        }, 1500);
    };

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    
                    {/* Left: Text Content */}
                    <div className="space-y-6">
                        <span className="text-paradigm-accent text-sm font-semibold tracking-wider uppercase contact-anim block">Get in Touch</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight contact-anim">
                            Ready to accelerate<br />
                            <span className="text-gray-500">your digital future?</span>
                        </h2>
                        <p className="text-gray-400 text-lg contact-anim max-w-md">
                            Whether you need a custom low-code platform, AI integration, or a complete SaaS overhaul, our engineers are ready.
                        </p>
                        
                        <div className="pt-8 space-y-4 contact-anim">
                            <div className="flex items-center space-x-4 text-gray-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <svg className="w-5 h-5 text-paradigm-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Email us</p>
                                    <p className="text-white">hello@fortunamajor.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form Card */}
                    <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative contact-anim">
                         {/* Glow effect */}
                         <div className="absolute top-0 right-0 w-64 h-64 bg-paradigm-accent/5 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formState.name}
                                    onChange={e => setFormState({...formState, name: e.target.value})}
                                    className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-paradigm-accent/50 focus:bg-white/5 transition-all placeholder:text-gray-600" 
                                    placeholder="e.g. Alex Morgan" 
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 ml-1">Work Email</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formState.email}
                                    onChange={e => setFormState({...formState, email: e.target.value})}
                                    className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-paradigm-accent/50 focus:bg-white/5 transition-all placeholder:text-gray-600" 
                                    placeholder="name@company.com" 
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 ml-1">Message</label>
                                <textarea 
                                    rows={4} 
                                    required
                                    value={formState.message}
                                    onChange={e => setFormState({...formState, message: e.target.value})}
                                    className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-paradigm-accent/50 focus:bg-white/5 transition-all resize-none placeholder:text-gray-600" 
                                    placeholder="Tell us about your project goals..." 
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isSent ? 'bg-green-500 text-white' : 'bg-paradigm-accent text-black hover:bg-cyan-300'}`}
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Sending...</span>
                                ) : isSent ? (
                                    <span>Message Sent!</span>
                                ) : (
                                    <>
                                        Send Message
                                        <SendIcon className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};