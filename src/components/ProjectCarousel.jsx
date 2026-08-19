import React, { useState, useCallback, useRef } from 'react';

export const ProjectCarousel = React.memo(({ images, projectTitle, onImageClick }) => {
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

ProjectCarousel.displayName = 'ProjectCarousel';
