import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  {
    title: "Autonomous Space Ops",
    metric: "99.9% UPTIME",
    tech: "PyTorch / RLib",
    x: 3, y: 0, z: 0,
    speed: 0.5
  },
  {
    title: "SpaceNet Optimizer",
    metric: "40% EFFICIENCY",
    tech: "NSGA-II / Orbital Mech",
    x: -2, y: 1.5, z: -2,
    speed: 0.8
  },
  {
    title: "Adversarial Sat Security",
    metric: "94% SPOOF DETECT",
    tech: "GANs / Signal Intel",
    x: 0, y: -2, z: 3,
    speed: 0.6
  },
  {
    title: "Med-AI Forecasting",
    metric: "0.89 SSIM",
    tech: "Transformers / 3D CNN",
    x: 1.5, y: 2, z: 2,
    speed: 0.4
  }
];

export function OrbitalShowcase() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central AI Core */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial 
          color="#05050a" 
          emissive="#7000ff" 
          emissiveIntensity={0.5} 
          wireframe={true}
        />
      </Sphere>
      
      {/* Inner glowing core */}
      <Sphere args={[0.6, 16, 16]}>
        <meshBasicMaterial color="#00f0ff" />
      </Sphere>

      {/* Orbiting Project Nodes */}
      {projects.map((proj, i) => (
        <ProjectNode key={i} project={proj} />
      ))}
    </group>
  );
}

function ProjectNode({ project }) {
  const nodeRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Calculate orbit trajectory line
  const points = [];
  const radius = Math.sqrt(project.x*project.x + project.y*project.y + project.z*project.z);
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    // Simple circular orbit aligned to Y axis for visual clean lines
    points.push(new THREE.Vector3(Math.cos(angle) * radius, project.y, Math.sin(angle) * radius));
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (nodeRef.current && !hovered) {
      // Orbit mechanics
      const angle = t * project.speed + project.x; // offset by initial x pos
      nodeRef.current.position.x = Math.cos(angle) * radius;
      nodeRef.current.position.z = Math.sin(angle) * radius;
      nodeRef.current.position.y = project.y; // keep height constant for simple orbit
    }
  });

  return (
    <group>
      <Line 
        points={points} 
        color="#7000ff" 
        lineWidth={1} 
        transparent 
        opacity={0.15} 
      />
      
      <group 
        ref={nodeRef} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Sphere args={[hovered ? 0.3 : 0.15, 16, 16]}>
          <meshStandardMaterial 
            color={hovered ? "#00ff41" : "#00f0ff"} 
            emissive={hovered ? "#00ff41" : "#00f0ff"} 
            emissiveIntensity={hovered ? 2 : 1}
          />
        </Sphere>
        
        {hovered && (
          <Html distanceFactor={10} position={[0, 0.5, 0]} center zIndexRange={[100, 0]}>
            <div className="bg-base border border-accent-tertiary p-3 min-w-[200px] shadow-[0_0_15px_rgba(0,255,65,0.3)] backdrop-blur-md pointer-events-none" style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'}}>
              <div className="text-xs font-mono text-accent-tertiary mb-1 tracking-widest uppercase items-center flex gap-2">
                <span className="w-1.5 h-1.5 bg-accent-tertiary rounded-full animate-pulse"></span>
                TARGET LOCKED
              </div>
              <h4 className="text-white font-display font-bold text-sm mb-2">{project.title}</h4>
              <div className="flex justify-between items-end border-t border-border/50 pt-2 mt-2">
                <div className="text-[10px] font-mono text-text-muted">{project.tech}</div>
                <div className="text-[11px] font-mono font-bold text-accent-primary bg-accent-primary/10 px-1 py-0.5">{project.metric}</div>
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
