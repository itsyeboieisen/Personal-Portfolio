import React from 'react';

export const Hero = React.memo(({ personal }) => {
  const { greeting, firstName, lastName, title, status, bio, stats } = personal;

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-status-badge animate-on-scroll">
            <span className="status-indicator"></span>
            <span>{status}</span>
          </div>

          <p className="hero-greeting animate-on-scroll">Hello, I'm</p>
          <h1 className="hero-name animate-on-scroll">
            <span className="hero-first-name">{firstName}</span>
            <span className="hero-last-name">{lastName}</span>
          </h1>
          <div className="hero-role-wrapper animate-on-scroll">
            <span className="hero-tagline">{title}</span>
          </div>
          
          <p className="hero-description animate-on-scroll">{bio}</p>

          <div className="hero-cta animate-on-scroll">
            <a href="#projects" className="btn btn-primary" id="hero-view-work">
              <span>View My Work</span>
              <i className="ph ph-arrow-right"></i>
            </a>
            <a href="#contact" className="btn btn-outline" id="hero-contact">
              <span>Get in Touch</span>
            </a>
          </div>

          <div className="hero-stats-bar animate-on-scroll">
            {stats.map((stat, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="stat-divider"></div>}
                <div className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hero-visual animate-on-scroll">
          <div className="hero-visual-card">
            <div className="hero-image-wrapper">
              <img src="/Profile.jpg" alt={`${firstName} ${lastName}`} className="hero-image" fetchPriority="high" decoding="async" />
            </div>
            
            <div className="floating-chip chip-1">
              <i className="ph ph-figma-logo"></i>
              <span>UI/UX Design</span>
            </div>
            <div className="floating-chip chip-2">
              <i className="ph ph-desktop-tower"></i>
              <span>IT Support</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator" id="scroll-indicator" aria-label="Scroll down">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </a>
    </section>
  );
});

Hero.displayName = 'Hero';
