import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollRef } from './ScrollContext';

/* ─────────── GLB assets ─────────── */

function StrawberryModel({ refProp }: { refProp: React.RefObject<THREE.Group> }) {
  const { scene } = useGLTF('/strawberry.glb');
  const clone = useMemo(() => scene.clone(), [scene]);
  return <primitive ref={refProp} object={clone} />;
}

function BlueberryModel({ refProp }: { refProp: React.RefObject<THREE.Group> }) {
  const { scene } = useGLTF('/blueberry.glb');
  const clone = useMemo(() => scene.clone(), [scene]);
  return <primitive ref={refProp} object={clone} />;
}

function AlmondModel({ refProp }: { refProp: React.RefObject<THREE.Group> }) {
  const { scene } = useGLTF('/almond.glb');
  const clone = useMemo(() => scene.clone(), [scene]);
  return <primitive ref={refProp} object={clone} />;
}

function HazelnutModel({ refProp }: { refProp: React.RefObject<THREE.Group> }) {
  const { scene } = useGLTF('/helzenut.glb');
  const clone = useMemo(() => scene.clone(), [scene]);
  return <primitive ref={refProp} object={clone} />;
}

/* ─────────── Placeholder bowl ─────────── */

function Bowl() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 0.9, 0.8, 32, 1, true]} />
        <meshStandardMaterial color="#E8D5C4" side={THREE.DoubleSide} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
        <meshStandardMaterial color="#E8D5C4" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 0.85, 0.55, 32]} />
        <meshStandardMaterial color="#FDF6E3" roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ─────────── fruit instance data ─────────── */

interface FruitDef {
  type: 'strawberry' | 'blueberry' | 'almond' | 'hazelnut';
  startX: number;
  startZ: number;
  startY: number;
  endX: number;
  endZ: number;
  endY: number;
  endRotX: number;
  endRotY: number;
  endRotZ: number;
  scale: number;
  triggerStart: number; // 0-1 section progress when this fruit starts falling
  triggerEnd: number;   // 0-1 section progress when this fruit lands
}

const FRUITS: FruitDef[] = [
  // Wave 1
  { type: 'strawberry', startX: -0.4, startZ: 0.2, startY: 3.5, endX: -0.35, endZ: 0.15, endY: 0.15, endRotX: 0.2, endRotY: 0.5, endRotZ: 0.1, scale: 0.5, triggerStart: 0.15, triggerEnd: 0.30 },
  { type: 'blueberry',  startX: 0.3,  startZ: -0.1, startY: 4.0, endX: 0.25,  endZ: -0.05, endY: 0.25, endRotX: 0.1, endRotY: 0.3, endRotZ: 0.2, scale: 0.35, triggerStart: 0.17, triggerEnd: 0.32 },
  { type: 'blueberry',  startX: -0.2, startZ: -0.3, startY: 3.8, endX: -0.15, endZ: -0.2, endY: 0.30, endRotX: 0.3, endRotY: 0.1, endRotZ: 0.15, scale: 0.35, triggerStart: 0.19, triggerEnd: 0.34 },
  { type: 'blueberry',  startX: 0.5,  startZ: 0.3,  startY: 4.2, endX: 0.4,   endZ: 0.2,   endY: 0.20, endRotX: 0.15, endRotY: 0.4, endRotZ: 0.1, scale: 0.35, triggerStart: 0.21, triggerEnd: 0.36 },
  // Wave 2
  { type: 'strawberry', startX: 0.1,  startZ: 0.4,  startY: 3.6, endX: 0.1,   endZ: 0.3,   endY: 0.20, endRotX: 0.25, endRotY: 0.6, endRotZ: 0.05, scale: 0.5, triggerStart: 0.35, triggerEnd: 0.48 },
  { type: 'almond',     startX: -0.5, startZ: 0.1,  startY: 4.0, endX: -0.4,  endZ: 0.05,  endY: 0.35, endRotX: 0.2, endRotY: 0.2, endRotZ: 0.3, scale: 0.4, triggerStart: 0.38, triggerEnd: 0.51 },
  { type: 'almond',     startX: 0.4,  startZ: -0.4, startY: 3.9, endX: 0.35,  endZ: -0.3,  endY: 0.30, endRotX: 0.1, endRotY: 0.5, endRotZ: 0.2, scale: 0.4, triggerStart: 0.40, triggerEnd: 0.53 },
  { type: 'blueberry',  startX: -0.1, startZ: 0.35, startY: 4.1, endX: -0.05, endZ: 0.25,  endY: 0.28, endRotX: 0.3, endRotY: 0.2, endRotZ: 0.1, scale: 0.35, triggerStart: 0.42, triggerEnd: 0.55 },
  // Wave 3
  { type: 'hazelnut',   startX: 0.3,  startZ: 0.1,  startY: 3.7, endX: 0.2,   endZ: 0.05,  endY: 0.40, endRotX: 0.2, endRotY: 0.4, endRotZ: 0.25, scale: 0.45, triggerStart: 0.55, triggerEnd: 0.68 },
  { type: 'hazelnut',   startX: -0.3, startZ: -0.2, startY: 3.8, endX: -0.25, endZ: -0.15, endY: 0.35, endRotX: 0.15, endRotY: 0.3, endRotZ: 0.2, scale: 0.45, triggerStart: 0.58, triggerEnd: 0.71 },
  { type: 'strawberry', startX: 0.05, startZ: -0.35, startY: 3.5, endX: 0.0,   endZ: -0.25, endY: 0.18, endRotX: 0.3, endRotY: 0.5, endRotZ: 0.15, scale: 0.5, triggerStart: 0.60, triggerEnd: 0.73 },
  { type: 'blueberry',  startX: 0.45, startZ: 0.25, startY: 4.0, endX: 0.35,  endZ: 0.15,  endY: 0.22, endRotX: 0.2, endRotY: 0.1, endRotZ: 0.3, scale: 0.35, triggerStart: 0.63, triggerEnd: 0.76 },
];

/* ─────────── single falling fruit ─────────── */

function FallingFruit({ def, progress }: { def: FruitDef; progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const rotRef = useRef(new THREE.Euler(0, 0, 0));

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const t = THREE.MathUtils.clamp(
      (progress - def.triggerStart) / (def.triggerEnd - def.triggerStart),
      0,
      1
    );

    const speed = delta * 4;

    // Bounce easing on Y
    const y = THREE.MathUtils.lerp(def.startY, def.endY, easeOutBounce(t));
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, def.startX + (def.endX - def.startX) * t, speed);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, speed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, def.startZ + (def.endZ - def.startZ) * t, speed);

    // Scale in
    const s = t > 0 ? THREE.MathUtils.lerp(0.2, def.scale, easeOutQuad(Math.min(1, t * 3))) : 0;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, s, speed));

    // Rotation: tumble while falling, settle at end
    const rotSpeed = t < 0.9 ? delta * 8 : delta * 2;
    rotRef.current.x = THREE.MathUtils.lerp(rotRef.current.x, def.endRotX * t + (1 - t) * 4, rotSpeed);
    rotRef.current.y = THREE.MathUtils.lerp(rotRef.current.y, def.endRotY * t + (1 - t) * 6, rotSpeed);
    rotRef.current.z = THREE.MathUtils.lerp(rotRef.current.z, def.endRotZ * t + (1 - t) * 2, rotSpeed);
    groupRef.current.rotation.copy(rotRef.current);
  });

  if (progress <= def.triggerStart - 0.05) return null;

  return (
    <group ref={groupRef} scale={0}>
      {def.type === 'strawberry' && <StrawberryModel refProp={groupRef} />}
      {def.type === 'blueberry' && <BlueberryModel refProp={groupRef} />}
      {def.type === 'almond' && <AlmondModel refProp={groupRef} />}
      {def.type === 'hazelnut' && <HazelnutModel refProp={groupRef} />}
    </group>
  );
}

/* ─────────── stage ─────────── */

export default function BreakfastStage() {
  const { viewport } = useThree();
  const scrollRef = useScrollRef();
  const bowlRef = useRef<THREE.Group>(null);

  const targetX = useMemo(() => viewport.width / 2 - 1.6, [viewport.width]);
  const targetY = useMemo(() => -viewport.height * 0.05, [viewport.height]);

  useFrame((_, delta) => {
    const section = scrollRef.sections.get('story');
    const progress = section?.progress ?? 0;
    const isActive = section?.isActive ?? false;

    if (!bowlRef.current) return;
    const speed = delta * 3;

    // Bowl entrance 0→0.15
    const bowlT = THREE.MathUtils.clamp(progress / 0.15, 0, 1);
    const bowlY = THREE.MathUtils.lerp(-viewport.height * 0.8, targetY, easeOutQuad(bowlT));
    bowlRef.current.position.x = THREE.MathUtils.lerp(bowlRef.current.position.x, targetX, speed);
    bowlRef.current.position.y = THREE.MathUtils.lerp(bowlRef.current.position.y, bowlY, speed);
    bowlRef.current.rotation.y = THREE.MathUtils.lerp(bowlRef.current.rotation.y, Math.PI * 0.1 * bowlT, speed);
    const bowlS = THREE.MathUtils.lerp(0.4, 1.3, easeOutQuad(bowlT));
    bowlRef.current.scale.setScalar(THREE.MathUtils.lerp(bowlRef.current.scale.x, bowlS, speed));

    // Fade out when section is far past
    if (!isActive && progress > 0.95) {
      const fade = THREE.MathUtils.lerp(bowlRef.current.scale.x, 0, speed);
      bowlRef.current.scale.setScalar(fade);
    }
  });

  const section = scrollRef.sections.get('story');
  const progress = section?.progress ?? 0;

  if (progress < 0.01) return null;

  return (
    <>
      <Float speed={0.4} floatIntensity={0.15} rotationIntensity={0.05} floatingRange={[-0.05, 0.05]}>
        <group ref={bowlRef}>
          <Bowl />
        </group>
      </Float>
      {FRUITS.map((def, i) => (
        <FallingFruit key={i} def={def} progress={progress} />
      ))}
    </>
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
