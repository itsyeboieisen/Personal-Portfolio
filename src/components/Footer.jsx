import React, { useCallback } from 'react';

export const Footer = React.memo(({ name }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <a href="#hero" className="footer-logo">
              <img src="/Logo.png" alt={`${name} Logo`} className="footer-logo-img" />
            </a>
            <p className="footer-text">
              Designing user-centered experiences that inspire and delight.
            </p>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <button 
        type="button" 
        className="back-to-top" 
        id="back-to-top" 
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <i className="ph ph-caret-up"></i>
      </button>
    </>
  );
});

Footer.displayName = 'Footer';
