import { useRef } from 'react';
import { useLanguage } from '../../contexts/languageContext';
import { selectedProjects } from '../../data/selectedWorkData';
import useSelectedWorkMotion from './useSelectedWorkMotion';
import './SelectedWork.css';

function ProjectInformation({ work }) {
  const { t, field } = useLanguage();
  const copy = t.selectedWork;
  return (
    <div className={`work-information work-information-${work.id}`}>
      <div className="work-reading" id={`${work.id}-context`} tabIndex={-1}>
        {work.sections.map((section) => <div className="work-reading-section" key={section.label}>
          <h4 className="work-meta">{copy[section.label]}</h4>
          <p>{field(section, 'text')}</p>
        </div>)}
      </div>
      <dl className="work-details">
        {work.role && <div><dt className="work-meta">{copy.role}</dt><dd>{field(work, 'role')}</dd></div>}
        {work.visibleStack?.length > 0 && <div><dt className="work-meta">{copy.stack}</dt><dd className="work-stack">
          {work.visibleStack.map((technology) => <span key={technology}>{copy.technologyNames[technology] ?? technology}</span>)}
        </dd></div>}
        {work.status && <div><dt className="work-meta">{copy.status}</dt><dd>{field(work, 'status')}</dd></div>}
      </dl>
      {work.links.length > 0 && <div className="work-links">{work.links.map((link) =>
        <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">{copy[link.label]} <span aria-hidden="true">↗</span></a>
      )}</div>}
    </div>
  );
}

function SystemComposition() {
  const { t } = useLanguage();
  return (
    <div className="work-system" aria-hidden="true">
      <div className="work-red-field" />
      <div className="work-system-depth">
        <div className="work-system-plane work-system-plane-back">
          <svg viewBox="0 0 660 440" preserveAspectRatio="none"><path d="M24 24 H636 V416 H24 Z M24 132 H636 M192 24 V416 M24 352 H636" /></svg>
        </div>
        <div className="work-system-plane work-system-plane-front">
          <svg viewBox="0 0 660 440" preserveAspectRatio="none">
            <path d="M0 0 H660 V440 H0 Z M0 72 H660 M84 72 V440 M420 72 V440 M84 308 H660" />
            <path className="work-system-signal" d="M84 206 H290 V130 H540 M290 206 V365 H530" />
            <path className="work-system-nodes" d="M285 201 H295 V211 H285 Z M535 125 H545 V135 H535 Z M525 360 H535 V370 H525 Z" />
          </svg>
        </div>
      </div>
      <span className="work-composition-caption work-meta">{t.selectedWork.systemComposition}</span>
    </div>
  );
}

function DocumentComposition() {
  const { t } = useLanguage();
  return (
    <div className="work-documents" aria-hidden="true">
      <div className="work-document-axis"><i /><i /><span /></div>
      {[0, 1, 2, 3].map((index) => <div className={`work-document work-document-${index}`} key={index}>
        <svg viewBox="0 0 220 310" preserveAspectRatio="none">
          <path className="work-document-edge" d="M18 18 H202 V292 H18 Z" />
          <path className="work-document-block" d="M36 48 H126 V62 H36 Z M36 83 H76 V88 H36 Z M36 145 H155 V150 H36 Z M36 166 H115 V171 H36 Z M36 237 H145 V242 H36 Z" />
          <path className="work-document-rule" d="M36 115 H184 M36 202 H184 M36 270 H184" />
          <path className="work-document-red" d="M36 48 V88 M178 270 H184 V264" />
        </svg>
      </div>)}
      <span className="work-composition-caption work-meta">{t.selectedWork.documentComposition}</span>
    </div>
  );
}

function ProjectCover({ work, total }) {
  const { t, field, lang } = useLanguage();
  const copy = t.selectedWork;
  const documents = work.id === 'cv-standardization';
  const title = field(work, 'title');
  const lines = documents ? (lang === 'en' ? title.split(' ') : [title.split(' ')[0], title.split(' ').slice(1).join(' ')]) : [title];
  return (
    <header className={`work-cover work-cover-${work.id}`}>
      <div className="work-project-index work-meta"><span>{work.number} / {total}</span><span>{field(work, 'discipline')}</span></div>
      {work.project.year && <p className="work-year work-meta">{copy.year} / {work.project.year}</p>}
      <h3 className="work-project-title" id={`${work.id}-title`}>{lines.map((line) => <span key={line}>{line}</span>)}</h3>
      {documents ? <DocumentComposition /> : <SystemComposition />}
      <a className="work-read-link work-meta" href={`#${work.id}-context`}>{copy.readContext}<span aria-hidden="true">↓</span></a>
    </header>
  );
}

export default function SelectedWork() {
  const { t } = useLanguage();
  const copy = t.selectedWork;
  const root = useRef(null);
  useSelectedWorkMotion(root);
  const total = String(selectedProjects.length).padStart(2, '0');

  return (
    <section className="selected-work" id="selected-work" aria-labelledby="selected-work-title" ref={root}>
      <div className="work-arrival" aria-hidden="true">
        <svg viewBox="0 0 1000 180" preserveAspectRatio="none">
          <path className="work-arrival-thread" d="M150 0 L110 90 L110 180 M600 0 L640 90 L910 90 V180" />
          <path className="work-arrival-frame" pathLength="1" d="M110 180 H910 M830 90 H910 V160" />
        </svg>
      </div>
      <header className="work-chapter-header">
        <p className="work-meta work-chapter">{copy.chapter}</p>
        <h2 id="selected-work-title">{copy.title}</h2>
        <span className="work-meta work-total">{total} / {copy.projects}</span>
      </header>

      {selectedProjects.map((work, index) => <article className={`work-project work-project-${work.id}`} key={work.id} id={work.id} aria-labelledby={`${work.id}-title`}>
        {index > 0 && <div className="work-transfer" aria-hidden="true"><i /><i /><i /></div>}
        <ProjectCover work={work} total={total} />
        <ProjectInformation work={work} />
      </article>)}

      <div className="work-departure" aria-hidden="true">
        <svg viewBox="0 0 1000 220" preserveAspectRatio="none">
          <path className="work-departure-frame" d="M160 0 V66 H490 V130 M530 0 V70 H490" />
          <path className="work-departure-line" d="M490 130 C490 190 350 155 350 220" />
        </svg>
      </div>
      <p className="work-end work-meta">{copy.endLabel}</p>
    </section>
  );
}
