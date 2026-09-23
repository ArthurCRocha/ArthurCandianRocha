import { lazy, Suspense, useMemo } from 'react';
import { useLanguage } from '../../contexts/languageContext';
import SceneBoundary from './SceneBoundary';

// three.js é pesado e puramente decorativo: sai do bundle inicial.
const HeroScene = lazy(() => import('./HeroScene'));

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

export default function Hero({ theme, personalInfo, contactInfo }) {
  const { t } = useLanguage();
  const canRender3D = useMemo(() => supportsWebGL(), []);

  return (
    <header className="hero" id="hero">
      {canRender3D && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <HeroScene theme={theme} />
          </Suspense>
        </SceneBoundary>
      )}

      <div className="hero-content">
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <p className="hero-description">{t.hero.bio}</p>

        <div className="hero-meta">
          <div className="meta-item">
            <span className="meta-label">{t.hero.location}</span>
            <span className="meta-value">{personalInfo.location.displayText}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">{t.hero.email}</span>
            <a href={`mailto:${contactInfo.email}`} className="meta-link">{contactInfo.email}</a>
          </div>
          <div className="meta-item">
            <span className="meta-label">{t.hero.status}</span>
            <span className="meta-value available">{t.hero.available}</span>
          </div>
        </div>
      </div>

      <span className="scroll-cue" aria-hidden="true">{t.ui.scroll}</span>
    </header>
  );
}
