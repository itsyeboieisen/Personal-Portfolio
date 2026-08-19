import React from 'react';

export const About = React.memo(({ personal, skills }) => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        
        <div className="about-grid">
          <div className="about-left-col animate-on-scroll">
            <div className="section-subtitle">Get to know me</div>
            <h2 className="section-title">About <span className="text-accent">Me</span></h2>
            
            <div className="about-image-card">
              <div className="about-image-wrapper">
                <img src="/Profile.jpg" alt={personal.name} className="about-portrait-img" loading="lazy" decoding="async" />
              </div>
              <div className="about-experience-badge">
                <span className="badge-number">🎓</span>
                <span className="badge-text">Fresh<br />Graduate</span>
              </div>
            </div>

            <h3 className="about-heading">{personal.aboutHeadline}</h3>
            
            <p className="about-text">{personal.aboutStory}</p>

            <a href="#contact" className="btn btn-primary" id="about-lets-talk">
              <span>Let's Talk</span>
              <i className="ph ph-arrow-right"></i>
            </a>
          </div>

          <div className="about-right-col animate-on-scroll">
            <div className="bento-skills-header">
              <h4 className="skills-title">Skills & Capabilities Matrix</h4>
              <p className="skills-subtitle">Core technical, software, database, and interpersonal proficiencies.</p>
            </div>

            <div className="skills-bento-grid">
              {skills.map((skillGroup, idx) => (
                <div 
                  key={idx} 
                  className={`bento-card ${skillGroup.isFeatured ? 'bento-card-featured' : ''} ${skillGroup.isPaired ? 'bento-card-wide skill-category--paired' : ''}`}
                >
                  <div className="skill-category-label">
                    <i className={`ph ${skillGroup.icon}`}></i> {skillGroup.category}
                  </div>
                  <div className={`skills-grid ${skillGroup.isPaired ? 'skills-grid--paired' : ''}`}>
                    {skillGroup.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="skill-tag">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

About.displayName = 'About';
