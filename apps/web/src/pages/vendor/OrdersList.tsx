import { useState } from 'react';
import { Clock, Check, X as XIcon, Truck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const TABS = ['New', 'Preparing', 'Ready', 'Dispatched', 'Completed'];
const tabToStatus: Record<string, string> = { New: 'PENDING', Preparing: 'PREPARING', Ready: 'ACCEPTED', Dispatched: 'OUT_FOR_DELIVERY', Completed: 'DELIVERED' };

const mockOrders = [
  { id: 'ORD-001', patientName: 'Rahul M.', items: [{ name: 'Dolo 650mg', qty: 2 }, { name: 'Sinarest', qty: 1 }, { name: 'Crocin', qty: 1 }], total: 120, status: 'PENDING', time: '2 min ago', address: 'Banjara Hills' },
  { id: 'ORD-002', patientName: 'Priya K.', items: [{ name: 'Combiflam', qty: 1 }, { name: 'Becosules', qty: 2 }], total: 106, status: 'PENDING', time: '8 min ago', address: 'Jubilee Hills' },
  { id: 'ORD-003', patientName: 'Amit J.', items: [{ name: 'Pan-D', qty: 1 }, { name: 'Gelusil', qty: 1 }], total: 205, status: 'PREPARING', time: '15 min ago', address: 'Lakdi Ka Pool' },
  { id: 'ORD-004', patientName: 'Vikram S.', items: [{ name: 'Atorvastatin', qty: 1 }], total: 65, status: 'ACCEPTED', time: '25 min ago', address: 'Madhapur' },
  { id: 'ORD-005', patientName: 'Sneha G.', items: [{ name: 'Metformin', qty: 3 }, { name: 'Glimepiride', qty: 1 }], total: 220, status: 'OUT_FOR_DELIVERY', time: '40 min ago', address: 'Kukatpally', driverName: 'Ravi Kumar' },
  { id: 'ORD-006', patientName: 'Rahul M.', items: [{ name: 'Shelcal 500', qty: 2 }], total: 230, status: 'DELIVERED', time: '1 hr ago', address: 'Banjara Hills' },
  { id: 'ORD-007', patientName: 'Priya K.', items: [{ name: 'Limcee', qty: 3 }], total: 75, status: 'DELIVERED', time: '2 hrs ago', address: 'Jubilee Hills' },
];

export function VendorOrdersList() {
  const [tab, setTab] = useState('New');

  const filtered = mockOrders.filter((o) => o.status === tabToStatus[tab]);

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900">Orders</h1>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {TABS.map((t) => {
          const count = mockOrders.filter((o) => o.status === tabToStatus[t]).length;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap ${tab === t ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {t} {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-12">No {tab.toLowerCase()} orders</p>
        ) : (
          filtered.map((order) => (
            <Card key={order.id}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-mono text-xs text-gray-500">{order.id}</p>
                  <p className="font-medium text-sm">{order.patientName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">₹{order.total}</p>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 justify-end"><Clock className="w-3 h-3" />{order.time}</p>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-600">
                    <span>{item.name}</span><span>x{item.qty}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mb-3">📍 {order.address}</p>

              {(order as any).driverName && <p className="text-xs text-blue-600 mb-2">🚴 {(order as any).driverName}</p>}

              {tab === 'New' && (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1"><Check className="w-3 h-3 mr-1" /> Accept</Button>
                  <Button size="sm" variant="danger" className="flex-1"><XIcon className="w-3 h-3 mr-1" /> Reject</Button>
                </div>
              )}
              {tab === 'Preparing' && (
                <Button size="sm" className="w-full"><Check className="w-3 h-3 mr-1" /> Mark Ready</Button>
              )}
              {tab === 'Ready' && (
                <Button size="sm" className="w-full"><Truck className="w-3 h-3 mr-1" /> Hand to Driver</Button>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
