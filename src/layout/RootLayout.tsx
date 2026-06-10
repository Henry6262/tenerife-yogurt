import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { pageview } from '@/lib/analytics';
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
  const firstLoad = useRef(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    // The pixel init already fires the first PageView; only track SPA route changes after.
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    pageview();
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
