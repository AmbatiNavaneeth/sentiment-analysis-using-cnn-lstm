import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PredictionForm } from './components/PredictionForm';
import { AboutModel } from './components/AboutModel';
import { Architecture } from './components/Architecture';
import { Metrics } from './components/Metrics';
import { HowItWorks } from './components/HowItWorks';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const sections = ['hero', 'predict', 'about', 'architecture', 'metrics', 'how-it-works', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sticky Navbar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content Flow */}
      <main>
        <Hero
          onAnalyzeClick={() => scrollToSection('predict')}
          onLearnMoreClick={() => scrollToSection('architecture')}
        />

        <PredictionForm />

        <AboutModel />

        <Architecture />

        <Metrics />

        <HowItWorks />

        <FAQSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
