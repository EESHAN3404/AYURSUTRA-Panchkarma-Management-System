import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/shared/ToastProvider';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PatientPage from './pages/PatientPage';
import TherapistPage from './pages/TherapistPage';
import PractitionerPage from './pages/PractitionerPage';
import DoctorPage from './pages/DoctorPage';
import LandingPage from './pages/LandingPage';
import AppointmentBooking from './pages/AppointmentBooking';
import PanchakarmaInfo from './pages/PanchakarmaInfo';
import DoctorsDirectory from './pages/DoctorsDirectory';
import { initializeData, setupStorageSync } from './utils/storage';
import { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    // Setup the mock of localStorage to sync to backend
    setupStorageSync();
    // Initialize data from the backend
    initializeData();
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/experience" element={<LandingPage />} />
          <Route path="/reviews" element={<LandingPage />} />
          <Route path="/doctors" element={<DoctorsDirectory />} />
          <Route path="/all-doctors" element={<DoctorsDirectory />} />
          <Route path="/about-panchakarma" element={<PanchakarmaInfo />} />
          <Route
            path="/book-appointment"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <AppointmentBooking />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login initialMode="login" />} />
          <Route path="/signup" element={<Login initialMode="signup" />} />

          <Route
            path="/patient/*"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/therapist/*"
            element={
              <ProtectedRoute allowedRoles={['therapist']}>
                <TherapistPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/*"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/practitioner/*"
            element={
              <ProtectedRoute allowedRoles={['practitioner']}>
                <PractitionerPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
