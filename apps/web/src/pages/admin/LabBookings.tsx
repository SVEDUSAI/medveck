import { useState } from 'react';
import { Search, FlaskConical, Home, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED'];
const statusColor: Record<string, 'warning' | 'primary' | 'success' | 'neutral'> = {
  PENDING: 'warning', CONFIRMED: 'primary', IN_PROGRESS: 'primary', COMPLETED: 'success',
};

const mockBookings = [
  { id: 'LB001', patientName: 'Sneha Gupta', labName: 'Thyrocare Diagnostics', tests: ['CBC', 'Thyroid Profile'], homeCollection: true, scheduledAt: 'Today, 10:00 AM', total: 950, status: 'PENDING', address: '15 B, Kukatpally' },
  { id: 'LB002', patientName: 'Amit Joshi', labName: 'SRL Diagnostics', tests: ['Lipid Profile', 'HbA1c'], homeCollection: false, scheduledAt: 'Today, 11:30 AM', total: 850, status: 'IN_PROGRESS' },
  { id: 'LB003', patientName: 'Rahul Mehta', labName: 'Thyrocare Diagnostics', tests: ['Full Body Checkup'], homeCollection: true, scheduledAt: 'Yesterday', total: 1999, status: 'COMPLETED', reportUrl: 'report.pdf', address: 'Banjara Hills' },
  { id: 'LB004', patientName: 'Priya Krishnan', labName: 'SRL Diagnostics', tests: ['Vitamin D', 'Vitamin B12', 'Iron Studies'], homeCollection: true, scheduledAt: 'Tomorrow, 9:00 AM', total: 2150, status: 'CONFIRMED', address: 'Gachibowli' },
  { id: 'LB005', patientName: 'Vikram Singh', labName: 'Thyrocare Diagnostics', tests: ['Fasting Blood Sugar', 'HbA1c'], homeCollection: false, scheduledAt: 'Today, 2:00 PM', total: 550, status: 'PENDING' },
];

export function AdminLabBookings() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);

  const filtered = mockBookings.filter((b) => {
    if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
    if (search && !b.patientName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900">Lab Bookings</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by patient..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${statusFilter === s ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
            {s === 'ALL' ? 'All' : s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((b) => (
          <Card key={b.id} hover onClick={() => setSelected(b)}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-sm">{b.patientName}</p>
                <p className="text-xs text-gray-400">{b.labName}</p>
              </div>
              <div className="text-right">
                <Badge variant={statusColor[b.status] || 'neutral'}>{b.status.replace('_', ' ')}</Badge>
                <p className="text-sm font-bold mt-1">₹{b.total}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {b.tests.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-[10px] font-medium">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              {b.homeCollection && <span className="flex items-center gap-1 text-green-600"><Home className="w-3 h-3" /> Home Collection</span>}
              <span>{b.scheduledAt}</span>
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-3">
            <div className="flex justify-between"><h2 className="font-heading font-bold text-lg">Booking {selected.id}</h2><button onClick={() => setSelected(null)}><X className="w-5 h-5 text-gray-400" /></button></div>
            <Badge variant={statusColor[selected.status]}>{selected.status.replace('_', ' ')}</Badge>
            <div className="text-sm space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Patient</span><span className="font-medium">{selected.patientName}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Lab</span><span className="font-medium">{selected.labName}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Scheduled</span><span>{selected.scheduledAt}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Total</span><span className="font-bold">₹{selected.total}</span></div>
              <div><span className="text-gray-400 text-xs">Tests:</span><div className="flex flex-wrap gap-1 mt-1">{selected.tests.map((t: string) => <span key={t} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs">{t}</span>)}</div></div>
              {selected.address && <div className="flex justify-between py-2"><span className="text-gray-400">Address</span><span>{selected.address}</span></div>}
              {selected.reportUrl && <div className="bg-green-50 rounded-xl p-3 text-green-700 text-sm">📄 Report uploaded</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
