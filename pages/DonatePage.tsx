import React, { useState } from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';

const DonatePage: React.FC<{ language: Language }> = ({ language }) => {
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [donated, setDonated] = useState(false);

  const presetAmounts = [100, 250, 500, 1000, 2500];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where Razorpay integration would be triggered.
    // We'll simulate a successful donation.
    setDonated(true);
  };

  const selectedAmount = customAmount ? parseInt(customAmount) : amount;

  if (donated) {
     return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">{TEXTS.donationThankYouTitle[language]}</h1>
            <p className="text-lighttext">{TEXTS.donationThankYouSubtitle[language].replace('{amount}', selectedAmount.toString())}</p>
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-2">{TEXTS.donateTitle[language]}</h1>
      <p className="text-lighttext text-center mb-6">{TEXTS.donateSubtitle[language]}</p>
      
      <form onSubmit={handleDonate} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">{TEXTS.chooseAmountLabel[language]}</label>
          <div className="grid grid-cols-3 gap-4">
            {presetAmounts.map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => { setAmount(preset); setCustomAmount(''); }}
                className={`p-4 border rounded-md text-center font-bold transition-colors ${amount === preset && !customAmount ? 'bg-primary text-white border-primary' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                ₹{preset}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
              placeholder={TEXTS.customAmountPlaceholder[language]}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">{TEXTS.fullNameLabel[language]}</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
        </div>

         <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{TEXTS.emailLabel[language]}</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
        </div>

        <button type="submit" className="w-full bg-secondary text-white py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition-colors">
          {TEXTS.donateButton[language].replace('{amount}', selectedAmount.toString())}
        </button>
        <p className="text-xs text-center text-gray-500">{TEXTS.razorpayText[language]}</p>
      </form>
    </div>
  );
};

export default DonatePage;