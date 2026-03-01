import { useAuthStore } from '@/stores/authStore';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import {
  User, FileText, Calendar, Pill, CreditCard,
  Settings, HelpCircle, Shield, ChevronRight, Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  { label: 'My Appointments', icon: <Calendar className="w-5 h-5" />, to: '/app/appointments', color: 'text-blue-600 bg-blue-50' },
  { label: 'Health Records', icon: <FileText className="w-5 h-5" />, to: '/app/records', color: 'text-purple-600 bg-purple-50' },
  { label: 'My Orders', icon: <Pill className="w-5 h-5" />, to: '/app/orders', color: 'text-green-600 bg-green-50' },
  { label: 'Saved Addresses', icon: <Heart className="w-5 h-5" />, to: '/app/addresses', color: 'text-pink-600 bg-pink-50' },
  { label: 'Payment Methods', icon: <CreditCard className="w-5 h-5" />, to: '/app/payments', color: 'text-amber-600 bg-amber-50' },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, to: '/app/settings', color: 'text-gray-600 bg-gray-100' },
  { label: 'Help & Support', icon: <HelpCircle className="w-5 h-5" />, to: '/app/help', color: 'text-teal-600 bg-teal-50' },
  { label: 'Privacy & Terms', icon: <Shield className="w-5 h-5" />, to: '/app/privacy', color: 'text-indigo-600 bg-indigo-50' },
];

export function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* Profile card */}
      <Card className="flex items-center gap-4">
        <Avatar name={user?.name || 'User'} size="xl" />
        <div className="flex-1 min-w-0">
          <h2 className="font-heading font-bold text-lg text-gray-900 truncate">{user?.name || 'Set your name'}</h2>
          <p className="text-sm text-gray-500">+91 {user?.phone}</p>
          {user?.email && <p className="text-xs text-gray-400">{user.email}</p>}
        </div>
        <Link to="/app/edit-profile" className="text-sm font-medium text-primary-500">Edit</Link>
      </Card>

      {/* Menu */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {menuItems.map((item) => (
          <Link key={item.label} to={item.to}
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>{item.icon}</div>
            <span className="flex-1 text-sm font-medium text-gray-700">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
