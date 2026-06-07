import { Link } from 'react-router-dom';
import { Mail, Instagram, CreditCard } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import type { StringKey } from '@/i18n/strings';
import { BRAND } from '@/data/brand';

type FLink = { key: StringKey; to: string; kind: 'hash' | 'route' };

const footerLinks: FLink[] = [
  { key: 'nav.products', to: '/#products', kind: 'hash' },
  { key: 'nav.subscribe', to: '/#subscribe', kind: 'hash' },
  { key: 'nav.chefs', to: '/chefs', kind: 'route' },
  { key: 'nav.circle', to: '/#circle', kind: 'hash' },
  { key: 'nav.articles', to: '/articles', kind: 'route' },
  { key: 'nav.recipes', to: '/recipes', kind: 'route' },
];

export default function Footer() {
  const { t } = useLang();
  const { impressum, contact } = BRAND;

  return (
    <footer className="relative z-10 bg-foreground text-white/80">
      <div className="container-landing py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-heading font-bold text-2xl text-white">{BRAND.name}</span>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mt-4 mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 text-xs font-semibold text-white">
                <CreditCard size={14} className="text-primary-light" />
                {t('footer.twint')}
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">{t('footer.explore')}</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  {link.kind === 'route' ? (
                    <Link to={link.to} className="text-sm text-white/60 hover:text-primary-light transition-colors">
                      {t(link.key)}
                    </Link>
                  ) : (
                    <a href={link.to} className="text-sm text-white/60 hover:text-primary-light transition-colors">
                      {t(link.key)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Impressum */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="shrink-0 text-primary-light" />
                <a href={`mailto:${contact.email}`} className="hover:text-primary-light transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
            <h4 className="font-heading font-semibold text-white mb-3 text-sm">{t('footer.impressum')}</h4>
            <address className="not-italic text-xs text-white/50 leading-relaxed">
              {impressum.legalName}
              <br />
              {impressum.address}
              <br />
              {impressum.city}
              <br />
              {impressum.email}
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {BRAND.name} · {BRAND.location}. {t('footer.rights')}
          </p>
          <p className="text-xs text-white/40">{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  );
}
