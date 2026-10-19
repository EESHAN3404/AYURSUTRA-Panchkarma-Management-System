import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/shared/DashboardLayout';
import DoctorDashboard from '../components/doctor/DoctorDashboard';

const DoctorPage = () => {
  return (
    <DashboardLayout role="doctor">
      <Routes>
        <Route path="/" element={<DoctorDashboard />} />
        {/* We can add patient workspace route later */}
        <Route path="*" element={<Navigate to="/doctor" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DoctorPage;
