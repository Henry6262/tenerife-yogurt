import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/** The yogurt jar — sits centered in its own canvas, floats slow, barely moves. */
function Jar() {
  const { scene } = useGLTF('/bgyogurt-3d.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05; // barely-there slow spin
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.4} floatingRange={[-0.05, 0.05]}>
      <group ref={ref} position={[0, -0.3, 0]} scale={1.9}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

/** Drop-in 3D element for the hero's right column. Fills its parent. */
export default function HeroJar() {
  return (
    <Canvas
      camera={{ fov: 40, near: 0.1, far: 100, position: [0, 0, 6] }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#DBEAFE" />
      <Suspense fallback={null}>
        <Jar />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
