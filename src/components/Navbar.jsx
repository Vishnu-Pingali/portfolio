import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Terminal } from 'lucide-react';

const navItems = [
  { name: 'HOME', href: '#hero' },
  { name: 'PROFILE', href: '#about' },
  { name: 'MISSION_LOG', href: '#experience' },
  { name: 'ASSETS', href: '#projects' },
  { name: 'INTEL', href: '#skills' },
  { name: 'ACCOLADES', href: '#awards' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      scrolled ? 'bg-base/90 backdrop-blur-md py-4 border-border shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6 border-transparent'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* HUD Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="relative">
            <Rocket className="w-6 h-6 text-accent-primary group-hover:text-white transition-colors" />
            <div className="absolute -inset-1 border border-accent-primary/50 scale-125 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm"></div>
          </div>
          <span className="font-display font-bold text-lg tracking-[0.2em] text-white">
            V<span className="text-accent-primary">.</span>PINGALI
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className={`font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-300 py-2 px-3 flex items-center ${
                      isActive ? 'text-accent-primary' : 'text-text-muted hover:text-white'
                    }`}
                  >
                    <span className={`transition-all duration-300 mr-1 ${isActive ? 'opacity-100' : 'opacity-0 -translate-x-1 group-hover:opacity-100'}`}>[</span>
                    {item.name}
                    <span className={`transition-all duration-300 ml-1 ${isActive ? 'opacity-100' : 'opacity-0 translate-x-1 group-hover:opacity-100'}`}>]</span>
                  </a>
                </li>
              );
            })}
          </ul>
          
          <a href="#contact" className="flex items-center gap-2 px-5 py-2 border border-accent-primary/30 text-accent-primary font-mono text-[10px] tracking-widest hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 bg-surface/50" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
            <Terminal size={12} /> INITIATE_COMMS
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-muted hover:text-accent-primary transition-colors p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-base/98 backdrop-blur-2xl border-b border-border transition-all duration-500 ease-in-out overflow-hidden shadow-2xl ${
        mobileMenuOpen ? 'max-h-[500px] border-t border-border/50' : 'max-h-0 border-t-0 border-b-0 opacity-0'
      }`}>
        <ul className="flex flex-col px-8 py-8 gap-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href}
                className={`font-mono text-sm tracking-[0.2em] block py-3 border-b border-border/20 ${
                  activeSection === item.href.substring(1) ? 'text-accent-primary' : 'text-text-main hover:text-accent-secondary transition-colors'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                &gt; {item.name}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a 
              href="#contact" 
              className="font-mono text-sm tracking-[0.2em] block py-4 text-center border border-accent-primary text-accent-primary bg-accent-primary/5 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              onClick={() => setMobileMenuOpen(false)}
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              INITIATE_COMMS
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
