import { useState } from 'react';
import RevealText from '../components/RevealText';
import useGsapReveal from '../hooks/useGsapReveal';
import { useLanguage } from '../contexts/languageContext';

export default function Experience({ experiences }) {
  const { t, lang } = useLanguage();
  const [hovered, setHovered] = useState(null);
  const listRef = useGsapReveal({ selector: '.project-item', stagger: 0.06 });

  return (
    <section id="experience" className="section projects-section">
      <div className="section-header">
        <RevealText as="h2" text={t.projects.title} />
      </div>

      <div className="projects-list" ref={listRef}>
        {experiences.map((exp, index) => {
          const duration = lang === 'en' ? exp.durationEN : exp.duration;

          return (
            <div
              key={exp.id}
              className="project-item"
              onMouseEnter={() => setHovered(exp.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="project-info">
                <h3 className="project-name">{exp.companyShort}</h3>
                <p className="project-category">{exp.category}</p>
              </div>
              <div className="project-year">{exp.year || duration.split(' - ')[0]}</div>
              <div className={`project-indicator ${hovered === exp.id ? 'active' : ''}`}></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
