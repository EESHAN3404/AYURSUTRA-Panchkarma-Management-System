import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  User, 
  Users, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Sparkles, 
  MessageSquare,
  Leaf 
} from 'lucide-react';
import { logout } from '../../utils/storage';
import { useToast } from './ToastProvider';

const Sidebar = ({ role, darkMode, toggleDarkMode, isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const patientLinks = [
    { path: '/patient',                icon: Home,          label: 'Dashboard' },
    { path: '/patient/appointments',   icon: Calendar,      label: 'Appointments' },
    { path: '/patient/guide',          icon: BookOpen,      label: 'Panchakarma Guide' },
    { path: '/patient/ai-assistant',   icon: Sparkles,      label: 'AI Health Assistant' },
    { path: '/patient/profile',        icon: User,          label: 'Profile' },
  ];

  const therapistLinks = [
    { path: '/therapist', icon: Home, label: 'Dashboard' },
    { path: '/therapist/patients', icon: Users, label: 'My Patients' },
    { path: '/therapist/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/therapist/profile', icon: User, label: 'Profile' }
  ];

  const practitionerLinks = [
    { path: '/practitioner', icon: Home, label: 'Dashboard' },
    { path: '/practitioner/therapists', icon: Users, label: 'Therapists' },
    { path: '/practitioner/patients', icon: Users, label: 'Patients' },
    { path: '/practitioner/history', icon: BookOpen, label: 'Treatment History' },
    { path: '/practitioner/settings', icon: Settings, label: 'Settings' }
  ];

  const doctorLinks = [
    { path: '/doctor', icon: Home, label: 'Doctor Dashboard' },
    { path: '/doctor/patients', icon: Users, label: 'My Patients' },
    { path: '/doctor/consultations', icon: BookOpen, label: 'Consultations' },
    { path: '/doctor/profile', icon: User, label: 'Profile' }
  ];

  const links = role === 'patient' ? patientLinks : 
                role === 'therapist' ? therapistLinks : 
                role === 'doctor' ? doctorLinks : 
                practitionerLinks;

  return (
    <div className={`w-64 bg-[#FCFAF6] dark:bg-[#101F19] h-screen fixed left-0 top-0 shadow-[0_20px_40px_rgba(23,63,53,0.08)] flex flex-col z-40 transition-transform duration-300 transform border-r border-[#173F35]/10 dark:border-[#B69A5A]/20 ${
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      {/* Brand Header */}
      <div className="p-6 border-b border-[#173F35]/10 dark:border-[#B69A5A]/20 flex justify-between items-center bg-gradient-to-b from-[#173F35]/5 to-transparent dark:from-[#B69A5A]/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="p-2 rounded-full border border-[#173F35] dark:border-[#B69A5A] bg-white dark:bg-[#13251E] shadow-xs">
            <Leaf className="w-5 h-5 text-[#173F35] dark:text-[#B69A5A]" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#173F35] dark:text-white tracking-wide leading-none">
              AyurSutra
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B69A5A] mt-1">
              Panchakarma Center
            </p>
          </div>
        </div>
        <button className="md:hidden text-gray-500 hover:text-[#173F35]" onClick={() => setIsOpen(false)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {links.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#B69A5A]' : 'text-gray-500 dark:text-gray-400'}`} />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Subtle Sanskrit Ayurvedic Motto */}
      <div className="px-4 py-3 mx-4 my-2 rounded-xl bg-[#173F35]/5 dark:bg-[#B69A5A]/5 border border-[#173F35]/10 dark:border-[#B69A5A]/15 text-center">
        <p className="text-[11px] font-serif italic text-[#173F35] dark:text-[#E8DFC8]">"Swasthyasya Swasthya Rakshanam"</p>
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#B69A5A] font-semibold mt-0.5">Holistic Healing Sanctuary</p>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-[#173F35]/10 dark:border-[#B69A5A]/20 space-y-2">
        <button
          onClick={toggleDarkMode}
          className="sidebar-link w-full text-xs"
        >
          {darkMode ? <Sun className="w-4 h-4 text-[#B69A5A]" /> : <Moon className="w-4 h-4 text-[#173F35]" />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button
          onClick={handleLogout}
          className="sidebar-link w-full text-xs text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Portal</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
