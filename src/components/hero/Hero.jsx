import { lazy, Suspense, useMemo, useRef, useState, useCallback, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/languageContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import SceneBoundary from './SceneBoundary';
import PigmentSun from './PigmentSun';
import { createBrushPaths } from './inkGeometry';
import './Hero.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);
const HeroScene = lazy(() => import('./HeroScene'));
const brushPaths = createBrushPaths();

function supportsWebGL() {
  try {
    const context = document.createElement('canvas').getContext('webgl2');
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function Hero({ personalInfo, contactInfo, interaction, connectScene }) {
  const { t } = useLanguage();
  const hero = useRef(null);
  const art = useRef(null);
  const [framing, setFraming] = useState(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const mobile = useMediaQuery('(max-width: 700px), (hover: none) and (pointer: coarse)');
  const wide = useMediaQuery('(min-width: 1101px)');
  const stretch = wide ? 1.32 : 1;
  const canRender3D = useMemo(() => supportsWebGL(), []);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const onReady = useCallback(() => setSceneReady(true), []);
  const onFailure = useCallback(() => {
    setSceneReady(false);
    setSceneFailed(true);
  }, []);
  const [firstName, lastName] = personalInfo.displayName.split(' ');

  useLayoutEffect(() => {
    const frame = art.current;
    const measure = () => setFraming({
      width: frame.offsetWidth, height: frame.offsetHeight,
      left: frame.offsetLeft, top: frame.offsetTop,
    });
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(hero.current);
    measure();
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const title = hero.current.querySelectorAll('.intro-name-line');
      const intro = gsap.timeline();
      intro.fromTo(title, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, stagger: 0.08, ease: 'power2.out' }, 0.14)
        .fromTo('.intro-sun', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(73% at 50% 50%)', duration: 1.4, ease: 'power2.inOut' }, 0.24)
        .fromTo('.intro-art, .intro-scene', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.55, ease: 'power2.inOut' }, 0.38)
        .fromTo('.intro-detail-reveal', { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.7);

      // One shared spatial field, with progressively smaller movement in front.
      // These tweens are owned by the matchMedia context and revert on cleanup.
      const layers = [
        { selector: '.intro-art', x: 4, y: 2.5 },
        { selector: '.intro-sun', x: 1.6, y: 1 },
        { selector: '.intro-heading', x: 0.55, y: 0.3 },
      ].map(({ selector, x, y }) => ({
        x, y,
        moveX: gsap.quickTo(selector, 'x', { duration: 1.6, ease: 'power2.out' }),
        moveY: gsap.quickTo(selector, 'y', { duration: 1.6, ease: 'power2.out' }),
      }));
      const moveLayers = (x, y) => {
        layers.forEach((layer) => {
          layer.moveX(x * layer.x);
          layer.moveY(y * layer.y);
        });
      };
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
      const pointerMove = (event) => {
        if (!finePointer.matches || mobile || interaction.current.scroll > 0.02) return;
        const bounds = hero.current.getBoundingClientRect();
        interaction.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        interaction.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        moveLayers(interaction.current.x, interaction.current.y);
      };
      const resetPointer = () => {
        interaction.current.x = 0;
        interaction.current.y = 0;
        moveLayers(0, 0);
      };
      const node = hero.current;
      node.addEventListener('pointermove', pointerMove, { passive: true });
      node.addEventListener('pointerleave', resetPointer);
      return () => {
        node.removeEventListener('pointermove', pointerMove);
        node.removeEventListener('pointerleave', resetPointer);
        interaction.current.x = 0;
        interaction.current.y = 0;
      };
    });
    return () => media.revert();
  }, { scope: hero, dependencies: [mobile], revertOnUpdate: true });

  return (
    <section className="intro" id="hero" ref={hero} aria-labelledby="intro-title">
      <span className="intro-chapter intro-detail"><span className="intro-detail-reveal">{t.intro.chapter}</span></span>

      <div className="intro-sun" aria-hidden="true"><PigmentSun /></div>
      <div className={`intro-art ${sceneReady && !sceneFailed ? 'is-ready' : ''}`} ref={art} aria-hidden="true">
        <svg className="intro-ink-fallback" viewBox="0 0 500 500" focusable="false">
          <g transform={`translate(250 250) rotate(9) scale(${stretch} 1) translate(-250 -250)`} fill="none" stroke="currentColor">
            {brushPaths.map((path, index) => <path key={index} d={path.d} strokeWidth={path.width} />)}
          </g>
        </svg>
      </div>
      <div className={`intro-scene ${sceneReady && !sceneFailed ? 'is-ready' : ''}`} aria-hidden="true">
        {canRender3D && framing && !sceneFailed && (
          <SceneBoundary onFailure={onFailure}>
            <Suspense fallback={null}>
              <HeroScene interaction={interaction} connectScene={connectScene} framing={framing} reducedMotion={reducedMotion} mobile={mobile} stretch={stretch} onReady={onReady} onFailure={onFailure} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>

      <div className="intro-heading">
        <h1 className="intro-name" id="intro-title" aria-label={personalInfo.displayName}>
          <span className="intro-name-line intro-name-first" aria-hidden="true">{firstName.toUpperCase()}</span>
          <span className="intro-name-line intro-name-last" aria-hidden="true">{lastName.toUpperCase()}<span className="intro-name-period">.</span></span>
        </h1>
        <div className="intro-role intro-detail">
          <div className="intro-detail-reveal">
            <p>{t.intro.role}</p>
            <p className="intro-secondary"><span aria-hidden="true">×</span> {t.intro.secondaryRole}</p>
          </div>
        </div>
      </div>

      <p className="intro-note intro-detail"><span className="intro-detail-reveal">{t.intro.note}</span></p>

      <div className="intro-bottom intro-detail">
        <div className="intro-bottom-grid intro-detail-reveal">
          <div className="intro-location">
            <span className="intro-location-dot" aria-hidden="true" />
            <span>{personalInfo.location.city}, {personalInfo.location.state}<br />{t.intro.country} / 2026</span>
          </div>
          <span className="intro-scroll" aria-hidden="true">
            <span>{t.intro.scroll}</span><span className="intro-scroll-arrow" aria-hidden="true">↓</span>
          </span>
          <div className="intro-links">
            <a href={contactInfo.social.github.url} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
