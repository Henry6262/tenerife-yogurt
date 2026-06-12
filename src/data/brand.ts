import type { Lang } from '@/i18n/strings';

type L<T = string> = { de: T; en: T };

export interface Product {
  id: string;
  tier: 'daily' | 'strained' | 'reserve';
  name: string;
  size: L;
  price: number;
  tagline: L;
  blurb: L;
}

export interface Plan {
  id: string;
  name: L;
  price: number;
  cadence: L;
  contents: L;
  features: L<string[]>;
  popular?: boolean;
}

export const BRAND = {
  name: 'Krava',
  tagline: {
    de: 'Schweizer Reinheit, bulgarische Seele',
    en: 'Swiss Purity, Bulgarian Soul',
  } as L,
  location: 'Zürich',
  currency: 'CHF',
  contact: { email: 'hallo@krava.ch', instagram: 'https://instagram.com/kravayogurt', whatsapp: '' },
  impressum: {
    legalName: 'Krava (Einzelfirma)',
    address: 'Musterstrasse 1',
    city: '8000 Zürich',
    email: 'hallo@krava.ch',
  },

  products: [
    {
      id: 'daily',
      tier: 'daily',
      name: 'Krava Daily',
      size: { de: '500 ml', en: '500 ml' },
      price: 8.5,
      tagline: { de: 'Der tägliche Begleiter', en: 'The daily driver' },
      blurb: {
        de: 'Klassisch, natürlich dick, lebendig fermentiert. Perfekt für Frühstück und Performance.',
        en: 'Classic, naturally thick, live-fermented. Perfect for breakfast and performance.',
      },
    },
    {
      id: 'strained',
      tier: 'strained',
      name: 'Krava Strained',
      size: { de: '500 ml · 2:1 gesiebt', en: '500 ml · 2:1 strained' },
      price: 15,
      tagline: { de: 'Chef’s Selection', en: "Chef's Selection" },
      blurb: {
        de: 'Samtig dicht, keine Molkentrennung. Schlägt importierten griechischen Joghurt auf Reinheit und Textur.',
        en: 'Velvet-dense, zero syneresis. Beats imported Greek on purity and texture.',
      },
    },
    {
      id: 'reserve',
      tier: 'reserve',
      name: 'Krava Reserve',
      size: { de: '1 L · extra gesiebt', en: '1 L · extra-strained' },
      price: 24,
      tagline: { de: 'Die Trophäe', en: 'The trophy jar' },
      blurb: {
        de: 'Limitierte Charge, pur oder mit lokalem Honig. Fast 2 Liter Schweizer Bio-Milch in einem Glas.',
        en: 'Limited batch, plain or local honey. Nearly 2 litres of Swiss organic milk in one jar.',
      },
    },
  ] as Product[],

  plans: [
    {
      id: 'performance',
      name: { de: 'Performance', en: 'Performance' },
      price: 65,
      cadence: { de: '/Monat', en: '/month' },
      contents: {
        de: '2× 500 ml Daily pro Woche (8 Gläser · 4 kg/Monat)',
        en: '2× 500 ml Daily per week (8 jars · 4 kg/month)',
      },
      features: {
        de: ['Wöchentliche Lieferung an die Tür', 'Jederzeit pausieren oder kündigen', 'Glas-Rückgabe-Prämien inklusive'],
        en: ['Weekly doorstep delivery', 'Pause or cancel anytime', 'Jar-return rewards included'],
      },
    },
    {
      id: 'elite',
      name: { de: 'Elite Balkan Soul', en: 'Elite Balkan Soul' },
      price: 95,
      cadence: { de: '/Monat', en: '/month' },
      popular: true,
      contents: {
        de: '2× 500 ml Strained oder 1× 1 L Reserve pro Woche',
        en: '2× 500 ml Strained or 1× 1 L Reserve per week',
      },
      features: {
        de: ['Premium gesiebte Chargen', 'Wöchentliche Lieferung', 'Vorrang bei limitierten Reserve-Chargen'],
        en: ['Premium strained batches', 'Weekly delivery', 'Priority on limited Reserve batches'],
      },
    },
  ] as Plan[],

  circle: {
    b2bCreditPerJar: 0.5,
    d2c: {
      de: 'Leere, gespülte Gläser am Liefertag rausstellen → 1 Punkt pro Glas. 10 Punkte = ein gratis Spezial-Produkt.',
      en: 'Leave rinsed empties out on delivery morning → 1 point per jar. 10 points = a free special item.',
    } as L,
    b2b: {
      de: 'Gebrandete Krava-Kiste, 1:1-Tausch bei jeder Lieferung. 0.50 CHF Gutschrift pro Glas auf der Monatsrechnung.',
      en: 'Branded Krava crate, 1:1 swap on every delivery. 0.50 CHF credit per jar on the monthly invoice.',
    } as L,
  },

  sourcing: {
    milk: {
      de: 'Zertifizierte Schweizer Bio-Rohmilch von Familienhöfen im Kanton Zürich (Leimbihof, Bio Waidhof).',
      en: 'Certified Swiss organic raw milk from Canton Zürich family farms (Leimbihof, Bio Waidhof).',
    } as L,
    culture: {
      de: 'Original gefriergetrocknete Genesis-Kulturen aus Sofia — L. bulgaricus + S. thermophilus.',
      en: 'Original freeze-dried Genesis cultures from Sofia — L. bulgaricus + S. thermophilus.',
    } as L,
    process: {
      de: 'Von Hand 2:1 gesiebt, durchgehend gekühlt. Kein Pektin, kein Zucker, keine Verdickungsmittel.',
      en: 'Hand-strained 2:1, continuously refrigerated. No pectin, no sugar, no thickeners.',
    } as L,
  },
} as const;

export const fmtCHF = (n: number) => `CHF ${n.toFixed(2).replace(/\.00$/, '.–')}`;

/** Resolve a `{ de, en }` record for the active language (data-layer helper, no React dep). */
export const p = <T,>(lang: Lang, v: { de: T; en: T }): T => v[lang];
