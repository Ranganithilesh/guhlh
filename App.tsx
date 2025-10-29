import React, { useState, useCallback } from 'react';
import { Page, Language } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShelterFinderPage from './pages/ShelterFinderPage';
import RegisterShelterPage from './pages/RegisterShelterPage';
import DonatePage from './pages/DonatePage';
import VolunteerPage from './pages/VolunteerPage';
import AwarenessPage from './pages/AwarenessPage';
import SosButton from './components/SosButton';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [language, setLanguage] = useState<Language>(Language.EN);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage navigate={navigate} language={language} />;
      case Page.ShelterFinder:
        return <ShelterFinderPage language={language} />;
      case Page.RegisterShelter:
        return <RegisterShelterPage language={language} navigate={navigate} />;
      case Page.Donate:
        return <DonatePage language={language} />;
      case Page.Volunteer:
        return <VolunteerPage language={language} />;
      case Page.Awareness:
        return <AwarenessPage language={language} />;
      default:
        return <HomePage navigate={navigate} language={language} />;
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans text-text">
      <Header
        navigate={navigate}
        language={language}
        setLanguage={setLanguage}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
      <Footer navigate={navigate} language={language} />
      <SosButton language={language} />
    </div>
  );
};

export default App;