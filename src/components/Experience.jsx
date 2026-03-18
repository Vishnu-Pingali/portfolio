import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Satellite, Shield, Crosshair, Microchip, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "RESEARCH INTERN - URBAN AIR MOBILITY AI",
    org: "AIRPORTS AUTHORITY OF INDIA",
    code: "AAI-UAM-01",
    date: "JAN 2026 - PRES",
    icon: <Satellite className="w-5 h-5 text-accent-primary" />,
    desc: [
      "Developing centralized AI system for urban air mobility trajectory coordination.",
      "Designing ML collision avoidance protocols for dense airspace.",
      "Building demand forecasting models for vertiport capacity planning."
    ]
  },
  {
    role: "DEFENSE ELECTRONICS RESEARCH INTERN",
    org: "DRDO (DLRL)",
    code: "DRDO-SIGINT-99",
    date: "JAN 2026 - PRES",
    icon: <Shield className="w-5 h-5 text-accent-secondary" />,
    desc: [
      "Contributing to classified defense research in electronic warfare.",
      "Developing signal processing ML for automated threat recognition.",
      "Implementing real-time anomaly detection in hostile comms."
    ]
  },
  {
    role: "SN BOSE SUMMER RESEARCH FELLOW",
    org: "DST-INSPIRE",
    code: "DST-SEC-25",
    date: "JUN 2025 - JUL 2025",
    icon: <Crosshair className="w-5 h-5 text-accent-tertiary" />,
    desc: [
      "Developed adversarial ML framework for GPS spoofing detection (94% accuracy).",
      "Researched quantum-inspired hybrid ML methods for signal anomaly detection."
    ]
  },
  {
    role: "SEMICONDUCTOR RELIABILITY RESEARCH",
    org: "GOVT GRANT - NIT SILCHAR",
    code: "NIT-NANO-04",
    date: "MAY 2025 - JUL 2025",
    icon: <Microchip className="w-5 h-5 text-amber-400" />,
    desc: [
      "Built multi-output regression models for nanosheet FET reliability (91% accuracy).",
      "Predicted Ion/Ioff, Vth, and S.S. parameters for next-gen transistors."
    ]
  },
  {
    role: "AI/ML INFERENCE PIPELINE INTERN",
    org: "NEXT24TECH",
    code: "NXT-OPT-24",
    date: "JUL 2024 - SEP 2024",
    icon: <Activity className="w-5 h-5 text-blue-400" />,
    desc: [
      "Optimized inference time by 35% while maintaining 98% accuracy.",
      "Deployed models in high-load cloud infrastructure. Awarded Top Performer."
    ]
  }
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.mission-log-entry').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          x: -40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.1
        });
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="mb-16 border-b border-border pb-4 flex justify-between items-end">
        <div>
          <h4 className="text-accent-secondary font-mono text-xs font-bold tracking-[0.2em] uppercase mb-2">&gt; SYS_ID: CAREER_TRAJECTORY</h4>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">MISSION LOG</h2>
        </div>
        <div className="text-accent-tertiary font-mono text-[10px] hidden sm:block">STATUS: RECORDING</div>
      </div>

      <div className="relative pl-8 md:pl-12">
        <div className="timeline-line"></div>
        
        {experiences.map((exp, i) => (
          <div key={i} className="mission-log-entry relative mb-12 last:mb-0 group">
            <div className="timeline-dot group-hover:bg-accent-tertiary group-hover:border-accent-tertiary transition-colors duration-300"></div>
            
            <div className="glass-panel p-6 border-l-2 hover:border-l-accent-tertiary transition-all duration-300 bg-surface/50">
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 border-b border-border/50 pb-4">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 p-2 bg-base rounded-md border border-border shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white tracking-wide">{exp.role}</h3>
                    <div className="text-accent-primary font-mono text-xs mt-1 tracking-widest">{exp.org}</div>
                  </div>
                </div>
                
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-accent-secondary bg-accent-secondary/10 px-2 py-1 rounded">
                    {exp.code}
                  </div>
                  <div className="text-xs font-mono text-text-muted">
                    {exp.date}
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2 mt-4">
                {exp.desc.map((bullet, j) => (
                  <li key={j} className="text-text-main font-mono text-xs relative pl-5 flex items-start opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="absolute left-0 top-[2px] text-accent-tertiary font-bold">&gt;</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
