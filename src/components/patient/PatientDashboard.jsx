import { useState, useEffect } from 'react';
import { Calendar, BookOpen, User, TrendingUp, CheckCircle, FileText, Coffee, Activity, Download } from 'lucide-react';
import Card from '../shared/Card';
import DietPlanDisplay from '../shared/DietPlanDisplay';
import { getUser } from '../../utils/storage';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PatientDashboard = () => {
  const [user] = useState(getUser());
  const [plans, setPlans] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      try {
        const [planRes, presRes, aptRes] = await Promise.all([
          fetch(`http://127.0.0.1:5000/api/clinical/treatment-plans/patient/${user.id}`),
          fetch(`http://127.0.0.1:5000/api/clinical/prescriptions/patient/${user.id}`),
          fetch(`http://127.0.0.1:5000/api/appointments`)
        ]);
        
        if (planRes.ok) {
          const planData = await planRes.json();
          setPlans(planData);
          if (planData.length > 0) {
            const activePlan = planData.find(p => p.status === 'ACTIVE') || planData[0];
            const sessionRes = await fetch(`http://127.0.0.1:5000/api/clinical/treatment-sessions/plan/${activePlan.id}`);
            if (sessionRes.ok) setSessions(await sessionRes.json());
          }
        }

        if (presRes.ok) {
          setPrescriptions(await presRes.json());
        }

        if (aptRes.ok) {
          const allApts = await aptRes.json();
          const myApts = allApts.filter(a => Number(a.patientId) === Number(user.id));
          myApts.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAppointments(myApts);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  if (!user) return null;

  const activeAppointment = appointments.find(a => ['confirmed', 'approved', 'pending', 'completed'].includes(a.status)) || appointments[0];
  const activePlan = plans.find(p => p.status === 'ACTIVE') || plans[0];
  
  let completedSessions = 0;
  if (activeAppointment) {
    if (activeAppointment.status === 'completed') {
      completedSessions = activeAppointment.duration || 1;
    } else {
      completedSessions = activeAppointment.currentDay ? activeAppointment.currentDay - 1 : 0;
    }
  } else {
    completedSessions = sessions.filter(s => s.status === 'COMPLETED').length;
  }
  const totalSessions = activeAppointment?.duration || activePlan?.totalSessions || 1;
  const progressPercent = Math.round((completedSessions / totalSessions) * 100) || 0;
  
  const nextSession = sessions.find(s => s.status === 'SCHEDULED');
  const lastSession = [...sessions].reverse().find(s => s.status === 'COMPLETED');
  const currentPrescription = prescriptions.length > 0 ? prescriptions[prescriptions.length - 1] : null;

  return (
    <div className="space-y-6">
      <div className="animate-in fade-in duration-500 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b border-[#173F35]/10 dark:border-[#B69A5A]/20">
        <div>
          <span className="text-[#B69A5A] text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
            Personalized Panchakarma Sanctuary
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#173F35] dark:text-white">
            Namaste, {user.name} 👋
          </h1>
          <p className="text-[#17211D]/70 dark:text-gray-300 text-sm mt-1">
            Holistic Ayurvedic therapy progress & daily Ahara regimen
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#B69A5A]/15 text-[#B69A5A] border border-[#B69A5A]/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B69A5A] animate-pulse" />
            Active Care Journey
          </span>
        </div>
      </div>

      {(activeAppointment || activePlan) && (
        <Card className="bg-gradient-to-br from-[#173F35] via-[#1B4B3F] to-[#113129] text-white shadow-2xl border border-[#B69A5A]/30 p-6 md:p-8 rounded-2xl relative overflow-hidden">
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#B69A5A]/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B69A5A] block mb-1">
                Active Therapy Protocol
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1">
                {activeAppointment?.therapyType || activePlan?.therapyName}
              </h2>
              <p className="text-sm text-[#E8DFC8]/80 font-light">
                Customized tridosha-balancing panchakarma procedure
              </p>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <span className="bg-[#B69A5A]/20 border border-[#B69A5A]/40 text-[#E8DFC8] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                {activeAppointment?.status || activePlan?.status}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4 relative z-10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-[#E8DFC8]/90 font-medium uppercase tracking-[0.15em] mb-1">Session Progress</p>
                <p className="text-3xl md:text-4xl font-serif font-bold text-white">
                  {completedSessions} <span className="text-lg opacity-70 font-sans font-normal">/ {totalSessions} Days</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-serif font-bold text-[#E8DFC8]">{progressPercent}%</span>
                <p className="text-[10px] uppercase tracking-wider text-[#B69A5A] font-semibold">Completed</p>
              </div>
            </div>
            
            <div className="w-full bg-black/25 rounded-full h-3.5 p-0.5 border border-white/10">
              <div 
                className="bg-gradient-to-r from-[#B69A5A] to-[#D4AF37] h-full rounded-full transition-all duration-1000 shadow-xs" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/15 pt-5 relative z-10">
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#B69A5A] font-semibold mb-1">Upcoming Session</p>
              {nextSession ? (
                <p className="font-semibold text-base text-white">{nextSession.date}, {nextSession.time}</p>
              ) : (
                <p className="font-semibold text-base text-white/80">No scheduled sessions</p>
              )}
            </div>
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#B69A5A] font-semibold mb-1">Last Completed</p>
              {lastSession ? (
                <p className="font-semibold text-base text-white">{lastSession.date} (Session {lastSession.sessionNumber})</p>
              ) : (
                <p className="font-semibold text-base text-white/80">Awaiting initial session</p>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#173F35]/10 dark:bg-[#B69A5A]/15 text-[#173F35] dark:text-[#B69A5A] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-[#173F35] dark:text-white leading-tight">
                  Current Prescription
                </h2>
                <span className="text-[11px] text-[#B69A5A] font-semibold uppercase tracking-wider">Aushadha Vidhi</span>
              </div>
            </div>
          </div>
          {currentPrescription ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Prescribed on {currentPrescription.date}</p>
              <div className="bg-[#F5F1E8]/70 dark:bg-[#101F19] p-4 rounded-xl border border-[#173F35]/15 dark:border-[#B69A5A]/20">
                <p className="font-medium text-[#173F35] dark:text-white mb-2">{currentPrescription.instructions}</p>
                {currentPrescription.medicines?.map(m => (
                  <div key={m.id} className="text-sm border-t border-[#173F35]/10 dark:border-gray-700 py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{m.medicineName}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#173F35]/10 text-[#173F35] dark:bg-[#B69A5A]/20 dark:text-[#E8DFC8] font-medium">
                      {m.dosage} • {m.frequency} ({m.timing})
                    </span>
                  </div>
                ))}
              </div>
              <a 
                href={import.meta.env.PROD ? `/api/clinical/prescriptions/${currentPrescription.id}/pdf` : `http://127.0.0.1:5000/api/clinical/prescriptions/${currentPrescription.id}/pdf`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full py-2.5"
              >
                <Download className="w-4 h-4" /> Download PDF Prescription
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <FileText className="w-12 h-12 mb-3 opacity-20" />
              <p>No active prescriptions</p>
            </div>
          )}
        </Card>

        <DietPlanDisplay dietText={activeAppointment?.diet} />
      </div>

      <Card className="border-none shadow-lg mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#173F35]/10 dark:bg-[#B69A5A]/15 text-[#173F35] dark:text-[#B69A5A] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#173F35] dark:text-white leading-tight">
                Therapy Analytics
              </h2>
              <span className="text-[11px] text-[#B69A5A] font-semibold uppercase tracking-wider">Clinical Trajectory</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <Line 
            data={{
              labels: Array.from({ length: totalSessions }, (_, i) => `Day ${i + 1}`),
              datasets: [{
                label: 'Treatment Progress',
                data: Array.from({ length: totalSessions }, (_, i) => (i < completedSessions ? (i + 1) * 10 : null)),
                borderColor: '#B69A5A',
                backgroundColor: 'rgba(182, 154, 90, 0.15)',
                pointBackgroundColor: '#173F35',
                pointBorderColor: '#B69A5A',
                pointHoverBackgroundColor: '#B69A5A',
                pointBorderWidth: 2,
                tension: 0.35,
                fill: true
              }]
            }} 
            options={{ 
              maintainAspectRatio: false, 
              plugins: {
                legend: {
                  labels: {
                    color: '#173F35',
                    font: { family: 'Manrope', weight: '600' }
                  }
                }
              },
              scales: { 
                y: { 
                  beginAtZero: true, 
                  max: totalSessions * 10,
                  grid: { color: 'rgba(23, 63, 53, 0.06)' }
                },
                x: {
                  grid: { color: 'rgba(23, 63, 53, 0.06)' }
                }
              }
            }}
          />
        </div>
      </Card>

      <Card className="border-none shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#173F35]/10 dark:bg-[#B69A5A]/15 text-[#173F35] dark:text-[#B69A5A] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#173F35] dark:text-white leading-tight">
                My Panchakarma Journey
              </h2>
              <span className="text-[11px] text-[#B69A5A] font-semibold uppercase tracking-wider">Daily Milestone Tracker</span>
            </div>
          </div>
        </div>
        <div className="relative border-l-2 border-[#B69A5A]/35 ml-4 pl-6 space-y-8">
          {activeAppointment?.duration ? (
            [...Array(activeAppointment.duration)].map((_, i) => {
              const sessionNum = i + 1;
              const isCompleted = activeAppointment.status === 'completed' || (activeAppointment.currentDay && activeAppointment.currentDay > sessionNum) || (activeAppointment.status === 'completed' && activeAppointment.currentDay === sessionNum);
              const isNext = activeAppointment.status !== 'completed' && (activeAppointment.currentDay || 1) === sessionNum;

              return (
                <div key={sessionNum} className="relative">
                  <div className={`absolute -left-[35px] w-5 h-5 rounded-full border-2 border-white dark:border-gray-900 shadow-xs transition-all ${
                    isCompleted ? 'bg-[#173F35] ring-2 ring-[#B69A5A]/40' : isNext ? 'bg-[#B69A5A] ring-4 ring-[#B69A5A]/30 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'
                  }`}></div>
                  <div>
                    <h3 className={`font-serif font-bold ${isCompleted ? 'text-[#173F35] dark:text-[#E8DFC8]' : isNext ? 'text-[#B69A5A]' : 'text-gray-400'}`}>
                      Day {sessionNum}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {isCompleted ? 'Completed Session' : isNext ? 'Current Active Session' : 'Scheduled Milestone'}
                    </p>
                    {activeAppointment.notes && (isCompleted && sessionNum === (activeAppointment.currentDay - 1 > 0 ? activeAppointment.currentDay - 1 : 1) || (activeAppointment.status === 'completed' && sessionNum === activeAppointment.duration)) && (
                      <div className="mt-3 p-3.5 bg-[#F5F1E8]/70 dark:bg-[#101F19] rounded-xl border border-[#173F35]/15 dark:border-[#B69A5A]/20 text-xs">
                        <span className="font-semibold text-[#173F35] dark:text-[#B69A5A] block mb-1">Therapist Clinical Notes:</span>
                        {activeAppointment.notes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : sessions.length > 0 ? (
            sessions.map((session, i) => {
              const isCompleted = session.status === 'COMPLETED';
              const isNext = session.status === 'SCHEDULED' && (!sessions[i-1] || sessions[i-1].status === 'COMPLETED');
              
              return (
                <div key={session.id} className="relative">
                  <div className={`absolute -left-[35px] w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                    isCompleted ? 'bg-green-500' : isNext ? 'bg-blue-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'
                  }`}></div>
                  <div>
                    <h3 className={`font-bold ${isCompleted ? 'text-green-700 dark:text-green-400' : isNext ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
                      Session {session.sessionNumber}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {session.date} at {session.time} • <span className="uppercase font-semibold text-xs">{session.status}</span>
                    </p>
                    {isCompleted && session.treatmentNotes && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 text-sm">
                        <span className="font-semibold text-ayur-primary block mb-1">Therapist Notes:</span>
                        {session.treatmentNotes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 italic">Treatment journey starting soon...</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PatientDashboard;
