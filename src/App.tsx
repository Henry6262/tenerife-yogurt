import { Helmet } from 'react-helmet-async';
import { ScrollProvider } from '@/components/ScrollContext';
import Scene3D from '@/components/Scene3D';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Story from '@/sections/Story';
import Benefits from '@/sections/Benefits';
import Articles from '@/sections/Articles';
import Recipes from '@/sections/Recipes';
import Athletes from '@/sections/Athletes';
import Pricing from '@/sections/Pricing';
import OrderForm from '@/sections/OrderForm';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function App() {
  return (
    <ScrollProvider>
      <Helmet>
        <title>Yogurt Búlgaro Artesanal en Tenerife | Entrega a Domicilio</title>
        <meta
          name="description"
          content="Yogurt Búlgaro artesanal en Tenerife. Fermentado con Lactobacillus bulgaricus. Alto en proteína, sin aditivos. Entrega gratis en Santa Cruz y La Laguna."
        />
        <meta
          name="keywords"
          content="yogurt búlgaro tenerife, yogurt bulgaro artesanal, yogurt probiotico, lactobacillus bulgaricus, yogurt alto en proteina, entrega yogurt tenerife, santa cruz yogurt, la laguna yogurt"
        />
      </Helmet>

      <Scene3D />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Benefits />
        <Articles />
        <Recipes />
        <Athletes />
        <Pricing />
        <OrderForm />
      </main>
      <Footer />
      <ScrollToTop />
    </ScrollProvider>
  );
}
