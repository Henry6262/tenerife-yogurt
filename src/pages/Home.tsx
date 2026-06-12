import { Helmet } from 'react-helmet-async';
import { useLang } from '@/i18n/LangContext';
import Hero from '@/sections/Hero';
import DualGateway from '@/sections/DualGateway';
import LivingCulture from '@/sections/LivingCulture';
import ProductLine from '@/sections/ProductLine';
import Breakfast from '@/sections/Breakfast';
import Subscriptions from '@/sections/Subscriptions';
import Transparency from '@/sections/Transparency';
import Order from '@/sections/Order';

export default function Home() {
  const { lang } = useLang();
  return (
    <>
      <Helmet>
        <title>
          {lang === 'de'
            ? 'Krava — Schweizer Reinheit, bulgarische Seele'
            : 'Krava — Swiss Purity, Bulgarian Soul'}
        </title>
        <meta
          name="description"
          content={
            lang === 'de'
              ? 'Handgesiebter bulgarischer Joghurt aus Zürich. Bio-Rohmilch, Genesis-Kulturen, keine Zusätze. Abo & Gastronomie.'
              : 'Hand-strained Bulgarian yogurt from Zürich. Organic raw milk, Genesis cultures, no additives. Subscription & gastronomy.'
          }
        />
        <html lang={lang} />
      </Helmet>
      <Hero />
      <DualGateway />
      <LivingCulture />
      <ProductLine />
      <Breakfast />
      <Subscriptions />
      <Transparency />
      <Order />
    </>
  );
}
