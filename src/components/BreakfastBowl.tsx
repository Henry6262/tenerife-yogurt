import { Suspense, useRef, useMemo, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* In-section breakfast bowl. Scroll progress is passed in via a ref PROP
 * (refs cross the R3F Canvas boundary; React context does not). */

type ProgRef = MutableRefObject<number>;

function useClonedScene(url: string) {
  const { scene } = useGLTF(url);
  return useMemo(() => scene.clone(), [scene]);
}

type FruitType = 'strawberry' | 'blueberry' | 'almond' | 'hazelnut';

function FruitModel({ type }: { type: FruitType }) {
  const url =
    type === 'strawberry' ? '/strawberry.glb'
    : type === 'blueberry' ? '/blueberry.glb'
    : type === 'almond' ? '/almond.glb'
    : '/helzenut.glb';
  return <primitive object={useClonedScene(url)} />;
}

function Bowl() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.15, 0.78, 0.85, 48, 1, true]} />
        <meshStandardMaterial color="#EFE6DA" side={THREE.DoubleSide} roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.42, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.78, 0.06, 48]} />
        <meshStandardMaterial color="#E2D5C5" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.02, 0.8, 0.5, 48]} />
        <meshStandardMaterial color="#FBF7EF" roughness={0.65} />
      </mesh>
    </group>
  );
}

interface FruitDef {
  type: FruitType;
  endX: number;
  endZ: number;
  endY: number;
  scale: number;
  triggerStart: number;
}

const FALL_SPAN = 0.16;
const DROP_FROM = 5.0;

const FRUITS: FruitDef[] = [
  { type: 'strawberry', endX: -0.30, endZ: 0.18, endY: 0.02, scale: 0.45, triggerStart: 0.12 },
  { type: 'blueberry', endX: 0.26, endZ: -0.10, endY: 0.06, scale: 0.30, triggerStart: 0.15 },
  { type: 'blueberry', endX: -0.12, endZ: -0.26, endY: 0.06, scale: 0.30, triggerStart: 0.18 },
  { type: 'almond', endX: 0.34, endZ: 0.22, endY: 0.10, scale: 0.34, triggerStart: 0.21 },
  { type: 'strawberry', endX: 0.05, endZ: 0.30, endY: 0.16, scale: 0.45, triggerStart: 0.30 },
  { type: 'blueberry', endX: 0.40, endZ: 0.02, endY: 0.18, scale: 0.30, triggerStart: 0.33 },
  { type: 'almond', endX: -0.40, endZ: 0.08, endY: 0.20, scale: 0.34, triggerStart: 0.36 },
  { type: 'hazelnut', endX: 0.16, endZ: -0.32, endY: 0.22, scale: 0.38, triggerStart: 0.39 },
  { type: 'hazelnut', endX: -0.30, endZ: -0.08, endY: 0.30, scale: 0.38, triggerStart: 0.48 },
  { type: 'strawberry', endX: -0.04, endZ: 0.02, endY: 0.34, scale: 0.45, triggerStart: 0.51 },
  { type: 'blueberry', endX: 0.30, endZ: 0.30, endY: 0.34, scale: 0.30, triggerStart: 0.54 },
  { type: 'blueberry', endX: -0.34, endZ: 0.26, endY: 0.36, scale: 0.30, triggerStart: 0.57 },
];

function FallingFruit({ def, progressRef }: { def: FruitDef; progressRef: ProgRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const rot = useRef(new THREE.Euler(0, 0, 0));

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const progress = progressRef.current;
    const t = THREE.MathUtils.clamp((progress - def.triggerStart) / FALL_SPAN, 0, 1);
    const speed = delta * 5;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, def.endX, speed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, def.endZ, speed);
    const y = THREE.MathUtils.lerp(DROP_FROM, def.endY, easeOutBounce(t));
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, speed);

    const s = t > 0 ? THREE.MathUtils.lerp(0.2, def.scale, easeOutQuad(Math.min(1, t * 3))) : 0;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, s, speed));

    const tumble = t < 0.85 ? delta * 7 : delta * 2.5;
    rot.current.x = THREE.MathUtils.lerp(rot.current.x, (1 - t) * 5, tumble);
    rot.current.y = THREE.MathUtils.lerp(rot.current.y, (1 - t) * 7 + 0.4, tumble);
    rot.current.z = THREE.MathUtils.lerp(rot.current.z, (1 - t) * 3, tumble);
    groupRef.current.rotation.copy(rot.current);
  });

  return (
    <group ref={groupRef} position={[def.endX, DROP_FROM, def.endZ]} scale={0}>
      <FruitModel type={def.type} />
    </group>
  );
}

function Stage({ progressRef }: { progressRef: ProgRef }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const entrance = THREE.MathUtils.clamp(progressRef.current / 0.1, 0, 1);
    const s = THREE.MathUtils.lerp(0.6, 1.55, easeOutQuad(entrance));
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, s, delta * 3));
  });

  return (
    <group ref={ref} position={[0, -0.35, 0]} scale={0.6}>
      <Float speed={0.5} floatIntensity={0.12} rotationIntensity={0.04} floatingRange={[-0.04, 0.04]}>
        <Bowl />
        {FRUITS.map((def, i) => (
          <FallingFruit key={i} def={def} progressRef={progressRef} />
        ))}
      </Float>
    </group>
  );
}

export default function BreakfastBowl({ progressRef }: { progressRef: ProgRef }) {
  return (
    <Canvas
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 0.4, 6] }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 5]} intensity={1.3} castShadow />
      <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#E6C79B" />
      <Suspense fallback={null}>
        <Stage progressRef={progressRef} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

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
