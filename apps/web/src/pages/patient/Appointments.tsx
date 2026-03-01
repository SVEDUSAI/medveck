import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { clsx } from 'clsx';
import {
  Video, Phone, MessageSquare, Home as HomeIcon,
  Calendar, Clock, X as XIcon,
} from 'lucide-react';

type TabKey = 'UPCOMING' | 'PAST' | 'CANCELLED';

interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  type: 'VIDEO' | 'AUDIO' | 'CHAT' | 'HOME_VISIT';
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  fee: number;
}

const mockAppointments: Appointment[] = [
  { id: '1', doctorName: 'Dr. Priya Sharma', specialization: 'General Physician', date: '2026-03-05', time: '10:00 AM', type: 'VIDEO', status: 'UPCOMING', fee: 500 },
  { id: '2', doctorName: 'Dr. Rajesh Kumar', specialization: 'Cardiologist', date: '2026-03-08', time: '2:30 PM', type: 'AUDIO', status: 'UPCOMING', fee: 800 },
  { id: '3', doctorName: 'Dr. Meera Iyer', specialization: 'Dermatologist', date: '2026-02-20', time: '11:00 AM', type: 'CHAT', status: 'COMPLETED', fee: 400 },
  { id: '4', doctorName: 'Dr. Vikram Reddy', specialization: 'Orthopedic', date: '2026-02-15', time: '4:00 PM', type: 'HOME_VISIT', status: 'COMPLETED', fee: 1200 },
  { id: '5', doctorName: 'Dr. Anita Desai', specialization: 'ENT Specialist', date: '2026-02-10', time: '9:30 AM', type: 'VIDEO', status: 'CANCELLED', fee: 600 },
];

const tabs: { key: TabKey; label: string }[] = [
  { key: 'UPCOMING', label: 'Upcoming' },
  { key: 'PAST', label: 'Past' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

const typeConfig: Record<string, { icon: React.ReactNode; label: string; variant: 'primary' | 'success' | 'warning' | 'neutral' }> = {
  VIDEO: { icon: <Video className="w-3 h-3" />, label: 'Video', variant: 'primary' },
  AUDIO: { icon: <Phone className="w-3 h-3" />, label: 'Audio', variant: 'success' },
  CHAT: { icon: <MessageSquare className="w-3 h-3" />, label: 'Chat', variant: 'warning' },
  HOME_VISIT: { icon: <HomeIcon className="w-3 h-3" />, label: 'Home Visit', variant: 'neutral' },
};

const statusConfig: Record<string, { label: string; variant: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' }> = {
  UPCOMING: { label: 'Upcoming', variant: 'primary' },
  COMPLETED: { label: 'Completed', variant: 'success' },
  CANCELLED: { label: 'Cancelled', variant: 'danger' },
};

export function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('UPCOMING');

  const filtered = mockAppointments.filter((a) => {
    if (activeTab === 'UPCOMING') return a.status === 'UPCOMING';
    if (activeTab === 'PAST') return a.status === 'COMPLETED';
    return a.status === 'CANCELLED';
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="px-4 pt-4 space-y-4 pb-6">
      {/* Header */}
      <h1 className="font-heading font-bold text-lg text-gray-900">My Appointments</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              'flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors',
              activeTab === tab.key
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filtered.map((apt) => {
          const typeCfg = typeConfig[apt.type];
          const statusCfg = statusConfig[apt.status];
          return (
            <Card key={apt.id} padding="sm">
              <div className="flex items-start gap-3">
                <Avatar name={apt.doctorName} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900">{apt.doctorName}</p>
                    <Badge variant={typeCfg.variant} className="text-[11px] py-0.5 px-2 gap-1">
                      {typeCfg.icon}
                      {typeCfg.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{apt.specialization}</p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {formatDate(apt.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {apt.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={statusCfg.variant} className="text-[11px] py-0.5">
                        {statusCfg.label}
                      </Badge>
                      <span className="text-xs font-semibold text-gray-700">Rs. {apt.fee}</span>
                    </div>

                    <div className="flex gap-2">
                      {apt.status === 'UPCOMING' && (
                        <>
                          <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">
                            Cancel
                          </Button>
                          <Button size="sm" variant="secondary">
                            Reschedule
                          </Button>
                          <Button size="sm">
                            Join
                          </Button>
                        </>
                      )}
                      {apt.status === 'COMPLETED' && (
                        <Button size="sm" variant="secondary">
                          Book Again
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            {activeTab === 'UPCOMING' && 'No upcoming appointments'}
            {activeTab === 'PAST' && 'No past appointments'}
            {activeTab === 'CANCELLED' && 'No cancelled appointments'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {activeTab === 'UPCOMING'
              ? 'Book a consultation to get started'
              : 'Your appointment history will appear here'}
          </p>
        </div>
      )}
    </div>
  );
}
