import { useState, useEffect } from 'react';
import Card from '../shared/Card';
// import { getAppointments } from '../../utils/storage';
import { Users, Calendar, CheckCircle, Clock, Loader2, BookOpen, Activity } from 'lucide-react';
import { getUser } from '../../utils/storage';
import { useToast } from '../shared/ToastProvider';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import Modal from '../shared/Modal';

const TherapistDashboard = () => {
  const [user] = useState(getUser());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionNotes, setSessionNotes] = useState({ beforeNotes: '', afterNotes: '' });
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const { showToast } = useToast();

  if (!user) {
    return <div className="p-6">Loading user...</div>;
  }

  // const loadAppointments = async () => {
  //   try {
  //     setLoading(true);
  //     const data = getAppointments().filter(a => a.therapistId === user?.id);
  //     setAppointments(data);
  //   } catch (err) {
  //     console.error("Error loading therapist bookings:", err);
  //     showToast("Failed to load appointments", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadAppointments = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/appointments");
      const data = await res.json();

      console.log("USER ID:", user.id);
      console.log("ALL APPOINTMENTS:", data);

      const filtered = data.filter(
        a => Number(a.therapistId) === Number(user.id)
      );

      setAppointments(filtered);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    loadAppointments();

    const interval = setInterval(() => {
      loadAppointments(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/update-appointment", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId: id, status })
      });

      if (res.ok) {
        showToast(`Appointment ${status} successfully`, "success");
        await loadAppointments();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating appointment", "error");
    }
  };

  const handleSaveSession = async () => {
    if (!selectedSession) return;
    try {
      // 1. Save Session Notes
      const noteRes = await fetch("http://127.0.0.1:5000/api/session_notes", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId: selectedSession.id,
          dayNumber: selectedSession.currentDay || 1,
          beforeNotes: sessionNotes.beforeNotes,
          afterNotes: sessionNotes.afterNotes
        })
      });

      if (!noteRes.ok) throw new Error("Failed to save session notes");

      // 2. Increment currentDay or mark completed if last day
      const curDayNum = selectedSession.currentDay || 1;
      const totalDays = selectedSession.duration || 1;
      const isLastDay = curDayNum >= totalDays;
      const nextDay = isLastDay ? totalDays : curDayNum + 1;
      const newStatus = isLastDay ? 'completed' : selectedSession.status;

      const updateRes = await fetch("http://127.0.0.1:5000/api/update-appointment", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId: selectedSession.id,
          currentDay: nextDay,
          status: newStatus
        })
      });

      if (updateRes.ok) {
        showToast("Session notes saved and day incremented", "success");
        setIsSessionModalOpen(false);
        setSessionNotes({ beforeNotes: '', afterNotes: '' });
        await loadAppointments();
      } else {
        throw new Error("Failed to update appointment day");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving session", "error");
    }
  };

  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  const stats = {
    total: safeAppointments.length,
    pending: safeAppointments.filter(a => a.status === 'pending').length,
    confirmed: safeAppointments.filter(a => a.status === 'confirmed').length,
    completed: safeAppointments.filter(a => a.status === 'completed').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-12">
        <Loader2 className="w-8 h-8 animate-spin text-ayur-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="animate-in fade-in duration-500 pb-3 border-b border-[#173F35]/10 dark:border-[#B69A5A]/20">
        <span className="text-[#B69A5A] text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
          Panchakarma Therapist Sanctuary
        </span>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#173F35] dark:text-white mb-1">
          Namaste, {user.name}! 🌿
        </h1>
        <p className="text-[#17211D]/70 dark:text-gray-300 text-sm">
          Daily therapeutic sessions, treatment logs & patient care schedule
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#173F35] to-[#255C4F] text-white shadow-xl border border-[#B69A5A]/30 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-[#E8DFC8]">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-0.5">{stats.total}</h3>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#E8DFC8]/90">Total Sessions</p>
        </Card>

        <Card className="bg-gradient-to-br from-[#B69A5A] to-[#9C844D] text-white shadow-xl border border-white/20 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-3 text-white">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-0.5">{stats.pending}</h3>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/95">Pending Approval</p>
        </Card>

        <Card className="bg-gradient-to-br from-[#2D5A4C] to-[#1E3E34] text-white shadow-xl border border-[#B69A5A]/30 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-[#E8DFC8]">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-0.5">{stats.confirmed}</h3>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#E8DFC8]/90">Confirmed</p>
        </Card>

        <Card className="bg-gradient-to-br from-[#17211D] to-[#2A3B34] text-white shadow-xl border border-[#B69A5A]/30 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-[#B69A5A]">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-0.5">{stats.completed}</h3>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#E8DFC8]/90">Successful Cycles</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-bold text-ayur-dark dark:text-white">Upcoming Sessions</h2>
            <Clock className="w-5 h-5 text-ayur-primary" />
          </div>
          {safeAppointments.length > 0 ? (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {safeAppointments.slice(0, 5).map(apt => {
                const finalTherapy = apt.assignedTherapy || apt.therapyType;
                return (
                  <div key={apt.id} className="p-4 bg-ayur-accent/5 dark:bg-gray-800 border border-ayur-accent/10 rounded-xl flex items-center justify-between hover:bg-ayur-accent/10 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-bold text-ayur-dark dark:text-white">{apt.patientName}</h3>
                      <p className="text-xs text-ayur-primary font-medium">{finalTherapy}</p>
                      {apt.duration && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                            <span>Progress: {apt.status === 'completed' ? 'All Days Completed 🎉' : `Day ${apt.currentDay || 1} of ${apt.duration}`}</span>
                          </div>
                          <div className="flex items-center gap-1 flex-wrap">
                            {[...Array(Number(apt.duration) || 1)].map((_, i) => {
                              const dayNum = i + 1;
                              const isCompleted = apt.status === 'completed' || (apt.currentDay && apt.currentDay > dayNum) || (apt.status === 'completed' && apt.currentDay === dayNum);
                              const isCurrent = apt.status !== 'completed' && (apt.currentDay || 1) === dayNum;
                              return (
                                <span
                                  key={i}
                                  className={`px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 ${
                                    isCompleted
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-300'
                                      : isCurrent
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-400 shadow-sm'
                                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border border-gray-200'
                                  }`}
                                >
                                  {isCompleted ? '✓' : isCurrent ? '⏳' : '○'} Day {dayNum} {isCompleted ? 'Complete' : ''}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {apt.practitionerNotes && (
                        <p className="text-[10px] text-gray-500 italic mt-1 line-clamp-1">
                          Note: {apt.practitionerNotes}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                        <span>{new Date(apt.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{apt.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${apt.status === 'confirmed' || apt.status === 'approved' ? 'bg-green-100 text-green-700' :
                        apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                        {apt.status === 'completed' ? 'Completed 🎉' : apt.status}
                      </span>
                      {apt.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(apt.id, 'confirmed')}
                            className="text-[10px] bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(apt.id, 'cancelled')}
                            className="text-[10px] bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {(apt.status === 'confirmed' || apt.status === 'approved') && (
                        <button
                          onClick={() => { setSelectedSession(apt); setIsSessionModalOpen(true); }}
                          className="text-[10px] flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                          <BookOpen className="w-3 h-3" /> Log Session
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Calendar className="w-12 h-12 mb-2 opacity-20" />
              <p className="italic">No appointments for today</p>
            </div>
          )}
        </Card>

        <Card className="border-none shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-bold text-ayur-dark dark:text-white">Active Treatments</h2>
            <Users className="w-5 h-5 text-ayur-primary" />
          </div>
          <div className="space-y-3">
            {safeAppointments.filter(a => a.status === 'confirmed' || a.status === 'approved' || a.status === 'completed').slice(0, 4).map(apt => {
              const finalTherapy = apt.assignedTherapy || apt.therapyType;
              return (
                <div key={apt.id} className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-ayur-accent/20">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-ayur-primary text-white flex items-center justify-center font-bold">
                      {apt.patientName?.charAt(0) || "P"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{apt.patientName}</p>
                      <p className="text-[10px] text-ayur-primary font-medium">{finalTherapy}</p>
                      {apt.duration && (
                        <div className="mt-1 flex items-center gap-1 flex-wrap">
                          {[...Array(Number(apt.duration) || 1)].map((_, i) => {
                            const dayNum = i + 1;
                            const isCompleted = apt.status === 'completed' || (apt.currentDay && apt.currentDay > dayNum) || (apt.status === 'completed' && apt.currentDay === dayNum);
                            const isCurrent = apt.status !== 'completed' && (apt.currentDay || 1) === dayNum;
                            return (
                              <span
                                key={i}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-0.5 ${
                                  isCompleted
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-300'
                                    : isCurrent
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-400'
                                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border border-gray-200'
                                }`}
                              >
                                {isCompleted ? '✓' : isCurrent ? '⏳' : '○'} Day {dayNum} {isCompleted ? 'Complete' : ''}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {apt.status === 'completed' ? 'Done 🎉' : `Day ${apt.currentDay || 1}/${apt.duration || 1}`}
                    </span>
                    {(apt.status === 'confirmed' || apt.status === 'approved') && (
                      <button
                        onClick={() => { setSelectedSession(apt); setIsSessionModalOpen(true); }}
                        className="text-[9px] flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        <BookOpen className="w-2.5 h-2.5" /> Log Session
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
            {safeAppointments.filter(a => a.status === 'confirmed' || a.status === 'approved' || a.status === 'completed').length === 0 && (
              <p className="text-center text-gray-400 italic py-12">No active treatments</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="mt-6 border-none shadow-xl">
        <h2 className="text-xl font-serif font-bold text-ayur-dark dark:text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-ayur-primary" /> Workload Analytics
        </h2>
        <div className="h-64">
          <Bar
            data={{
              labels: ['Pending', 'Confirmed', 'Completed'],
              datasets: [{
                label: 'Sessions',
                data: [stats.pending, stats.confirmed, stats.completed],
                backgroundColor: ['rgba(234, 179, 8, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(34, 197, 94, 0.8)'],
                borderRadius: 4
              }]
            }}
            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}
          />
        </div>
      </Card>

      <Modal isOpen={isSessionModalOpen} onClose={() => setIsSessionModalOpen(false)} title={`Log Session: Day ${selectedSession?.currentDay || 1}`}>
        {selectedSession && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-ayur-dark dark:text-white">Patient: {selectedSession.patientName}</p>
              <p className="text-sm text-ayur-primary font-medium">Therapy: {selectedSession.assignedTherapy || selectedSession.therapyType}</p>
            </div>

            {selectedSession.practitionerNotes && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                <span className="font-semibold">Practitioner Notes:</span><br />
                {selectedSession.practitionerNotes}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Before Session Notes</label>
              <textarea
                className="input-field w-full p-2 border rounded"
                rows="3"
                placeholder="Patient's condition before therapy..."
                value={sessionNotes.beforeNotes}
                onChange={e => setSessionNotes({ ...sessionNotes, beforeNotes: e.target.value })}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">After Session Notes</label>
              <textarea
                className="input-field w-full p-2 border rounded"
                rows="3"
                placeholder="Patient's condition after therapy..."
                value={sessionNotes.afterNotes}
                onChange={e => setSessionNotes({ ...sessionNotes, afterNotes: e.target.value })}
              ></textarea>
            </div>
            <button onClick={handleSaveSession} className="btn-primary w-full py-2">Save & Increment Day</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TherapistDashboard;
