import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Truck, MapPin, Clock, CheckCircle, Navigation, Package, Phone } from 'lucide-react';

const mockDeliveries = [
  { id: '1', type: 'Medicine', from: 'MedPlus, Banjara Hills', to: 'Rahul M., Jubilee Hills', distance: '3.2 km', earning: 45, status: 'PICKUP' },
  { id: '2', type: 'Medicine', from: 'Apollo Pharmacy, Madhapur', to: 'Priya K., Gachibowli', distance: '5.1 km', earning: 60, status: 'AVAILABLE' },
  { id: '3', type: 'Lab Sample', from: 'Sneha G., Kukatpally', to: 'Thyrocare Lab, HITEC City', distance: '4.7 km', earning: 55, status: 'AVAILABLE' },
];

export function DriverHome() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* Online toggle */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div>
          <p className="text-sm font-medium text-gray-900">{isOnline ? 'You are Online' : 'You are Offline'}</p>
          <p className="text-xs text-gray-400">{isOnline ? 'Receiving delivery requests' : 'Go online to start earning'}</p>
        </div>
        <button onClick={() => setIsOnline(!isOnline)}
          className={`w-14 h-8 rounded-full transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isOnline ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>

      {/* Today earnings */}
      <Card className="bg-primary-500 text-white border-0">
        <p className="text-sm text-primary-200">Today's Earnings</p>
        <p className="font-heading font-extrabold text-3xl mt-1">₹540</p>
        <div className="flex gap-4 mt-3 text-sm text-primary-200">
          <span>6 deliveries</span>
          <span>32.4 km</span>
          <span>4.2 hrs</span>
        </div>
      </Card>

      {/* Active + available deliveries */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Deliveries</h2>
        <div className="space-y-3">
          {mockDeliveries.map((d) => (
            <Card key={d.id} padding="sm">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={d.status === 'PICKUP' ? 'primary' : 'neutral'}>
                  {d.status === 'PICKUP' ? 'Active - Pickup' : 'Available'}
                </Badge>
                <span className="text-xs text-gray-400">{d.distance}</span>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600">{d.from}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600">{d.to}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-sm text-gray-900">₹{d.earning}</span>
                {d.status === 'PICKUP' ? (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" icon={<Phone className="w-3.5 h-3.5" />}>Call</Button>
                    <Button size="sm" icon={<Navigation className="w-3.5 h-3.5" />}>Navigate</Button>
                  </div>
                ) : (
                  <Button size="sm">Accept</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
