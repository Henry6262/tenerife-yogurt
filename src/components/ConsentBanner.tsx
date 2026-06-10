import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import { consentStatus, denyConsent, grantConsent, hasMarketingPixels } from '@/lib/analytics';

const COPY = {
  de: {
    text: 'Wir nutzen Marketing-Cookies (Meta, TikTok), um unsere Werbung zu verbessern. Details in der Datenschutzerklärung.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },
  en: {
    text: 'We use marketing cookies (Meta, TikTok) to improve our advertising. See our privacy notice for details.',
    accept: 'Accept',
    decline: 'Decline',
  },
} as const;

/**
 * Marketing-pixel consent banner (Swiss revFADP / GDPR). Renders only when a
 * pixel id is configured AND the visitor hasn't chosen yet. Pixels load
 * exclusively after "Accept" (see main.tsx + grantConsent()).
 */
export default function ConsentBanner() {
  const { lang } = useLang();
  const [choice, setChoice] = useState(consentStatus());

  if (!hasMarketingPixels || choice !== null) return null;
  const t = COPY[lang === 'de' ? 'de' : 'en'];

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-cream/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-snug text-ink/80">{t.text}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              denyConsent();
              setChoice('denied');
            }}
            className="rounded-full border border-border px-4 py-2 text-sm text-ink/70 transition-colors hover:bg-ink/5"
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => {
              grantConsent();
              setChoice('granted');
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-cream transition-opacity hover:opacity-90"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
