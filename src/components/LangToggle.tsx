import { useLang } from '@/i18n/LangContext';

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card/60 text-xs font-semibold overflow-hidden">
      {(['de', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 transition-colors ${
            lang === l ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
          }`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
