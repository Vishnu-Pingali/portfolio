import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export function NeuralSphere() {
  const pointsRef = useRef();
  const linesRef = useRef();
  
  const particleCount = 180;
  
  // Create particles
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 6;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      vel.push({
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.005,
        vz: (Math.random() - 0.5) * 0.003
      });
    }
    return [pos, vel];
  }, []);

  // Animate lines and points
  useFrame(({ clock, mouse }) => {
    if (!pointsRef.current) return;
    
    const pos = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      let x = pos[i * 3] + velocities[i].vx;
      let y = pos[i * 3 + 1] + velocities[i].vy;
      let z = pos[i * 3 + 2] + velocities[i].vz;
      
      if (Math.abs(x) > 7) velocities[i].vx *= -1;
      if (Math.abs(y) > 5) velocities[i].vy *= -1;
      if (Math.abs(z) > 3) velocities[i].vz *= -1;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Parallax on mouse move
    pointsRef.current.rotation.y += 0.001 + mouse.x * 0.005;
    pointsRef.current.rotation.x += 0.0005 + mouse.y * 0.003;
    
    if (linesRef.current) {
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
      
      // Update lines based on distance (run every 3 frames for perf)
      if (Math.floor(clock.elapsedTime * 60) % 3 === 0) {
        const verts = [];
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;
            
            if (distSq < 4.8) { // dist < ~2.2
              verts.push(
                pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
              );
            }
          }
        }
        linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      }
    }
  });

  return (
    <>
      <group>
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          {/* Tone mapped false allows color values > 1 to bloom brightly */}
          <pointsMaterial 
            color={[0.4, 0.4, 1.5]} 
            size={0.07} 
            transparent 
            opacity={0.8}
            toneMapped={false}
          />
        </points>
        <lineSegments ref={linesRef}>
          <bufferGeometry />
          <lineBasicMaterial 
            color={[0.4, 0.4, 1.5]} 
            transparent 
            opacity={0.15}
            toneMapped={false}
          />
        </lineSegments>
      </group>
      
      <EffectComposer>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </>
  );
}
