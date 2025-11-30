'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LogosSection from '@/components/LogosSection';
import Problems from '@/components/Problems';
import Tracks from '@/components/Tracks';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Loader from '@/components/Loader';
import UrgencyBar from '@/components/UrgencyBar';
import A11yPanel from '@/components/A11yPanel';

export default function Home() {
  useEffect(() => {
    // GSAP will be loaded dynamically in components
  }, []);

  return (
    <main className="min-h-screen bg-[#09090b] text-[#fafafa] overflow-x-hidden">
      <Loader />
      <UrgencyBar />
      <A11yPanel />
      <Header />
      <Hero />
      <LogosSection />
      <Problems />
      <Tracks />
      <Testimonials />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
