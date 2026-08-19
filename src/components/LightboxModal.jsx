import React, { useEffect } from 'react';

export const LightboxModal = React.memo(({ isOpen, images, index, onClose, onPrev, onNext }) => {
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

LightboxModal.displayName = 'LightboxModal';
