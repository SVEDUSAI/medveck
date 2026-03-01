import { useState } from 'react';
import { Bell, Package, Stethoscope, FlaskConical, Ambulance, Settings, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const typeIcons: Record<string, React.ReactNode> = {
  ORDER: <Package className="w-4 h-4 text-blue-500" />,
  CONSULTATION: <Stethoscope className="w-4 h-4 text-green-500" />,
  LAB: <FlaskConical className="w-4 h-4 text-teal-500" />,
  AMBULANCE: <Ambulance className="w-4 h-4 text-red-500" />,
  SYSTEM: <Settings className="w-4 h-4 text-gray-500" />,
};

const mockNotifications = [
  { id: '1', type: 'ORDER', title: 'Order Delivered', body: 'Your medicine order ORD-001 has been delivered successfully.', time: '2 min ago', read: false },
  { id: '2', type: 'CONSULTATION', title: 'Consultation Reminder', body: 'Your video consultation with Dr. Priya Sharma starts in 30 minutes.', time: '28 min ago', read: false },
  { id: '3', type: 'LAB', title: 'Report Ready', body: 'Your CBC and Thyroid Profile reports are now available.', time: '1 hr ago', read: false },
  { id: '4', type: 'ORDER', title: 'Order Accepted', body: 'MedPlus Pharmacy has accepted your order ORD-002.', time: '2 hrs ago', read: true },
  { id: '5', type: 'SYSTEM', title: 'Welcome to MedVek!', body: 'Thank you for joining MedVek. Explore our healthcare services.', time: '1 day ago', read: true },
  { id: '6', type: 'CONSULTATION', title: 'Prescription Added', body: 'Dr. Rajesh Kumar has added a prescription for your consultation.', time: '1 day ago', read: true },
  { id: '7', type: 'LAB', title: 'Booking Confirmed', body: 'Your lab test booking for tomorrow has been confirmed.', time: '2 days ago', read: true },
  { id: '8', type: 'ORDER', title: 'Order Out for Delivery', body: 'Your order ORD-005 is on its way. Driver: Ravi Kumar.', time: '2 days ago', read: true },
  { id: '9', type: 'AMBULANCE', title: 'Ambulance Dispatched', body: 'An ambulance has been dispatched to your location. ETA: 8 min.', time: '3 days ago', read: true },
  { id: '10', type: 'SYSTEM', title: 'Profile Updated', body: 'Your profile information has been updated successfully.', time: '1 week ago', read: true },
];

export function NotificationsPage() {
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filtered = tab === 'unread' ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg text-gray-900 flex items-center gap-2">
          <Bell className="w-5 h-5" /> Notifications
        </h1>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-primary-500 font-medium flex items-center gap-1">
            <Check className="w-3 h-3" /> Mark all read
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('all')}
          className={`flex-1 py-2 rounded-xl text-xs font-medium ${tab === 'all' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
          All ({notifications.length})
        </button>
        <button onClick={() => setTab('unread')}
          className={`flex-1 py-2 rounded-xl text-xs font-medium ${tab === 'unread' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
          Unread ({unreadCount})
        </button>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No notifications</p>
          </div>
        ) : filtered.map((n) => (
          <Card key={n.id} className={!n.read ? 'border-l-4 border-l-primary-400 bg-primary-50/30' : ''}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                {typeIcons[n.type] || <Bell className="w-4 h-4 text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 bg-primary-500 rounded-full" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
