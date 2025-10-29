import React, { useState } from 'react';
import { Language, NewShelterData, Page } from '../types';
import { TEXTS } from '../constants';
import { registerNewShelter } from '../services/shelterService';
import { CheckCircleIcon } from '../components/icons';

interface RegisterShelterPageProps {
  language: Language;
  navigate: (page: Page) => void;
}

const RegisterShelterPage: React.FC<RegisterShelterPageProps> = ({ language, navigate }) => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        const forWhom: ('men' | 'women' | 'families' | 'children')[] = [];
        if (formData.get('forWhom_men')) forWhom.push('men');
        if (formData.get('forWhom_women')) forWhom.push('women');
        if (formData.get('forWhom_families')) forWhom.push('families');
        if (formData.get('forWhom_children')) forWhom.push('children');
        
        const services: string[] = [];
        if (formData.get('service_food')) services.push('Food');
        if (formData.get('service_medical')) services.push('Medical');
        if (formData.get('service_bedding')) services.push('Bedding');
        if (formData.get('service_counseling')) services.push('Counseling');

        const newShelterData: NewShelterData = {
            name: formData.get('shelterName') as string,
            address: formData.get('address') as string,
            city: formData.get('city') as string,
            contact: formData.get('contact') as string,
            capacity: parseInt(formData.get('capacity') as string, 10),
            services,
            forWhom,
            // In a real app, you would use a geocoding API to get lat/lng from address.
            // Using random values near Tamil Nadu for demonstration.
            lat: 11.0 + (Math.random() - 0.5), 
            lng: 78.3 + (Math.random() - 0.5),
        };
        
        await registerNewShelter(newShelterData);

        setIsSubmitting(false);
        setSubmitted(true);
    };
    
    if (submitted) {
        return (
            <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-md text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-green-600 mb-4">{TEXTS.submissionReceivedTitle[language]}</h1>
                <p className="text-lighttext mb-6">{TEXTS.submissionReceivedSubtitle[language]}</p>
                <button 
                    onClick={() => navigate(Page.Home)}
                    className="bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
                >
                  {TEXTS.goToHome[language]}
                </button>
            </div>
        );
    }
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">{TEXTS.registerShelterTitle[language]}</h1>
      <p className="text-lighttext mb-6">{TEXTS.registerShelterSubtitle[language]}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="shelterName" className="block text-sm font-medium text-gray-700">{TEXTS.shelterNameLabel[language]}</label>
          <input type="text" id="shelterName" name="shelterName" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">{TEXTS.addressLabel[language]}</label>
          <input type="text" id="address" name="address" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">{TEXTS.cityLabel[language]}</label>
                <input type="text" id="city" name="city" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">{TEXTS.contactLabel[language]}</label>
                <input type="tel" id="contact" name="contact" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">{TEXTS.capacityLabel[language]}</label>
                <input type="number" id="capacity" name="capacity" min="1" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
        </div>
        
        <div>
            <span className="block text-sm font-medium text-gray-700">{TEXTS.servicesLabel[language]}</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
                {['Food', 'Medical', 'Bedding', 'Counseling'].map(service => (
                    <label key={service} className="flex items-center space-x-2">
                        <input type="checkbox" name={`service_${service.toLowerCase()}`} className="rounded text-primary focus:ring-primary"/>
                        <span>{service}</span>
                    </label>
                ))}
            </div>
        </div>

        <div>
            <span className="block text-sm font-medium text-gray-700">{TEXTS.forWhomLabel[language]}</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
                {['men', 'women', 'families', 'children'].map(type => (
                    <label key={type} className="flex items-center space-x-2">
                        <input type="checkbox" name={`forWhom_${type}`} className="rounded text-primary focus:ring-primary"/>
                        <span>{TEXTS[type as keyof typeof TEXTS][language]}</span>
                    </label>
                ))}
            </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors disabled:bg-gray-400">
          {isSubmitting ? TEXTS.loading[language] : TEXTS.submitForReviewButton[language]}
        </button>
      </form>
    </div>
  );
};

export default RegisterShelterPage;