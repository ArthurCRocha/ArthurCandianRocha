import './App.css';
import { useState, useEffect } from 'react';
import portfolioData from './data/portfolioData';
import translations from './data/translations';

export default function App() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectImageIndexes, setProjectImageIndexes] = useState({});
  
  // Estados para o modal de imagem
  const [modalImage, setModalImage] = useState(null);
  const [modalImages, setModalImages] = useState([]);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  const [modalInfo, setModalInfo] = useState({ title: '', description: '' });
  
  // Estados para tema e idioma
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'pt';
  });

  // Get translations
  const t = translations[language];

  // Destructure portfolio data
  const { 
    personalInfo, 
    contactInfo, 
    experience, 
    services: portfolioServices,
    certificates,
    stats,
    helpers 
  } = portfolioData;

  // Get projects by type
  const developmentProjects = helpers.getDevelopmentProjects();
  const designProjects = helpers.getDesignProjects();

  // Navigate to next image
  const handleNextImage = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!project.images || project.images.length <= 1) return;
    
    const currentIndex = projectImageIndexes[project.id] || 0;
    const newIndex = (currentIndex + 1) % project.images.length;
    
    setProjectImageIndexes(prev => ({
      ...prev,
      [project.id]: newIndex
    }));
  };

  // Navigate to previous image
  const handlePrevImage = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!project.images || project.images.length <= 1) return;
    
    const currentIndex = projectImageIndexes[project.id] || 0;
    const newIndex = currentIndex <= 0 ? project.images.length - 1 : currentIndex - 1;
    
    setProjectImageIndexes(prev => ({
      ...prev,
      [project.id]: newIndex
    }));
  };

  // Get current image for a project
  const getCurrentImage = (project) => {
    if (!project.images || project.images.length === 0) return project.image;
    const index = projectImageIndexes[project.id] || 0;
    return project.images[index];
  };

  // Função para abrir modal de imagem
  const openImageModal = (image, images = null, currentIndex = 0, info = {}) => {
    setModalImage(image);
    setModalImages(images || [image]);
    setModalCurrentIndex(currentIndex);
    setModalInfo(info);
    document.body.style.overflow = 'hidden'; // Previne scroll do body
  };

  // Função para fechar modal
  const closeImageModal = () => {
    setModalImage(null);
    setModalImages([]);
    setModalCurrentIndex(0);
    setModalInfo({ title: '', description: '' });
    document.body.style.overflow = 'auto';
  };

  // Navegar para próxima imagem no modal
  const modalNextImage = (e) => {
    e?.stopPropagation();
    if (modalImages.length <= 1) return;
    const newIndex = (modalCurrentIndex + 1) % modalImages.length;
    setModalCurrentIndex(newIndex);
    setModalImage(modalImages[newIndex]);
  };

  // Navegar para imagem anterior no modal
  const modalPrevImage = (e) => {
    e?.stopPropagation();
    if (modalImages.length <= 1) return;
    const newIndex = modalCurrentIndex <= 0 ? modalImages.length - 1 : modalCurrentIndex - 1;
    setModalCurrentIndex(newIndex);
    setModalImage(modalImages[newIndex]);
  };

  // Teclas de atalho para navegação
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalImage) return;
      
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowRight') {
        modalNextImage();
      } else if (e.key === 'ArrowLeft') {
        modalPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImage, modalCurrentIndex, modalImages]);

  // Aplicar tema escuro
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Salvar idioma
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Handle scroll progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Use real data for projects (experience)
  const projects = experience.map(exp => ({
    id: exp.id,
    name: exp.companyShort,
    category: exp.category,
    year: exp.year || exp.duration.split(' - ')[0]
  }));

  const awards = [
    { name: 'IF Sudeste MG', category: 'Ciência da Computação', year: '2020-2026' },
    { name: 'Formação Híbrida', category: 'Dev + Design', year: '2023-2025' },
  ];

  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader-content">
          <div className="loader-bar"></div>
          <p className="loader-text">{t.common.loading}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Theme & Language Controls */}
      <div className="top-controls">
        {/* Language Toggle */}
        <div className="control-group">
          <label className="control-label" aria-label="Idioma">
            <span className="control-icon">🌐</span>
          </label>
          <button 
            className={`language-toggle ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            aria-label="Alternar idioma"
          >
            <span className="lang-option" data-active={language === 'pt'}>PT</span>
            <span className="lang-option" data-active={language === 'en'}>EN</span>
            <div className="toggle-slider"></div>
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="control-group">
          <label className="control-label" aria-label="Tema">
            <span className="control-icon">{isDarkMode ? '🌙' : '☀️'}</span>
          </label>
          <button 
            className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Alternar tema"
          >
            <div className="toggle-track">
              <div className="toggle-thumb"></div>
            </div>
          </button>
        </div>
      </div>

      {/* HERO / HEADER */}
      <header className="hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <p className="hero-description">{t.hero.bio}</p>
          
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-label">{t.hero.location}</span>
              <span className="meta-value">{personalInfo.location.displayText}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">{t.hero.email}</span>
              <a href={`mailto:${contactInfo.email}`} className="meta-link">{contactInfo.email}</a>
            </div>
            <div className="meta-item">
              <span className="meta-label">{t.hero.status}</span>
              <span className="meta-value available">{t.hero.available}</span>
            </div>
          </div>
        </div>
      </header>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section projects-section">
        <div className="section-header">
          <h2>{t.projects.title}</h2>
        </div>
        
        <div className="projects-list">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-item"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-number">{String(project.id).padStart(2, '0')}</div>
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-category">{project.category}</p>
              </div>
              <div className="project-year">{project.year}</div>
              <div className={`project-indicator ${hoveredProject === project.id ? 'active' : ''}`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section about-section">
        <div className="section-header">
          <h2>{t.about.title}</h2>
        </div>
        
        <div className="about-content">
          <p className="about-text">
            {t.about.description}
          </p>
          
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
              <span className="stat-number">{stats.clients.count}</span>
              <span className="stat-label">{t.about.stats.technologies}</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION - DEVELOPMENT & DESIGN PROJECTS */}
      <section id="portfolio" className="section portfolio-projects-section">
        <div className="section-header">
          <h2>{t.portfolio.title}</h2>
          <p className="section-description">{t.portfolio.description}</p>
        </div>

        {/* Development Projects */}
        <div className="projects-subsection">
          <h3 className="subsection-title">
            <span className="subsection-icon">💻</span>
            {t.portfolio.development}
          </h3>
          <div className="projects-list-minimal">
            {developmentProjects.map((project, index) => (
              <div key={project.id} className="project-list-item">
                <div className="project-list-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="project-list-main">
                  <div className="project-list-header">
                    <h4 className="project-list-title">{project.nameShort}</h4>
                    <span className="project-list-year">{project.year}</span>
                  </div>
                  <p className="project-list-category">{project.category}</p>
                  <p className="project-list-description">{project.description}</p>
                  <div className="project-list-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                {project.image && (
                  <div 
                    className="project-list-image"
                    onClick={() => openImageModal(
                      getCurrentImage(project),
                      project.images || [project.image],
                      projectImageIndexes[project.id] || 0,
                      { title: project.nameShort, description: project.description }
                    )}
                  >
                    <img src={getCurrentImage(project)} alt={project.name} />
                    {project.images && project.images.length > 1 && (
                      <>
                        <button 
                          className="image-nav-btn prev-btn"
                          onClick={(e) => handlePrevImage(e, project)}
                          aria-label="Imagem anterior"
                        >
                          ‹
                        </button>
                        <button 
                          className="image-nav-btn next-btn"
                          onClick={(e) => handleNextImage(e, project)}
                          aria-label="Próxima imagem"
                        >
                          ›
                        </button>
                        <div className="image-counter">
                          {(projectImageIndexes[project.id] || 0) + 1} / {project.images.length}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Design Projects */}
        <div className="projects-subsection">
          <h3 className="subsection-title">
            <span className="subsection-icon">🎨</span>
            {t.portfolio.design}
          </h3>
          <div className="projects-list-minimal">
            {designProjects.map((project, index) => (
              <div key={project.id} className="project-list-item">
                <div className="project-list-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="project-list-main">
                  <div className="project-list-header">
                    <h4 className="project-list-title">{project.nameShort}</h4>
                    <span className="project-list-year">{project.year}</span>
                  </div>
                  <p className="project-list-category">{project.category}</p>
                  <p className="project-list-description">{project.description}</p>
                  <div className="project-list-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                {project.image && (
                  <div 
                    className="project-list-image"
                    onClick={() => openImageModal(
                      getCurrentImage(project),
                      project.images || [project.image],
                      projectImageIndexes[project.id] || 0,
                      { title: project.nameShort, description: project.description }
                    )}
                  >
                    <img src={getCurrentImage(project)} alt={project.name} />
                    {project.images && project.images.length > 1 && (
                      <>
                        <button 
                          className="image-nav-btn prev-btn"
                          onClick={(e) => handlePrevImage(e, project)}
                          aria-label="Imagem anterior"
                        >
                          ‹
                        </button>
                        <button 
                          className="image-nav-btn next-btn"
                          onClick={(e) => handleNextImage(e, project)}
                          aria-label="Próxima imagem"
                        >
                          ›
                        </button>
                        <div className="image-counter">
                          {(projectImageIndexes[project.id] || 0) + 1} / {project.images.length}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="section services-section">
        <div className="section-header">
          <h2>{t.services.title}</h2>
        </div>
        
        <div className="services-grid">
          <div className="services-column">
            <h3 className="services-title">{t.services.development.title}</h3>
            <ul className="services-list">
              {t.services.development.items.map((item, index) => (
                <li key={index} className="service-item">
                  <span className="service-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="services-column">
            <h3 className="services-title">{t.services.design.title}</h3>
            <ul className="services-list">
              {t.services.design.items.map((item, index) => (
                <li key={index} className="service-item">
                  <span className="service-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="availability-box">
              <p className="availability-status">{t.services.availability.status}</p>
              <p className="availability-timeline">{t.services.availability.timeline}</p>
              <p className="availability-note">
                {t.services.availability.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATES SECTION */}
      <section id="certificates" className="section certificates-section">
        <div className="section-header">
          <h2>{t.certificates.title}</h2>
        </div>
        
        <div className="certificates-grid">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="certificate-card">
              <div 
                className="certificate-image-wrapper"
                onClick={() => openImageModal(
                  certificate.image,
                  [certificate.image],
                  0,
                  { title: certificate.name, description: `${certificate.issuer} - ${certificate.date}` }
                )}
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

      {/* AWARDS SECTION */}
      <section id="awards" className="section awards-section">
        <div className="section-header">
          <h2>{t.awards.title}</h2>
        </div>
        
        <div className="awards-list">
          {awards.map((award, index) => (
            <div key={index} className="award-item">
              <div className="award-name">{award.name}</div>
              <div className="award-separator">—</div>
              <div className="award-category">{award.category}</div>
              <div className="award-year">{award.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section contact-section">
        <div className="section-header">
          <h2>{t.contact.title}</h2>
        </div>
        
        <div className="contact-content">
          <p className="contact-text">{t.contact.description}</p>
          <a href={`mailto:${contactInfo.email}`} className="contact-button">{t.contact.cta}</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>{t.contact.footer.social}</h4>
            <ul className="social-links">
              <li><a href={contactInfo.social.linkedin.url} target="_blank" rel="noopener noreferrer" className="social-link"><span className="link-number">01</span> LinkedIn</a></li>
              <li><a href={contactInfo.social.github.url} target="_blank" rel="noopener noreferrer" className="social-link"><span className="link-number">02</span> GitHub</a></li>
              <li><a href={contactInfo.social.instagram.url} target="_blank" rel="noopener noreferrer" className="social-link"><span className="link-number">03</span> Instagram</a></li>
              <li><a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link"><span className="link-number">04</span> WhatsApp</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>{t.contact.footer.navigation}</h4>
            <ul className="footer-links">
              <li><a href="#projects" className="footer-link">{t.nav.projects}</a></li>
              <li><a href="#about" className="footer-link">{t.nav.about}</a></li>
              <li><a href="#portfolio" className="footer-link">{t.nav.portfolio}</a></li>
              <li><a href="#services" className="footer-link">{t.nav.services}</a></li>
              <li><a href="#certificates" className="footer-link">{t.nav.certificates}</a></li>
              <li><a href="#awards" className="footer-link">{t.nav.awards}</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <p className="copyright">{t.contact.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* IMAGE MODAL */}
      {modalImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <button 
            className="modal-close-btn"
            onClick={closeImageModal}
            aria-label={t.common.close}
          >
            ×
          </button>

          {modalInfo.title && (
            <div className="modal-info">
              <h3 className="modal-info-title">{modalInfo.title}</h3>
              {modalInfo.description && (
                <p className="modal-info-description">{modalInfo.description}</p>
              )}
            </div>
          )}

          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={modalImage} 
              alt={modalInfo.title || 'Imagem expandida'}
              className="image-modal-image"
            />
          </div>

          {modalImages.length > 1 && (
            <>
              <button 
                className="modal-nav-btn modal-prev-btn"
                onClick={modalPrevImage}
                aria-label={t.common.previous}
              >
                ‹
              </button>
              <button 
                className="modal-nav-btn modal-next-btn"
                onClick={modalNextImage}
                aria-label={t.common.next}
              >
                ›
              </button>
              <div className="modal-counter">
                {modalCurrentIndex + 1} / {modalImages.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
