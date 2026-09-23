import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../contexts/languageContext';

const SECTIONS = [
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'portfolio', key: 'portfolio' },
  { id: 'experience', key: 'projects' },
  { id: 'services', key: 'services' },
  { id: 'certificates', key: 'certificates' },
  { id: 'awards', key: 'awards' },
  { id: 'contact', key: 'contact' },
];

export default function Nav({ theme, onToggleTheme }) {
  const { t, lang, toggleLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const overlayRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const nodes = SECTIONS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { threshold: 0.25, rootMargin: '-15% 0px -45% 0px' });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const overlay = overlayRef.current;
    document.body.style.overflow = 'hidden';

    const focusables = overlay.querySelectorAll('a[href], button');
    focusables[0]?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    overlay.addEventListener('keydown', handleKeyDown);
    return () => {
      overlay.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useGSAP(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    const items = overlay.querySelectorAll('.nav-overlay-item');

    gsap.timeline()
      .fromTo(overlay, { clipPath: 'inset(0 0 100% 0)' }, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.6,
        ease: 'power4.inOut',
      })
      .fromTo(items, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
      }, '-=0.25');
  }, { dependencies: [isOpen], scope: overlayRef });

  const goTo = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="nav-bar">
        <a
          href="#hero"
          className="nav-mark"
          onClick={(e) => { e.preventDefault(); goTo('hero'); }}
        >
          AR
        </a>

        <div className="nav-controls">
          <button
            type="button"
            className="nav-lang"
            onClick={toggleLang}
            aria-label={t.ui.switchLanguage}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>

          <button
            type="button"
            className="nav-theme"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? t.ui.toLightTheme : t.ui.toDarkTheme}
          >
            <span className="nav-theme-dot" aria-hidden="true"></span>
          </button>

          <button
            type="button"
            ref={toggleRef}
            className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="nav-overlay"
            aria-label={isOpen ? t.ui.closeMenu : t.ui.openMenu}
          >
            <span className="nav-toggle-line" aria-hidden="true"></span>
            <span className="nav-toggle-line" aria-hidden="true"></span>
          </button>
        </div>
      </header>

      <nav
        id="nav-overlay"
        ref={overlayRef}
        className={`nav-overlay ${isOpen ? 'is-open' : ''}`}
        aria-label={t.ui.menu}
        aria-hidden={!isOpen}
        {...(isOpen ? {} : { inert: '' })}
      >
        <ul className="nav-overlay-list">
          {SECTIONS.map(({ id, key }, index) => (
            <li className="nav-overlay-item" key={id}>
              <a
                href={`#${id}`}
                className={`nav-overlay-link ${activeSection === id ? 'is-active' : ''}`}
                onClick={(e) => { e.preventDefault(); goTo(id); }}
              >
                <span className="nav-overlay-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
