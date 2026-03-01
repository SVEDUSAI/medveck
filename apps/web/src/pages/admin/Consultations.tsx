import { useState } from 'react';
import { Search, Video, Phone, MessageSquare, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

const STATUSES = ['ALL', 'WAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
const statusColor: Record<string, 'warning' | 'primary' | 'success' | 'danger'> = {
  WAITING: 'warning', IN_PROGRESS: 'primary', COMPLETED: 'success', CANCELLED: 'danger',
};
const typeIcon: Record<string, React.ReactNode> = {
  VIDEO: <Video className="w-3 h-3" />, AUDIO: <Phone className="w-3 h-3" />, CHAT: <MessageSquare className="w-3 h-3" />,
};

const mockConsultations = [
  { id: 'C001', patientName: 'Rahul Mehta', doctorName: 'Dr. Priya Sharma', type: 'VIDEO', status: 'WAITING', scheduledAt: 'Today, 2:30 PM', fee: 500, notes: 'Fever & cold since 3 days' },
  { id: 'C002', patientName: 'Sneha Gupta', doctorName: 'Dr. Priya Sharma', type: 'AUDIO', status: 'WAITING', scheduledAt: 'Today, 3:00 PM', fee: 500, notes: 'Headache and dizziness' },
  { id: 'C003', patientName: 'Amit Joshi', doctorName: 'Dr. Rajesh Kumar', type: 'VIDEO', status: 'COMPLETED', scheduledAt: 'Today, 11:00 AM', fee: 1000, notes: 'Chest pain evaluation', prescription: 'Pan-D, Gelusil' },
  { id: 'C004', patientName: 'Priya Krishnan', doctorName: 'Dr. Anita Desai', type: 'CHAT', status: 'IN_PROGRESS', scheduledAt: 'Today, 1:45 PM', fee: 700, notes: 'Skin rash consultation' },
  { id: 'C005', patientName: 'Vikram Singh', doctorName: 'Dr. Rajesh Kumar', type: 'VIDEO', status: 'CANCELLED', scheduledAt: 'Yesterday, 4:00 PM', fee: 1000, notes: 'Follow-up cancelled by patient' },
  { id: 'C006', patientName: 'Rahul Mehta', doctorName: 'Dr. Sanjay Gupta', type: 'VIDEO', status: 'COMPLETED', scheduledAt: 'Yesterday, 10:00 AM', fee: 600, notes: 'Dental checkup', prescription: 'Clove oil, Sensodyne' },
];

export function AdminConsultations() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);

  const filtered = mockConsultations.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (search && !c.patientName.toLowerCase().includes(search.toLowerCase()) && !c.doctorName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900">Consultations</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by patient or doctor..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${statusFilter === s ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
            {s === 'ALL' ? 'All' : s.replace('_', ' ')} ({s === 'ALL' ? mockConsultations.length : mockConsultations.filter((c) => c.status === s).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <Card key={c.id} hover onClick={() => setSelected(c)}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar name={c.patientName} size="sm" />
                <div>
                  <p className="font-medium text-sm">{c.patientName}</p>
                  <p className="text-xs text-gray-400">{c.doctorName}</p>
                </div>
              </div>
              <Badge variant={statusColor[c.status]}>{c.status.replace('_', ' ')}</Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">{typeIcon[c.type]} {c.type}</span>
              <span>{c.scheduledAt}</span>
              <span className="font-medium text-gray-700">₹{c.fee}</span>
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between"><h2 className="font-heading font-bold text-lg">Consultation Details</h2><button onClick={() => setSelected(null)}><X className="w-5 h-5 text-gray-400" /></button></div>
            <Badge variant={statusColor[selected.status]}>{selected.status.replace('_', ' ')}</Badge>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Patient</span><span className="font-medium">{selected.patientName}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Doctor</span><span className="font-medium">{selected.doctorName}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Type</span><span className="flex items-center gap-1">{typeIcon[selected.type]} {selected.type}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Scheduled</span><span>{selected.scheduledAt}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Fee</span><span className="font-bold">₹{selected.fee}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Notes</span><span>{selected.notes}</span></div>
              {selected.prescription && <div className="flex justify-between py-2"><span className="text-gray-400">Prescription</span><span className="text-green-600">{selected.prescription}</span></div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
