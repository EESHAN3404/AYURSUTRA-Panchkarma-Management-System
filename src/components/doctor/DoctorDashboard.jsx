import { useState, useEffect } from 'react';
import Card from '../shared/Card';
import { Users, Calendar, Clock, CheckCircle, Search, User } from 'lucide-react';
import { getUser } from '../../utils/storage';

const DoctorDashboard = () => {
  const [user] = useState(getUser());
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/users");
        if (res.ok) {
          const data = await res.json();
          setPatients(data.filter(u => u.role === 'patient'));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="animate-in fade-in duration-500 pb-3 border-b border-[#173F35]/10 dark:border-[#B69A5A]/20">
        <span className="text-[#B69A5A] text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
          Ayurvedic Physician Workspace
        </span>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#173F35] dark:text-white mb-1">
          Namaste, Dr. {user?.name}! 🌿
        </h1>
        <p className="text-[#17211D]/70 dark:text-gray-300 text-sm">
          Holistic clinical overview, patient dossiers & daily consultation schedule
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#173F35] to-[#255C4F] text-white shadow-xl border border-[#B69A5A]/30 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-[#E8DFC8]">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-0.5">{patients.length}</h3>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#E8DFC8]/90">Total Patients</p>
        </Card>

        <Card className="bg-gradient-to-br from-[#B69A5A] to-[#9C844D] text-white shadow-xl border border-white/20 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-3 text-white">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-0.5">4</h3>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/95">Pending Consultations</p>
        </Card>

        <Card className="bg-gradient-to-br from-[#2D5A4C] to-[#1E3E34] text-white shadow-xl border border-[#B69A5A]/30 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-[#E8DFC8]">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-0.5">8</h3>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#E8DFC8]/90">Active Treatments</p>
        </Card>

        <Card className="bg-gradient-to-br from-[#17211D] to-[#2A3B34] text-white shadow-xl border border-[#B69A5A]/30 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-[#B69A5A]">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-0.5">3</h3>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#E8DFC8]/90">Follow-ups Today</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#173F35] dark:text-white leading-tight">
                Patient Directory
              </h2>
              <span className="text-[11px] text-[#B69A5A] font-semibold uppercase tracking-wider">Clinical Records</span>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patient..." 
                className="pl-9 pr-4 py-1.5 text-xs border rounded-full bg-white/80 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B69A5A]/50 w-48 transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {patients.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3.5 hover:bg-[#F5F1E8]/70 dark:hover:bg-gray-800/80 rounded-xl transition-all cursor-pointer border border-[#173F35]/5 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#173F35] text-[#F5F1E8] flex items-center justify-center font-serif font-bold border border-[#B69A5A]/50 shadow-xs">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.email}</p>
                  </div>
                </div>
                <button className="text-xs bg-[#173F35]/10 text-[#173F35] dark:bg-[#B69A5A]/15 dark:text-[#E8DFC8] hover:bg-[#173F35] hover:text-white px-3.5 py-1.5 rounded-full font-medium transition-colors">
                  Open Workspace
                </button>
              </div>
            ))}
            {patients.length === 0 && !loading && (
              <p className="text-center text-gray-500 py-8 text-sm italic">No patients registered yet</p>
            )}
          </div>
        </Card>

        <Card className="border-none shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#173F35] dark:text-white leading-tight">
                Pending Tasks
              </h2>
              <span className="text-[11px] text-[#B69A5A] font-semibold uppercase tracking-wider">Clinical Queue</span>
            </div>
            <CheckCircle className="w-5 h-5 text-[#B69A5A]" />
          </div>
          <div className="space-y-3.5">
            <div className="flex items-start gap-3 p-3.5 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/80 dark:border-amber-900/40">
              <input type="checkbox" className="mt-1 accent-[#B69A5A]" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-300 text-sm">Create Prescription for Rahul Patil</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">Consultation completed today at 10:00 AM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3.5 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/80 dark:border-emerald-900/40">
              <input type="checkbox" className="mt-1 accent-[#173F35]" />
              <div>
                <p className="font-semibold text-emerald-900 dark:text-emerald-300 text-sm">Assign Diet Plan for Sneha Sharma</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Starting Vamana therapy tomorrow</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
