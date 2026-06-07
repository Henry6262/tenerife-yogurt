import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useLang } from '@/i18n/LangContext';
import { BRAND } from '@/data/brand';

/** Branded splash shown on first load while the (large) 3D assets download.
 *  Driven by R3F's global loading progress; fades out once everything is ready. */
export default function LoadingScreen() {
  const { active, progress } = useProgress();
  const { lang } = useLang();
  const [hidden, setHidden] = useState(false);
  const startedRef = useRef(false);
  if (active) startedRef.current = true;

  const finished = progress >= 100 || (startedRef.current && !active);

  // Fade out + unmount once loading has finished.
  useEffect(() => {
    if (hidden || !finished) return;
    const id = setTimeout(() => setHidden(true), 600);
    return () => clearTimeout(id);
  }, [finished, hidden]);

  // Routes with no 3D never start a load — don't hang the splash there.
  useEffect(() => {
    const id = setTimeout(() => {
      if (!startedRef.current) setHidden(true);
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  if (hidden) return null;

  const pct = Math.min(100, Math.round(progress));
  const loadingWord = lang === 'de' ? 'Wird geladen' : 'Loading';

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream transition-opacity duration-500 ${
        finished ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-busy={!finished}
      role="status"
    >
      <img
        src="/krava-logo.jpg"
        alt="Krava"
        className="w-24 h-24 rounded-full object-cover shadow-lg shadow-primary/10 animate-pulse"
      />
      <div className="mt-6 font-heading text-2xl font-semibold text-foreground">{BRAND.name}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.26em] text-muted">{loadingWord}</div>

      {/* progress bar */}
      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-muted tabular-nums">{pct}%</div>
    </div>
  );
}
