import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Send, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.terminal-window', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.from('.social-dish', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative cursor-crosshair">
      
      <div className="mb-16 text-center">
        <h4 className="text-accent-secondary font-mono text-xs font-bold tracking-[0.2em] uppercase mb-2">&gt; SYS_ID: COMM_LINK</h4>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">ESTABLISH CONNECTION</h2>
      </div>

      {/* Terminal Window */}
      <div className="terminal-window glass-panel overflow-visible mb-16 border-accent-tertiary/40 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
        
        {/* Terminal Header */}
        <div className="bg-base/80 border-b border-border p-3 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-accent-tertiary/80 shadow-[0_0_8px_rgba(0,255,65,0.8)]"></div>
          </div>
          <div className="font-mono text-[10px] text-text-muted tracking-widest flex items-center gap-2">
            <Terminal size={12} /> SECURE_CHANNEL_ACTIVE
          </div>
        </div>
        
        {/* Terminal Body */}
        <div className="p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-tertiary/20 text-accent-tertiary mb-6 border border-accent-tertiary shadow-[0_0_20px_rgba(0,255,65,0.4)]">
                <Send size={24} />
              </div>
              <h3 className="text-2xl font-display text-white tracking-wider mb-2">TRANSMISSION SUCCESSFUL</h3>
              <p className="text-accent-tertiary font-mono text-sm tracking-widest">DATA PACKET RECEIVED. AWAITING RESPONSE.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative">
              
              <div className="relative group">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-border/50 py-3 text-white font-mono placeholder-text-muted/50 focus:outline-none focus:border-accent-primary transition-colors hover:border-border"
                  placeholder="&gt; INPUT_IDENTIFIER"
                  aria-label="Name"
                />
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent-primary transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-border/50 py-3 text-white font-mono placeholder-text-muted/50 focus:outline-none focus:border-accent-primary transition-colors hover:border-border"
                  placeholder="&gt; REPLY_ADDRESS"
                  aria-label="Email"
                />
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent-primary transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <div className="relative group">
                <textarea 
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-transparent border-b border-border/50 py-3 text-white font-mono placeholder-text-muted/50 focus:outline-none focus:border-accent-primary transition-colors resize-none overflow-hidden hover:border-border"
                  placeholder="&gt; ENTER_ENCRYPTED_PAYLOAD..."
                  aria-label="Message"
                ></textarea>
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent-primary transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary group relative overflow-hidden flex items-center gap-3 pr-4"
                >
                  <span className="font-mono tracking-widest relative z-10">
                    {isSubmitting ? 'TRANSMITTING...' : 'INITIATE TRANSFER'}
                  </span>
                  {!isSubmitting && (
                    <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                  
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-accent-primary top-0 left-0 h-full w-full opacity-20 animate-pulse"></div>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Satellite Dish Socials */}
      <div className="flex justify-center gap-8 mt-12">
        <a href="https://github.com/Vishnu-Pingali" target="_blank" rel="noopener noreferrer" className="social-dish group flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full border border-border bg-surface flex items-center justify-center text-text-muted group-hover:text-accent-primary group-hover:border-accent-primary group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 hover:-translate-y-2">
            <Github size={24} />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-text-muted/50 group-hover:text-accent-primary transition-colors">GH_LINK</span>
        </a>
        <a href="https://www.linkedin.com/in/vishnu-vardhan-9b7bb32a2/" target="_blank" rel="noopener noreferrer" className="social-dish group flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full border border-border bg-surface flex items-center justify-center text-text-muted group-hover:text-accent-secondary group-hover:border-accent-secondary group-hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] transition-all duration-300 hover:-translate-y-2">
            <Linkedin size={24} />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-text-muted/50 group-hover:text-accent-secondary transition-colors">IN_LINK</span>
        </a>
        <a href="mailto:vishnu.pingali122@gmail.com" className="social-dish group flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full border border-border bg-surface flex items-center justify-center text-text-muted group-hover:text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(2fb,191,36,0.4)] transition-all duration-300 hover:-translate-y-2">
            <Mail size={24} />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-text-muted/50 group-hover:text-amber-400 transition-colors">MAIL_LINK</span>
        </a>
      </div>
      
    </section>
  );
}
