import { Helmet } from 'react-helmet-async';
import { useLang } from '@/i18n/LangContext';
import Hero from '@/sections/Hero';
import DualGateway from '@/sections/DualGateway';
import ProductLine from '@/sections/ProductLine';
import Subscriptions from '@/sections/Subscriptions';
import CircleProtocol from '@/sections/CircleProtocol';
import Transparency from '@/sections/Transparency';
import SubscribeForm from '@/sections/SubscribeForm';

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
      <ProductLine />
      <Subscriptions />
      <CircleProtocol />
      <Transparency />
      <SubscribeForm />
    </>
  );
}
