import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';
import {
  MapPin, Home, Briefcase, Tag, Edit2, Trash2, Plus, X,
  Navigation, ChevronDown, ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Address {
  id: string;
  label: 'HOME' | 'WORK' | 'OTHER';
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1', label: 'HOME',
    street: '12-1-45, Road No. 3, Banjara Hills',
    city: 'Hyderabad', state: 'Telangana', pincode: '500034',
    landmark: 'Near City Center Mall',
    isDefault: true,
  },
  {
    id: '2', label: 'WORK',
    street: '8-3-12, Cyber Towers, HITEC City',
    city: 'Hyderabad', state: 'Telangana', pincode: '500081',
    landmark: 'Opposite Shilparamam',
    isDefault: false,
  },
];

const labelConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  HOME: { icon: <Home className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50' },
  WORK: { icon: <Briefcase className="w-4 h-4" />, color: 'text-amber-600 bg-amber-50' },
  OTHER: { icon: <Tag className="w-4 h-4" />, color: 'text-purple-600 bg-purple-50' },
};

const emptyForm = {
  label: 'HOME' as 'HOME' | 'WORK' | 'OTHER',
  street: '',
  city: '',
  state: '',
  pincode: '',
  landmark: '',
};

export function AddressesPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const handleEdit = (addr: Address) => {
    setEditingId(addr.id);
    setForm({
      label: addr.label,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      landmark: addr.landmark,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSave = () => {
    if (editingId) {
      setAddresses(addresses.map((a) =>
        a.id === editingId ? { ...a, ...form } : a,
      ));
    } else {
      const newAddr: Address = {
        id: String(Date.now()),
        ...form,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddr]);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="px-4 pt-4 space-y-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-bold text-lg text-gray-900">Saved Addresses</h1>
      </div>

      {!showForm ? (
        <>
          {/* Address List */}
          <div className="space-y-3">
            {addresses.map((addr) => {
              const cfg = labelConfig[addr.label];
              return (
                <Card key={addr.id} padding="sm">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{addr.label}</p>
                        {addr.isDefault && (
                          <Badge variant="success" className="text-[10px] py-0 px-2">Default</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{addr.street}</p>
                      <p className="text-xs text-gray-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                      {addr.landmark && (
                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {addr.landmark}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(addr)}
                        className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(addr.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {addresses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">No saved addresses</p>
              <p className="text-xs text-gray-400 mt-1">Add an address for faster checkout</p>
            </div>
          )}

          {/* Add New Address Button */}
          <Button
            className="w-full"
            variant="secondary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowForm(true)}
          >
            Add New Address
          </Button>
        </>
      ) : (
        /* Address Form */
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-base text-gray-900">
              {editingId ? 'Edit Address' : 'New Address'}
            </h2>
            <button onClick={handleCancel} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
            <div className="flex gap-2">
              {(['HOME', 'WORK', 'OTHER'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setForm({ ...form, label: l })}
                  className={clsx(
                    'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border flex items-center justify-center gap-1.5',
                    form.label === l
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300',
                  )}
                >
                  {l === 'HOME' && <Home className="w-3.5 h-3.5" />}
                  {l === 'WORK' && <Briefcase className="w-3.5 h-3.5" />}
                  {l === 'OTHER' && <Tag className="w-3.5 h-3.5" />}
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Street */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
            <textarea
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              placeholder="Enter full street address"
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 resize-none"
            />
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="City"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="State"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
              />
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Pincode</label>
            <input
              type="text"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              placeholder="Enter pincode"
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
            />
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Landmark</label>
            <input
              type="text"
              value={form.landmark}
              onChange={(e) => setForm({ ...form, landmark: e.target.value })}
              placeholder="Nearby landmark (optional)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
            />
          </div>

          {/* Use Current Location */}
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-primary-300 text-primary-500 text-sm font-medium hover:bg-primary-50 transition-colors">
            <Navigation className="w-4 h-4" />
            Use Current Location
          </button>

          {/* Save */}
          <Button className="w-full" size="lg" onClick={handleSave}>
            {editingId ? 'Update Address' : 'Save Address'}
          </Button>
        </Card>
      )}
    </div>
  );
}
