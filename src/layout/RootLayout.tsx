import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ScrollProvider } from '@/components/ScrollContext';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Grain } from '@/components/Grain';
import SilkBackground from '@/components/SilkBackground';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ScrollProvider>
      <LoadingScreen />
      <SmoothScroll />
      <SilkBackground />
      <Grain />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </ScrollProvider>
  );
}
