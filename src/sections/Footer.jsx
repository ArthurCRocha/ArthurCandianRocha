import { useLanguage } from '../contexts/languageContext';

export default function Footer({ contactInfo }) {
  const { t } = useLanguage();

  const socials = [
    { url: contactInfo.social.linkedin.url, label: 'LinkedIn' },
    { url: contactInfo.social.github.url, label: 'GitHub' },
    { url: contactInfo.social.instagram.url, label: 'Instagram' },
    { url: contactInfo.whatsapp, label: 'WhatsApp' },
  ];

  const quickLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#portfolio', label: t.nav.portfolio },
    { href: '#experience', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>{t.contact.footer.social}</h4>
          <ul className="social-links">
            {socials.map((social, index) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="link-number">{String(index + 1).padStart(2, '0')}</span>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <nav className="footer-navigation" aria-label={t.ui.quickNav}>
            <h4>{t.contact.footer.navigation}</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-column">
          <p className="copyright">{t.contact.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
