import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { AppShell } from '@/components/layout/AppShell';

// Auth
import { LoginPage } from '@/pages/auth/Login';
import { StaffLoginPage } from '@/pages/auth/StaffLogin';

// Patient pages
import { PatientHome } from '@/pages/patient/Home';
import { ConsultPage } from '@/pages/patient/consult/Index';
import { MedicinesPage } from '@/pages/patient/medicines/Index';
import { LabsPage } from '@/pages/patient/labs/Index';
import { AmbulancePage } from '@/pages/patient/ambulance/Index';
import { ProfilePage } from '@/pages/patient/Profile';
import { RecordsPage as PatientRecords } from '@/pages/patient/Records';
import { AppointmentsPage as PatientAppointments } from '@/pages/patient/Appointments';
import { OrdersPage as PatientOrders } from '@/pages/patient/Orders';
import { EditProfilePage } from '@/pages/patient/EditProfile';
import { AddressesPage } from '@/pages/patient/Addresses';
import { PaymentsPage } from '@/pages/patient/Payments';
import { HelpPage } from '@/pages/patient/Help';
import { PrivacyPage } from '@/pages/patient/Privacy';
import { OnboardingPage } from '@/pages/patient/Onboarding';

// Doctor
import { DoctorHome } from '@/pages/doctor/Home';
import { ConsultsPage as DoctorConsults } from '@/pages/doctor/Consults';
import { SchedulePage as DoctorSchedule } from '@/pages/doctor/Schedule';
import { PatientsPage as DoctorPatients } from '@/pages/doctor/Patients';

// Vendor
import { VendorHome } from '@/pages/vendor/Home';
import { VendorOrdersList } from '@/pages/vendor/OrdersList';
import { VendorInventory } from '@/pages/vendor/Inventory';

// Lab
import { LabHome } from '@/pages/lab/Home';
import { LabBookings } from '@/pages/lab/Bookings';
import { LabReports } from '@/pages/lab/Reports';

// Driver
import { DriverHome } from '@/pages/driver/Home';
import { DriverDeliveries } from '@/pages/driver/Deliveries';
import { DriverAmbulanceJobs } from '@/pages/driver/AmbulanceJobs';

// Admin
import { AdminHome } from '@/pages/admin/Home';
import { AdminUsers } from '@/pages/admin/Users';
import { AdminOrders } from '@/pages/admin/Orders';
import { AdminConsultations } from '@/pages/admin/Consultations';
import { AdminSettings } from '@/pages/admin/Settings';
import { AdminAnalytics } from '@/pages/admin/Analytics';
import { AdminLabBookings } from '@/pages/admin/LabBookings';
import { AdminAmbulanceRequests } from '@/pages/admin/AmbulanceRequests';

// Super Admin
import { SuperAdminHome } from '@/pages/superadmin/Home';
import { AuditLogPage } from '@/pages/superadmin/AuditLog';
import { PlatformConfigPage } from '@/pages/superadmin/PlatformConfig';

// Shared
import { NotificationsPage } from '@/pages/shared/Notifications';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Role-based home component
function AppHome() {
  const { user } = useAuthStore();
  switch (user?.role) {
    case 'DOCTOR': case 'VET': case 'DENTIST': case 'NURSE': return <DoctorHome />;
    case 'VENDOR': return <VendorHome />;
    case 'LAB': return <LabHome />;
    case 'DRIVER': return <DriverHome />;
    case 'SUPER_ADMIN': return <SuperAdminHome />;
    case 'ADMIN': return <AdminHome />;
    default: return <PatientHome />;
  }
}

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Auth — no shell */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/app" replace /> : <LoginPage />} />
      <Route path="/staff-login" element={isAuthenticated ? <Navigate to="/app" replace /> : <StaffLoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Main app — with shell */}
      <Route path="/app" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<AppHome />} />

        {/* ─── Patient ─────────────────────────────── */}
        <Route path="consult" element={<ConsultPage />} />
        <Route path="medicines" element={<MedicinesPage />} />
        <Route path="labs" element={<LabsPage />} />
        <Route path="ambulance" element={<AmbulancePage />} />
        <Route path="records" element={<PatientRecords />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="orders" element={<PatientOrders />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="addresses" element={<AddressesPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="privacy" element={<PrivacyPage />} />

        {/* ─── Doctor ──────────────────────────────── */}
        <Route path="consults" element={<DoctorConsults />} />
        <Route path="schedule" element={<DoctorSchedule />} />
        <Route path="patients" element={<DoctorPatients />} />

        {/* ─── Vendor ──────────────────────────────── */}
        <Route path="vendor-orders" element={<VendorOrdersList />} />
        <Route path="inventory" element={<VendorInventory />} />

        {/* ─── Lab ─────────────────────────────────── */}
        <Route path="bookings" element={<LabBookings />} />
        <Route path="reports" element={<LabReports />} />

        {/* ─── Driver ──────────────────────────────── */}
        <Route path="deliveries" element={<DriverDeliveries />} />
        <Route path="ambulance-jobs" element={<DriverAmbulanceJobs />} />

        {/* ─── Admin ───────────────────────────────── */}
        <Route path="users" element={<AdminUsers />} />
        <Route path="admin-orders" element={<AdminOrders />} />
        <Route path="admin-consults" element={<AdminConsultations />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="lab-bookings" element={<AdminLabBookings />} />
        <Route path="ambulance-requests" element={<AdminAmbulanceRequests />} />
        <Route path="settings" element={<AdminSettings />} />

        {/* ─── Super Admin ─────────────────────────── */}
        <Route path="audit-log" element={<AuditLogPage />} />
        <Route path="platform-config" element={<PlatformConfigPage />} />

        {/* ─── Shared ──────────────────────────────── */}
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<Navigate to={isAuthenticated ? '/app' : '/login'} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
