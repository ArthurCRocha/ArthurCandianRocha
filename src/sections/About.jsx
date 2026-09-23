import RevealText from '../components/RevealText';
import { useLanguage } from '../contexts/languageContext';

export default function About({ stats }) {
  const { t } = useLanguage();

  return (
    <section id="about" className="section about-section">
      <div className="section-header">
        <RevealText as="h2" text={t.about.title} />
      </div>

      <div className="about-content">
        <p className="about-text">{t.about.description}</p>

        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">{stats.experience.years}</span>
            <span className="stat-label">{t.about.stats.experience}</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.projects.count}</span>
            <span className="stat-label">{t.about.stats.projects}</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.technologies.count}</span>
            <span className="stat-label">{t.about.stats.technologies}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
