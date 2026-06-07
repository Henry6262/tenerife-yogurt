import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ScrollProvider } from '@/components/ScrollContext';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Grain } from '@/components/Grain';
import SilkBackground from '@/components/SilkBackground';
import Scene3D from '@/components/Scene3D';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function RootLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ScrollProvider>
      <SmoothScroll />
      <SilkBackground />
      <Grain />
      <Scene3D />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </ScrollProvider>
  );
}
