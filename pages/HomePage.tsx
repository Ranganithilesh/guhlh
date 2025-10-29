import React from 'react';
import { Page, Language } from '../types';
import { TEXTS } from '../constants';

interface HomePageProps {
  navigate: (page: Page) => void;
  language: Language;
}

const HomePage: React.FC<HomePageProps> = ({ navigate, language }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-primary-light rounded-lg overflow-hidden text-center py-20 px-6">
        <div className="absolute inset-0 bg-white opacity-20 transform -skew-y-3"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            {TEXTS.heroTitle[language]}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white max-w-2xl mx-auto">
            {TEXTS.heroSubtitle[language]}
          </p>
          <button
            onClick={() => navigate(Page.ShelterFinder)}
            className="mt-8 bg-white text-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            {TEXTS.findShelterCTA[language]}
          </button>
        </div>
      </section>

      {/* How It Works Section */}
       <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">{TEXTS.howItWorksTitle[language]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-primary-light text-primary rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">{TEXTS.searchStepTitle[language]}</h3>
            <p className="text-lighttext">{TEXTS.searchStepDesc[language]}</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="bg-primary-light text-primary rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">{TEXTS.getHelpStepTitle[language]}</h3>
            <p className="text-lighttext">{TEXTS.getHelpStepDesc[language]}</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="bg-primary-light text-primary rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">{TEXTS.giveBackStepTitle[language]}</h3>
            <p className="text-lighttext">{TEXTS.giveBackStepDesc[language]}</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">{TEXTS.aboutUsTitle[language]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <img src={`https://picsum.photos/seed/shelter/600/400?random=${Math.random()}`} alt={TEXTS.aboutUsImageAlt[language]} className="rounded-lg shadow-lg w-full h-auto object-cover"/>
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{TEXTS.missionTitle[language]}</h3>
                <p className="text-lighttext">{TEXTS.aboutUsMission[language]}</p>
                <h3 className="text-2xl font-semibold text-primary mt-6">{TEXTS.visionTitle[language]}</h3>
                <p className="text-lighttext">{TEXTS.aboutUsVision[language]}</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;