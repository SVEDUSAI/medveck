import { Link } from 'react-router-dom';
import {
  Video, Stethoscope, FlaskConical, Pill, Ambulance,
  Home as HomeIcon, Heart, UserCheck, Search, ChevronRight,
  Clock, Package, AlertCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';

const services = [
  { icon: <Video className="w-6 h-6" />, label: 'Consult\nDoctor', to: '/app/consult', bg: 'bg-blue-50', color: 'text-blue-600' },
  { icon: <Pill className="w-6 h-6" />, label: 'Order\nMedicines', to: '/app/medicines', bg: 'bg-green-50', color: 'text-green-600' },
  { icon: <FlaskConical className="w-6 h-6" />, label: 'Book\nLab Test', to: '/app/labs', bg: 'bg-purple-50', color: 'text-purple-600' },
  { icon: <Ambulance className="w-6 h-6" />, label: 'Emergency\nAmbulance', to: '/app/ambulance', bg: 'bg-red-50', color: 'text-red-600' },
  { icon: <HomeIcon className="w-6 h-6" />, label: 'Home\nVisit', to: '/app/consult?type=HOME_VISIT', bg: 'bg-amber-50', color: 'text-amber-600' },
  { icon: <Heart className="w-6 h-6" />, label: 'Nurse\nCare', to: '/app/consult?type=NURSE', bg: 'bg-pink-50', color: 'text-pink-600' },
  { icon: <Stethoscope className="w-6 h-6" />, label: 'Veterinary', to: '/app/consult?specialty=VETERINARY', bg: 'bg-teal-50', color: 'text-teal-600' },
  { icon: <UserCheck className="w-6 h-6" />, label: 'Dental\nCare', to: '/app/consult?specialty=DENTAL', bg: 'bg-indigo-50', color: 'text-indigo-600' },
];

// Mock active orders
const activeOrders = [
  { id: '1', type: 'Medicine', status: 'Out for delivery', time: '15 min away', icon: <Pill className="w-5 h-5" />, color: 'text-green-600 bg-green-50' },
  { id: '2', type: 'Consultation', status: 'Scheduled at 4:00 PM', time: 'Dr. Priya Sharma', icon: <Video className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50' },
];

export function PatientHome() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-5 px-4 pt-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search doctors, medicines, lab tests..."
          className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm
                     text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      {/* SOS Banner */}
      <Link to="/app/ambulance" className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl p-4">
        <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-red-700 text-sm">Emergency? Call Ambulance</p>
          <p className="text-xs text-red-500">24/7 emergency service — nearest ambulance dispatched</p>
        </div>
        <ChevronRight className="w-5 h-5 text-red-400" />
      </Link>

      {/* Services grid */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Services</h2>
        <div className="grid grid-cols-4 gap-3">
          {services.map((s) => (
            <Link key={s.label} to={s.to} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}>
                {s.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-600 text-center leading-tight whitespace-pre-line">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Active orders / bookings */}
      {activeOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-base text-gray-900">Active Orders</h2>
            <Link to="/app/appointments" className="text-xs font-medium text-primary-500">View all</Link>
          </div>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <Card key={order.id} padding="sm" className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.color}`}>
                  {order.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{order.type}</p>
                  <p className="text-xs text-gray-500">{order.status}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">{order.time}</p>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quick re-order / recent */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-base text-gray-900">Recent</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {[
            { label: 'Reorder Medicines', desc: 'Last ordered 3 days ago', icon: <Pill className="w-5 h-5" />, bg: 'bg-green-50 text-green-600' },
            { label: 'Book Follow-up', desc: 'Dr. Priya Sharma', icon: <Video className="w-5 h-5" />, bg: 'bg-blue-50 text-blue-600' },
            { label: 'View Lab Report', desc: 'CBC + Thyroid Panel', icon: <FlaskConical className="w-5 h-5" />, bg: 'bg-purple-50 text-purple-600' },
          ].map((item) => (
            <div key={item.label} className="flex-shrink-0 w-44 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.bg}`}>{item.icon}</div>
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Health tips */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Health Tips</h2>
        <div className="bg-primary-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-primary-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Stay Hydrated</p>
            <p className="text-xs text-gray-500 mt-0.5">Drink at least 8 glasses of water daily to keep your body functioning optimally.</p>
          </div>
        </div>
      </div>

      {/* Bottom spacer for safe area */}
      <div className="h-4" />
    </div>
  );
}
