import './App.css';
import { useState, useEffect } from 'react';
import portfolioData from './data/portfolioData';
import SakuraCanvas from './components/SakuraCanvas';

export default function App() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectImageIndexes, setProjectImageIndexes] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Destructure portfolio data
  const {
    personalInfo,
    contactInfo,
    experience,
    services: portfolioServices,
    certificates,
    stats,
    hardSkills,
    softSkills,
    education,
    awards,
    resumePdf,
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

  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader-content">
          <div className="loader-bar"></div>
          <p className="loader-text">{personalInfo.displayName}</p>
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

      {/* MAIN NAVIGATION HEADER */}
      <nav className="main-header">
        <div className="header-content">
          <a href="#hero" className="header-logo">{personalInfo.displayName}</a>
          <div className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#projects" className="header-nav-item" onClick={() => setMobileMenuOpen(false)}><span className="header-nav-number">01</span> Experiências</a>
            <a href="#about" className="header-nav-item" onClick={() => setMobileMenuOpen(false)}><span className="header-nav-number">02</span> Sobre</a>
            <a href="#portfolio" className="header-nav-item" onClick={() => setMobileMenuOpen(false)}><span className="header-nav-number">03</span> Projetos</a>
            <a href="#services" className="header-nav-item" onClick={() => setMobileMenuOpen(false)}><span className="header-nav-number">04</span> Serviços</a>
            <a href="#skills" className="header-nav-item" onClick={() => setMobileMenuOpen(false)}><span className="header-nav-number">05</span> Competências</a>
            <a href="#certificates" className="header-nav-item" onClick={() => setMobileMenuOpen(false)}><span className="header-nav-number">06</span> Certificados</a>
            <a href="#awards" className="header-nav-item" onClick={() => setMobileMenuOpen(false)}><span className="header-nav-number">07</span> Formação</a>
            <a href="#contact" className="header-nav-item" onClick={() => setMobileMenuOpen(false)}><span className="header-nav-number">08</span> Contato</a>
          </div>
          <button
            className="mobile-menu-toggle"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* HERO / HEADER */}
      <header className="hero" id="hero">
        <SakuraCanvas />
        <span className="hero-seal" aria-hidden="true">AR</span>
        <div className="hero-content">
          <h1 className="hero-title">{personalInfo.displayName}</h1>
          <p className="hero-subtitle">{personalInfo.subtitle}</p>
          <p className="hero-description">{personalInfo.bio}</p>
          
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-label">Localização</span>
              <span className="meta-value">{personalInfo.location.displayText}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Email</span>
              <a href={`mailto:${contactInfo.email}`} className="meta-link">{contactInfo.email}</a>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <span className="meta-value available">{personalInfo.availability.statusPT}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Currículo</span>
              <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="meta-link">Baixar PDF</a>
            </div>
          </div>
        </div>
      </header>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section projects-section">
        <div className="section-header">
          <h2>Experiências Profissionais</h2>
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
          <h2>Sobre Mim</h2>
        </div>
        
        <div className="about-content">
          <p className="about-text">
            {personalInfo.bio}
          </p>
          
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">{stats.experience.years}</span>
              <span className="stat-label">{stats.experience.label}</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.projects.count}</span>
              <span className="stat-label">{stats.projects.label}</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.clients.count}</span>
              <span className="stat-label">{stats.clients.label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION - DEVELOPMENT & DESIGN PROJECTS */}
      <section id="portfolio" className="section portfolio-projects-section">
        <div className="section-header">
          <h2>Portfólio de Projetos</h2>
          <p className="section-description">Seleção de projetos em desenvolvimento web e design gráfico</p>
        </div>

        {/* Development Projects */}
        <div className="projects-subsection">
          <h3 className="subsection-title">
            <span className="subsection-icon">💻</span>
            Projetos de Desenvolvimento
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
                  <div className="project-list-image">
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
            Projetos de Design Gráfico
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
                  <div className="project-list-image">
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
          <h2>Serviços & Competências</h2>
        </div>
        
        <div className="services-grid">
          <div className="services-column">
            <h3 className="services-title">Serviços Oferecidos</h3>
            <ul className="services-list">
              {portfolioServices.map((service, index) => (
                <li key={index} className="service-item">
                  <span className="service-dot"></span>
                  {service.name}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="services-column">
            <h3 className="services-title">Disponibilidade</h3>
            <div className="availability-box">
              <p className="availability-status">{personalInfo.availability.statusPT}</p>
              <p className="availability-timeline">Dezembro 2025 — Remoto & Flexível</p>
              <p className="availability-note">
                Ideal para projetos de 3-6 meses com possibilidade de colaboração contínua. 
                Especializado em soluções híbridas (Desenvolvimento + Design).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section services-section">
        <div className="section-header">
          <h2>Competências Técnicas</h2>
        </div>

        <div className="services-grid">
          {Object.values(hardSkills).map((group) => (
            <div className="services-column" key={group.category}>
              <h3 className="services-title">{group.category}</h3>
              <div className="project-list-tech">
                {group.skills.map((skill) => (
                  <span key={skill.name} className="tech-tag">
                    {skill.icon} {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="services-column">
            <h3 className="services-title">Soft Skills</h3>
            <ul className="services-list">
              {softSkills.map((skill) => (
                <li key={skill.name} className="service-item">
                  <span className="service-dot"></span>
                  {skill.icon} {skill.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CERTIFICATES SECTION */}
      <section id="certificates" className="section certificates-section">
        <div className="section-header">
          <h2>Certificados & Qualificações</h2>
        </div>
        
        <div className="certificates-grid">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="certificate-card">
              <div className="certificate-image-wrapper">
                <img 
                  src={certificate.image} 
                  alt={certificate.name}
                  className="certificate-image"
                />
                <div className="certificate-overlay">
                  <span className="certificate-view">Ver Certificado</span>
                </div>
              </div>
              <div className="certificate-info">
                <h3 className="certificate-name">{certificate.name}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <div className="certificate-meta">
                  <span className="certificate-date">{certificate.date}</span>
                  <span className="certificate-id">ID: {certificate.credentialId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AWARDS / EDUCATION SECTION */}
      <section id="awards" className="section awards-section">
        <div className="section-header">
          <h2>Formação Acadêmica</h2>
        </div>

        <div className="awards-list">
          {education.map((edu) => (
            <div key={edu.id} className="award-item">
              <div className="award-name">{edu.degree}</div>
              <div className="award-separator">—</div>
              <div className="award-category">{edu.institutionShort}</div>
              <div className="award-year">{edu.duration}</div>
            </div>
          ))}
        </div>

        <div className="section-header" style={{ marginTop: 'var(--spacing-2xl)' }}>
          <h3 className="subsection-title">Reconhecimentos</h3>
        </div>

        <div className="awards-list">
          {awards.map((award) => (
            <div key={award.id} className="award-item">
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
          <h2>Entre em Contato</h2>
        </div>
        
        <div className="contact-content">
          <p className="contact-text">Vamos criar algo excepcional juntos.</p>
          <a href={`mailto:${contactInfo.email}`} className="contact-button">Enviar Email</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Redes Sociais</h4>
            <ul className="social-links">
              <li><a href={contactInfo.social.linkedin.url} target="_blank" rel="noopener noreferrer" className="social-link"><span className="link-number">01</span> LinkedIn</a></li>
              <li><a href={contactInfo.social.github.url} target="_blank" rel="noopener noreferrer" className="social-link"><span className="link-number">02</span> GitHub</a></li>
              <li><a href={contactInfo.social.instagram.url} target="_blank" rel="noopener noreferrer" className="social-link"><span className="link-number">03</span> Instagram</a></li>
              <li><a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link"><span className="link-number">04</span> WhatsApp</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Links Rápidos</h4>
            <ul className="footer-links">
              <li><a href="#projects" className="footer-link">Experiências</a></li>
              <li><a href="#about" className="footer-link">Sobre</a></li>
              <li><a href="#portfolio" className="footer-link">Projetos</a></li>
              <li><a href="#services" className="footer-link">Serviços</a></li>
              <li><a href="#skills" className="footer-link">Competências</a></li>
              <li><a href="#certificates" className="footer-link">Certificados</a></li>
              <li><a href="#awards" className="footer-link">Formação</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <p className="copyright">&copy; 2025 {personalInfo.fullName}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
