import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Torus, Line } from '@react-three/drei';
import * as THREE from 'three';

export function SatelliteCore() {
  const satelliteRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  // Memoize trajectory points — was being recalculated every render
  const trajectoryPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * 4, Math.sin(angle) * 2, Math.sin(angle) * 4));
    }
    return pts;
  }, []);

  // Memoize random dot positions — was calling Math.random() inside JSX on every render
  const dotPositions = useMemo(() =>
    Array.from({ length: 12 }, () => [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
    ]),
  []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = t * 0.2;
      satelliteRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.x = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.y = -t * 0.4;
  });

  return (
    <group ref={satelliteRef}>
      {/* Core Unit */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#00f0ff" wireframe emissive="#00f0ff" emissiveIntensity={2} />
      </mesh>

      {/* Inner solid core */}
      <Box args={[0.7, 0.7, 0.7]}>
        <meshStandardMaterial color="#05050a" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Solar Panel Wings */}
      <Box args={[4, 0.1, 1]}>
        <meshStandardMaterial color="#7000ff" wireframe />
      </Box>
      <Box args={[4, 0.05, 0.9]}>
        <meshStandardMaterial color="#05050a" />
      </Box>

      {/* Trajectory Rings — reduced segment count for better perf */}
      <Torus ref={ring1Ref} args={[2.5, 0.01, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00ff41" transparent opacity={0.3} />
      </Torus>
      <Torus ref={ring2Ref} args={[3.2, 0.01, 8, 64]} rotation={[0, Math.PI / 3, 0]}>
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} />
      </Torus>

      {/* Trajectory Path */}
      <Line points={trajectoryPoints} color="#7000ff" lineWidth={1} transparent opacity={0.4} />

      {/* Memoized ambient data points */}
      {dotPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 4, 4]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00f0ff' : '#00ff41'} />
        </mesh>
      ))}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />
    </group>
  );
}
