import React from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';

const AwarenessPage: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{TEXTS.awarenessTitle[language]}</h1>
      
      <div className="prose max-w-none text-text">
        <p className="lead text-lg text-lighttext">
          {TEXTS.awarenessSubtitle[language]}
        </p>

        <img src="https://picsum.photos/800/400?grayscale" alt="People in a city" className="w-full rounded-lg my-6" />

        <h2 className="text-2xl font-semibold">{TEXTS.numbersTitle[language]}</h2>
        <p>
          {TEXTS.numbersParagraph[language]}
        </p>

        <h2 className="text-2xl font-semibold">{TEXTS.causesTitle[language]}</h2>
        <ul>
          <li><strong>{TEXTS.causePoverty[language]}</strong> {TEXTS.causePovertyDesc[language]}</li>
          <li><strong>{TEXTS.causeMigration[language]}</strong> {TEXTS.causeMigrationDesc[language]}</li>
          <li><strong>{TEXTS.causeDisasters[language]}</strong> {TEXTS.causeDisastersDesc[language]}</li>
          <li><strong>{TEXTS.causeSocial[language]}</strong> {TEXTS.causeSocialDesc[language]}</li>
        </ul>

        <h2 className="text-2xl font-semibold">{TEXTS.howToHelpTitle[language]}</h2>
        <p>
          {TEXTS.howToHelpParagraph[language]}
        </p>
      </div>
    </div>
  );
};

export default AwarenessPage;