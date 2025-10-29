import React, { useState } from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';
import Modal from './Modal';
import { PhoneIcon } from './icons';

interface SosButtonProps {
    language: Language;
}

const SosButton: React.FC<SosButtonProps> = ({ language }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const contacts = [
        { name: TEXTS.police[language], number: "100" },
        { name: TEXTS.ambulance[language], number: "102" },
        { name: TEXTS.womensHelpline[language], number: "1091" },
        { name: TEXTS.childHelpline[language], number: "1098" },
    ];

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors z-50 animate-pulse"
                aria-label="Emergency SOS"
            >
                <span className="font-bold text-xl">{TEXTS.sos[language]}</span>
            </button>

            {isModalOpen && (
                <Modal title={TEXTS.emergencyContacts[language]} onClose={() => setIsModalOpen(false)}>
                    <div className="space-y-4">
                        <p className="text-lighttext">{TEXTS.helplineInfo[language]}</p>
                        <ul className="space-y-3">
                            {contacts.map((contact) => (
                                <li key={contact.number} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                                    <div className="flex items-center space-x-3">
                                        <PhoneIcon className="h-5 w-5 text-primary" />
                                        <span className="font-medium">{contact.name}</span>
                                    </div>
                                    <a href={`tel:${contact.number}`} className="font-bold text-lg text-primary hover:underline">{contact.number}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default SosButton;
