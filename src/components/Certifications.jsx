import React, { useCallback } from 'react';

export const Certifications = React.memo(({ certifications, onImageClick }) => {
  const handleCertClick = useCallback((imageSrc) => {
    if (onImageClick) {
      onImageClick([imageSrc], 0);
    }
  }, [onImageClick]);

  return (
    <section id="certifications" className="certifications-section">
      <div className="section-container">
        <div className="section-header animate-on-scroll">
          <p className="section-subtitle">Credentials & Learning</p>
          <h2 className="section-title">My <span className="text-accent">Certifications</span></h2>
          <p className="section-description">Verified professional certifications in user experience design and UI prototyping tools.</p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert) => (
            <div key={cert.id} className="cert-card animate-on-scroll">
              <div 
                className="cert-image-wrapper"
                onClick={() => handleCertClick(cert.image)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={cert.image} 
                  alt={`${cert.title} Certificate`} 
                  className="cert-img" 
                  loading="lazy" 
                  decoding="async" 
                />
                <div className="cert-image-overlay">
                  <i className="ph ph-magnifying-glass-plus"></i>
                </div>
              </div>
              <div className="cert-info">
                <div className="cert-issuer">
                  <i className={`ph ${cert.issuerIcon}`}></i>
                  <span>{cert.issuer}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-date"><i className="ph ph-calendar-blank"></i> {cert.date}</span>
                  <span className="cert-id"><i className="ph ph-identification-badge"></i> {cert.credentialId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Certifications.displayName = 'Certifications';
