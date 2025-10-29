import React, { useState } from 'react';
import { Page, Language } from '../types';
import { TEXTS, APP_NAME } from '../constants';
import { HomeIcon, MenuIcon, XIcon } from './icons';

interface HeaderProps {
  navigate: (page: Page) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    Page.Home,
    Page.ShelterFinder,
    Page.Donate,
    Page.Volunteer,
    Page.Awareness,
  ];

  const NavLink: React.FC<{ page: Page }> = ({ page }) => (
    <button
      onClick={() => {
        navigate(page);
        setIsMenuOpen(false);
      }}
      className="text-gray-600 hover:text-primary transition-colors duration-200"
    >
      {TEXTS[page][language]}
    </button>
  );

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => navigate(Page.Home)} className="flex items-center space-x-2">
                <HomeIcon className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">{APP_NAME}</span>
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((page) => <NavLink key={page} page={page} />)}
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-sm"
              >
                <option value={Language.EN}>English</option>
                <option value={Language.HI}>हिंदी</option>
                <option value={Language.TA}>தமிழ்</option>
              </select>
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col items-start space-y-4 p-4">
              {navItems.map((page) => <NavLink key={page} page={page} />)}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;