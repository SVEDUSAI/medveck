import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FlaskConical, Clock, CheckCircle, Upload, MapPin, Home as HomeIcon } from 'lucide-react';

const mockBookings = [
  { id: '1', patient: 'Sneha Gupta', tests: ['CBC', 'Thyroid Profile'], homeCollection: true, scheduledAt: '10:00 AM', status: 'PENDING', address: 'Banjara Hills' },
  { id: '2', patient: 'Amit Joshi', tests: ['Lipid Profile', 'HbA1c'], homeCollection: false, scheduledAt: '11:30 AM', status: 'IN_PROGRESS', address: 'Walk-in' },
  { id: '3', patient: 'Kavitha R.', tests: ['Full Body Checkup'], homeCollection: true, scheduledAt: '2:00 PM', status: 'PENDING', address: 'Jubilee Hills' },
];

export function LabHome() {
  return (
    <div className="px-4 pt-4 space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Pending', value: '5', color: 'text-amber-600 bg-amber-50', icon: <Clock className="w-4 h-4" /> },
          { label: 'Processing', value: '3', color: 'text-blue-600 bg-blue-50', icon: <FlaskConical className="w-4 h-4" /> },
          { label: 'Reports Ready', value: '8', color: 'text-green-600 bg-green-50', icon: <CheckCircle className="w-4 h-4" /> },
        ].map((s) => (
          <Card key={s.label} padding="sm" className="text-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1 ${s.color}`}>{s.icon}</div>
            <p className="font-heading font-bold text-xl text-gray-900">{s.value}</p>
            <p className="text-[11px] text-gray-400">{s.label}</p>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Today's Bookings</h2>
        <div className="space-y-3">
          {mockBookings.map((b) => (
            <Card key={b.id} padding="sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{b.patient}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    {b.homeCollection ? <HomeIcon className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                    {b.address} · {b.scheduledAt}
                  </p>
                </div>
                <Badge variant={b.status === 'PENDING' ? 'warning' : 'primary'}>{b.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {b.tests.map((t) => <Badge key={t} variant="neutral">{t}</Badge>)}
              </div>
              <div className="flex gap-2 justify-end">
                {b.status === 'PENDING' && <Button size="sm">Accept</Button>}
                {b.status === 'IN_PROGRESS' && <Button size="sm" icon={<Upload className="w-3.5 h-3.5" />}>Upload Report</Button>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
