import RevealText from '../components/RevealText';
import useGsapReveal from '../hooks/useGsapReveal';
import { useLanguage } from '../contexts/languageContext';

export default function Certificates({ certificates, onOpenModal }) {
  const { t } = useLanguage();
  const gridRef = useGsapReveal({ selector: '.certificate-card' });

  return (
    <section id="certificates" className="section certificates-section">
      <div className="section-header">
        <RevealText as="h2" text={t.certificates.title} />
      </div>

      <div className="certificates-grid" ref={gridRef}>
        {certificates.map((certificate) => (
          <div key={certificate.id} className="certificate-card">
            <div
              className="certificate-image-wrapper"
              onClick={() => onOpenModal({
                image: certificate.image,
                images: [certificate.image],
                currentIndex: 0,
                info: {
                  title: certificate.name,
                  description: `${certificate.issuer} - ${certificate.date}`,
                },
              })}
            >
              <img
                src={certificate.image}
                alt={certificate.name}
                className="certificate-image"
              />
              <div className="certificate-overlay">
                <span className="certificate-view">{t.certificates.view}</span>
              </div>
            </div>
            <div className="certificate-info">
              <h3 className="certificate-name">{certificate.name}</h3>
              <p className="certificate-issuer">{certificate.issuer}</p>
              <div className="certificate-meta">
                <span className="certificate-date">{certificate.date}</span>
                <span className="certificate-id">{t.certificates.id}: {certificate.credentialId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
