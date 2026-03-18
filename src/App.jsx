import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Awards from './components/Awards';
import Contact from './components/Contact';

function Stars() {
  useEffect(() => {
    const c = document.getElementById('star-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let w, h, ps = [];
    
    function resize() {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    }
    
    function init() {
      ps = [];
      for (let i = 0; i < 200; i++) {
        const type = Math.random();
        let color = '255, 255, 255';
        if (type > 0.8) color = '0, 240, 255'; // Neon Blue
        if (type > 0.95) color = '112, 0, 255'; // Deep Violet
        
        ps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.2,
          o: Math.random() * 0.7 + 0.2,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          color
        });
      }
    }
    
    let req;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ps.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.o})`;
        ctx.fill();
        if (p.o > 0.5) { // Glow for brighter stars
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        } else {
          ctx.shadowBlur = 0;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      });
      req = requestAnimationFrame(draw);
    }
    
    resize();
    init();
    draw();
    
    window.addEventListener('resize', () => { resize(); init(); });
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(req);
    };
  }, []);

  return <canvas id="star-canvas" className="w-full h-full fixed inset-0 -z-50 pointer-events-none"></canvas>;
}

function App() {
  return (
    <div className="min-h-screen text-text-main bg-base font-body selection:bg-accent-primary selection:text-white">
      <Stars />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Awards />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-text-muted text-sm border-t border-border mt-20 isolate">
        <p>© 2026 Vishnu Vardhan Pingali · Built with ❤️, React & AI</p>
      </footer>
    </div>
  );
}

export default App;
