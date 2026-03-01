import { useState } from 'react';
import { Ambulance, MapPin, Phone, Navigation, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const TABS = ['Available', 'Active', 'Completed'];

const mockJobs = [
  { id: 'AMB002', patientName: 'Sneha Gupta', phone: '9500000002', emergencyType: 'NON_CRITICAL', pickupAddress: '12, Jubilee Hills', distance: '4.2 km', status: 'available', time: '2 min ago' },
  { id: 'AMB004', patientName: 'Priya Krishnan', phone: '9500000004', emergencyType: 'CRITICAL', pickupAddress: '22 C, Gachibowli', distance: '6.8 km', status: 'available', time: '1 min ago' },
  { id: 'AMB001', patientName: 'Rahul Mehta', phone: '9500000001', emergencyType: 'CRITICAL', pickupAddress: '402, Green Park, Banjara Hills', distance: '3.5 km', status: 'active', time: '5 min ago', hospital: 'Apollo Hospital' },
  { id: 'AMB003', patientName: 'Vikram Singh', phone: '9500000005', emergencyType: 'CRITICAL', pickupAddress: '78, Madhapur', distance: '8.0 km', status: 'completed', time: '1 hr ago', hospital: 'KIMS Hospital' },
];

export function DriverAmbulanceJobs() {
  const [tab, setTab] = useState('Available');
  const filtered = mockJobs.filter((j) => j.status === tab.toLowerCase());

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900 flex items-center gap-2">
        <Ambulance className="w-5 h-5 text-red-500" /> Ambulance Jobs
      </h1>

      <div className="flex gap-2">
        {TABS.map((t) => {
          const count = mockJobs.filter((j) => j.status === t.toLowerCase()).length;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium ${tab === t ? 'bg-red-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {t} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-12">No {tab.toLowerCase()} jobs</p>
        ) : filtered.map((job) => (
          <Card key={job.id} className={job.emergencyType === 'CRITICAL' && job.status === 'available' ? 'border-red-300 bg-red-50/50 animate-pulse' : ''}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{job.patientName}</p>
                  <Badge variant={job.emergencyType === 'CRITICAL' ? 'danger' : 'warning'}>{job.emergencyType}</Badge>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Phone className="w-3 h-3" /> {job.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-600">{job.distance}</p>
                <p className="text-[10px] text-gray-400">{job.time}</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 flex items-center gap-1 mb-3"><MapPin className="w-3 h-3 text-red-400" /> {job.pickupAddress}</p>

            {(job as any).hospital && <p className="text-xs text-blue-600 mb-3">🏥 {(job as any).hospital}</p>}

            {tab === 'Available' && (
              <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">Accept Emergency</Button>
            )}
            {tab === 'Active' && (
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="flex-1"><Phone className="w-3 h-3 mr-1" /> Call</Button>
                <Button size="sm" className="flex-1"><Navigation className="w-3 h-3 mr-1" /> Navigate</Button>
                <Button size="sm" variant="primary" className="flex-1"><Check className="w-3 h-3 mr-1" /> Complete</Button>
              </div>
            )}
            {tab === 'Completed' && (
              <div className="bg-green-50 rounded-lg p-2 text-center text-xs text-green-700">✅ Patient delivered to hospital</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
