import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/languageContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import { craftCategories, craftTechnologies } from '../../data/craftData';
import './Craft.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Context({ technology, inline = false }) {
  const { t, lang, field } = useLanguage();
  const copy = t.craft;
  const category = copy.categories[technology.category];
  return (
    <div className={`craft-context-content${inline ? ' craft-context-inline' : ''}`}>
      <div className="craft-context-index craft-meta"><span>{copy.context}</span><span>{technology.number}</span></div>
      {!inline && <h4 className="craft-context-name">{technology.name}</h4>}
      <dl className="craft-context-type">
        <dt className="craft-meta">{copy.type}</dt>
        <dd>{category.name}<span>{category.description}</span></dd>
      </dl>
      {technology.references.length > 0 && <div className="craft-related">
        <h5 className="craft-meta">{copy.relatedWork}</h5>
        <ul>
          {technology.references.slice(0, 3).map(({ kind, record }) => <li key={`${kind}-${record.id}`}>
            <p className="craft-meta craft-reference-kind">{copy[kind]} <span>/ {kind === 'experience' ? field(record, 'duration') : record.year}</span></p>
            <p className="craft-reference-name">{kind === 'experience' ? record.companyShort :
              (lang === 'en' && copy.projectNames[record.id]) || field(record, 'name')}</p>
            {kind === 'experience' && <p className="craft-reference-role">{field(record, 'position')}</p>}
          </li>)}
        </ul>
      </div>}
    </div>
  );
}

export default function Craft() {
  const { t, lang } = useLanguage();
  const copy = t.craft;
  const section = useRef(null);
  const compact = useMediaQuery('(max-width: 900px), (hover: none), (pointer: coarse)');
  const [activeId, setActiveId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const active = craftTechnologies.find((technology) => technology.id === activeId);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.craft-grid-grow', { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: {
          id: 'origin-craft-grid', trigger: '.craft-bridge',
          start: 'top 95%', end: 'bottom 35%', scrub: 0.35,
        },
      });
    });
    return () => media.revert();
  }, { scope: section });

  useLayoutEffect(() => {
    // Inline disclosure and translated titles can change document height.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(refresh);
  }, [expandedId, compact, lang]);

  return (
    <section className={`craft${compact ? ' craft-compact' : ''}`} id="craft" aria-labelledby="craft-title" ref={section}>
      <div className="craft-bridge" aria-hidden="true">
        <svg viewBox="0 0 1200 180" preserveAspectRatio="none">
          <path className="craft-grid-thread" d="M300 0 L300 180 M600 0 L600 72 L720 132 L720 180 M900 0 L900 180" />
          <path className="craft-grid-grow" pathLength="1" d="M0 132 H1200 M0 180 H1200" />
        </svg>
        <span className="craft-bridge-mark" />
      </div>

      <div className="craft-body">
        <header className="craft-header">
          <p className="craft-chapter craft-meta">{copy.chapter}</p>
          <p className="craft-edition craft-meta">STACK / 2026</p>
          <h2 id="craft-title" className="craft-title">{copy.title.map((line) => <span key={line}>{line}</span>)}</h2>
          <div className="craft-introduction">
            <p>{copy.introduction}</p>
            <p className="craft-instruction craft-meta">{compact ? copy.tapHint : copy.hoverHint}<span aria-hidden="true">↙</span></p>
          </div>
        </header>

        <div className={`craft-workbench${!compact && active ? ' has-selection' : ''}`}>
          <div className="craft-catalog">
            {craftCategories.map((category) => <div className={`craft-category craft-category-${category.id}`} key={category.id}>
              <h3 className="craft-category-title craft-meta"><span>{category.number}</span>{copy.categories[category.id].name}</h3>
              <ul className="craft-technologies">
                {category.technologies.map((technology) => {
                  const selected = compact ? expandedId === technology.id : activeId === technology.id;
                  const contextId = `craft-info-${technology.id}`;
                  return <li className={`craft-technology${selected ? ' is-selected' : ''}`} key={technology.id}>
                    <button
                      type="button"
                      className="craft-tech-button"
                      aria-expanded={compact ? selected : undefined}
                      aria-controls={compact ? contextId : 'craft-context'}
                      aria-label={`${technology.name} — ${copy.details}`}
                      onPointerEnter={(event) => { if (!compact && event.pointerType !== 'touch') setActiveId(technology.id); }}
                      onFocus={() => { if (!compact) setActiveId(technology.id); }}
                      onClick={() => { if (compact) setExpandedId(selected ? null : technology.id); else setActiveId(technology.id); }}
                    >
                      <span className="craft-tech-index craft-meta" aria-hidden="true">{technology.number}</span>
                      <span className="craft-tech-name">{technology.name}</span>
                      <span className="craft-tech-indicator" aria-hidden="true">{compact ? (selected ? '−' : '+') : '↗'}</span>
                    </button>
                    {compact && <div id={contextId} hidden={!selected}>{selected && <Context technology={technology} inline />}</div>}
                  </li>;
                })}
              </ul>
            </div>)}
          </div>

          {!compact && <aside className="craft-context" id="craft-context" aria-label={copy.context} aria-live="polite" aria-atomic="true">
            {active ? <Context technology={active} /> : <div className="craft-context-empty">
              <p className="craft-meta">{copy.context}</p>
              <span className="craft-context-cross" aria-hidden="true">+</span>
              <p>{copy.emptyContext}</p>
              <span className="craft-meta">{copy.emptyHint}</span>
            </div>}
          </aside>}
        </div>

        <div className="craft-opening" aria-hidden="true"><i /><i /><span /></div>
        <div className="craft-coda"><p>{copy.closing}</p><span className="craft-meta">{copy.endLabel}</span></div>
      </div>
    </section>
  );
}
