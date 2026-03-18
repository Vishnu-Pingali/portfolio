import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitalShowcase } from '../three/OrbitalShowcase';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "AUTONOMOUS SPACE OPS",
    desc: "AI control system for multi-satellite constellation coordination.",
    tech: ["PyTorch", "RLib", "C++"],
    metric: "99.9% UPTIME",
    link: "#",
    github: "#"
  },
  {
    title: "SPACENET OPTIMIZER",
    desc: "Multi-objective trajectory optimization for deep space missions combining NSGA-II and orbital mechanics.",
    tech: ["Python", "NSGA-II", "React"],
    metric: "40% EFFICIENCY BOOST",
    link: "#",
    github: "#"
  },
  {
    title: "ADVERSARIAL SAT SECURITY",
    desc: "GAN-based framework for detecting and mitigating GPS spoofing attacks on satellite infrastructure.",
    tech: ["TensorFlow", "GANs", "SDR"],
    metric: "94% SPOOF DETECT",
    link: "#",
    github: "#"
  },
  {
    title: "TRANSFORMER MED-FORECAST",
    desc: "Cross-modal attention networks predicting disease progression using MRI and clinical history.",
    tech: ["PyTorch", "Transformers"],
    metric: "0.89 SSIM",
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.15
        });
      });
      
      gsap.from('.orbital-canvas-container', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative isolate">
      
      <div className="mb-16 text-center">
        <h4 className="text-accent-secondary font-mono text-xs font-bold tracking-[0.2em] uppercase mb-2">&gt; SYS_ID: INTEL_ASSETS</h4>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">PROJECT DATABASE</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-16">
        
        {/* Orbital 3D Showcase */}
        <div className="orbital-canvas-container w-full lg:w-1/2 h-[500px] relative order-2 lg:order-1">
          <div className="absolute inset-0 bg-accent-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <Suspense fallback={
            <div className="w-full h-full flex flex-col items-center justify-center font-mono text-accent-tertiary text-sm">
              <span className="mb-4 w-6 h-6 border-2 border-t-accent-tertiary border-r-transparent border-b-accent-primary border-l-transparent rounded-full animate-spin"></span>
              [ CALIBRATING ORBITAL MECHANICS ]
            </div>
          }>
            <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
              <OrbitalShowcase />
              <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
              </EffectComposer>
            </Canvas>
          </Suspense>
          
          {/* Target Reticle Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-accent-secondary/30 rounded-full pointer-events-none z-10 flex items-center justify-center">
            <div className="w-1 h-2 bg-accent-primary absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-1 h-2 bg-accent-primary absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
            <div className="w-2 h-1 bg-accent-primary absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-2 h-1 bg-accent-primary absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-2 h-2 rounded-full border border-accent-tertiary animate-ping opacity-50"></div>
          </div>
        </div>

        {/* Project Context Data */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <div className="glass-panel p-8 border-r-4 border-r-accent-secondary">
            <h3 className="text-xl font-display text-white mb-4">ORBITAL SHOWCASE</h3>
            <p className="text-text-muted font-mono leading-relaxed text-sm mb-6">
              Interactive visualization of active research protocols. Hover over orbital nodes in the adjacent view to access real-time metric telemetry and architectural stack details.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-6">
              <div>
                <div className="text-2xl font-display text-accent-primary">4</div>
                <div className="text-[10px] font-mono tracking-widest text-text-muted">ACTIVE NODES</div>
              </div>
              <div>
                <div className="text-2xl font-display text-accent-tertiary">100%</div>
                <div className="text-[10px] font-mono tracking-widest text-text-muted">SYSTEM SYNC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid List view for detailed reading */}
      <div className="grid md:grid-cols-2 gap-6">
        {projectsData.map((project, i) => (
          <div key={i} className="project-card glass-panel group p-1 transition-all duration-500 hover:border-accent-primary hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-surface/30">
            <div className="h-full w-full bg-base/80 p-6 flex flex-col relative overflow-hidden pointer-events-none group-hover:pointer-events-auto">
              
              {/* Animated HUD Scanline on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-primary/50 shadow-[0_0_10px_rgba(0,240,255,1)] translate-y-[-10px] group-hover:animate-[scan_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 -z-10"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-lg font-display font-bold text-white group-hover:text-accent-primary transition-colors">{project.title}</h3>
                <div className="bg-accent-tertiary/10 text-accent-tertiary px-2 py-1 font-mono font-bold text-[10px] tracking-widest border border-accent-tertiary/30 shadow-[0_0_8px_rgba(0,255,65,0.2)] whitespace-nowrap">
                  {project.metric}
                </div>
              </div>
              
              <p className="text-text-muted font-mono text-xs leading-relaxed mb-6 flex-grow relative z-10">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {project.tech.map((t, j) => (
                  <span key={j} className="tag tag-indigo bg-transparent border-accent-primary/20 text-accent-primary/80 group-hover:border-accent-primary/50 group-hover:text-accent-primary transition-colors text-[10px]">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-auto border-t border-border/30 pt-4 relative z-10">
                <a href={project.github} className="flex items-center gap-2 text-text-muted hover:text-white transition-colors cursor-pointer pointer-events-auto">
                  <Github size={16} />
                  <span className="font-mono text-xs uppercase tracking-wider">Source</span>
                </a>
                <a href={project.link} className="flex items-center gap-2 text-text-muted hover:text-accent-primary transition-colors cursor-pointer pointer-events-auto">
                  <ExternalLink size={16} />
                  <span className="font-mono text-xs uppercase tracking-wider">Deploy</span>
                </a>
              </div>
              
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
