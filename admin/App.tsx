import React from 'react';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { APP_NAME } from '../constants';
import { HomeIcon } from '../components/icons';

const AdminApp: React.FC = () => {
  // Using English as the default language for the admin panel
  const language = 'en';

  return (
    <div className="min-h-screen flex flex-col font-sans text-text">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <HomeIcon className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">{APP_NAME} - Admin</span>
              </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboardPage language={language as any} />
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {APP_NAME}. Admin Panel.
        </div>
      </footer>
    </div>
  );
};

export default AdminApp;