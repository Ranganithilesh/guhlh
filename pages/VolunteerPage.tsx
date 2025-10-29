import React, { useState } from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';

const VolunteerPage: React.FC<{ language: Language }> = ({ language }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">{TEXTS.volunteerThankYouTitle[language]}</h1>
                <p className="text-lighttext">{TEXTS.volunteerThankYouSubtitle[language]}</p>
            </div>
        );
    }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">{TEXTS.volunteerTitle[language]}</h1>
      <p className="text-lighttext mb-6">{TEXTS.volunteerSubtitle[language]}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">{TEXTS.fullNameLabel[language]}</label>
            <input type="text" id="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{TEXTS.emailLabel[language]}</label>
            <input type="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{TEXTS.phoneLabel[language]}</label>
          <input type="tel" id="phone" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">{TEXTS.skillsLabel[language]}</label>
          <input type="text" id="skills" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">{TEXTS.availabilityLabel[language]}</label>
          <select id="availability" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
            <option value="">{TEXTS.selectOption[language]}</option>
            <option value="weekdays">{TEXTS.weekdays[language]}</option>
            <option value="weekends">{TEXTS.weekends[language]}</option>
            <option value="flexible">{TEXTS.flexible[language]}</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors">
          {TEXTS.registerAsVolunteerButton[language]}
        </button>
      </form>
    </div>
  );
};

export default VolunteerPage;