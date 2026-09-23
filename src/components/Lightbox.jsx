import { useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/languageContext';

export default function Lightbox({ state, onClose, onNavigate }) {
  const { t } = useLanguage();
  const { image, images, currentIndex, info } = state;

  const next = useCallback((e) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const prev = useCallback((e) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    onNavigate(currentIndex <= 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [next, prev, onClose]);

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <button
        className="modal-close-btn"
        onClick={onClose}
        aria-label={t.common.close}
      >
        ×
      </button>

      {info.title && (
        <div className="modal-info">
          <h3 className="modal-info-title">{info.title}</h3>
          {info.description && (
            <p className="modal-info-description">{info.description}</p>
          )}
        </div>
      )}

      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={image}
          alt={info.title || t.ui.expandedImage}
          className="image-modal-image"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            className="modal-nav-btn modal-prev-btn"
            onClick={prev}
            aria-label={t.common.previous}
          >
            ‹
          </button>
          <button
            className="modal-nav-btn modal-next-btn"
            onClick={next}
            aria-label={t.common.next}
          >
            ›
          </button>
          <div className="modal-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
