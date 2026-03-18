import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { id: 'python', label: 'Python', category: 'core', position: [0, 1.5, 0], code: 'def __init__(self):' },
  { id: 'pytorch', label: 'PyTorch', category: 'ml', position: [1.2, 0.5, 0.5], code: 'import torch.nn as nn' },
  { id: 'tf', label: 'TensorFlow', category: 'ml', position: [-1.2, 0.5, -0.5], code: 'tf.keras.layers' },
  { id: 'cv', label: 'Computer Vision', category: 'domain', position: [2, -1, -1], code: 'cv2.CascadeClassifier' },
  { id: 'rl', label: 'Reinforcement Learning', category: 'domain', position: [-2, -1, 1], code: 'env.step(action)' },
  { id: 'controls', label: 'Control Systems', category: 'domain', position: [0, -2, 1.5], code: 'PID = Kp*e + Ki*I' },
  { id: 'cloud', label: 'Cloud Deployment', category: 'infra', position: [0, -0.5, -2], code: 'docker build -t ai_api' }
];

// Define static connections for visual "network"
const connections = [
  ['python', 'pytorch'], ['python', 'tf'],
  ['pytorch', 'cv'], ['pytorch', 'rl'],
  ['tf', 'cv'], ['tf', 'rl'],
  ['python', 'cloud'], ['rl', 'controls'],
  ['cv', 'cloud']
];

export function NetworkGraph() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Lines */}
      {connections.map(([sourceId, targetId], i) => {
        const source = skills.find(s => s.id === sourceId);
        const target = skills.find(s => s.id === targetId);
        if (!source || !target) return null;
        return (
          <Line 
            key={i}
            points={[new THREE.Vector3(...source.position), new THREE.Vector3(...target.position)]}
            color="#7000ff"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}

      {/* Nodes */}
      {skills.map((skill) => (
        <Node key={skill.id} skill={skill} />
      ))}
    </group>
  );
}

function Node({ skill }) {
  const [hovered, setHovered] = useState(false);
  
  // Decide color based on category
  const getColor = () => {
    if (skill.category === 'core') return '#00f0ff'; // Neon blue
    if (skill.category === 'ml') return '#a855f7';  // Vivid violet
    return '#00ff41'; // Cyber green
  };

  return (
    <group position={skill.position}>
      <Sphere 
        args={[hovered ? 0.2 : 0.12, 16, 16]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        className="cursor-pointer"
      >
        <meshStandardMaterial 
          color={getColor()} 
          emissive={getColor()}
          emissiveIntensity={hovered ? 2 : 0.8}
        />
      </Sphere>

      {/* Default label (always visible but faint) */}
      {!hovered && (
        <Html distanceFactor={15} center position={[0, -0.3, 0]} className="pointer-events-none">
          <div className="text-[9px] font-mono text-text-muted whitespace-nowrap opacity-60">
            {skill.label}
          </div>
        </Html>
      )}

      {/* Hover Panel with code snippet */}
      {hovered && (
        <Html distanceFactor={8} position={[0, 0, 0]} zIndexRange={[100, 0]} className="pointer-events-none">
          <div className="bg-base border border-accent-secondary p-3 min-w-[200px] shadow-[0_0_20px_rgba(112,0,255,0.4)] backdrop-blur-md transform -translate-y-full -translate-x-1/2 -mt-4">
            <h4 className="text-white font-display font-bold text-sm mb-1">{skill.label}</h4>
            <div className="text-[10px] text-accent-secondary font-mono tracking-widest uppercase mb-2">TYPE: {skill.category}</div>
            
            <div className="bg-black/50 p-2 font-mono text-[10px] text-accent-tertiary border border-accent-tertiary/20">
              <span className="text-text-muted mr-2">1</span>
              <span className="typing-effect overflow-hidden block whitespace-nowrap border-r border-accent-tertiary">
                {skill.code}
              </span>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-primary"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-primary"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-primary"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-primary"></div>
          </div>
        </Html>
      )}
    </group>
  );
}
