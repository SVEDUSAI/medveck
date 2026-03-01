import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { clsx } from 'clsx';
import {
  Home, Stethoscope, Pill, FlaskConical, User,
  Bell, Search, Menu, X, LogOut, Settings,
  Package, Truck, LayoutDashboard, Users, Calendar,
  Ambulance, BarChart3, Shield, ClipboardList,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Avatar } from '@/components/ui/Avatar';

// Bottom nav tabs per role
const bottomTabs: Record<string, { label: string; to: string; icon: React.ReactNode }[]> = {
  PATIENT: [
    { label: 'Home', to: '/app', icon: <Home className="w-5 h-5" /> },
    { label: 'Consult', to: '/app/consult', icon: <Stethoscope className="w-5 h-5" /> },
    { label: 'Medicines', to: '/app/medicines', icon: <Pill className="w-5 h-5" /> },
    { label: 'Lab Tests', to: '/app/labs', icon: <FlaskConical className="w-5 h-5" /> },
    { label: 'Profile', to: '/app/profile', icon: <User className="w-5 h-5" /> },
  ],
  DOCTOR: [
    { label: 'Home', to: '/app', icon: <Home className="w-5 h-5" /> },
    { label: 'Consults', to: '/app/consults', icon: <Stethoscope className="w-5 h-5" /> },
    { label: 'Schedule', to: '/app/schedule', icon: <Calendar className="w-5 h-5" /> },
    { label: 'Patients', to: '/app/patients', icon: <Users className="w-5 h-5" /> },
    { label: 'Profile', to: '/app/profile', icon: <User className="w-5 h-5" /> },
  ],
  VENDOR: [
    { label: 'Home', to: '/app', icon: <Home className="w-5 h-5" /> },
    { label: 'Orders', to: '/app/vendor-orders', icon: <Package className="w-5 h-5" /> },
    { label: 'Inventory', to: '/app/inventory', icon: <Pill className="w-5 h-5" /> },
    { label: 'Profile', to: '/app/profile', icon: <User className="w-5 h-5" /> },
  ],
  LAB: [
    { label: 'Home', to: '/app', icon: <Home className="w-5 h-5" /> },
    { label: 'Bookings', to: '/app/bookings', icon: <FlaskConical className="w-5 h-5" /> },
    { label: 'Reports', to: '/app/reports', icon: <Package className="w-5 h-5" /> },
    { label: 'Profile', to: '/app/profile', icon: <User className="w-5 h-5" /> },
  ],
  DRIVER: [
    { label: 'Home', to: '/app', icon: <Home className="w-5 h-5" /> },
    { label: 'Deliveries', to: '/app/deliveries', icon: <Truck className="w-5 h-5" /> },
    { label: 'Ambulance', to: '/app/ambulance-jobs', icon: <Ambulance className="w-5 h-5" /> },
    { label: 'Profile', to: '/app/profile', icon: <User className="w-5 h-5" /> },
  ],
  ADMIN: [
    { label: 'Dashboard', to: '/app', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Users', to: '/app/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Orders', to: '/app/admin-orders', icon: <Package className="w-5 h-5" /> },
    { label: 'Analytics', to: '/app/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Settings', to: '/app/settings', icon: <Settings className="w-5 h-5" /> },
  ],
  SUPER_ADMIN: [
    { label: 'Dashboard', to: '/app', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Users', to: '/app/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Audit Log', to: '/app/audit-log', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Config', to: '/app/platform-config', icon: <Shield className="w-5 h-5" /> },
    { label: 'Settings', to: '/app/settings', icon: <Settings className="w-5 h-5" /> },
  ],
};
bottomTabs['VET'] = bottomTabs['DOCTOR'];
bottomTabs['DENTIST'] = bottomTabs['DOCTOR'];
bottomTabs['NURSE'] = bottomTabs['DOCTOR'];

export function AppShell() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const role = user?.role || 'PATIENT';
  const tabs = bottomTabs[role] || bottomTabs['PATIENT'];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-14 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {role === 'PATIENT' ? `Hi, ${user?.name || 'there'}` : user?.name || 'Dashboard'}
            </p>
            <p className="text-[11px] text-gray-400 truncate capitalize">{role.toLowerCase().replace('_', ' ')}</p>
          </div>
        </div>

        <button onClick={() => navigate('/app/notifications')} className="p-2 text-gray-400 hover:text-gray-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="p-1" onClick={() => setShowMenu(!showMenu)}>
          <Avatar name={user?.name || 'U'} size="sm" />
        </button>

        {/* Dropdown */}
        {showMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
            <div className="absolute right-4 top-14 bg-white rounded-2xl shadow-xl border border-gray-100 w-56 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-medium text-sm text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.phone}</p>
              </div>
              <button onClick={() => { navigate('/app/profile'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <User className="w-4 h-4" /> My Profile
              </button>
              <button onClick={() => { navigate('/app/settings'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-2 pb-safe">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/app'}
              className={({ isActive }) =>
                clsx(
                  'flex flex-col items-center gap-0.5 py-2 px-3 min-w-[60px] transition-colors',
                  isActive ? 'text-primary-500' : 'text-gray-400',
                )
              }
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
