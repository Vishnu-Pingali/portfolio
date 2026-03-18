import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 80; // reduced from 180
const MAX_DIST_SQ = 6.0;   // slightly larger threshold so fewer checks needed
const MAX_LINE_VERTS = PARTICLE_COUNT * 6; // pre-allocate buffer

export function NeuralSphere() {
  const pointsRef = useRef();
  const linesRef = useRef();
  const frameCount = useRef(0);

  // Pre-allocate line buffer once — avoids GC churn every frame
  const lineBuffer = useMemo(() => new Float32Array(MAX_LINE_VERTS * 3), []);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3); // flat array = cache-friendly

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      vel[i * 3]     = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, []);

  useFrame(({ mouse }) => {
    if (!pointsRef.current) return;
    frameCount.current++;

    const pos = pointsRef.current.geometry.attributes.position.array;

    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x = pos[i * 3]     + vel[i * 3];
      let y = pos[i * 3 + 1] + vel[i * 3 + 1];
      let z = pos[i * 3 + 2] + vel[i * 3 + 2];

      if (Math.abs(x) > 7) vel[i * 3]     *= -1;
      if (Math.abs(y) > 5) vel[i * 3 + 1] *= -1;
      if (Math.abs(z) > 3) vel[i * 3 + 2] *= -1;

      pos[i * 3]     = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.001 + mouse.x * 0.005;
    pointsRef.current.rotation.x += 0.0005 + mouse.y * 0.003;

    // Only rebuild lines every 8 frames
    if (linesRef.current && frameCount.current % 8 === 0) {
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;

      let vi = 0;
      for (let i = 0; i < PARTICLE_COUNT && vi < MAX_LINE_VERTS - 6; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && vi < MAX_LINE_VERTS - 6; j++) {
          const dx = pos[i * 3]     - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < MAX_DIST_SQ) {
            lineBuffer[vi++] = pos[i * 3];
            lineBuffer[vi++] = pos[i * 3 + 1];
            lineBuffer[vi++] = pos[i * 3 + 2];
            lineBuffer[vi++] = pos[j * 3];
            lineBuffer[vi++] = pos[j * 3 + 1];
            lineBuffer[vi++] = pos[j * 3 + 2];
          }
        }
      }

      const attr = linesRef.current.geometry.attributes.position;
      if (attr) {
        attr.array.set(lineBuffer.subarray(0, vi));
        attr.count = vi / 3;
        attr.needsUpdate = true;
      } else {
        linesRef.current.geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(lineBuffer.slice(0, vi), 3)
        );
      }
      linesRef.current.geometry.setDrawRange(0, vi / 3);
    } else if (linesRef.current) {
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
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
  );
}
