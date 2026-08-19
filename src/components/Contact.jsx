import React from 'react';

export const Contact = React.memo(({ contactInfo }) => {
  const { email, location, phone, linkedin } = contactInfo;

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="contact-wrapper">
          
          <div className="contact-intro animate-on-scroll">
            <p className="section-subtitle">Get in touch</p>
            <h2 className="section-title">Let's Work <span className="text-accent">Together</span></h2>
            <p className="section-description">
              Have a project in mind, a position open, or want to collaborate? I'd love to hear from you.
              Feel free to reach out through any of the channels below.
            </p>

            <div className="contact-socials-wrapper">
              <h4>Connect with me</h4>
              <div className="social-links">
                <a 
                  href={linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  id="social-linkedin" 
                  aria-label="LinkedIn Profile"
                >
                  <i className="ph-bold ph-linkedin-logo"></i>
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-cards-container animate-on-scroll">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="ph ph-envelope-simple"></i>
              </div>
              <div className="contact-detail">
                <h4>Email</h4>
                <a href={`mailto:${email}`} id="contact-email">{email}</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="ph ph-map-pin"></i>
              </div>
              <div className="contact-detail">
                <h4>Location</h4>
                <p>{location}</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="ph ph-phone"></i>
              </div>
              <div className="contact-detail">
                <h4>Phone</h4>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} id="contact-phone">{phone}</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
