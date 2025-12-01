'use client';

import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import UrgencyBar from '@/components/UrgencyBar';
import A11yPanel from '@/components/A11yPanel';
import AnimatedBackground from '@/components/AnimatedBackground';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import SmartCTA from '@/components/SmartCTA';
import AIChatWidget from '@/components/AIChatWidget';
import Footer from '@/components/Footer';

// Lazy load heavy components
const Hero = lazy(() => import('@/components/Hero'));
const LogosSection = lazy(() => import('@/components/LogosSection'));
const Problems = lazy(() => import('@/components/Problems'));
const Tracks = lazy(() => import('@/components/Tracks'));
const ProcessSection = lazy(() => import('@/components/ProcessSection'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const TrustSection = lazy(() => import('@/components/TrustSection'));
const About = lazy(() => import('@/components/About'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Contact = lazy(() => import('@/components/Contact'));

// Skeleton loader for lazy components
const SectionSkeleton = () => (
  <div className="py-24 px-8 animate-pulse">
    <div className="h-8 bg-white/5 rounded w-1/3 mb-6"></div>
    <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
    <div className="h-4 bg-white/5 rounded w-5/6"></div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#fafafa] overflow-x-hidden relative">
      <AnimatedBackground />
      <Loader />
      <UrgencyBar />
      <A11yPanel />
      <Header />
      
      <Suspense fallback={<SectionSkeleton />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <LogosSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Problems />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Tracks />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ProcessSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <TrustSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
      
      <Footer />
      <WhatsAppFloat />
      <SmartCTA />
      <AIChatWidget />
    </main>
  );
}
