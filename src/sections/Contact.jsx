import RevealText from '../components/RevealText';
import { useLanguage } from '../contexts/languageContext';

export default function Contact({ contactInfo }) {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section contact-section">
      <div className="section-header">
        <RevealText as="h2" text={t.contact.title} />
      </div>

      <div className="contact-content">
        <p className="contact-text">{t.contact.description}</p>
        <a
          href={`mailto:${contactInfo.email}`}
          className="contact-button"
          aria-label={`${t.contact.cta}: ${contactInfo.email}`}
        >
          {contactInfo.email}
        </a>
        <span className="contact-note">{t.contact.cta}</span>
      </div>
    </section>
  );
}
