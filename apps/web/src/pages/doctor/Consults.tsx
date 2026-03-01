import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { clsx } from 'clsx';
import {
  Video, Phone, MessageSquare, Home as HomeIcon,
  Clock, Play, RotateCcw, FileText, Calendar,
} from 'lucide-react';

type TabKey = 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

interface Consultation {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  complaint: string;
  type: 'VIDEO' | 'AUDIO' | 'CHAT' | 'HOME_VISIT';
  status: TabKey;
  scheduledTime: string;
  fee: number;
}

const mockConsultations: Consultation[] = [
  { id: '1', patientName: 'Rahul Mehta', age: 28, gender: 'Male', complaint: 'Fever and cold since 3 days, mild headache', type: 'VIDEO', status: 'WAITING', scheduledTime: '10:00 AM', fee: 500 },
  { id: '2', patientName: 'Sneha Gupta', age: 45, gender: 'Female', complaint: 'Follow-up for blood pressure management', type: 'AUDIO', status: 'WAITING', scheduledTime: '10:30 AM', fee: 500 },
  { id: '3', patientName: 'Amit Joshi', age: 32, gender: 'Male', complaint: 'Skin rash on both arms, itching for a week', type: 'CHAT', status: 'IN_PROGRESS', scheduledTime: '9:30 AM', fee: 300 },
  { id: '4', patientName: 'Kavitha Reddy', age: 55, gender: 'Female', complaint: 'Knee pain and difficulty walking', type: 'HOME_VISIT', status: 'IN_PROGRESS', scheduledTime: '9:00 AM', fee: 1200 },
  { id: '5', patientName: 'Sanjay Murthy', age: 38, gender: 'Male', complaint: 'Annual health checkup discussion', type: 'VIDEO', status: 'COMPLETED', scheduledTime: '8:00 AM', fee: 500 },
  { id: '6', patientName: 'Deepa Sharma', age: 29, gender: 'Female', complaint: 'Migraine episodes, frequency increasing', type: 'AUDIO', status: 'COMPLETED', scheduledTime: '8:30 AM', fee: 500 },
  { id: '7', patientName: 'Vikram Singh', age: 42, gender: 'Male', complaint: 'Diabetes medication review', type: 'VIDEO', status: 'COMPLETED', scheduledTime: 'Yesterday', fee: 500 },
  { id: '8', patientName: 'Priya Nair', age: 35, gender: 'Female', complaint: 'Persistent cough for 2 weeks', type: 'CHAT', status: 'CANCELLED', scheduledTime: '11:00 AM', fee: 300 },
];

const tabs: { key: TabKey; label: string }[] = [
  { key: 'WAITING', label: 'Waiting' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'COMPLETED', label: 'Completed' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

const typeConfig: Record<string, { icon: React.ReactNode; label: string; variant: 'primary' | 'success' | 'warning' | 'neutral' }> = {
  VIDEO: { icon: <Video className="w-3 h-3" />, label: 'Video', variant: 'primary' },
  AUDIO: { icon: <Phone className="w-3 h-3" />, label: 'Audio', variant: 'success' },
  CHAT: { icon: <MessageSquare className="w-3 h-3" />, label: 'Chat', variant: 'warning' },
  HOME_VISIT: { icon: <HomeIcon className="w-3 h-3" />, label: 'Home Visit', variant: 'neutral' },
};

export function ConsultsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('WAITING');

  const filtered = mockConsultations.filter((c) => c.status === activeTab);

  return (
    <div className="px-4 pt-4 space-y-4 pb-6">
      {/* Header */}
      <h1 className="font-heading font-bold text-lg text-gray-900">My Consultations</h1>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {tabs.map((tab) => {
          const count = mockConsultations.filter((c) => c.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5',
                activeTab === tab.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300',
              )}
            >
              {tab.label}
              <span className={clsx(
                'text-[10px] px-1.5 py-0.5 rounded-full font-bold',
                activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500',
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Consultations List */}
      <div className="space-y-3">
        {filtered.map((consult) => {
          const typeCfg = typeConfig[consult.type];
          return (
            <Card key={consult.id} padding="sm">
              <div className="flex items-start gap-3">
                <Avatar name={consult.patientName} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900">{consult.patientName}</p>
                    <Badge variant={typeCfg.variant} className="text-[11px] py-0.5 px-2 gap-1">
                      {typeCfg.icon}
                      {typeCfg.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {consult.age} yrs, {consult.gender}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{consult.complaint}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {consult.scheduledTime}
                      </span>
                      <span className="font-semibold text-gray-700">Rs. {consult.fee}</span>
                    </div>

                    <div className="flex gap-2">
                      {consult.status === 'WAITING' && (
                        <Button size="sm" icon={<Play className="w-3.5 h-3.5" />}>
                          Start
                        </Button>
                      )}
                      {consult.status === 'IN_PROGRESS' && (
                        <Button size="sm" variant="secondary" icon={<RotateCcw className="w-3.5 h-3.5" />}>
                          Resume
                        </Button>
                      )}
                      {consult.status === 'COMPLETED' && (
                        <Button size="sm" variant="ghost" icon={<FileText className="w-3.5 h-3.5" />}>
                          View Notes
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
          <p className="text-sm font-medium text-gray-500">No consultations</p>
          <p className="text-xs text-gray-400 mt-1">
            {activeTab === 'WAITING' && 'No patients are currently waiting'}
            {activeTab === 'IN_PROGRESS' && 'No consultations in progress'}
            {activeTab === 'COMPLETED' && 'Completed consultations will appear here'}
            {activeTab === 'CANCELLED' && 'No cancelled consultations'}
          </p>
        </div>
      )}
    </div>
  );
}
