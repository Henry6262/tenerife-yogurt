import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollRef } from './ScrollContext';

export default function YogurtJar() {
  const { viewport } = useThree();
  const scrollRef = useScrollRef();
  const groupRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF('/bgyogurt-3d.glb');

  // Clone scene so we can manipulate it independently
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Compute scale based on viewport width
  const isMobile = viewport.width < 6;
  const baseScale = isMobile
    ? Math.min(1.0, Math.max(0.6, viewport.width / 5))
    : Math.min(2.2, Math.max(1.2, viewport.width / 3.5));

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const progress = scrollRef.global.progress;

    // Position: right side on desktop, bottom-center on mobile
    const targetX = isMobile
      ? 0
      : viewport.width / 2 - baseScale * 0.6;
    const targetY = isMobile
      ? -viewport.height * 0.25 + Math.sin(Date.now() * 0.0008) * 0.08
      : -viewport.height * 0.05 + Math.sin(Date.now() * 0.0008) * 0.08;

    // As user scrolls past the hero, rotate, drift down and clear out
    // (fast ramp so the jar is gone by the time the 2nd section's bowl appears)
    const scrollInfluence = Math.min(1, progress * 9);

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX + scrollInfluence * 1.5,
      delta * 2
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY - scrollInfluence * 5,
      delta * 2
    );

    // Gentle rotation on scroll
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollInfluence * Math.PI * 0.25,
      delta * 2
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      scrollInfluence * 0.1,
      delta * 2
    );

    // Shrink away as user scrolls past the hero
    const targetScale = baseScale * (1 - scrollInfluence * 0.85);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 2)
    );
  });

  return (
    <Float
      speed={0.6}
      rotationIntensity={0.15}
      floatIntensity={0.25}
      floatingRange={[-0.12, 0.12]}
    >
      <group ref={groupRef} scale={baseScale}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}
