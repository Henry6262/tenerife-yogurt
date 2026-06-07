import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import type { StringKey } from '@/i18n/strings';
import LangToggle from '@/components/LangToggle';
import { BRAND } from '@/data/brand';

type NavLink = { key: StringKey; to: string; kind: 'hash' | 'route' };

const navLinks: NavLink[] = [
  { key: 'nav.products', to: '/#products', kind: 'hash' },
  { key: 'nav.subscribe', to: '/#subscribe', kind: 'hash' },
  { key: 'nav.chefs', to: '/chefs', kind: 'route' },
  { key: 'nav.circle', to: '/#circle', kind: 'hash' },
  { key: 'nav.articles', to: '/articles', kind: 'route' },
  { key: 'nav.recipes', to: '/recipes', kind: 'route' },
];

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      const nav = document.querySelector('nav');
      if (nav && !nav.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [mobileOpen]);

  const renderLink = (link: NavLink, onClick?: () => void, className?: string) =>
    link.kind === 'route' ? (
      <Link key={link.key} to={link.to} onClick={onClick} className={className}>
        {t(link.key)}
      </Link>
    ) : (
      <a key={link.key} href={link.to} onClick={onClick} className={className}>
        {t(link.key)}
      </a>
    );

  const linkClass = 'text-sm font-medium text-muted hover:text-foreground transition-colors';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-landing flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 font-heading font-bold text-xl tracking-tight text-primary">
          <img src="/krava-logo.jpg" alt="Krava" className="w-9 h-9 rounded-full object-cover ring-1 ring-border" />
          {BRAND.name}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => renderLink(link, undefined, linkClass))}
          <LangToggle />
          <a
            href="/#subscribe"
            className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            {t('cta.subscribe')}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="container-landing py-4 flex flex-col gap-4">
            {navLinks.map((link) =>
              renderLink(link, () => setMobileOpen(false), `${linkClass} py-2`)
            )}
            <LangToggle />
            <a
              href="/#subscribe"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold text-center hover:bg-primary-dark transition-colors"
            >
              {t('cta.subscribe')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
