import { useLanguage } from '../contexts/languageContext';

export default function Loader() {
  const { t } = useLanguage();

  return (
    <div className="loader">
      <div className="loader-content">
        <span className="loader-mark">AR</span>
        <div className="loader-bar"></div>
        <p className="loader-text">{t.common.loading}</p>
      </div>
    </div>
  );
}
