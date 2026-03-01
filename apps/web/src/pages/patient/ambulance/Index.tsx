import { useState } from 'react';
import { Ambulance, Phone, MapPin, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function AmbulancePage() {
  const [requested, setRequested] = useState(false);

  if (requested) {
    return (
      <div className="px-4 pt-6 space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ambulance className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-heading font-bold text-xl text-gray-900">Ambulance Dispatched</h2>
          <p className="text-sm text-gray-500 mt-2">Nearest ambulance is on the way</p>
        </div>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-sm font-medium text-green-600">En route to you</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">ETA</span>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1"><Clock className="w-4 h-4" /> 8 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Driver</span>
              <span className="text-sm font-medium text-gray-900">Ramesh K.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Vehicle</span>
              <span className="text-sm text-gray-900">KA-01-AB-1234</span>
            </div>
          </div>
        </Card>

        {/* Map placeholder */}
        <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Live tracking map</p>
          </div>
        </div>

        <Button variant="danger" className="w-full" size="lg" onClick={() => setRequested(false)}>
          Cancel Request
        </Button>

        <a href="tel:108" className="flex items-center justify-center gap-2 text-red-500 font-medium text-sm">
          <Phone className="w-4 h-4" /> Call Emergency: 108
        </a>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ambulance className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="font-heading font-bold text-xl text-gray-900">Emergency Ambulance</h2>
        <p className="text-sm text-gray-500 mt-2">24/7 emergency ambulance service — nearest unit dispatched</p>
      </div>

      {/* Emergency type */}
      <div>
        <h3 className="font-heading font-bold text-sm text-gray-900 mb-3">Emergency Type</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card padding="sm" className="text-center border-2 border-red-200 bg-red-50">
            <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-red-700">Critical</p>
            <p className="text-[11px] text-red-500">Immediate life threat</p>
          </Card>
          <Card padding="sm" className="text-center">
            <Ambulance className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">Non-Critical</p>
            <p className="text-[11px] text-gray-500">Hospital transfer</p>
          </Card>
        </div>
      </div>

      {/* Location */}
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Current Location</p>
            <p className="text-xs text-gray-400">Using your GPS location</p>
          </div>
          <button className="text-xs font-medium text-primary-500">Change</button>
        </div>
      </Card>

      <Button variant="danger" className="w-full" size="lg" onClick={() => setRequested(true)}>
        <Ambulance className="w-5 h-5 mr-2" /> Request Ambulance Now
      </Button>

      <a href="tel:108" className="flex items-center justify-center gap-2 text-red-500 font-medium text-sm py-2">
        <Phone className="w-4 h-4" /> Or call 108 directly
      </a>
    </div>
  );
}
