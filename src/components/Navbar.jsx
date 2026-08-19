import React, { useState, useEffect, useCallback, useRef } from 'react';

export const Navbar = React.memo(({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast40 = window.scrollY > 40;
          if (scrolledRef.current !== isPast40) {
            scrolledRef.current = isPast40;
            setScrolled(isPast40);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, []);

  return (
    <nav id="navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo" id="nav-logo">
          <img src="/Logo.png" alt="Eisenpol Manalo Logo" className="nav-logo-img" fetchPriority="high" decoding="async" />
        </a>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`} id="nav-links">
          {['hero', 'about', 'experience', 'certifications', 'projects', 'contact'].map(section => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                data-section={section}
                onClick={closeMobile}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
          id="nav-toggle"
          aria-label="Toggle navigation"
          onClick={toggleMobile}
        >
          <i className="ph ph-list nav-icon-menu"></i>
          <i className="ph ph-x nav-icon-close"></i>
        </button>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
