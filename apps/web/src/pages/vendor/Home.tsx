import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Package, Clock, CheckCircle, Truck, Bell, ChevronRight, MapPin } from 'lucide-react';

const mockOrders = [
  { id: '1', patient: 'Rahul M.', items: 3, total: 450, time: '2 min ago', address: 'Banjara Hills, Hyd', status: 'NEW' },
  { id: '2', patient: 'Priya K.', items: 1, total: 120, time: '5 min ago', address: 'Jubilee Hills, Hyd', status: 'NEW' },
  { id: '3', patient: 'Amit J.', items: 5, total: 890, time: '15 min ago', address: 'Madhapur, Hyd', status: 'PREPARING' },
];

export function VendorHome() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* Shop toggle */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div>
          <p className="text-sm font-medium text-gray-900">Shop Status</p>
          <p className="text-xs text-gray-400">{isOpen ? 'Accepting orders' : 'Shop closed'}</p>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-8 rounded-full transition-colors ${isOpen ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isOpen ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'New', value: '2', color: 'text-red-600 bg-red-50', icon: <Bell className="w-4 h-4" /> },
          { label: 'Preparing', value: '1', color: 'text-amber-600 bg-amber-50', icon: <Clock className="w-4 h-4" /> },
          { label: 'Dispatched', value: '3', color: 'text-blue-600 bg-blue-50', icon: <Truck className="w-4 h-4" /> },
          { label: 'Done', value: '12', color: 'text-green-600 bg-green-50', icon: <CheckCircle className="w-4 h-4" /> },
        ].map((s) => (
          <Card key={s.label} padding="sm" className="text-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1 ${s.color}`}>{s.icon}</div>
            <p className="font-heading font-bold text-lg text-gray-900">{s.value}</p>
            <p className="text-[10px] text-gray-400">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Orders */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Incoming Orders</h2>
        <div className="space-y-3">
          {mockOrders.map((o) => (
            <Card key={o.id} padding="sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{o.patient}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{o.address}</p>
                </div>
                <Badge variant={o.status === 'NEW' ? 'danger' : 'warning'}>{o.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">{o.items} items · <span className="font-semibold text-gray-900">₹{o.total}</span> · {o.time}</div>
                <div className="flex gap-2">
                  {o.status === 'NEW' && (
                    <>
                      <Button size="sm" variant="ghost">Reject</Button>
                      <Button size="sm">Accept</Button>
                    </>
                  )}
                  {o.status === 'PREPARING' && <Button size="sm">Ready</Button>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
