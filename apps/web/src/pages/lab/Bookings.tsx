import { useState } from 'react';
import { Home, Check, Upload, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const TABS = ['Pending', 'Sample Collected', 'Processing', 'Report Ready'];
const tabStatus: Record<string, string> = { 'Pending': 'PENDING', 'Sample Collected': 'CONFIRMED', 'Processing': 'IN_PROGRESS', 'Report Ready': 'COMPLETED' };

const mockBookings = [
  { id: 'LB001', patientName: 'Sneha Gupta', tests: ['CBC', 'Thyroid Profile'], homeCollection: true, scheduledAt: '10:00 AM', total: 950, status: 'PENDING', address: 'Kukatpally' },
  { id: 'LB002', patientName: 'Vikram Singh', tests: ['Fasting Blood Sugar', 'HbA1c'], homeCollection: false, scheduledAt: '11:00 AM', total: 550, status: 'PENDING' },
  { id: 'LB003', patientName: 'Amit Joshi', tests: ['Lipid Profile', 'HbA1c'], homeCollection: false, scheduledAt: '9:30 AM', total: 850, status: 'CONFIRMED' },
  { id: 'LB004', patientName: 'Rahul Mehta', tests: ['Full Body Checkup'], homeCollection: true, scheduledAt: 'Yesterday', total: 1999, status: 'IN_PROGRESS', address: 'Banjara Hills' },
  { id: 'LB005', patientName: 'Priya Krishnan', tests: ['Vitamin D', 'B12', 'Iron Studies'], homeCollection: true, scheduledAt: '2 days ago', total: 2150, status: 'COMPLETED', address: 'Gachibowli' },
  { id: 'LB006', patientName: 'Sneha Gupta', tests: ['TSH'], homeCollection: false, scheduledAt: '3 days ago', total: 250, status: 'COMPLETED' },
];

export function LabBookings() {
  const [tab, setTab] = useState('Pending');
  const filtered = mockBookings.filter((b) => b.status === tabStatus[tab]);

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900">Bookings</h1>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {TABS.map((t) => {
          const count = mockBookings.filter((b) => b.status === tabStatus[t]).length;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${tab === t ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {t} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-12">No bookings</p>
        ) : filtered.map((booking) => (
          <Card key={booking.id}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-sm">{booking.patientName}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {booking.scheduledAt}</p>
              </div>
              <p className="font-bold text-sm">₹{booking.total}</p>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {booking.tests.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-[10px] font-medium">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              {booking.homeCollection && <span className="text-xs text-green-600 flex items-center gap-1"><Home className="w-3 h-3" /> Home: {booking.address}</span>}
              {!booking.homeCollection && <span className="text-xs text-gray-400">Walk-in</span>}
            </div>
            {tab === 'Pending' && (
              <div className="flex gap-2">
                <Button size="sm" className="flex-1"><Check className="w-3 h-3 mr-1" /> Accept</Button>
                <Button size="sm" variant="secondary" className="flex-1">Mark Collected</Button>
              </div>
            )}
            {tab === 'Sample Collected' && (
              <Button size="sm" className="w-full">Start Processing</Button>
            )}
            {tab === 'Processing' && (
              <Button size="sm" className="w-full"><Upload className="w-3 h-3 mr-1" /> Upload Report</Button>
            )}
            {tab === 'Report Ready' && (
              <div className="bg-green-50 rounded-lg p-2 text-center text-xs text-green-700 font-medium">📄 Report uploaded & sent to patient</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
