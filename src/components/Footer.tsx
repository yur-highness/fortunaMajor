import React from 'react';
import { LogoIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/5 bg-[#020508] pt-20 pb-10 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 text-white mb-6">
            <LogoIcon className="w-6 h-6 text-paradigm-accent" />
            <span className="font-semibold text-lg tracking-tight uppercase">Fortuna Major</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Building the digital future with precision, speed, and intelligence.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-6">Services</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-paradigm-accent transition-colors">Low-Code Development</a></li>
            <li><a href="#" className="hover:text-paradigm-accent transition-colors">AI & Machine Learning</a></li>
            <li><a href="#" className="hover:text-paradigm-accent transition-colors">Cloud Architecture</a></li>
            <li><a href="#" className="hover:text-paradigm-accent transition-colors">Enterprise Consulting</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-paradigm-accent transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-paradigm-accent transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-paradigm-accent transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-paradigm-accent transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-medium mb-6">Stay Updated</h4>
           <div className="flex">
             <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-paradigm-accent w-full" />
             <button className="bg-paradigm-accent text-black px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-cyan-300 transition-colors">
               Go
             </button>
           </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 text-sm">© 2024 Fortuna Major. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-gray-600 hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-gray-600 hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};
