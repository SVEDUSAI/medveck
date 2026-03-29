import { Link } from 'react-router-dom';
import {
  Stethoscope, FlaskConical, Pill, Ambulance,
  Home as HomeIcon, Heart, UserCheck, ChevronRight,
  Clock, Package, AlertCircle, Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';

const services = [
  { icon: <Stethoscope className="w-6 h-6" />, label: 'Book\nDoctor', to: '/app/consult', bg: 'bg-blue-500', shadow: 'shadow-blue-200' },
  { icon: <Pill className="w-6 h-6" />, label: 'Order\nMedicines', to: '/app/medicines', bg: 'bg-green-500', shadow: 'shadow-green-200' },
  { icon: <FlaskConical className="w-6 h-6" />, label: 'Book\nLab Test', to: '/app/labs', bg: 'bg-purple-500', shadow: 'shadow-purple-200' },
  { icon: <Ambulance className="w-6 h-6" />, label: 'Emergency\nAmb.', to: '/app/ambulance', bg: 'bg-red-500', shadow: 'shadow-red-200' },
  { icon: <HomeIcon className="w-6 h-6" />, label: 'Home\nVisit', to: '/app/consult', bg: 'bg-amber-500', shadow: 'shadow-amber-200' },
  { icon: <Heart className="w-6 h-6" />, label: 'Nurse\nCare', to: '/app/consult?type=NURSE', bg: 'bg-pink-500', shadow: 'shadow-pink-200' },
  { icon: <Stethoscope className="w-6 h-6" />, label: 'Veterinary', to: '/app/consult?specialty=Veterinary', bg: 'bg-teal-500', shadow: 'shadow-teal-200' },
  { icon: <UserCheck className="w-6 h-6" />, label: 'Dental\nCare', to: '/app/consult?specialty=Orthodontist', bg: 'bg-indigo-500', shadow: 'shadow-indigo-200' },
];

const activeOrders = [
  { id: '1', type: 'Medicine Delivery', status: 'Out for delivery', time: '15 min away', icon: <Pill className="w-5 h-5" />, color: 'text-green-600 bg-green-50', dot: 'bg-green-500' },
  { id: '2', type: 'Home Visit', status: 'Dr. Priya Sharma — Today 4:00 PM', time: 'Confirmed', icon: <Stethoscope className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50', dot: 'bg-blue-500' },
];

const healthTips = [
  { icon: <Heart className="w-5 h-5 text-red-500" />, title: 'Stay Hydrated', desc: 'Drink 8 glasses of water daily.', bg: 'bg-red-50' },
  { icon: <Sparkles className="w-5 h-5 text-amber-500" />, title: 'Get 8 hrs Sleep', desc: 'Quality sleep boosts immunity.', bg: 'bg-amber-50' },
];

export function PatientHome() {
  const { user } = useAuthStore();

  return (
    <div className="pb-8">
      {/* Gradient header */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 px-4 pt-5 pb-12">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-white/70 text-sm">Good morning,</p>
            <h1 className="font-heading font-extrabold text-2xl text-white leading-tight">
              {user?.name?.split(' ')[0] || 'there'} 👋
            </h1>
          </div>
          <Link to="/app/ambulance" className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg shadow-red-300/40">
            <AlertCircle className="w-4 h-4" /> SOS
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search doctors, medicines, lab tests..."
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border-0 shadow-sm
                       text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-5">
        {/* Services grid */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-heading font-bold text-sm text-gray-900 mb-4">Our Services</h2>
          <div className="grid grid-cols-4 gap-4">
            {services.map((s) => (
              <Link key={s.label} to={s.to} className="flex flex-col items-center gap-2 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${s.bg} shadow-lg ${s.shadow} group-active:scale-95 transition-transform`}>
                  {s.icon}
                </div>
                <span className="text-[11px] font-medium text-gray-600 text-center leading-tight whitespace-pre-line">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Active orders */}
        {activeOrders.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-bold text-base text-gray-900">Active Bookings</h2>
              <Link to="/app/appointments" className="text-xs font-semibold text-primary-500">View all</Link>
            </div>
            <div className="space-y-2.5">
              {activeOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${order.color}`}>
                    {order.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{order.type}</p>
                    <p className="text-xs text-gray-500 truncate">{order.status}</p>
                  </div>
                  <div className="text-right flex-shrink-0 flex items-center gap-2">
                    <div>
                      <div className={`w-2 h-2 rounded-full ${order.dot} mx-auto mb-1`} />
                      <p className="text-[11px] text-gray-400 whitespace-nowrap">{order.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-base text-gray-900">Recent Activity</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { label: 'Reorder Medicines', desc: 'Last ordered 3 days ago', icon: <Pill className="w-5 h-5" />, bg: 'bg-green-500', to: '/app/medicines' },
              { label: 'Book Follow-up', desc: 'Dr. Priya Sharma', icon: <Stethoscope className="w-5 h-5" />, bg: 'bg-blue-500', to: '/app/consult' },
              { label: 'View Lab Report', desc: 'CBC + Thyroid Panel', icon: <FlaskConical className="w-5 h-5" />, bg: 'bg-purple-500', to: '/app/records' },
              { label: 'Track Order', desc: 'Medicine delivery', icon: <Package className="w-5 h-5" />, bg: 'bg-amber-500', to: '/app/orders' },
            ].map((item) => (
              <Link key={item.label} to={item.to} className="flex-shrink-0 w-40 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-white ${item.bg}`}>{item.icon}</div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Health tips */}
        <div>
          <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Health Tips</h2>
          <div className="space-y-2.5">
            {healthTips.map((tip) => (
              <div key={tip.title} className={`rounded-2xl p-4 flex items-center gap-3 ${tip.bg}`}>
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  {tip.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{tip.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
