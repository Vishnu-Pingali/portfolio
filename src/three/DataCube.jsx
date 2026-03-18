import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export function DataCube() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.3;
      groupRef.current.rotation.y = t * 0.4;
    }
  });

  const texts = [
    { text: "DEEP LEARNING", pos: [0, 0, 1.01], rot: [0, 0, 0] },
    { text: "AEROSPACE AI", pos: [0, 0, -1.01], rot: [0, Math.PI, 0] },
    { text: "SIGNAL INTEL", pos: [1.01, 0, 0], rot: [0, Math.PI / 2, 0] },
    { text: "ML OPS", pos: [-1.01, 0, 0], rot: [0, -Math.PI / 2, 0] },
    { text: "COMPUTER VISION", pos: [0, 1.01, 0], rot: [-Math.PI / 2, 0, 0] },
    { text: "MACHINE LEARNING", pos: [0, -1.01, 0], rot: [Math.PI / 2, 0, 0] },

  ];

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Inner Glowing Core */}
      <mesh>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial 
          color="#05050a" 
          emissive="#7000ff" 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Wireframe Outline */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial 
          color="#00f0ff" 
          wireframe={true} 
          transparent 
          opacity={0.4} 
        />
      </mesh>

      {/* Text Faces */}
      {texts.map((face, index) => (
        <Text
          key={index}
          position={face.pos}
          rotation={face.rot}
          fontSize={0.25}
          color="#00ff41"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
          textAlign="center"
        >
          {face.text}
        </Text>
      ))}
    </group>
  );
}
