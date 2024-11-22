import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { PerspectiveCamera, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const Particles = () => {
  const { particleCount, hologramColor, rotationSpeed } = useStore();
  const points = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.x = Math.sin(clock.getElapsedTime() * rotationSpeed);
      points.current.rotation.y = Math.cos(clock.getElapsedTime() * rotationSpeed);
    }
  });

  const vertices = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    vertices[i] = (Math.random() - 0.5) * 10;
    vertices[i + 1] = (Math.random() - 0.5) * 10;
    vertices[i + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={vertices}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={hologramColor}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HolographicForm = () => {
  const { currentKey, hologramColor, hologramOpacity, rotationSpeed } = useStore();
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * rotationSpeed;
      mesh.current.rotation.y = clock.getElapsedTime() * rotationSpeed * 0.5;
    }
  });

  if (!currentKey) return null;

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshPhongMaterial
        color={hologramColor}
        emissive={hologramColor}
        emissiveIntensity={0.5}
        transparent
        opacity={hologramOpacity}
        wireframe
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const FloatingText = () => {
  const { currentPhrase, hologramColor } = useStore();

  if (!currentPhrase) return null;

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      position={[0, -2, 0]}
    >
      <Text
        fontSize={0.5}
        color={hologramColor}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={hologramColor}
      >
        {currentPhrase}
      </Text>
    </Float>
  );
};

export const Scene = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      
      <color attach="background" args={['#000']} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Particles />
      <HolographicForm />
      <FloatingText />
      
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Canvas>
  );
};