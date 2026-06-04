import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollRef } from './ScrollContext';

/* ─────────── GLB fruit models (cloned so each instance is independent) ─────────── */

function useClonedScene(url: string) {
  const { scene } = useGLTF(url);
  return useMemo(() => scene.clone(), [scene]);
}

function FruitModel({ type }: { type: FruitDef['type'] }) {
  const url =
    type === 'strawberry' ? '/strawberry.glb'
    : type === 'blueberry' ? '/blueberry.glb'
    : type === 'almond' ? '/almond.glb'
    : '/helzenut.glb';
  const clone = useClonedScene(url);
  return <primitive object={clone} />;
}

/* ─────────── Simple procedural bowl (placeholder "recipiente") ─────────── */

function Bowl() {
  return (
    <group>
      {/* Outer wall */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.15, 0.78, 0.85, 48, 1, true]} />
        <meshStandardMaterial color="#EFE6DA" side={THREE.DoubleSide} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Base disk */}
      <mesh position={[0, -0.42, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.78, 0.06, 48]} />
        <meshStandardMaterial color="#E2D5C5" roughness={0.4} />
      </mesh>
      {/* Yogurt fill */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.02, 0.8, 0.5, 48]} />
        <meshStandardMaterial color="#FBF7EF" roughness={0.65} />
      </mesh>
    </group>
  );
}

/* ─────────── Fruit instance data — LOCAL coords relative to the bowl center ─────────── */

interface FruitDef {
  type: 'strawberry' | 'blueberry' | 'almond' | 'hazelnut';
  endX: number;
  endZ: number;
  endY: number;
  scale: number;
  triggerStart: number; // section progress (0-1) when this fruit starts falling
}

// Fall span: each fruit takes ~0.16 of section progress to land.
const FALL_SPAN = 0.16;

// All land within the bowl's inner radius (~1.0 local). Stacked: later fruits rest higher.
const FRUITS: FruitDef[] = [
  // Wave 1
  { type: 'strawberry', endX: -0.30, endZ: 0.18, endY: 0.02, scale: 0.45, triggerStart: 0.12 },
  { type: 'blueberry', endX: 0.26, endZ: -0.10, endY: 0.06, scale: 0.30, triggerStart: 0.15 },
  { type: 'blueberry', endX: -0.12, endZ: -0.26, endY: 0.06, scale: 0.30, triggerStart: 0.18 },
  { type: 'almond', endX: 0.34, endZ: 0.22, endY: 0.10, scale: 0.34, triggerStart: 0.21 },
  // Wave 2
  { type: 'strawberry', endX: 0.05, endZ: 0.30, endY: 0.16, scale: 0.45, triggerStart: 0.34 },
  { type: 'blueberry', endX: 0.40, endZ: 0.02, endY: 0.18, scale: 0.30, triggerStart: 0.37 },
  { type: 'almond', endX: -0.40, endZ: 0.08, endY: 0.20, scale: 0.34, triggerStart: 0.40 },
  { type: 'hazelnut', endX: 0.16, endZ: -0.32, endY: 0.22, scale: 0.38, triggerStart: 0.43 },
  // Wave 3
  { type: 'hazelnut', endX: -0.30, endZ: -0.08, endY: 0.30, scale: 0.38, triggerStart: 0.56 },
  { type: 'strawberry', endX: -0.04, endZ: 0.02, endY: 0.34, scale: 0.45, triggerStart: 0.59 },
  { type: 'blueberry', endX: 0.30, endZ: 0.30, endY: 0.34, scale: 0.30, triggerStart: 0.62 },
  { type: 'blueberry', endX: -0.34, endZ: 0.26, endY: 0.36, scale: 0.30, triggerStart: 0.65 },
];

const DROP_FROM = 5.0; // local Y the fruit starts falling from (above the bowl)

/* ─────────── A single fruit falling from the top into the bowl ─────────── */

function FallingFruit({ def, progress }: { def: FruitDef; progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const rot = useRef(new THREE.Euler(0, 0, 0));

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const t = THREE.MathUtils.clamp((progress - def.triggerStart) / FALL_SPAN, 0, 1);
    const speed = delta * 5;

    // X/Z drift gently to their resting spot; Y falls with a bounce.
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, def.endX, speed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, def.endZ, speed);
    const y = THREE.MathUtils.lerp(DROP_FROM, def.endY, easeOutBounce(t));
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, speed);

    // Scale in quickly once it starts
    const s = t > 0 ? THREE.MathUtils.lerp(0.2, def.scale, easeOutQuad(Math.min(1, t * 3))) : 0;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, s, speed));

    // Tumble while falling, settle when landed
    const tumble = t < 0.85 ? delta * 7 : delta * 2.5;
    rot.current.x = THREE.MathUtils.lerp(rot.current.x, (1 - t) * 5, tumble);
    rot.current.y = THREE.MathUtils.lerp(rot.current.y, (1 - t) * 7 + 0.4, tumble);
    rot.current.z = THREE.MathUtils.lerp(rot.current.z, (1 - t) * 3, tumble);
    groupRef.current.rotation.copy(rot.current);
  });

  // Don't mount until just before it's due to fall
  if (progress < def.triggerStart - 0.03) return null;

  return (
    <group ref={groupRef} position={[def.endX, DROP_FROM, def.endZ]} scale={0}>
      <FruitModel type={def.type} />
    </group>
  );
}

/* ─────────── Stage: bowl + fruits, sharing one parent group so fruits land INSIDE the bowl ─────────── */

export default function BreakfastStage() {
  const { viewport } = useThree();
  const scrollRef = useScrollRef();
  const stageRef = useRef<THREE.Group>(null);

  const isMobile = viewport.width < 6;
  const targetX = isMobile ? 0 : viewport.width / 2 - 2.1;
  const targetY = isMobile ? -viewport.height * 0.18 : -0.4;
  const baseScale = isMobile ? 1.05 : 1.5;

  useFrame((_, delta) => {
    if (!stageRef.current) return;
    const section = scrollRef.sections.get('story');
    const progress = section?.progress ?? 0;
    const isActive = section?.isActive ?? false;
    const speed = delta * 3;

    // Entrance: the bowl pops in over the first 12% of the section.
    const entrance = THREE.MathUtils.clamp(progress / 0.12, 0, 1);
    let s = THREE.MathUtils.lerp(0.25, baseScale, easeOutQuad(entrance));

    // Exit: once we've scrolled well past the section, shrink away.
    if (!isActive && progress > 0.97) s = 0;

    stageRef.current.scale.setScalar(THREE.MathUtils.lerp(stageRef.current.scale.x, s, speed));
    stageRef.current.position.x = THREE.MathUtils.lerp(stageRef.current.position.x, targetX, speed);
    stageRef.current.position.y = THREE.MathUtils.lerp(stageRef.current.position.y, targetY, speed);
  });

  const progress = scrollRef.sections.get('story')?.progress ?? 0;
  if (progress < 0.005) return null;

  return (
    <group ref={stageRef} position={[targetX, targetY, 0]} scale={0.25}>
      <Float speed={0.5} floatIntensity={0.12} rotationIntensity={0.04} floatingRange={[-0.04, 0.04]}>
        <Bowl />
        {FRUITS.map((def, i) => (
          <FallingFruit key={i} def={def} progress={progress} />
        ))}
      </Float>
    </group>
  );
}

/* ─────────── easing ─────────── */

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

function easeOutBounce(t: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
}
