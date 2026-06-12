import { Link } from 'react-router-dom';
import { CreditCard, Instagram } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import type { StringKey } from '@/i18n/strings';
import { BRAND } from '@/data/brand';

type FLink = { key: StringKey; to: string; kind: 'hash' | 'route' };

const footerLinks: FLink[] = [
  { key: 'nav.products', to: '/#products', kind: 'hash' },
  { key: 'nav.culture', to: '/#culture', kind: 'hash' },
  { key: 'nav.subscribe', to: '/#subscribe', kind: 'hash' },
  { key: 'nav.chefs', to: '/chefs', kind: 'route' },
  { key: 'nav.articles', to: '/articles', kind: 'route' },
  { key: 'nav.recipes', to: '/recipes', kind: 'route' },
];

export default function Footer() {
  const { t } = useLang();
  const { impressum, contact } = BRAND;

  const linkClass = 'text-sm text-white/60 hover:text-primary-light transition-colors';

  return (
    <footer className="relative z-10 bg-foreground text-white/80">
      <div className="container-landing py-10">
        {/* Single row: brand · links · contact */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/krava-logo.jpg" alt="" aria-hidden="true" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-white leading-none">{BRAND.name}</span>
              <span className="text-xs text-white/40 mt-1">{t('footer.tagline')}</span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((link) =>
              link.kind === 'route' ? (
                <Link key={link.key} to={link.to} className={linkClass}>
                  {t(link.key)}
                </Link>
              ) : (
                <a key={link.key} href={link.to} className={linkClass}>
                  {t(link.key)}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            {contact.instagram && (
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1.5`}>
                <Instagram size={14} />
                @kravayogurt
              </a>
            )}
            <a href={`mailto:${contact.email}`} className={linkClass}>
              {contact.email}
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white">
              <CreditCard size={13} className="text-primary-light" />
              TWINT
            </span>
          </div>
        </div>

        {/* Thin legal line */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-white/35">
          <span>© {new Date().getFullYear()} {BRAND.name} · {BRAND.location}</span>
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              {t('footer.impressum')}: {impressum.legalName} · {impressum.address} · {impressum.city}
            </span>
            <Link to="/datenschutz" className="underline-offset-2 hover:text-primary-light hover:underline transition-colors">
              {t('footer.privacy')}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
