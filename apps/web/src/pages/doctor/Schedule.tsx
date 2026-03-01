import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { clsx } from 'clsx';
import {
  ChevronLeft, ChevronRight, Video, Phone, MessageSquare,
  Lock, Unlock, Calendar, Clock, Users,
} from 'lucide-react';

interface TimeSlot {
  time: string;
  status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED';
  patientName?: string;
  type?: 'VIDEO' | 'AUDIO' | 'CHAT';
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 9; h <= 20; h++) {
    slots.push(`${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`);
    slots.push(`${h > 12 ? h - 12 : h}:30 ${h >= 12 ? 'PM' : 'AM'}`);
  }
  return slots;
}

const allTimeLabels = generateTimeSlots();

function generateMockSchedule(): DaySchedule[] {
  const today = new Date();
  const days: DaySchedule[] = [];

  const mockBookings: Record<number, { time: string; patient: string; type: 'VIDEO' | 'AUDIO' | 'CHAT' }[]> = {
    0: [
      { time: '10:00 AM', patient: 'Rahul Mehta', type: 'VIDEO' },
      { time: '10:30 AM', patient: 'Sneha Gupta', type: 'AUDIO' },
      { time: '2:00 PM', patient: 'Kavitha R.', type: 'VIDEO' },
      { time: '3:30 PM', patient: 'Sanjay M.', type: 'CHAT' },
      { time: '5:00 PM', patient: 'Deepa S.', type: 'VIDEO' },
    ],
    1: [
      { time: '9:00 AM', patient: 'Amit Joshi', type: 'VIDEO' },
      { time: '11:00 AM', patient: 'Priya Nair', type: 'AUDIO' },
      { time: '4:00 PM', patient: 'Vikram S.', type: 'VIDEO' },
    ],
    2: [
      { time: '10:00 AM', patient: 'Meera Iyer', type: 'CHAT' },
      { time: '2:30 PM', patient: 'Suresh N.', type: 'VIDEO' },
    ],
    3: [
      { time: '9:30 AM', patient: 'Lakshmi D.', type: 'VIDEO' },
      { time: '11:30 AM', patient: 'Ravi Kumar', type: 'AUDIO' },
      { time: '3:00 PM', patient: 'Anita M.', type: 'VIDEO' },
      { time: '5:30 PM', patient: 'Kiran R.', type: 'CHAT' },
    ],
  };

  const blockedSlots: Record<number, string[]> = {
    0: ['1:00 PM', '1:30 PM'],
    1: ['1:00 PM', '1:30 PM', '2:00 PM'],
    3: ['1:00 PM', '1:30 PM'],
  };

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayBookings = mockBookings[i] || [];
    const dayBlocked = blockedSlots[i] || [];

    const slots: TimeSlot[] = allTimeLabels.map((time) => {
      const booking = dayBookings.find((b) => b.time === time);
      if (booking) {
        return { time, status: 'BOOKED' as const, patientName: booking.patient, type: booking.type };
      }
      if (dayBlocked.includes(time)) {
        return { time, status: 'BLOCKED' as const };
      }
      return { time, status: 'AVAILABLE' as const };
    });

    days.push({ date, slots });
  }

  return days;
}

const typeIcon: Record<string, React.ReactNode> = {
  VIDEO: <Video className="w-3 h-3" />,
  AUDIO: <Phone className="w-3 h-3" />,
  CHAT: <MessageSquare className="w-3 h-3" />,
};

export function SchedulePage() {
  const schedule = useMemo(() => generateMockSchedule(), []);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const selectedDay = schedule[selectedDayIdx];

  const formatDayLabel = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-IN', { weekday: 'short' });
  };

  const formatDateNum = (date: Date) => {
    return date.getDate();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-IN', { month: 'short' });
  };

  const bookedSlots = selectedDay.slots.filter((s) => s.status === 'BOOKED');
  const videoCount = bookedSlots.filter((s) => s.type === 'VIDEO').length;
  const audioCount = bookedSlots.filter((s) => s.type === 'AUDIO').length;
  const chatCount = bookedSlots.filter((s) => s.type === 'CHAT').length;

  const toggleSlot = (time: string) => {
    // In a real app this would update state. For the demo we just show the UI.
  };

  return (
    <div className="px-4 pt-4 space-y-4 pb-6">
      {/* Header */}
      <h1 className="font-heading font-bold text-lg text-gray-900">My Schedule</h1>

      {/* Week Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {schedule.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDayIdx(idx)}
            className={clsx(
              'flex flex-col items-center min-w-[56px] py-2.5 px-3 rounded-2xl transition-all',
              selectedDayIdx === idx
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-100 hover:border-primary-200',
            )}
          >
            <span className={clsx('text-[10px] font-medium', selectedDayIdx === idx ? 'text-primary-200' : 'text-gray-400')}>
              {formatDayLabel(day.date)}
            </span>
            <span className="text-lg font-bold mt-0.5">{formatDateNum(day.date)}</span>
            <span className={clsx('text-[10px]', selectedDayIdx === idx ? 'text-primary-200' : 'text-gray-400')}>
              {formatMonth(day.date)}
            </span>
          </button>
        ))}
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-4 gap-2">
        <Card padding="sm" className="text-center">
          <p className="font-heading font-bold text-lg text-gray-900">{bookedSlots.length}</p>
          <p className="text-[10px] text-gray-400">Total</p>
        </Card>
        <Card padding="sm" className="text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Video className="w-3 h-3 text-blue-500" />
          </div>
          <p className="font-heading font-bold text-lg text-blue-600">{videoCount}</p>
          <p className="text-[10px] text-gray-400">Video</p>
        </Card>
        <Card padding="sm" className="text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Phone className="w-3 h-3 text-green-500" />
          </div>
          <p className="font-heading font-bold text-lg text-green-600">{audioCount}</p>
          <p className="text-[10px] text-gray-400">Audio</p>
        </Card>
        <Card padding="sm" className="text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <MessageSquare className="w-3 h-3 text-amber-500" />
          </div>
          <p className="font-heading font-bold text-lg text-amber-600">{chatCount}</p>
          <p className="text-[10px] text-gray-400">Chat</p>
        </Card>
      </div>

      {/* Time Slots */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Time Slots</h2>
        <div className="space-y-2">
          {selectedDay.slots.map((slot) => (
            <div
              key={slot.time}
              className={clsx(
                'flex items-center gap-3 rounded-xl p-3 border transition-colors',
                slot.status === 'BOOKED' && 'bg-blue-50 border-blue-100',
                slot.status === 'BLOCKED' && 'bg-gray-50 border-gray-200',
                slot.status === 'AVAILABLE' && 'bg-white border-gray-100 hover:border-primary-200',
              )}
            >
              {/* Time */}
              <span className="text-xs font-medium text-gray-500 w-16 flex-shrink-0">{slot.time}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {slot.status === 'BOOKED' && (
                  <div className="flex items-center gap-2">
                    <Avatar name={slot.patientName!} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{slot.patientName}</p>
                    </div>
                    {slot.type && (
                      <Badge
                        variant={slot.type === 'VIDEO' ? 'primary' : slot.type === 'AUDIO' ? 'success' : 'warning'}
                        className="text-[10px] py-0 px-2 gap-0.5 ml-auto flex-shrink-0"
                      >
                        {typeIcon[slot.type]}
                        {slot.type}
                      </Badge>
                    )}
                  </div>
                )}
                {slot.status === 'BLOCKED' && (
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">Blocked</span>
                  </div>
                )}
                {slot.status === 'AVAILABLE' && (
                  <span className="text-xs text-green-600 font-medium">Available</span>
                )}
              </div>

              {/* Toggle Block */}
              {slot.status !== 'BOOKED' && (
                <button
                  onClick={() => toggleSlot(slot.time)}
                  className={clsx(
                    'p-1.5 rounded-lg transition-colors',
                    slot.status === 'BLOCKED'
                      ? 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                      : 'text-gray-300 hover:text-red-500 hover:bg-red-50',
                  )}
                >
                  {slot.status === 'BLOCKED'
                    ? <Unlock className="w-4 h-4" />
                    : <Lock className="w-4 h-4" />
                  }
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
