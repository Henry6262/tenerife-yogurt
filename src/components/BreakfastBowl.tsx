import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MutableRefObject,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* Probe whether a GLB exists before loading it, so models that haven't been
 * added yet render nothing (no 404 / loader errors) and pop in once present. */
const assetCache = new Map<string, boolean | Promise<boolean>>();
function useAssetExists(url: string): boolean {
  const [ok, setOk] = useState(assetCache.get(url) === true);
  useEffect(() => {
    const cached = assetCache.get(url);
    if (typeof cached === 'boolean') {
      setOk(cached);
      return;
    }
    let alive = true;
    const probe =
      cached instanceof Promise
        ? cached
        : fetch(url, { method: 'HEAD' })
            // SPA servers return index.html (200, text/html) for missing files —
            // only treat it as present if it's not an HTML fallback.
            .then((r) => r.ok && !(r.headers.get('content-type') || '').includes('text/html'))
            .catch(() => false);
    assetCache.set(url, probe);
    probe.then((v) => {
      assetCache.set(url, v);
      if (alive) setOk(v);
    });
    return () => {
      alive = false;
    };
  }, [url]);
  return ok;
}

/** Renders `fallback` (default nothing) if a model fails to load — e.g. a GLB
 *  not added yet — so one missing asset never blanks the whole bowl. */
class ModelBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}

/* In-section breakfast bowl. Scroll progress is passed in via a ref PROP
 * (refs cross the R3F Canvas boundary; React context does not). */

type ProgRef = MutableRefObject<number>;

function useClonedScene(url: string) {
  const { scene } = useGLTF(url);
  return useMemo(() => scene.clone(), [scene]);
}

type FruitType = 'strawberry' | 'blueberry' | 'almond' | 'hazelnut' | 'granola' | 'seeds';

const MODEL_URL: Record<FruitType, string> = {
  strawberry: '/strawberry.glb',
  blueberry: '/blueberry.glb',
  almond: '/almond.glb',
  hazelnut: '/helzenut.glb',
  granola: '/granola.glb',
  seeds: '/seeds.glb',
};

function FruitModel({ type }: { type: FruitType }) {
  return <primitive object={useClonedScene(MODEL_URL[type])} />;
}

/** Loads the model only once its GLB is confirmed present (no errors if missing). */
function SafeModel({ type }: { type: FruitType }) {
  const exists = useAssetExists(MODEL_URL[type]);
  if (!exists) return null;
  return (
    <ModelBoundary>
      <Suspense fallback={null}>
        <FruitModel type={type} />
      </Suspense>
    </ModelBoundary>
  );
}

/** Your branded bowl GLB, auto-centred and scaled to the fruit coordinate space
 *  (so the fruits land inside it regardless of the GLB's native scale/origin). */
function GlbBowl() {
  const scene = useClonedScene('/bowl.glb');
  const fitted = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxXZ = Math.max(size.x, size.z) || 1;
    const s = 2.4 / maxXZ; // ~match the procedural bowl's outer width
    // Centre horizontally; sit the bowl so its base is around the fruits' floor.
    scene.position.set(-center.x, -box.min.y - size.y * 0.5, -center.z);
    const g = new THREE.Group();
    g.add(scene);
    g.scale.setScalar(s);
    return g;
  }, [scene]);
  return <primitive object={fitted} />;
}

function BowlSlot() {
  const exists = useAssetExists('/bowl.glb');
  if (!exists) return <Bowl />;
  return (
    <ModelBoundary fallback={<Bowl />}>
      <Suspense fallback={<Bowl />}>
        <GlbBowl />
      </Suspense>
    </ModelBoundary>
  );
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

const FALL_SPAN = 0.26; // each fruit takes more scroll to land → slower fall
const DROP_FROM = 5.0;

// Smaller fruit, end spots spread across the bowl, triggers spaced evenly so they
// drop one at a time rather than clustering. ~22 items fill the bowl in layers.
const FRUITS: FruitDef[] = [
  // layer 1 — settle on the bottom
  { type: 'strawberry', endX: -0.34, endZ: 0.16, endY: 0.00, scale: 0.27, triggerStart: 0.02 },
  { type: 'blueberry', endX: 0.30, endZ: -0.12, endY: 0.02, scale: 0.17, triggerStart: 0.055 },
  { type: 'almond', endX: 0.06, endZ: 0.36, endY: 0.03, scale: 0.20, triggerStart: 0.09 },
  { type: 'blueberry', endX: -0.16, endZ: -0.32, endY: 0.03, scale: 0.17, triggerStart: 0.125 },
  { type: 'hazelnut', endX: 0.42, endZ: 0.18, endY: 0.05, scale: 0.22, triggerStart: 0.16 },
  { type: 'blueberry', endX: -0.44, endZ: 0.02, endY: 0.05, scale: 0.17, triggerStart: 0.195 },
  { type: 'strawberry', endX: 0.20, endZ: 0.30, endY: 0.06, scale: 0.27, triggerStart: 0.23 },
  { type: 'blueberry', endX: -0.04, endZ: -0.10, endY: 0.07, scale: 0.17, triggerStart: 0.265 },
  // layer 2
  { type: 'almond', endX: 0.36, endZ: -0.28, endY: 0.09, scale: 0.20, triggerStart: 0.30 },
  { type: 'blueberry', endX: -0.30, endZ: 0.32, endY: 0.10, scale: 0.17, triggerStart: 0.335 },
  { type: 'hazelnut', endX: 0.12, endZ: -0.34, endY: 0.11, scale: 0.22, triggerStart: 0.37 },
  { type: 'strawberry', endX: -0.24, endZ: -0.06, endY: 0.12, scale: 0.27, triggerStart: 0.405 },
  { type: 'blueberry', endX: 0.40, endZ: 0.06, endY: 0.13, scale: 0.17, triggerStart: 0.44 },
  { type: 'blueberry', endX: 0.02, endZ: 0.16, endY: 0.14, scale: 0.17, triggerStart: 0.475 },
  { type: 'almond', endX: -0.40, endZ: -0.16, endY: 0.15, scale: 0.20, triggerStart: 0.51 },
  // layer 3 — top
  { type: 'hazelnut', endX: 0.28, endZ: 0.30, endY: 0.17, scale: 0.22, triggerStart: 0.545 },
  { type: 'strawberry', endX: -0.06, endZ: -0.26, endY: 0.18, scale: 0.27, triggerStart: 0.58 },
  { type: 'blueberry', endX: -0.32, endZ: 0.14, endY: 0.19, scale: 0.17, triggerStart: 0.615 },
  { type: 'blueberry', endX: 0.32, endZ: -0.10, endY: 0.20, scale: 0.17, triggerStart: 0.65 },
  { type: 'almond', endX: 0.10, endZ: 0.04, endY: 0.21, scale: 0.20, triggerStart: 0.685 },
  { type: 'strawberry', endX: 0.34, endZ: 0.32, endY: 0.23, scale: 0.27, triggerStart: 0.72 },
  { type: 'blueberry', endX: -0.20, endZ: 0.30, endY: 0.24, scale: 0.17, triggerStart: 0.755 },

  // granola clusters — sprinkled through the fill (appear once /granola.glb is added)
  { type: 'granola', endX: -0.10, endZ: 0.22, endY: 0.06, scale: 0.22, triggerStart: 0.13 },
  { type: 'granola', endX: 0.24, endZ: -0.20, endY: 0.12, scale: 0.22, triggerStart: 0.32 },
  { type: 'granola', endX: -0.30, endZ: -0.04, endY: 0.16, scale: 0.22, triggerStart: 0.50 },
  { type: 'granola', endX: 0.18, endZ: 0.18, endY: 0.21, scale: 0.22, triggerStart: 0.66 },
  { type: 'granola', endX: -0.16, endZ: 0.36, endY: 0.25, scale: 0.22, triggerStart: 0.79 },

  // seeds — tiny, scattered on top (appear once /seeds.glb is added)
  { type: 'seeds', endX: 0.08, endZ: -0.18, endY: 0.08, scale: 0.12, triggerStart: 0.21 },
  { type: 'seeds', endX: -0.38, endZ: 0.20, endY: 0.14, scale: 0.12, triggerStart: 0.43 },
  { type: 'seeds', endX: 0.38, endZ: 0.24, endY: 0.19, scale: 0.12, triggerStart: 0.60 },
  { type: 'seeds', endX: -0.02, endZ: -0.30, endY: 0.24, scale: 0.12, triggerStart: 0.74 },
  { type: 'seeds', endX: 0.26, endZ: 0.02, endY: 0.27, scale: 0.12, triggerStart: 0.85 },
];

function FallingFruit({ def, progressRef }: { def: FruitDef; progressRef: ProgRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const rot = useRef(new THREE.Euler(0, 0, 0));

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const progress = progressRef.current;
    const t = THREE.MathUtils.clamp((progress - def.triggerStart) / FALL_SPAN, 0, 1);
    const speed = delta * 3.2;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, def.endX, speed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, def.endZ, speed);
    const y = THREE.MathUtils.lerp(DROP_FROM, def.endY, easeOutBounce(t));
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, speed);

    const s = t > 0 ? THREE.MathUtils.lerp(0.2, def.scale, easeOutQuad(Math.min(1, t * 3))) : 0;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, s, speed));

    const tumble = t < 0.85 ? delta * 4.5 : delta * 2;
    rot.current.x = THREE.MathUtils.lerp(rot.current.x, (1 - t) * 5, tumble);
    rot.current.y = THREE.MathUtils.lerp(rot.current.y, (1 - t) * 7 + 0.4, tumble);
    rot.current.z = THREE.MathUtils.lerp(rot.current.z, (1 - t) * 3, tumble);
    groupRef.current.rotation.copy(rot.current);
  });

  return (
    <group ref={groupRef} position={[def.endX, DROP_FROM, def.endZ]} scale={0}>
      <SafeModel type={def.type} />
    </group>
  );
}

function Stage({ progressRef }: { progressRef: ProgRef }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  // On wide screens sit the bowl in the right half (text occupies the left);
  // on narrow screens centre it lower.
  const wide = viewport.width > 7;
  const offsetX = wide ? viewport.width * 0.2 : 0;
  const offsetY = wide ? -1.05 : -1.5;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const entrance = THREE.MathUtils.clamp(progressRef.current / 0.1, 0, 1);
    const s = THREE.MathUtils.lerp(0.5, 1.25, easeOutQuad(entrance));
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, s, delta * 3));
  });

  return (
    <group ref={ref} position={[offsetX, offsetY, 0]} scale={0.6}>
      <Float speed={0.5} floatIntensity={0.12} rotationIntensity={0.04} floatingRange={[-0.04, 0.04]}>
        <BowlSlot />
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
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 1.1, 6.6] }}
      onCreated={({ camera }) => camera.lookAt(0, -0.35, 0)}
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
