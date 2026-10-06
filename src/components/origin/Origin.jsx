import { useLanguage } from '../../contexts/languageContext';
import { originFacts, originCopy } from '../../data/originData';

function Statement({ lines, className = '', ...props }) {
  return <h3 className={`origin-statement ${className}`} {...props}>
    {lines.map((line) => <span key={line}>{line}</span>)}
  </h3>;
}

export default function Origin() {
  const { t, field } = useLanguage();
  const copy = t.origin;
  const { computing, design, development, studies, audiovisual } = originFacts;
  const year = computing.startDate.slice(0, 4);

  return (
    <section className="origin" id="origin" aria-labelledby="origin-title">
      <svg className="origin-ink-path" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M852 64 C914 146 711 177 540 242 S160 329 180 390 C191 445 833 420 830 500 L830 620 L430 620 L430 760 L180 760 L180 970" />
        <path className="origin-ink-echo" d="M854 64 C918 149 705 178 537 241 S157 330 182 390" />
      </svg>

      <header className="origin-entry">
        <div className="origin-entry-content">
          <p className="origin-chapter">{copy.chapter}</p>
          <h2 className="origin-title" id="origin-title">
            {copy.title.map((line) => <span key={line}>{line}</span>)}
          </h2>
          <div className="origin-start">
            <span className="origin-year">{year}</span>
            <p className="origin-copy">{originCopy(copy.startCopy, { year, institution: computing.institutionShort })}</p>
            <p className="origin-label">{field(computing, 'degree')}<br />{field(computing, 'graduationDate')}</p>
          </div>
        </div>
      </header>

      <div className="origin-design origin-beat">
        <p className="origin-label origin-beat-label">{copy.designLabel} <span>↘</span></p>
        <Statement lines={copy.designTitle} data-origin-reveal />
        <div className="origin-design-evidence">
          <p className="origin-label">{design.startDate.slice(0, 4)}—{design.endDate.slice(0, 4)} / {design.companyShort}</p>
          <p className="origin-copy">{originCopy(copy.designCopy, { institution: design.companyShort })}</p>
          <p className="origin-aside">{originCopy(copy.earlierCopy, { period: audiovisual.year.replace('-', '–') })}</p>
        </div>
      </div>

      <div className="origin-convergence origin-beat">
        <Statement lines={copy.keptCode} className="origin-kept-code" />
        <p className="origin-label origin-connection">{copy.connection}</p>
        <Statement lines={copy.changedCode} className="origin-changed-code" data-origin-reveal />
      </div>

      <div className="origin-development origin-beat">
        <div className="origin-guides" aria-hidden="true"><i /><i /><i /></div>
        <p className="origin-label origin-beat-label">{copy.developmentLabel}</p>
        <Statement lines={copy.developmentTitle} />
        <p className="origin-copy origin-development-copy">{copy.developmentCopy}</p>
        <div className="origin-facts">
          <div>
            <p className="origin-label origin-fact-key">{copy.practice}</p>
            <p className="origin-fact-name">{development.companyShort}</p>
            <p className="origin-label">{field(development, 'position')}<br />{field(development, 'duration')}</p>
          </div>
          <div>
            <p className="origin-label origin-fact-key">{copy.education}</p>
            <p className="origin-fact-name">{studies.institution}</p>
            <p className="origin-label">{field(studies, 'degree')}<br />{field(studies, 'duration')}</p>
          </div>
        </div>
        <div className="origin-coda">
          <span className="origin-end-mark" aria-hidden="true" />
          <p>{copy.closing}</p>
          <span className="origin-label">{copy.endLabel}</span>
        </div>
      </div>
    </section>
  );
}
