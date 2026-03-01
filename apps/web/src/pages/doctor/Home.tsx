import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import {
  Video, Calendar, Users, CheckCircle, Clock, Phone,
  Bell, ChevronRight,
} from 'lucide-react';

const mockConsults = [
  { id: '1', patientName: 'Rahul Mehta', type: 'VIDEO', status: 'WAITING', time: 'Now', issue: 'Fever & cold since 3 days', age: 28 },
  { id: '2', patientName: 'Sneha Gupta', type: 'AUDIO', status: 'WAITING', time: '10:30 AM', issue: 'Follow-up for BP', age: 45 },
  { id: '3', patientName: 'Amit Joshi', type: 'CHAT', status: 'WAITING', time: '11:00 AM', issue: 'Skin rash on arms', age: 32 },
];

export function DoctorHome() {
  const { user } = useAuthStore();
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* Availability toggle */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div>
          <p className="text-sm font-medium text-gray-900">Availability</p>
          <p className="text-xs text-gray-400">{isAvailable ? 'Accepting new patients' : 'Not accepting patients'}</p>
        </div>
        <button onClick={() => setIsAvailable(!isAvailable)}
          className={`w-14 h-8 rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isAvailable ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Waiting', value: '3', icon: <Clock className="w-4 h-4" />, color: 'text-amber-600 bg-amber-50' },
          { label: 'Today', value: '8', icon: <Calendar className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50' },
          { label: 'Completed', value: '5', icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-600 bg-green-50' },
        ].map((s) => (
          <Card key={s.label} padding="sm" className="text-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1 ${s.color}`}>{s.icon}</div>
            <p className="font-heading font-extrabold text-xl text-gray-900">{s.value}</p>
            <p className="text-[11px] text-gray-400">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Waiting patients */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Waiting Room</h2>
        <div className="space-y-3">
          {mockConsults.map((c) => (
            <Card key={c.id} padding="sm" className="flex items-center gap-3">
              <Avatar name={c.patientName} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.patientName}</p>
                  <Badge variant={c.type === 'VIDEO' ? 'primary' : c.type === 'AUDIO' ? 'success' : 'neutral'}>
                    {c.type === 'VIDEO' ? <Video className="w-3 h-3 mr-1" /> : c.type === 'AUDIO' ? <Phone className="w-3 h-3 mr-1" /> : null}
                    {c.type}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{c.issue}</p>
                <p className="text-[11px] text-gray-400">Age: {c.age} · {c.time}</p>
              </div>
              <Button size="sm">Start</Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Today's schedule */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-base text-gray-900">Today's Schedule</h2>
          <button className="text-xs font-medium text-primary-500">View all</button>
        </div>
        <div className="space-y-2">
          {['2:00 PM - Kavitha R. (Follow-up)', '3:30 PM - Sanjay M. (New)', '5:00 PM - Deepa S. (Follow-up)'].map((slot) => (
            <div key={slot} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{slot}</span>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
