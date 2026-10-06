import { useRef } from 'react';
import { useLanguage } from '../../contexts/languageContext';
import { nowData } from '../../data/nowData';
import useNowMotion from './useNowMotion';
import './Now.css';

export default function Now() {
  const root = useRef(null);
  const { t, field } = useLanguage();
  const copy = t.now;
  useNowMotion(root);

  return (
    <section className="now" id="now" ref={root} aria-labelledby="now-title">
      <header className="now-arrival">
        <svg className="now-thread" aria-hidden="true" focusable="false" preserveAspectRatio="none">
          <path className="now-thread-stroke" pathLength="1" />
        </svg>
        <p className="now-meta now-chapter">{copy.chapter}</p>
      </header>

      <div className="now-presence">
        <h2 id="now-title">
          {copy.statements.map(({ lead, action }) => (
            <span className="now-thought" key={action}>
              <span className="now-lead">{lead} </span>
              <span className="now-action">{action}</span>
            </span>
          ))}
        </h2>

        {nowData.items.length > 0 && (
          <dl className="now-current" aria-label={copy.currentContext}>
            {nowData.items.map(({ id, category, record, titleKey, organizationKey }, index) => (
              <div className="now-item" key={id} data-now-item={id}>
                <dt className="now-meta">
                  {copy.categories[category]} <span aria-hidden="true">/ {String(index + 1).padStart(2, '0')}</span>
                </dt>
                <dd>
                  <p className="now-item-title">{field(record, titleKey)}</p>
                  <p className="now-organization">{field(record, organizationKey)}</p>
                  <p className="now-meta now-period"><time dateTime={record.startDate}>{field(record, 'duration')}</time></p>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="now-outgoing" aria-hidden="true">
        <svg className="now-red-seed" viewBox="0 0 100 100" focusable="false">
          <path d="M51 6 C66 4 84 16 88 29 C96 41 94 61 86 74 C77 87 63 96 47 92 C31 96 15 81 10 66 C3 51 9 33 18 20 C27 10 39 5 51 6 Z" />
        </svg>
      </div>
    </section>
  );
}
