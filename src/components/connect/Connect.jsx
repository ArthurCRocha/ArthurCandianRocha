import { useRef } from 'react';
import { useLanguage } from '../../contexts/languageContext';
import { connectData } from '../../data/connectData';
import useConnectMotion from './useConnectMotion';
import './Connect.css';

function ContactValue({ id, value }) {
  if (id !== 'email') return value;
  const [mailbox, domain] = value.split('@');
  return <>{mailbox}@<wbr />{domain}</>;
}

export default function Connect() {
  const root = useRef(null);
  const { t, lang, toggleLang } = useLanguage();
  const copy = t.connect;
  useConnectMotion(root);

  return (
    <footer className="connect" id="connect" ref={root} role="contentinfo" aria-labelledby="connect-title">
      <div className="connect-arrival" aria-hidden="true" />
      <div className="connect-field">
        <header className="connect-header">
          <p className="connect-meta">{copy.chapter}</p>
          <nav aria-label={copy.navigation}>
            <button className="connect-language connect-meta" type="button" onClick={toggleLang} aria-label={t.ui.switchLanguage}>
              <span>{lang.toUpperCase()}</span><span aria-hidden="true"> / {lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
          </nav>
        </header>

        <div className="connect-body">
          <h2 id="connect-title">{copy.title.map((line) => <span key={line}>{line}</span>)}</h2>
          <nav className="connect-contacts" aria-label={copy.contacts}>
            <ul>
              {connectData.links.map(({ id, value, href, external }, index) => (
                <li key={id}>
                  <p className="connect-meta"><span aria-hidden="true">{String(index + 1).padStart(2, '0')} / </span>{id === 'email' ? copy.email : value}</p>
                  <a className="connect-link" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={external ? copy.externalLink.replace('{name}', value) : copy.emailLink.replace('{email}', value)}>
                    <span><ContactValue id={id} value={value} /></span><span className="connect-link-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="connect-ending">
          <p className="connect-continuing"><span className="connect-japanese" lang="ja" aria-hidden="true">つづく</span><span className="connect-meta">{copy.continuing}</span></p>
          <p className="connect-meta connect-credit">© {connectData.year} {connectData.name}</p>
          <a className="connect-top connect-meta" href="#intro-content">{copy.backToTop}<span aria-hidden="true"> ↑</span></a>
        </div>
      </div>
    </footer>
  );
}
