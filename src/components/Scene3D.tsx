import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const BreakfastStage = lazy(() => import('./BreakfastStage'));

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#E6C79B" />
      <Suspense fallback={null}>
        <BreakfastStage />
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

export default function Scene3D() {
  return (
    <div
      className="fixed inset-0 z-[5] pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, 0, 6],
        }}
        style={{ background: 'transparent' }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
