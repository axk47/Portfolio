import { useEffect, useState } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import MatrixRain from './components/MatrixRain';
import FloatingOrbs from './components/FloatingOrbs';
import ParticleField from './components/ParticleField';
import CyberGrid from './components/CyberGrid';

function App() {
  const [effectsEnabled, setEffectsEnabled] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEffectsEnabled(false);
    }

    // Initialize scroll-based animations
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.section-reveal');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects Layer */}
      {effectsEnabled && (
        <>
          {/* Matrix rain effect */}
          <MatrixRain />
          
          {/* Floating gradient orbs */}
          <FloatingOrbs />
          
          {/* 3D Particle field */}
          <ParticleField />
          
          {/* Cyber grid overlay */}
          <CyberGrid />
        </>
      )}

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
