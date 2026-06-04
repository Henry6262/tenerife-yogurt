import { useRef, useEffect, type ReactNode } from 'react';
import { useScrollRef } from './ScrollContext';

interface SectionTriggerProps {
  id: string;
  children: ReactNode;
  className?: string;
  start?: string;
  end?: string;
}

export default function SectionTrigger({
  id,
  children,
  className = '',
  start = 'top 85%',
  end = 'bottom 15%',
}: SectionTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useScrollRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return ctx.registerSection(id, el, start, end);
  }, [ctx, id, start, end]);

  return (
    <div ref={ref} className={className} data-section={id}>
      {children}
    </div>
  );
}
