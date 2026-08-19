import React, { useState, useCallback, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

  const handleOpenLightbox = useCallback((images, index) => {
    setLightbox({ isOpen: true, images, index });
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  const handlePrevLightbox = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      index: prev.index <= 0 ? prev.images.length - 1 : prev.index - 1
    }));
  }, []);

  const handleNextLightbox = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      index: prev.index >= prev.images.length - 1 ? 0 : prev.index + 1
    }));
  }, []);

  useEffect(() => {
    // 1. Entrance animation observer
    const animEls = document.querySelectorAll('.animate-on-scroll');
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    animEls.forEach(el => animObserver.observe(el));

    // 2. Active section tracking observer
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-25% 0px -50% 0px', threshold: 0.1 });

    sections.forEach(sec => sectionObserver.observe(sec));

    return () => {
      animObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-app">
      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero personal={portfolioData.personal} />
        <About personal={portfolioData.personal} skills={portfolioData.skills} />
        <Experience experienceList={portfolioData.experience} />
        <Certifications 
          certifications={portfolioData.certifications} 
          onImageClick={handleOpenLightbox} 
        />
        <Projects 
          projects={portfolioData.projects} 
          onImageClick={handleOpenLightbox} 
        />
        <Contact contactInfo={portfolioData.personal.contact} />
      </main>

      <Footer name={portfolioData.personal.name} />

      <LightboxModal
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        index={lightbox.index}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </div>
  );
}

export default App;
