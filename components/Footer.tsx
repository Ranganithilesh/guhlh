import React from 'react';
import { Page, Language } from '../types';
import { TEXTS, APP_NAME } from '../constants';

interface FooterProps {
  navigate: (page: Page) => void;
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ navigate, language }) => {
  const year = new Date().getFullYear();

  const FooterLink: React.FC<{ page: Page }> = ({ page }) => (
    <button
      onClick={() => navigate(page)}
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      {TEXTS[page][language]}
    </button>
  );

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">{APP_NAME}</h3>
            <p className="mt-2 text-gray-400 text-sm">
              {TEXTS.footerSlogan[language]}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold">{TEXTS.quickLinks[language]}</h3>
            <FooterLink page={Page.Home} />
            <FooterLink page={Page.ShelterFinder} />
            <FooterLink page={Page.Donate} />
            <FooterLink page={Page.Volunteer} />
          </div>
          <div>
             <h3 className="text-lg font-semibold">{TEXTS.getInvolved[language]}</h3>
             <div className="flex flex-col space-y-2 mt-2">
                <FooterLink page={Page.RegisterShelter} />
                <FooterLink page={Page.Awareness} />
             </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          <p>&copy; {year} {APP_NAME}. {TEXTS.rightsReserved[language]}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;