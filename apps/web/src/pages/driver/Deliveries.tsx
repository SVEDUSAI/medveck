import { useState } from 'react';
import { MapPin, Phone, Navigation, Check, Clock, Package } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const TABS = ['Active', 'Available', 'Completed'];
const tabStatus: Record<string, string[]> = { Active: ['ACCEPTED', 'OUT_FOR_DELIVERY'], Available: ['PENDING'], Completed: ['DELIVERED'] };

const mockDeliveries = [
  { id: 'ORD-001', pickup: 'MedPlus, Banjara Hills', dropoff: 'Flat 402, Green Park', patientName: 'Rahul M.', patientPhone: '9500000001', distance: '3.2 km', eta: '15 min', earnings: 45, status: 'OUT_FOR_DELIVERY' },
  { id: 'ORD-004', pickup: 'MedPlus, Banjara Hills', dropoff: '55B, Gachibowli', patientName: 'Priya K.', patientPhone: '9500000004', distance: '8.5 km', eta: '30 min', earnings: 85, status: 'ACCEPTED' },
  { id: 'ORD-010', pickup: 'Apollo Pharmacy, Jubilee Hills', dropoff: '12, Madhapur', patientName: 'Amit J.', patientPhone: '9500000003', distance: '5.1 km', eta: '20 min', earnings: 55, status: 'PENDING' },
  { id: 'ORD-011', pickup: 'MedPlus, Banjara Hills', dropoff: '78, HITEC City', patientName: 'Vikram S.', patientPhone: '9500000005', distance: '10.2 km', eta: '35 min', earnings: 95, status: 'PENDING' },
  { id: 'ORD-003', pickup: 'MedPlus, Banjara Hills', dropoff: '201A, Lakdi Ka Pool', patientName: 'Amit J.', patientPhone: '9500000003', distance: '4.0 km', eta: '-', earnings: 50, status: 'DELIVERED' },
  { id: 'ORD-008', pickup: 'Apollo Pharmacy, Jubilee Hills', dropoff: 'Kukatpally', patientName: 'Sneha G.', patientPhone: '9500000002', distance: '12 km', eta: '-', earnings: 110, status: 'DELIVERED' },
];

export function DriverDeliveries() {
  const [tab, setTab] = useState('Active');
  const filtered = mockDeliveries.filter((d) => tabStatus[tab].includes(d.status));

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900">Deliveries</h1>

      <div className="flex gap-2">
        {TABS.map((t) => {
          const count = mockDeliveries.filter((d) => tabStatus[t].includes(d.status)).length;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium ${tab === t ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {t} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-12">No {tab.toLowerCase()} deliveries</p>
        ) : filtered.map((d) => (
          <Card key={d.id}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-primary-500" />
                <span className="font-mono text-xs text-gray-500">{d.id}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{d.distance}</p>
                <p className="font-bold text-sm text-green-600">₹{d.earnings}</p>
              </div>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-600">{d.pickup}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-gray-600">{d.dropoff}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-3">{d.patientName} · {d.patientPhone}</p>

            {tab === 'Active' && (
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="flex-1"><Phone className="w-3 h-3 mr-1" /> Call</Button>
                <Button size="sm" className="flex-1"><Navigation className="w-3 h-3 mr-1" /> Navigate</Button>
                {d.status === 'OUT_FOR_DELIVERY' && <Button size="sm" variant="primary" className="flex-1"><Check className="w-3 h-3 mr-1" /> Delivered</Button>}
              </div>
            )}
            {tab === 'Available' && (
              <Button size="sm" className="w-full">Accept Delivery</Button>
            )}
            {tab === 'Completed' && (
              <div className="bg-green-50 rounded-lg p-2 text-center text-xs text-green-700">✅ Delivered successfully</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
