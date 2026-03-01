import { Card } from '@/components/ui/Card';
import {
  Users, Stethoscope, Package, FlaskConical, Truck,
  TrendingUp, Activity, AlertCircle, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminHome() {
  const stats = [
    { label: 'Patients', value: '2,450', icon: <Users className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50', change: '+12%' },
    { label: 'Doctors', value: '128', icon: <Stethoscope className="w-5 h-5" />, color: 'text-green-600 bg-green-50', change: '+3' },
    { label: 'Active Orders', value: '34', icon: <Package className="w-5 h-5" />, color: 'text-amber-600 bg-amber-50', change: '' },
    { label: 'Active Consults', value: '8', icon: <Activity className="w-5 h-5" />, color: 'text-purple-600 bg-purple-50', change: '' },
    { label: 'Labs', value: '15', icon: <FlaskConical className="w-5 h-5" />, color: 'text-teal-600 bg-teal-50', change: '' },
    { label: 'Drivers', value: '42', icon: <Truck className="w-5 h-5" />, color: 'text-indigo-600 bg-indigo-50', change: '28 online' },
    { label: 'Revenue Today', value: '₹45K', icon: <TrendingUp className="w-5 h-5" />, color: 'text-pink-600 bg-pink-50', change: '+18%' },
    { label: 'Issues', value: '2', icon: <AlertCircle className="w-5 h-5" />, color: 'text-red-600 bg-red-50', change: '' },
  ];

  return (
    <div className="px-4 pt-4 space-y-5">
      <h1 className="font-heading font-bold text-lg text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <Card key={s.label} padding="sm">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>{s.icon}</div>
              <span className="text-xs text-gray-400">{s.label}</span>
            </div>
            <p className="font-heading font-extrabold text-xl text-gray-900">{s.value}</p>
            {s.change && <p className="text-[11px] text-green-600 mt-0.5">{s.change}</p>}
          </Card>
        ))}
      </div>

      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Quick Actions</h2>
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
          {[
            { label: 'Manage Users', to: '/app/users' },
            { label: 'View All Orders', to: '/app/admin-orders' },
            { label: 'View Consultations', to: '/app/admin-consults' },
            { label: 'Analytics', to: '/app/analytics' },
            { label: 'Lab Bookings', to: '/app/lab-bookings' },
            { label: 'Ambulance Requests', to: '/app/ambulance-requests' },
            { label: 'System Settings', to: '/app/settings' },
          ].map((a) => (
            <Link key={a.label} to={a.to}
              className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">{a.label}</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
