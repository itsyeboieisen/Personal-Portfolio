import React, { useState, useMemo, useCallback } from 'react';
import { ProjectCard } from './ProjectCard';

export const Projects = React.memo(({ projects, onImageClick }) => {
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

Projects.displayName = 'Projects';
