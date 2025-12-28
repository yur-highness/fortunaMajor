import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import type{ Message } from '../types';
import { XIcon, SendIcon } from './Icons';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I can help you understand our low-code solutions. Ask me anything about Fortuna Major!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are a helpful sales assistant for Fortuna Major, a company specializing in custom low-code software solutions, AI integration, and SaaS product building.
            Your goal is to explain the benefits of low-code (speed, cost-efficiency, flexibility) and how Fortuna Major delivers high-quality results.
            Keep answers concise and professional yet friendly.
            
            User asks: ${inputValue}` }]
          }
        ]
      });

      const text = response.text || "I'm sorry, I couldn't generate a response at the moment.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the server. Please check your API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#0a111a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up origin-bottom-right transition-all duration-300">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-white">Fortuna Major Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-paradigm-accent text-black font-medium rounded-tr-none' 
                    : 'bg-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white/10 p-3 rounded-lg rounded-tl-none flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-paradigm-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-paradigm-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-paradigm-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about our solutions..."
                className="w-full bg-[#050a10] border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-paradigm-accent transition-colors"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-paradigm-accent disabled:opacity-50"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/50 transition-all duration-300 shadow-lg"
      >
        <img 
          src="https://picsum.photos/200/200?grayscale" 
          alt="Support" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
        />
        {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-colors">
               {/* Optional overlay content */}
            </div>
        )}
        
        {/* Close indicator when open */}
        {isOpen && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <XIcon className="w-6 h-6 text-white" />
            </div>
        )}
      </button>
    </div>
  );
};
