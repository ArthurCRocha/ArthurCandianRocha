import { useRef } from 'react';
import { useLanguage } from '../../contexts/languageContext';
import { pathIdentity, pathMoments } from '../../data/pathData';
import usePathMotion from './usePathMotion';
import './Path.css';

function PathMoment({ moment }) {
  const { t, field } = useLanguage();
  const copy = t.path;
  const { record } = moment;
  const identity = pathIdentity(moment, field);
  const emphasized = moment.id === 'computing' || moment.id === 'studies';
  const period = moment.kind === 'project' ? record.year.replace('-', '–') : field(record, 'duration');
  return (
    <li className={`path-moment path-moment-${moment.id}${moment.background ? ' path-background' : ''}`} data-moment={moment.id} data-language={moment.language} data-start={moment.startDate} data-precision={moment.datePrecision}>
      <i className="path-anchor" aria-hidden="true" />
      {moment.language === 'technical' && <div className="path-guides" aria-hidden="true"><i /><i /></div>}
      <article className="path-moment-body" aria-labelledby={`path-${moment.id}-title`}>
        {moment.background && <p className="path-meta path-background-label">{copy.background}</p>}
        {moment.id === 'studies' && <p className="path-meta path-parallel">{copy.parallel}</p>}
        <p className={`path-date${emphasized ? ' path-date-emphasis' : ' path-meta'}`}>
          <time dateTime={moment.startDate}>{emphasized ? moment.year : period}</time>
          {record.current && <span className="path-current"><span className="sr-only">{copy.current}</span></span>}
        </p>
        {moment.id === 'computing' && <p className="path-meta path-beginning">{copy.beginning}</p>}
        <h3 id={`path-${moment.id}-title`}>{identity.role}</h3>
        <p className="path-organization">{identity.organization}</p>
        {emphasized && <p className="path-meta path-period">{field(record, 'duration')}</p>}
        {moment.summary && <p className="path-summary">{field(moment, 'summary')}</p>}
        {moment.id === 'computing' && <p className="path-meta path-academic-state">{field(record, 'graduationDate')}</p>}
        {moment.previousStudies && <p className="path-transition">
          <span className="path-meta">{moment.previousStudies.institutionShort} / {field(moment.previousStudies, 'graduationDate')}</span>
          <span>{copy.academicContinuation}</span>
        </p>}
      </article>
    </li>
  );
}

export default function Path() {
  const { t } = useLanguage();
  const root = useRef(null);
  const copy = t.path;
  usePathMotion(root);
  return (
    <section className="path" id="path" aria-labelledby="path-title" ref={root}>
      <header className="path-entry">
        <svg className="path-entry-line" viewBox="0 0 1000 720" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="path-entry-stroke" pathLength="1" d="M350 0 C350 90 830 80 830 250 S750 480 600 550 S350 600 350 720" />
          <path className="path-entry-echo" pathLength="1" d="M360 45 C400 125 844 100 844 255 S770 485 610 548" />
        </svg>
        <p className="path-meta path-chapter">{copy.chapter}</p>
        <h2 id="path-title">{copy.title.map((line) => <span key={line}>{line}</span>)}</h2>
        <p className="path-entry-note">{copy.introduction}</p>
      </header>
      <div className="path-field">
        <svg className="path-line" aria-hidden="true" focusable="false" preserveAspectRatio="none">
          {pathMoments.map((moment) => <g key={moment.id} data-line={moment.id}>
            <path className={`path-stroke path-stroke-${moment.language}`} pathLength="1" />
            {moment.language !== 'technical' && <path className="path-stroke-echo" pathLength="1" />}
          </g>)}
        </svg>
        <ol className="path-moments" role="list" aria-label={copy.chronology}>
          {pathMoments.map((moment) => <PathMoment key={moment.id} moment={moment} />)}
        </ol>
      </div>
      <footer className="path-continuation">
        <svg viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="path-exit-stroke" pathLength="1" d="M350 0 V90 Q350 160 480 160 H640 C830 160 740 300 1100 350" />
        </svg>
        <p className="path-meta path-forward"><span aria-hidden="true">↗</span>{copy.continuing}</p>
        <p className="path-closing">{copy.closing}</p>
        <span className="path-meta path-end">{copy.endLabel}</span>
      </footer>
    </section>
  );
}
