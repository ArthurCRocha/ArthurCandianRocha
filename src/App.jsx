import './App.css';
import { personalInfo, contactInfo } from './data/portfolioData';
import { useLanguage } from './contexts/languageContext';
import Nav from './components/Nav';
import IntroOrigin from './components/origin/IntroOrigin';
import Craft from './components/craft/Craft';
import SelectedWork from './components/selected-work/SelectedWork';
import Path from './components/path/Path';
import Now from './components/now/Now';
import Connect from './components/connect/Connect';

export default function App() {
  const { t } = useLanguage();

  return (
    <div className="intro-page">
      <a className="skip-link" href="#intro-content">{t.intro.skip}</a>
      <Nav contactInfo={contactInfo} />
      <main id="intro-content" tabIndex={-1}>
        <IntroOrigin personalInfo={personalInfo} contactInfo={contactInfo} />
        <Craft />
        <SelectedWork />
        <Path />
        <Now />
        <Connect />
      </main>
    </div>
  );
}
