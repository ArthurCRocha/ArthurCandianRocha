import RevealText from '../components/RevealText';
import { useLanguage } from '../contexts/languageContext';

export default function Awards({ education, awards }) {
  const { t, field, lang } = useLanguage();

  return (
    <section id="awards" className="section awards-section">
      <div className="section-header">
        <RevealText as="h2" text={t.awards.title} />
      </div>

      <div className="awards-list">
        {education.map((edu) => (
          <div key={edu.id} className="award-item">
            <div className="award-name">{field(edu, 'degree')}</div>
            <div className="award-separator">—</div>
            <div className="award-category">{edu.institutionShort}</div>
            <div className="award-year">{lang === 'en' ? edu.durationEN : edu.duration}</div>
          </div>
        ))}
      </div>

      <div className="section-subhead">
        <h3 className="subsection-title">{t.ui.recognitions}</h3>
      </div>

      <div className="awards-list">
        {awards.map((award) => (
          <div key={award.id} className="award-item">
            <div className="award-name">{field(award, 'name')}</div>
            <div className="award-separator">—</div>
            <div className="award-category">{award.category}</div>
            <div className="award-year">{award.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
