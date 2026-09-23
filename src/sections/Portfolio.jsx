import { useState } from 'react';
import RevealText from '../components/RevealText';
import useGsapReveal from '../hooks/useGsapReveal';
import { useLanguage } from '../contexts/languageContext';

function ProjectList({ projects, imageIndexes, onStep, onOpenModal }) {
  const { t, field } = useLanguage();
  const listRef = useGsapReveal({ selector: '.project-list-item', stagger: 0.1 });

  return (
    <div className="projects-list-minimal" ref={listRef}>
      {projects.map((project, index) => {
        const images = project.images || (project.image ? [project.image] : []);
        const currentIndex = imageIndexes[project.id] || 0;
        const currentImage = images[currentIndex] || project.image;
        const description = field(project, 'description');

        return (
          <div key={project.id} className="project-list-item">
            <div className="project-list-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="project-list-main">
              <div className="project-list-header">
                <h4 className="project-list-title">{project.nameShort}</h4>
                <span className="project-list-year">{project.year}</span>
              </div>
              <p className="project-list-category">{field(project, 'category')}</p>
              <p className="project-list-description">{description}</p>
              <div className="project-list-tech">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-list-link"
                >
                  {t.ui.viewRepository} →
                </a>
              )}
            </div>

            {project.image && (
              <div
                className="project-list-image"
                onClick={() => onOpenModal({
                  image: currentImage,
                  images,
                  currentIndex,
                  info: { title: project.nameShort, description },
                })}
              >
                <img src={currentImage} alt={project.name} />
                {images.length > 1 && (
                  <>
                    <button
                      className="image-nav-btn prev-btn"
                      onClick={(e) => onStep(e, project.id, images.length, -1)}
                      aria-label={t.ui.previousImage}
                    >
                      ‹
                    </button>
                    <button
                      className="image-nav-btn next-btn"
                      onClick={(e) => onStep(e, project.id, images.length, 1)}
                      aria-label={t.ui.nextImage}
                    >
                      ›
                    </button>
                    <div className="image-counter">
                      {currentIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Portfolio({ developmentProjects, designProjects, onOpenModal }) {
  const { t } = useLanguage();
  const [imageIndexes, setImageIndexes] = useState({});

  const step = (e, projectId, total, direction) => {
    e.preventDefault();
    e.stopPropagation();
    if (total <= 1) return;

    setImageIndexes((prev) => {
      const current = prev[projectId] || 0;
      return { ...prev, [projectId]: (current + direction + total) % total };
    });
  };

  return (
    <section id="portfolio" className="section portfolio-projects-section">
      <div className="section-header">
        <RevealText as="h2" text={t.portfolio.title} />
        <p className="section-description">{t.portfolio.description}</p>
      </div>

      <div className="projects-subsection">
        <h3 className="subsection-title">
          <span className="subsection-index">01</span>
          {t.portfolio.development}
        </h3>
        <ProjectList
          projects={developmentProjects}
          imageIndexes={imageIndexes}
          onStep={step}
          onOpenModal={onOpenModal}
        />
      </div>

      <div className="projects-subsection">
        <h3 className="subsection-title">
          <span className="subsection-index">02</span>
          {t.portfolio.design}
        </h3>
        <ProjectList
          projects={designProjects}
          imageIndexes={imageIndexes}
          onStep={step}
          onOpenModal={onOpenModal}
        />
      </div>
    </section>
  );
}
