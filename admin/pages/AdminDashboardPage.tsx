import React, { useState, useEffect } from 'react';
import { Language, PendingShelter } from '../../types';
import { MOCK_VOLUNTEERS, MOCK_DONATIONS, TEXTS } from '../../constants';
import { getPendingShelters, updateShelterStatus } from '../../services/adminService';

const AdminDashboardPage: React.FC<{ language: Language }> = ({ language }) => {
    const [pendingShelters, setPendingShelters] = useState<PendingShelter[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPendingShelters = async () => {
            setIsLoading(true);
            const shelters = await getPendingShelters();
            setPendingShelters(shelters);
            setIsLoading(false);
        };
        loadPendingShelters();
    }, []);

    const handleApproval = async (id: number, status: 'approved' | 'rejected') => {
        await updateShelterStatus(id, status);
        setPendingShelters(prev => prev.filter(shelter => shelter.id !== id));
        alert(`Shelter ID ${id} has been ${status}.`);
    };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{TEXTS.adminDashboardTitle[language]}</h1>
      
      {/* Pending Shelter Approvals */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{TEXTS.pendingApprovalsTitle[language]}</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">{TEXTS.tableNameHeader[language]}</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">{TEXTS.tableCityHeader[language]}</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">{TEXTS.tableContactHeader[language]}</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">{TEXTS.tableActionsHeader[language]}</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                         <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500">{TEXTS.loading[language]}</td>
                        </tr>
                    ) : pendingShelters.length > 0 ? (
                        pendingShelters.map(shelter => (
                            <tr key={shelter.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{shelter.name}</td>
                                <td className="py-2 px-4 border-b">{shelter.city}</td>
                                <td className="py-2 px-4 border-b">{shelter.contact}</td>
                                <td className="py-2 px-4 border-b space-x-2">
                                    <button onClick={() => handleApproval(shelter.id, 'approved')} className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition-colors">{TEXTS.approveButton[language]}</button>
                                    <button onClick={() => handleApproval(shelter.id, 'rejected')} className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition-colors">{TEXTS.rejectButton[language]}</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500">{TEXTS.noPendingApprovals[language]}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </section>

      {/* Other Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registered Volunteers */}
        <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{TEXTS.registeredVolunteersTitle[language]}</h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
                {MOCK_VOLUNTEERS.map(v => <li key={v.id} className="p-2 bg-gray-50 rounded">{v.name} - {v.email}</li>)}
            </ul>
        </section>

        {/* Donation History */}
        <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{TEXTS.donationHistoryTitle[language]}</h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
                {MOCK_DONATIONS.map(d => <li key={d.id} className="p-2 bg-gray-50 rounded flex justify-between"><span>{d.name}</span> <span className="font-bold">₹{d.amount}</span></li>)}
            </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;