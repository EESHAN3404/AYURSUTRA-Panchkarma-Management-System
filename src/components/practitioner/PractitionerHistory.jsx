import { useState, useEffect } from 'react';
import Card from '../shared/Card';
import { Search, History, Calendar, CheckCircle, XCircle, FileText, Download } from 'lucide-react';
import { useToast } from '../shared/ToastProvider';

const PractitionerHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/api/appointments");
      const data = await res.json();
      
      // Filter for past/completed/rejected appointments
      const pastApts = Array.isArray(data) 
        ? data.filter(a => ['completed', 'rejected', 'cancelled'].includes(a.status))
        : [];
      
      // Sort by date descending
      pastApts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAppointments(pastApts);
    } catch (err) {
      console.error(err);
      showToast("Failed to load history", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(a =>
    (a.patientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.therapyType || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.therapistName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <History className="w-8 h-8 text-ayur-primary" />
            Treatment History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review all completed and cancelled treatments.</p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by patient, therapy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-ayur-accent/20 rounded-xl focus:ring-2 focus:ring-ayur-primary/50 outline-none w-full md:w-72 bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <Card className="border-none shadow-lg">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ayur-primary"></div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No past treatment history found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-ayur-light dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold uppercase">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Date</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Therapy</th>
                  <th className="px-4 py-3">Therapist</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {apt.date}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-900 dark:text-gray-100">
                      {apt.patientName || 'Unknown'}
                    </td>
                    <td className="px-4 py-4">
                      {apt.assignedTherapy || apt.therapyType}
                    </td>
                    <td className="px-4 py-4">
                      {apt.therapistName || 'Not Assigned'}
                    </td>
                    <td className="px-4 py-4">
                      {apt.duration ? `${apt.duration} Days` : '1 Day'}
                    </td>
                    <td className="px-4 py-4 font-medium text-green-600 dark:text-green-400">
                      ₹{apt.amount || 0}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        apt.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {apt.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PractitionerHistory;
