import React from 'react';
import { ProjectCarousel } from './ProjectCarousel';

export const ProjectCard = React.memo(({ project, onImageClick }) => {
  const { isFeatured, isReverse, isInProgress, category, badgeText, title, desc, tags, images } = project;

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
        {isInProgress && (
          <div className="project-wip-badge">
            <span className="wip-dot"></span>
            Work in Progress
          </div>
        )}
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

ProjectCard.displayName = 'ProjectCard';
