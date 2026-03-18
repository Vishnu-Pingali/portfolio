import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Star, Trophy, Medal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    title: "SN BOSE SUMMER RESEARCH FELLOWSHIP",
    org: "S.N. BOSE NATIONAL CENTRE / DST-INSPIRE",
    icon: <Medal className="w-8 h-8 text-accent-tertiary" />,
    desc: "Highly selective national fellowship for elite research students."
  },
  {
    title: "TOP PERFORMER AWARD",
    org: "AIRPORTS AUTHORITY OF INDIA (UAM PROJECT)",
    icon: <Trophy className="w-8 h-8 text-accent-primary" />,
    desc: "Recognized for exceptional contribution to AI trajectory forecasting."
  },
  {
    title: "BEST PROJECT - SIGNAL INTELLIGENCE",
    org: "DRDO (DLRL) HACKATHON",
    icon: <Award className="w-8 h-8 text-accent-secondary" />,
    desc: "Excellence in adversarial signal detection and classification."
  }
];

export default function Awards() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.award-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="awards" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h4 className="text-accent-secondary font-mono text-xs font-bold tracking-[0.2em] uppercase mb-2">&gt; SYS_ID: MERIT_PROTOCOLS</h4>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">COMMENDATIONS</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {awards.map((award, i) => (
          <div key={i} className="award-card glass-panel group p-1 hover:border-accent-primary transition-all duration-500 bg-surface/20">
            <div className="p-8 flex flex-col items-center text-center h-full border border-border/50 group-hover:bg-accent-primary/5 transition-all">
              <div className="mb-6 p-4 bg-base rounded-full border border-border group-hover:border-accent-primary group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
                {award.icon}
              </div>
              <h3 className="text-sm font-display font-bold text-white mb-2 tracking-widest">{award.title}</h3>
              <p className="text-accent-primary font-mono text-[10px] uppercase tracking-wider mb-4">{award.org}</p>
              <div className="w-10 h-[1px] bg-border mb-4 group-hover:w-20 group-hover:bg-accent-primary transition-all duration-500"></div>
              <p className="text-text-muted font-mono text-xs leading-relaxed opacity-80">
                {award.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
