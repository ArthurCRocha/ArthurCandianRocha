import RevealText from '../components/RevealText';
import { useLanguage } from '../contexts/languageContext';

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="section services-section">
      <div className="section-header">
        <RevealText as="h2" text={t.services.title} />
      </div>

      <div className="services-grid">
        <div className="services-column">
          <h3 className="services-title">{t.services.development.title}</h3>
          <ul className="services-list">
            {t.services.development.items.map((item) => (
              <li key={item} className="service-item">
                <span className="service-dot"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="services-column">
          <h3 className="services-title">{t.services.design.title}</h3>
          <ul className="services-list">
            {t.services.design.items.map((item) => (
              <li key={item} className="service-item">
                <span className="service-dot"></span>
                {item}
              </li>
            ))}
          </ul>
          <div className="availability-box">
            <p className="availability-status">{t.services.availability.status}</p>
            <p className="availability-timeline">{t.services.availability.timeline}</p>
            <p className="availability-note">{t.services.availability.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
