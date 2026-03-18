import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Line } from '@react-three/drei';
import * as THREE from 'three';

export function SatelliteCore() {
  const satelliteRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Rotate the entire satellite complex
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = t * 0.2;
      satelliteRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
    // Counter-rotate the trajectory rings
    if (ring1Ref.current) ring1Ref.current.rotation.x = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.y = -t * 0.4;
  });

  // Trajectory line points
  const points = [];
  for (let i = 0; i <= 50; i++) {
    const angle = (i / 50) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * 4, Math.sin(angle) * 2, Math.sin(angle) * 4));
  }

  return (
    <group ref={satelliteRef}>
      {/* Core Unit (Octahedron abstraction) */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          wireframe={true} 
          emissive="#00f0ff" 
          emissiveIntensity={2} 
        />
      </mesh>

      {/* Inner solid core */}
      <Box args={[0.7, 0.7, 0.7]}>
        <meshStandardMaterial color="#05050a" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Solar Panel Wings */}
      <Box args={[4, 0.1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7000ff" wireframe />
      </Box>
      <Box args={[4, 0.05, 0.9]} position={[0, 0, 0]}>
         <meshStandardMaterial color="#05050a" />
      </Box>

      {/* Trajectory Rings */}
      <Torus ref={ring1Ref} args={[2.5, 0.01, 16, 100]} rotation={[Math.PI/2, 0, 0]}>
        <meshBasicMaterial color="#00ff41" transparent opacity={0.3} />
      </Torus>
      
      <Torus ref={ring2Ref} args={[3.2, 0.01, 16, 100]} rotation={[0, Math.PI/3, 0]}>
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} />
      </Torus>

      {/* Complex Trajectory Path */}
      <Line 
        points={points} 
        color="#7000ff" 
        lineWidth={1} 
        transparent 
        opacity={0.4} 
      />

      {/* Ambient data points floating near core */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere 
          key={i} 
          args={[0.03]} 
          position={[
            (Math.random() - 0.5) * 6, 
            (Math.random() - 0.5) * 6, 
            (Math.random() - 0.5) * 6
          ]}
        >
          <meshBasicMaterial color={i % 2 === 0 ? "#00f0ff" : "#00ff41"} />
        </Sphere>
      ))}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />
    </group>
  );
}
