import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import WhyUs from './components/WhyUs';
import Reviews from './components/Reviews';
import ServiceAreas from './components/ServiceAreas';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Cursor glow effect
  useEffect(() => {
    const glow = document.getElementById('cursor-glow');
    const move = (e) => {
      if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Cursor glow div */}
      <div id="cursor-glow" />
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <WhyUs />
      <Reviews />
      <ServiceAreas />
      <Contact />
      <Footer />
    </div>
  );
}
