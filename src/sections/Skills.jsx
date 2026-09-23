import RevealText from '../components/RevealText';
import useGsapReveal from '../hooks/useGsapReveal';
import { useLanguage } from '../contexts/languageContext';

export default function Skills({ hardSkills, softSkills }) {
  const { t, field } = useLanguage();
  const gridRef = useGsapReveal({ selector: '.services-column' });

  return (
    <section id="skills" className="section services-section skills-section">
      <div className="section-header">
        <RevealText as="h2" text={t.ui.skills} />
      </div>

      <div className="services-grid" ref={gridRef}>
        {Object.values(hardSkills).map((group) => (
          <div className="services-column" key={group.category}>
            <h3 className="services-title">{group.category}</h3>
            <div className="project-list-tech">
              {group.skills.map((skill) => (
                <span key={skill.name} className="tech-tag">{skill.name}</span>
              ))}
            </div>
          </div>
        ))}

        <div className="services-column">
          <h3 className="services-title">{t.ui.softSkills}</h3>
          <ul className="services-list">
            {softSkills.map((skill) => (
              <li key={skill.name} className="service-item">
                <span className="service-dot"></span>
                {field(skill, 'name')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
