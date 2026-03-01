import { useState } from 'react';
import { Search, ChevronDown, Package, MapPin, Clock, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const STATUSES = ['ALL', 'PENDING', 'ACCEPTED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
const statusColor: Record<string, 'warning' | 'primary' | 'success' | 'danger' | 'neutral'> = {
  PENDING: 'warning', ACCEPTED: 'primary', PREPARING: 'primary', OUT_FOR_DELIVERY: 'warning', DELIVERED: 'success', CANCELLED: 'danger',
};

const mockOrders = [
  { id: 'ORD-001', patientName: 'Rahul Mehta', vendorName: 'MedPlus Pharmacy', driverName: 'Ravi Kumar', items: [{ name: 'Dolo 650mg', qty: 2 }, { name: 'Sinarest', qty: 1 }], total: 120, status: 'OUT_FOR_DELIVERY', address: 'Flat 402, Green Park, Banjara Hills', createdAt: '10 min ago' },
  { id: 'ORD-002', patientName: 'Sneha Gupta', vendorName: 'Apollo Pharmacy', driverName: null, items: [{ name: 'Combiflam', qty: 1 }, { name: 'Becosules', qty: 2 }], total: 106, status: 'PENDING', address: 'House 12, Jubilee Hills', createdAt: '25 min ago' },
  { id: 'ORD-003', patientName: 'Amit Joshi', vendorName: 'MedPlus Pharmacy', driverName: 'Suresh Reddy', items: [{ name: 'Pan-D', qty: 1 }, { name: 'Gelusil', qty: 1 }], total: 205, status: 'DELIVERED', address: '201 A, Lakdi Ka Pool', createdAt: '2 hrs ago' },
  { id: 'ORD-004', patientName: 'Priya Krishnan', vendorName: 'MedPlus Pharmacy', driverName: null, items: [{ name: 'Metformin 500mg', qty: 3 }], total: 135, status: 'ACCEPTED', address: '55B, Gachibowli', createdAt: '45 min ago' },
  { id: 'ORD-005', patientName: 'Vikram Singh', vendorName: 'Apollo Pharmacy', driverName: null, items: [{ name: 'Atorvastatin', qty: 1 }, { name: 'Amlodipine', qty: 1 }], total: 103, status: 'PREPARING', address: '78, Madhapur', createdAt: '1 hr ago' },
  { id: 'ORD-006', patientName: 'Rahul Mehta', vendorName: 'Apollo Pharmacy', driverName: null, items: [{ name: 'Shelcal 500', qty: 2 }], total: 230, status: 'CANCELLED', address: 'Flat 402, Green Park, Banjara Hills', createdAt: '3 hrs ago' },
];

export function AdminOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filtered = mockOrders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (search && !o.patientName.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900">Order Management</h1>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search orders..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-3 pr-8 py-2.5 text-sm focus:outline-none focus:border-primary-400">
            {STATUSES.map((s) => <option key={s} value={s}>{s === 'ALL' ? 'All Status' : s.replace(/_/g, ' ')}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              statusFilter === s ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}>
            {s === 'ALL' ? 'All' : s.replace(/_/g, ' ')}
            <span className="ml-1 opacity-70">({s === 'ALL' ? mockOrders.length : mockOrders.filter((o) => o.status === s).length})</span>
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <Card key={order.id} hover onClick={() => setSelectedOrder(order)}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary-500" />
                  <span className="font-mono text-xs font-medium text-gray-600">{order.id}</span>
                </div>
                <p className="font-medium text-sm text-gray-900 mt-1">{order.patientName}</p>
              </div>
              <div className="text-right">
                <Badge variant={statusColor[order.status] || 'neutral'}>{order.status.replace(/_/g, ' ')}</Badge>
                <p className="font-bold text-sm text-gray-900 mt-1">₹{order.total}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>🏪 {order.vendorName}</span>
              <span>{order.items.length} items</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {order.createdAt}</span>
            </div>
            {order.driverName && <p className="text-xs text-gray-500 mt-1">🚴 {order.driverName}</p>}
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-center text-sm text-gray-400 py-8">No orders found</p>}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-lg">Order {selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <Badge variant={statusColor[selectedOrder.status]}>{selectedOrder.status.replace(/_/g, ' ')}</Badge>

            <div className="space-y-3">
              <div className="bg-cream-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Patient</p>
                <p className="font-medium text-sm">{selectedOrder.patientName}</p>
              </div>
              <div className="bg-cream-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Vendor</p>
                <p className="font-medium text-sm">{selectedOrder.vendorName}</p>
              </div>
              {selectedOrder.driverName && (
                <div className="bg-cream-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Driver</p>
                  <p className="font-medium text-sm">{selectedOrder.driverName}</p>
                </div>
              )}
              <div className="bg-cream-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Delivery Address</p>
                <p className="font-medium text-sm flex items-center gap-1"><MapPin className="w-3 h-3" /> {selectedOrder.address}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2">Items</p>
                <div className="space-y-1">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                      <span>{item.name}</span><span className="text-gray-500">x{item.qty}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold pt-2">
                    <span>Total</span><span>₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedOrder.status !== 'DELIVERED' && selectedOrder.status !== 'CANCELLED' && (
              <div className="flex gap-2">
                <select className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm">
                  <option>Update Status</option>
                  {STATUSES.filter((s) => s !== 'ALL').map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                </select>
                <button className="px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium">Update</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
