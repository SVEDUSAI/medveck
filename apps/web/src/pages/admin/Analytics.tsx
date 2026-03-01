import { useState } from 'react';
import { TrendingUp, ShoppingBag, Stethoscope, Users, ArrowUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const periods = ['Today', 'This Week', 'This Month', 'All Time'];

export function AdminAnalytics() {
  const [period, setPeriod] = useState('This Week');

  const revenue: Record<string, { amount: string; orders: number; change: string }> = {
    'Today': { amount: '₹45,200', orders: 34, change: '+18%' },
    'This Week': { amount: '₹2,85,000', orders: 198, change: '+12%' },
    'This Month': { amount: '₹12,50,000', orders: 856, change: '+8%' },
    'All Time': { amount: '₹1,25,00,000', orders: 12450, change: '' },
  };

  const current = revenue[period];

  const topDoctors = [
    { name: 'Dr. Priya Sharma', consults: 45, revenue: '₹22,500', specialty: 'General' },
    { name: 'Dr. Rajesh Kumar', consults: 32, revenue: '₹32,000', specialty: 'Cardiology' },
    { name: 'Dr. Anita Desai', consults: 28, revenue: '₹19,600', specialty: 'Dermatology' },
    { name: 'Dr. Sanjay Gupta', consults: 22, revenue: '₹13,200', specialty: 'Dental' },
    { name: 'Dr. Arjun Patel', consults: 18, revenue: '₹7,200', specialty: 'Veterinary' },
  ];

  const topMedicines = [
    { name: 'Dolo 650mg', orders: 234, revenue: '₹7,020' },
    { name: 'Crocin Advance', orders: 189, revenue: '₹4,725' },
    { name: 'Combiflam', orders: 156, revenue: '₹6,552' },
    { name: 'Pan-D', orders: 98, revenue: '₹11,760' },
    { name: 'Becosules', orders: 87, revenue: '₹2,784' },
  ];

  const ordersByStatus = [
    { status: 'Delivered', count: 156, pct: 60, color: 'bg-green-500' },
    { status: 'In Transit', count: 28, pct: 11, color: 'bg-blue-500' },
    { status: 'Preparing', count: 18, pct: 7, color: 'bg-amber-500' },
    { status: 'Pending', count: 34, pct: 13, color: 'bg-orange-500' },
    { status: 'Cancelled', count: 22, pct: 9, color: 'bg-red-500' },
  ];

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900">Analytics</h1>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {periods.map((p) => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap ${period === p ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600">
          <TrendingUp className="w-5 h-5 text-white/70 mb-2" />
          <p className="text-white/70 text-xs">Revenue</p>
          <p className="text-white font-extrabold text-xl font-heading">{current.amount}</p>
          {current.change && <p className="text-green-300 text-xs flex items-center gap-0.5 mt-1"><ArrowUp className="w-3 h-3" />{current.change}</p>}
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
          <ShoppingBag className="w-5 h-5 text-white/70 mb-2" />
          <p className="text-white/70 text-xs">Orders</p>
          <p className="text-white font-extrabold text-xl font-heading">{current.orders}</p>
        </Card>
        <Card>
          <Stethoscope className="w-5 h-5 text-purple-500 mb-2" />
          <p className="text-gray-400 text-xs">Consultations</p>
          <p className="font-extrabold text-xl font-heading">128</p>
          <p className="text-green-600 text-xs">+15% vs last week</p>
        </Card>
        <Card>
          <Users className="w-5 h-5 text-teal-500 mb-2" />
          <p className="text-gray-400 text-xs">New Users</p>
          <p className="font-extrabold text-xl font-heading">89</p>
          <p className="text-green-600 text-xs">+22% growth</p>
        </Card>
      </div>

      {/* Orders by Status */}
      <Card>
        <h2 className="font-heading font-bold text-sm mb-3">Orders by Status</h2>
        <div className="flex h-4 rounded-full overflow-hidden mb-3">
          {ordersByStatus.map((s) => (
            <div key={s.status} className={`${s.color}`} style={{ width: `${s.pct}%` }} title={s.status} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ordersByStatus.map((s) => (
            <div key={s.status} className="flex items-center gap-1.5 text-xs">
              <div className={`w-2 h-2 rounded-full ${s.color}`} />
              <span className="text-gray-500">{s.status}</span>
              <span className="font-medium ml-auto">{s.count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Doctors */}
      <Card>
        <h2 className="font-heading font-bold text-sm mb-3">Top Doctors</h2>
        <div className="space-y-2">
          {topDoctors.map((d, i) => (
            <div key={d.name} className="flex items-center gap-3 py-1.5">
              <span className="w-5 h-5 bg-primary-50 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-500">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.name}</p>
                <p className="text-[10px] text-gray-400">{d.specialty} · {d.consults} consults</p>
              </div>
              <span className="text-sm font-bold text-green-600">{d.revenue}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Medicines */}
      <Card>
        <h2 className="font-heading font-bold text-sm mb-3">Top Medicines</h2>
        <div className="space-y-2">
          {topMedicines.map((m, i) => (
            <div key={m.name} className="flex items-center gap-3 py-1.5">
              <span className="w-5 h-5 bg-amber-50 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-600">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{m.name}</p>
                <p className="text-[10px] text-gray-400">{m.orders} orders</p>
              </div>
              <span className="text-sm font-bold">{m.revenue}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
