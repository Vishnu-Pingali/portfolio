import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { NetworkGraph } from '../three/NetworkGraph';
import { Database, BrainCircuit, CloudCog, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "NEURAL ARCHITECTURE",
    icon: <BrainCircuit className="w-5 h-5 text-accent-secondary" />,
    skills: ["PyTorch", "TensorFlow", "Transformers", "GANs", "CNNs", "Reinforcement Learning"]
  },
  {
    title: "SIGNAL & LOGIC",
    icon: <Database className="w-5 h-5 text-accent-primary" />,
    skills: ["Python", "C++", "Signal Processing", "OpenCV", "Control Systems", "Mathematics"]
  },
  {
    title: "TACTICAL DEPLOYMENT",
    icon: <CloudCog className="w-5 h-5 text-accent-tertiary" />,
    skills: ["Docker", "AWS", "MLOps", "Model Quantization", "ONNX", "TensorRT"]
  },
  {
    title: "SECURITY PROTOCOLS",
    icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    skills: ["Adversarial ML", "Anomaly Detection", "GPS Spoofing Mitigation", "Cryptography"]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
      
      gsap.from('.graph-container', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      <div className="mb-16 text-center">
        <h4 className="text-accent-secondary font-mono text-xs font-bold tracking-[0.2em] uppercase mb-2">&gt; SYS_ID: COMPETENCY_MATRIX</h4>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">OPERATIONAL SKILLS</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Interactive 3D Network Graph */}
        <div className="graph-container w-full lg:w-1/2 h-[500px] relative">
          <div className="absolute inset-0 bg-accent-primary/5 rounded-full blur-3xl -z-10"></div>
          
          <Suspense fallback={
            <div className="w-full h-full flex flex-col items-center justify-center font-mono text-accent-secondary text-sm">
              <span className="mb-4 w-6 h-6 border-2 border-accent-secondary border-t-transparent rounded-full animate-spin"></span>
              [ MAPPING NEURAL TOPOLOGY ]
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
              <NetworkGraph />
              <EffectComposer>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
              </EffectComposer>
            </Canvas>
          </Suspense>
          
          {/* HUD framing */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-primary opacity-50"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-primary opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-primary opacity-50"></div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-accent-primary bg-base/80 px-4 py-1 border border-accent-primary/30 pointer-events-none">
            INTERACTIVE_NODE_GRAPH_v2.0
          </div>
        </div>

        {/* Skill Data Categories */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <div key={i} className="skill-card glass-panel p-6 border-t-2 border-t-accent-secondary hover:border-t-accent-primary transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                <div className="p-2 bg-base rounded border border-border shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  {group.icon}
                </div>
                <h3 className="font-display font-bold text-sm text-white tracking-widest">{group.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, j) => (
                  <span key={j} className="tag tag-cyan bg-base border-accent-secondary/30 text-text-muted hover:text-white hover:border-accent-secondary transition-colors cursor-crosshair">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
