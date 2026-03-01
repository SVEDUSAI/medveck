import { useState } from 'react';
import { Ambulance, MapPin, Phone, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const STATUSES = ['ALL', 'PENDING', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'COMPLETED'];
const statusColor: Record<string, 'warning' | 'primary' | 'success' | 'danger'> = {
  PENDING: 'warning', ACCEPTED: 'primary', OUT_FOR_DELIVERY: 'primary', COMPLETED: 'success', CANCELLED: 'danger',
};

const mockRequests = [
  { id: 'AMB001', patientName: 'Rahul Mehta', phone: '9500000001', emergencyType: 'CRITICAL', pickupAddress: '402, Green Park, Banjara Hills', driverName: 'Mahesh (Ambulance)', status: 'OUT_FOR_DELIVERY', createdAt: '5 min ago' },
  { id: 'AMB002', patientName: 'Sneha Gupta', phone: '9500000002', emergencyType: 'NON_CRITICAL', pickupAddress: '12, Jubilee Hills', driverName: null, status: 'PENDING', createdAt: '2 min ago' },
  { id: 'AMB003', patientName: 'Vikram Singh', phone: '9500000005', emergencyType: 'CRITICAL', pickupAddress: '78, Madhapur', driverName: 'Mahesh (Ambulance)', status: 'COMPLETED', createdAt: '1 hr ago' },
  { id: 'AMB004', patientName: 'Priya Krishnan', phone: '9500000004', emergencyType: 'NON_CRITICAL', pickupAddress: '22 C, Gachibowli', driverName: null, status: 'PENDING', createdAt: '1 min ago' },
];

export function AdminAmbulanceRequests() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selected, setSelected] = useState<any>(null);

  const filtered = mockRequests.filter((r) => statusFilter === 'ALL' || r.status === statusFilter);

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900 flex items-center gap-2"><Ambulance className="w-5 h-5 text-red-500" /> Ambulance Requests</h1>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${statusFilter === s ? 'bg-red-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
            {s === 'ALL' ? 'All' : s === 'OUT_FOR_DELIVERY' ? 'Dispatched' : s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <Card key={r.id} hover onClick={() => setSelected(r)} className={r.emergencyType === 'CRITICAL' && r.status === 'PENDING' ? 'border-red-300 bg-red-50/50' : ''}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{r.patientName}</p>
                  <Badge variant={r.emergencyType === 'CRITICAL' ? 'danger' : 'warning'}>{r.emergencyType}</Badge>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Phone className="w-3 h-3" /> {r.phone}</p>
              </div>
              <div className="text-right">
                <Badge variant={statusColor[r.status] || 'neutral'}>{r.status === 'OUT_FOR_DELIVERY' ? 'DISPATCHED' : r.status}</Badge>
                <p className="text-[10px] text-gray-400 mt-1">{r.createdAt}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3 text-red-400" /> {r.pickupAddress}</p>
            {r.driverName ? <p className="text-xs text-green-600 mt-1">🚑 {r.driverName}</p> : <p className="text-xs text-amber-600 mt-1">⚠️ No driver assigned</p>}
          </Card>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-3">
            <div className="flex justify-between"><h2 className="font-heading font-bold text-lg">Request {selected.id}</h2><button onClick={() => setSelected(null)}><X className="w-5 h-5 text-gray-400" /></button></div>
            <div className="flex gap-2"><Badge variant={statusColor[selected.status]}>{selected.status}</Badge><Badge variant={selected.emergencyType === 'CRITICAL' ? 'danger' : 'warning'}>{selected.emergencyType}</Badge></div>
            <div className="text-sm space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Patient</span><span className="font-medium">{selected.patientName}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Phone</span><span>{selected.phone}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Address</span><span>{selected.pickupAddress}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Driver</span><span>{selected.driverName || 'Not assigned'}</span></div>
            </div>
            {!selected.driverName && (
              <button className="w-full py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium" onClick={() => { alert('Assigning nearest driver...'); setSelected(null); }}>
                Assign Nearest Driver
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
