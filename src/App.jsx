import './App.css';
import { useState, useEffect } from 'react';
import portfolioData from './data/portfolioData';
import Nav from './components/Nav';
import Loader from './components/Loader';
import Lightbox from './components/Lightbox';
import Hero from './components/hero/Hero';
import Marquee from './sections/Marquee';
import About from './sections/About';
import Skills from './sections/Skills';
import Portfolio from './sections/Portfolio';
import Experience from './sections/Experience';
import Services from './sections/Services';
import Certificates from './sections/Certificates';
import Awards from './sections/Awards';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const {
  personalInfo,
  contactInfo,
  certificates,
  stats,
  hardSkills,
  softSkills,
  education,
  awards,
  helpers,
} = portfolioData;

const marqueeItems = Object.values(hardSkills).flatMap((group) =>
  group.skills.map((skill) => skill.name)
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  // O index.html já aplicou o tema salvo antes da primeira pintura,
  // então basta ler de volta o que ficou no <html>.
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Navegacao privada bloqueia o storage: o tema so nao persiste.
    }
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="portfolio">
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <Nav
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      />

      <Hero theme={theme} personalInfo={personalInfo} contactInfo={contactInfo} />
      <Marquee items={marqueeItems} />
      <About stats={stats} />
      <Skills hardSkills={hardSkills} softSkills={softSkills} />
      <Portfolio
        developmentProjects={helpers.getDevelopmentProjects()}
        designProjects={helpers.getDesignProjects()}
        onOpenModal={setLightbox}
      />
      <Experience experiences={helpers.getExperienceByDate()} />
      <Services />
      <Certificates certificates={certificates} onOpenModal={setLightbox} />
      <Awards education={education} awards={awards} />
      <Contact contactInfo={contactInfo} />
      <Footer contactInfo={contactInfo} />

      {lightbox && (
        <Lightbox
          state={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox((current) => ({
            ...current,
            currentIndex: index,
            image: current.images[index],
          }))}
        />
      )}
    </div>
  );
}
