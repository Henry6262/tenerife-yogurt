import { lazy, Suspense } from 'react';

const Silk = lazy(() => import('@/free/Backgrounds/Silk/Silk'));

/** One persistent warm Silk shader behind the entire site. Fixed, subtle,
 *  sits below all content (sections are transparent so it shows through). */
export default function SilkBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-[0.18]">
          <Silk color="#E6C79B" speed={2.2} scale={1.5} noiseIntensity={1.0} rotation={0.2} />
        </div>
      </Suspense>
      {/* faint cream wash so text stays legible over the texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(250,246,239,0.55),rgba(250,246,239,0.2)_18%,rgba(250,246,239,0.2)_82%,rgba(250,246,239,0.55))]" />
    </div>
  );
}
