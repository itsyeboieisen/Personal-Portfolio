import React from 'react';

export const Experience = React.memo(({ experienceList }) => {
  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        
        <div className="experience-layout">
          <div className="experience-editorial-left animate-on-scroll">
            <p className="section-subtitle">Where I've worked</p>
            <h2 className="section-title">My <span className="text-accent">Experience</span></h2>
            <p className="section-description">
              Applying technical foundation, database operations, and frontend web design skills in collaborative production environments.
            </p>
          </div>

          <div className="experience-editorial-right animate-on-scroll">
            <div className="experience-timeline">
              <div className="timeline-line"></div>

              {experienceList.map((exp, idx) => (
                <div key={idx} className="experience-card">
                  <div className="experience-dot">
                    <div className="dot-ring"></div>
                  </div>
                  <div className="experience-content">
                    <div className="experience-header">
                      <div className="experience-company-info">
                        <div className="experience-icon">
                          <i className="ph ph-buildings"></i>
                        </div>
                        <div>
                          <h3 className="experience-company">{exp.company}</h3>
                          <span className="experience-role">{exp.role}</span>
                        </div>
                      </div>
                      <span className="experience-date">
                        <i className="ph ph-calendar-blank"></i>
                        {exp.date}
                      </span>
                    </div>

                    <ul className="experience-list">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <i className="ph ph-caret-right"></i>
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <div className="experience-tags">
                      {exp.tags.map((tag, tIdx) => (
                        <span key={tIdx}>{tag}</span>
                      ))}
                    </div>
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

Experience.displayName = 'Experience';
