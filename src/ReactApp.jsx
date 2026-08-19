/* ═══════════════════════════════════════════
   REACT 18 APPLICATION ARCHITECTURE
   Eisenpol Manalo — UI/UX Designer Portfolio
   ═══════════════════════════════════════════ */

const { useState, useEffect, useCallback, useMemo, useRef, memo, Fragment } = React;

/* ── 1. Portfolio Data Store ── */
const portfolioData = {
  personal: {
    name: "Eisenpol Manalo",
    firstName: "Eisenpol",
    lastName: "Manalo",
    title: "IT Specialist | UI / UX Designer",
    status: "Available for UI/UX & IT Opportunities",
    bio: "Bridging technical support and user-centered design. An IT graduate skilled in hardware setup, system troubleshooting, and crafting clean, visually engaging digital interfaces.",
    aboutHeadline: "A fresh graduate with a passion for crafting meaningful digital experiences",
    aboutStory: "Hi, I'm Eisenpol Manalo — Information Technology graduate from Rizal Technological University with hands-on skills in PC hardware, system configuration, software installation, troubleshooting, and basic networking. Experienced in assisting others with technical concerns, with additional knowledge in UI/UX design, digital tools, and gaming technology. Seeking an entry-level role to apply my technical and problem-solving skills.",
    stats: [
      { number: "5", label: "Projects Completed" },
      { number: "Fresh", label: "Graduate" },
      { number: "∞", label: "Passion & Drive" }
    ],
    contact: {
      email: "Eisenpol27@gmail.com",
      location: "Marikina City, Philippines",
      phone: "+63 976 309 3148",
      linkedin: "https://www.linkedin.com/in/eisenpol-manalo-857802248"
    }
  },
  skills: [
    {
      category: "Hardware",
      icon: "ph-desktop-tower",
      items: ["Computer Assembly & Disassembly", "Troubleshooting", "Maintenance"]
    },
    {
      category: "Software",
      icon: "ph-app-window",
      items: ["Windows", "Software Installation & Configuration", "System Troubleshooting"]
    },
    {
      category: "Networking",
      icon: "ph-wifi-high",
      items: ["Basic LAN/Wi-Fi Troubleshooting", "Network Configuration"]
    },
    {
      category: "Database",
      icon: "ph-database",
      items: ["Basic CRUD", "Data Validation", "Database Maintenance"]
    },
    {
      category: "UI/UX Design",
      icon: "ph-pen-nib",
      isFeatured: true,
      items: ["Wireframing", "Prototyping", "Figma"]
    },
    {
      category: "Soft Skills",
      icon: "ph-handshake",
      isPaired: true,
      items: ["Problem Solving", "Communication", "Attention to Detail", "Adaptability", "Patience", "Teamwork"]
    }
  ],
  experience: [
    {
      company: "Cycore Technology Solutions Co. Inc",
      role: "Internship",
      date: "2025",
      points: [
        "Assisted with database maintenance, data validation, and record correction.",
        "Performed basic CRUD (Create, Read, Update, Delete) operations on database records.",
        "Gained hands-on experience with Blazor and Bootstrap in developing responsive web applications.",
        "Collaborated with fellow interns on an HRIS (Human Resource Information System) project."
      ],
      tags: ["Blazor", "Bootstrap", "Database", "HRIS", "CRUD"]
    }
  ],
  certifications: [
    {
      id: "google-ux",
      title: "Foundations of User Experience (UX) Design",
      issuer: "Google",
      issuerIcon: "ph-google-logo",
      date: "Aug 2026",
      credentialId: "41YMB1TAMDI8",
      image: "/Certification/Foundations of User Experience (UX) Design.jpg"
    },
    {
      id: "figma",
      title: "Introduction to Figma",
      issuer: "Simplilearn",
      issuerIcon: "ph-graduation-cap",
      date: "Jul 2026",
      credentialId: "10518620",
      image: "/Certification/Introduction to Figma.jpg"
    }
  ],
  projects: [
    {
      id: "build-it",
      category: "web",
      isFeatured: true,
      badgeText: "Web Design • Featured Showcase",
      title: "Build IT",
      desc: "A PC shopping website designed for effortless hardware selection, helping users build their dream rig with an intuitive browsing experience and streamlined component filtering.",
      tags: ["E-Commerce", "Web Design", "UI Design", "Hardware Configurator"],
      images: [
        "/BUILD IT - PC Shopping and Effortless Hardware Selection/Frame 1.jpg"
      ]
    },
    {
      id: "tracktory",
      category: "web",
      isFeatured: true,
      isReverse: true,
      badgeText: "Web Design • System Dashboard",
      title: "TrackTory",
      desc: "An inventory management system designed for Almendarez Trading, featuring streamlined stock tracking, reporting, and business-ready dashboards for enterprise efficiency.",
      tags: ["Dashboard", "Web", "Inventory System", "Data Analytics"],
      images: [
        "/TrackTory - Inventory Management System for Almendarez Trading/Mock Up page.jpg",
        "/TrackTory - Inventory Management System for Almendarez Trading/Other Pages - 1.jpg",
        "/TrackTory - Inventory Management System for Almendarez Trading/Other Pages - 2.jpg",
        "/TrackTory - Inventory Management System for Almendarez Trading/Other Pages - 3.jpg",
        "/TrackTory - Inventory Management System for Almendarez Trading/Other Pages - 4.jpg"
      ]
    },
    {
      id: "sari-sari",
      category: "mobile",
      badgeText: "Mobile App",
      title: "Sari-Sari",
      desc: "An e-commerce mobile application with a minimalist design approach, making everyday shopping simple and delightful.",
      tags: ["E-Commerce", "Mobile", "Minimalist"],
      images: [
        "/Sari - Sari - E-Commerce app with a minimalist design/1st Page.jpg",
        "/Sari - Sari - E-Commerce app with a minimalist design/2nd Page.jpg"
      ]
    },
    {
      id: "tracky",
      category: "mobile",
      badgeText: "Mobile App",
      title: "Tracky",
      desc: "A food and beverages inventory management system with expiration tracking, ensuring freshness and reducing waste through smart alerts.",
      tags: ["Inventory", "Mobile", "Tracking"],
      images: [
        "/Tracky - Inventory Management System for Food and Beverages with Expiration Tracking/Mockup Page.jpg",
        "/Tracky - Inventory Management System for Food and Beverages with Expiration Tracking/Other Pages.jpg"
      ]
    },
    {
      id: "uv-express",
      category: "mobile",
      badgeText: "Mobile App",
      title: "UV Express Booker",
      desc: "A ride-booking mobile app for UV Express commuters, providing convenient route selection, seat reservation, and real-time trip updates.",
      tags: ["Transport", "Mobile", "Booking"],
      images: [
        "/UV Express Booker/01.jpg",
        "/UV Express Booker/2.jpg"
      ]
    }
  ]
};

/* ── 2. Component: ProjectCarousel ── */
const ProjectCarousel = memo(({ images, projectTitle, onImageClick }) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  const handlePrev = useCallback((e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev <= 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback((e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diffX = touchStartX.current - touchEndX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        setCurrent((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
      } else {
        setCurrent((prev) => (prev <= 0 ? images.length - 1 : prev - 1));
      }
    }
  }, [images.length]);

  return (
    <div 
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="carousel-track"
        style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}
      >
        {images.map((imgSrc, i) => (
          <img
            key={i}
            src={imgSrc}
            alt={`${projectTitle} mockup ${i + 1}`}
            className="project-img"
            loading="lazy"
            decoding="async"
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            onClick={() => onImageClick && onImageClick(images, i)}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button 
            type="button" 
            className="carousel-btn carousel-prev" 
            aria-label="Previous"
            onClick={handlePrev}
          >
            <i className="ph ph-caret-left"></i>
          </button>

          <button 
            type="button" 
            className="carousel-btn carousel-next" 
            aria-label="Next"
            onClick={handleNext}
          >
            <i className="ph ph-caret-right"></i>
          </button>

          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot ${i === current ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

/* ── 3. Component: ProjectCard ── */
const ProjectCard = memo(({ project, onImageClick }) => {
  const { isFeatured, isReverse, category, badgeText, title, desc, tags, images } = project;

  return (
    <article 
      className={`project-card ${isFeatured ? 'project-card--featured' : ''} ${isReverse ? 'project-card--reverse' : ''} animate-on-scroll visible`} 
      data-category={category}
    >
      <div className="project-thumbnail">
        <ProjectCarousel 
          images={images} 
          projectTitle={title} 
          onImageClick={onImageClick} 
        />
      </div>
      <div className="project-info">
        <span className="project-category">{badgeText}</span>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{desc}</p>
        <div className="project-tags">
          {tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
});

/* ── 4. Component: Projects ── */
const Projects = memo(({ projects, onImageClick }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.isFeatured && (activeFilter === 'all' || p.category === activeFilter));
  }, [projects, activeFilter]);

  const secondaryProjects = useMemo(() => {
    return projects.filter(p => !p.isFeatured && (activeFilter === 'all' || p.category === activeFilter));
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="projects-header-wrapper animate-on-scroll">
          <div>
            <p className="section-subtitle">Portfolio & Work</p>
            <h2 className="section-title">Featured <span className="text-accent">Projects</span></h2>
            <p className="section-description">
              A curated collection of UI/UX design projects I've built during my studies,
              showcasing my design process from concept to high-fidelity mockups.
            </p>
          </div>

          <div className="project-filters" id="project-filters">
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              All Projects
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => handleFilterClick('web')}
            >
              Web Design
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
              onClick={() => handleFilterClick('mobile')}
            >
              Mobile App
            </button>
          </div>
        </div>

        <div className="projects-grid" id="projects-grid">
          {featuredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onImageClick={onImageClick} 
            />
          ))}

          {secondaryProjects.length > 0 && (
            <div className="projects-subgrid">
              {secondaryProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onImageClick={onImageClick} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

/* ── 5. Component: Navbar ── */
const Navbar = memo(({ activeSection }) => {
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

/* ── 6. Component: Hero ── */
const Hero = memo(({ personal }) => {
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
              <Fragment key={idx}>
                {idx > 0 && <div className="stat-divider"></div>}
                <div className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </Fragment>
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

/* ── 7. Component: About ── */
const About = memo(({ personal, skills }) => {
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

/* ── 8. Component: Experience ── */
const Experience = memo(({ experienceList }) => {
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

/* ── 9. Component: Certifications ── */
const Certifications = memo(({ certifications, onImageClick }) => {
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

/* ── 10. Component: Contact ── */
const Contact = memo(({ contactInfo }) => {
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

/* ── 11. Component: Footer ── */
const Footer = memo(({ name }) => {
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

/* ── 12. Component: LightboxModal ── */
const LightboxModal = memo(({ isOpen, images, index, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && images.length > 1) onPrev();
      if (e.key === 'ArrowRight' && images.length > 1) onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose, onPrev, onNext]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImg = images[index] || images[0];
  const isSingle = images.length <= 1;

  return (
    <div className="lightbox open" id="lightbox">
      <div className="lightbox-backdrop" id="lightbox-backdrop" onClick={onClose} />
      <button 
        type="button" 
        className="lightbox-close" 
        id="lightbox-close" 
        aria-label="Close"
        onClick={onClose}
      >
        <i className="ph ph-x"></i>
      </button>

      {!isSingle && (
        <>
          <button 
            type="button" 
            className="lightbox-nav lightbox-prev" 
            id="lightbox-prev" 
            aria-label="Previous image"
            onClick={onPrev}
          >
            <i className="ph ph-caret-left"></i>
          </button>
          <button 
            type="button" 
            className="lightbox-nav lightbox-next" 
            id="lightbox-next" 
            aria-label="Next image"
            onClick={onNext}
          >
            <i className="ph ph-caret-right"></i>
          </button>
          <div className="lightbox-counter" id="lightbox-counter">
            {index + 1} / {images.length}
          </div>
        </>
      )}

      <div className="lightbox-content" id="lightbox-content">
        <img 
          src={currentImg} 
          alt="Project Mockup Preview" 
          className="lightbox-img" 
          id="lightbox-img" 
        />
      </div>
    </div>
  );
});

/* ── 13. Root App Component ── */
function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

  const handleOpenLightbox = useCallback((images, index) => {
    setLightbox({ isOpen: true, images, index });
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseLightbox = useCallback((images, index) => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  const handlePrevLightbox = useCallback((images, index) => {
    setLightbox(prev => ({
      ...prev,
      index: prev.index <= 0 ? prev.images.length - 1 : prev.index - 1
    }));
  }, []);

  const handleNextLightbox = useCallback((images, index) => {
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

/* Mount React App to DOM */
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
