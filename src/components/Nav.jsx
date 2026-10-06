import { useLanguage } from '../contexts/languageContext';
import './Nav.css';

export default function Nav({ contactInfo }) {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className="intro-nav">
      <a className="intro-nav-mark" href="#hero" aria-label="Arthur Rocha — Intro">
        AR<span className="intro-nav-slash"> / </span>26<span className="intro-nav-dot">.</span>
      </a>
      <nav className="intro-nav-controls" aria-label={t.intro.navigation}>
        <button type="button" onClick={toggleLang} aria-label={t.ui.switchLanguage} className="intro-language">
          <span key={lang}>{lang.toUpperCase()}</span>
        </button>
        <a className="intro-nav-contact" href={`mailto:${contactInfo.email}`}>
          {t.intro.contact}<span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
