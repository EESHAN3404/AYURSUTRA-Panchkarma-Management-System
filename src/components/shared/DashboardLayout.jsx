import { useState, useEffect } from 'react';
import Sidebar from '../shared/Sidebar';
import NotificationBell from './NotificationBell';
import { getUser, getDarkMode, saveDarkMode } from '../../utils/storage';

const DashboardLayout = ({ children, role }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = getUser();

  useEffect(() => {
    const savedDarkMode = getDarkMode();
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    saveDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F1E8] dark:bg-[#0D1914] text-[#17211D] dark:text-[#E8DFC8]">
      <Sidebar 
        role={role} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col md:ml-64 w-full transition-all duration-300">
        {/* Top Header Bar */}
        <header className="h-20 bg-[#F5F1E8]/80 dark:bg-[#101F19]/80 backdrop-blur-md border-b border-[#173F35]/10 dark:border-[#B69A5A]/20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-[#173F35]/10 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden md:block">
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#B69A5A] block leading-none mb-1">
                The AyurSutra Sanctuary
              </span>
              <h2 className="text-xl font-serif font-bold text-[#173F35] dark:text-white capitalize leading-tight">
                {role} Portal
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <NotificationBell />
            <div className="flex items-center gap-3 pl-4 border-l border-[#173F35]/15 dark:border-[#B69A5A]/20">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-[#17211D] dark:text-white leading-tight">{user?.name}</p>
                <p className="text-[11px] text-[#B69A5A] font-semibold tracking-wider uppercase mt-0.5">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#173F35] text-[#F5F1E8] flex items-center justify-center font-serif font-bold text-base shadow-md border-2 border-[#B69A5A]">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
