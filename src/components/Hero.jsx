import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SatelliteCore } from '../three/SatelliteCore';
import { ChevronDown, FileDown, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-base text-accent-primary font-mono text-sm animate-pulse">
            [ INITIATING SATELLITE CORE... ]
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.5]}>
            <SatelliteCore />
          </Canvas>
        </Suspense>
      </div>

      {/* Hero Content HUD */}
      <div className="relative z-10 container mx-auto px-6 pt-20 flex flex-col items-center">
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="inline-flex items-center gap-3 px-4 py-1.5 border border-accent-tertiary/60 bg-accent-tertiary/10 backdrop-blur-md text-accent-tertiary font-mono text-sm font-bold mb-8 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
        >
          <span className="w-2 h-2 bg-accent-tertiary animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]"></span>
          SYS.STATUS: DST-INSPIRE ONLINE
        </motion.div>

        <motion.h1 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight mb-4"
        >
          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">VISHNU VARDHAN</span><br />
          <span className="text-gradient">PINGALI</span>
        </motion.h1>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
          className="w-24 h-[2px] bg-accent-primary mb-6 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
        />

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          className="text-sm md:text-base text-white max-w-2xl mx-auto mb-10 font-mono tracking-widest leading-relaxed bg-base/50 p-4 border-l-2 border-accent-primary"
        >
          &gt; MACHINE LEARNING ENGINEER<br/>
          &gt; AEROSPACE AI &amp; DEFENSE SYSTEMS<br/>
          &gt; DEEP LEARNING ARCHITECT
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="#projects" className="btn-primary">
            <Terminal size={18} /> View Research Projects
          </a>
          <a href="/Vishnu_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <FileDown size={18} /> Download Intel
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] font-mono text-accent-primary">LINK.ESTABLISH</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-accent-primary"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

      {/* HUD framing corners */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-accent-secondary opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-accent-secondary opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-accent-secondary opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-accent-secondary opacity-50 z-0 pointer-events-none"></div>
    </section>
  );
}
