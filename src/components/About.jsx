import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { DataCube } from '../three/DataCube';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-terminal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.from('.canvas-container', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative isolate">
      
      <div className="mb-16">
        <h4 className="text-accent-secondary font-mono text-xs font-bold tracking-[0.2em] uppercase mb-2">&gt; SYS_ID: PERSONNEL_SUMMARY</h4>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">OPERATIVE PROFILE</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Terminal Info Card */}
        <div className="about-terminal glass-panel p-8 md:p-10 flex flex-col items-start border-l-4 border-l-accent-primary">
          <div className="text-accent-primary font-mono text-sm mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-primary rounded-sm animate-pulse"></span>
            CLEARANCE: LEVEL 5 (Govt Research)
          </div>
          
          <h3 className="text-2xl font-display mb-2 drop-shadow-[0_0_5px_rgba(0,240,255,0.6)] text-white">VISHNU VARDHAN PINGALI</h3>
          <p className="text-accent-tertiary mb-8 font-mono text-sm">B.Tech — AI &amp; Data Science (2022–2026)</p>
          
          <div className="font-mono text-sm text-text-muted leading-relaxed space-y-4">
            <p className="flex items-start gap-2">
              <span className="text-accent-secondary mt-1">&gt;</span>
              Results-driven AI engineer holding high-level government research fellowships. 
            </p>
            <p className="flex items-start gap-2">
              <span className="text-accent-secondary mt-1">&gt;</span>
              Specialized in building production-ready inference systems for national security (DRDO), aerospace traffic volume (Airports Authority of India), and semiconductor infrastructure.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-accent-secondary mt-1">&gt;</span>
              Core philosophy: <span className="text-white font-body italic">"AI is not just about intelligence — it's about resilience, precision, and tactical discovery."</span>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border w-full grid grid-cols-2 gap-4">
            <div>
              <div className="text-accent-tertiary text-2xl font-display font-bold">94%</div>
              <div className="text-[10px] font-mono text-text-muted tracking-widest mt-1">SPOOF DETECT LOGIC</div>
            </div>
            <div>
              <div className="text-accent-primary text-2xl font-display font-bold">0.89</div>
              <div className="text-[10px] font-mono text-text-muted tracking-widest mt-1">MED-AI SSIM SCORE</div>
            </div>
            <div>
              <div className="text-accent-secondary text-2xl font-display font-bold">35%</div>
              <div className="text-[10px] font-mono text-text-muted tracking-widest mt-1">INFERENCE OPT</div>
            </div>
            <div>
              <div className="text-white text-2xl font-display font-bold">4</div>
              <div className="text-[10px] font-mono text-text-muted tracking-widest mt-1">GOV FELLOWSHIPS</div>
            </div>
          </div>
        </div>

        {/* 3D Data Cube */}
        <div className="canvas-container h-[400px] lg:h-[500px] w-full relative">
          <div className="absolute inset-0 bg-accent-primary/5 rounded-full blur-3xl -z-10"></div>
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center font-mono text-accent-tertiary animate-pulse">[ LOADING DATA CORE ]</div>}>
            <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
              <DataCube />
              <EffectComposer>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={2} />
              </EffectComposer>
            </Canvas>
          </Suspense>
          
          {/* HUD framing for the canvas area */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent-secondary"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent-secondary"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent-secondary"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent-secondary"></div>
        </div>

      </div>
    </section>
  );
}
