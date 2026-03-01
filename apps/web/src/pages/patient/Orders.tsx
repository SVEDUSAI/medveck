import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';
import {
  Package, ChevronDown, ChevronUp, MapPin, Clock, ShoppingBag,
} from 'lucide-react';

type TabKey = 'ACTIVE' | 'DELIVERED' | 'CANCELLED';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  orderId: string;
  items: OrderItem[];
  total: number;
  orderedDate: string;
  status: 'PLACED' | 'ACCEPTED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  vendorName: string;
  deliveryAddress: string;
  estimatedDelivery: string;
}

const mockOrders: Order[] = [
  {
    id: '1', orderId: 'MV-20260228-001',
    items: [
      { name: 'Dolo 650mg', qty: 2, price: 30 },
      { name: 'Crocin Advance', qty: 1, price: 25 },
      { name: 'ORS Sachets', qty: 5, price: 50 },
    ],
    total: 135, orderedDate: '2026-02-28', status: 'OUT_FOR_DELIVERY',
    vendorName: 'MedPlus Pharmacy', deliveryAddress: '12-1-45, Banjara Hills, Hyderabad', estimatedDelivery: '15 min away',
  },
  {
    id: '2', orderId: 'MV-20260227-045',
    items: [
      { name: 'Metformin 500mg', qty: 1, price: 85 },
      { name: 'Atorvastatin 10mg', qty: 1, price: 120 },
    ],
    total: 235, orderedDate: '2026-02-27', status: 'PREPARING',
    vendorName: 'Apollo Pharmacy', deliveryAddress: '8-3-12, Jubilee Hills, Hyderabad', estimatedDelivery: '45 min',
  },
  {
    id: '3', orderId: 'MV-20260225-012',
    items: [
      { name: 'Pantoprazole 40mg', qty: 1, price: 65 },
    ],
    total: 95, orderedDate: '2026-02-25', status: 'PLACED',
    vendorName: 'Netmeds Store', deliveryAddress: '3-5-78, Madhapur, Hyderabad', estimatedDelivery: '1 hour',
  },
  {
    id: '4', orderId: 'MV-20260220-088',
    items: [
      { name: 'Vitamin D3 Supplements', qty: 1, price: 350 },
      { name: 'Calcium Tablets', qty: 1, price: 180 },
      { name: 'Omega-3 Fish Oil', qty: 1, price: 420 },
      { name: 'Multivitamin Tablets', qty: 1, price: 250 },
    ],
    total: 1250, orderedDate: '2026-02-20', status: 'DELIVERED',
    vendorName: 'HealthKart Pharmacy', deliveryAddress: '12-1-45, Banjara Hills, Hyderabad', estimatedDelivery: 'Delivered',
  },
  {
    id: '5', orderId: 'MV-20260215-033',
    items: [
      { name: 'Azithromycin 500mg', qty: 1, price: 110 },
      { name: 'Cetirizine 10mg', qty: 1, price: 22 },
    ],
    total: 162, orderedDate: '2026-02-15', status: 'DELIVERED',
    vendorName: 'MedPlus Pharmacy', deliveryAddress: '8-3-12, Jubilee Hills, Hyderabad', estimatedDelivery: 'Delivered',
  },
  {
    id: '6', orderId: 'MV-20260210-077',
    items: [
      { name: 'Amoxicillin 500mg', qty: 1, price: 95 },
    ],
    total: 125, orderedDate: '2026-02-10', status: 'CANCELLED',
    vendorName: 'Apollo Pharmacy', deliveryAddress: '3-5-78, Madhapur, Hyderabad', estimatedDelivery: 'Cancelled',
  },
];

const tabs: { key: TabKey; label: string }[] = [
  { key: 'ACTIVE', label: 'Active' },
  { key: 'DELIVERED', label: 'Delivered' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

const progressSteps = ['Placed', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered'];

const statusToStep: Record<string, number> = {
  PLACED: 0,
  ACCEPTED: 1,
  PREPARING: 2,
  OUT_FOR_DELIVERY: 3,
  DELIVERED: 4,
};

function getStatusColor(step: number, currentStep: number) {
  if (step <= currentStep) return 'bg-green-500';
  return 'bg-gray-200';
}

function getItemsSummary(items: OrderItem[]) {
  if (items.length === 1) return items[0].name;
  return `${items[0].name} + ${items.length - 1} more`;
}

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('ACTIVE');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockOrders.filter((o) => {
    if (activeTab === 'ACTIVE') return !['DELIVERED', 'CANCELLED'].includes(o.status);
    if (activeTab === 'DELIVERED') return o.status === 'DELIVERED';
    return o.status === 'CANCELLED';
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="px-4 pt-4 space-y-4 pb-6">
      {/* Header */}
      <h1 className="font-heading font-bold text-lg text-gray-900">My Orders</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setExpandedId(null); }}
            className={clsx(
              'flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors',
              activeTab === tab.key
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const isExpanded = expandedId === order.id;
          const currentStep = statusToStep[order.status] ?? 0;
          return (
            <Card key={order.id} padding="sm">
              {/* Summary */}
              <button
                className="w-full text-left"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-gray-400">{order.orderId}</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{getItemsSummary(order.items)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-gray-800">Rs. {order.total}</span>
                        <span className="text-[11px] text-gray-400">{formatDate(order.orderedDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 text-gray-400" />
                      : <ChevronDown className="w-4 h-4 text-gray-400" />
                    }
                  </div>
                </div>

                {/* Progress dots - compact view */}
                {order.status !== 'CANCELLED' && (
                  <div className="flex items-center gap-1 mt-3 px-1">
                    {progressSteps.map((step, i) => (
                      <div key={step} className="flex items-center flex-1 last:flex-initial">
                        <div className={clsx('w-2.5 h-2.5 rounded-full flex-shrink-0', getStatusColor(i, currentStep))} />
                        {i < progressSteps.length - 1 && (
                          <div className={clsx('h-0.5 flex-1 mx-0.5', i < currentStep ? 'bg-green-500' : 'bg-gray-200')} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {order.status !== 'CANCELLED' && (
                  <div className="flex justify-between mt-1 px-0.5">
                    {progressSteps.map((step, i) => (
                      <span key={step} className={clsx('text-[8px]', i <= currentStep ? 'text-green-600 font-medium' : 'text-gray-300')}>
                        {i === 0 || i === progressSteps.length - 1 || i === currentStep ? step : ''}
                      </span>
                    ))}
                  </div>
                )}

                {order.status === 'CANCELLED' && (
                  <Badge variant="danger" className="mt-2">Cancelled</Badge>
                )}

                <p className="text-[11px] text-gray-400 mt-2">{order.vendorName}</p>
              </button>

              {/* Expanded View */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                  {/* All Items */}
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Order Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{item.name} x{item.qty}</span>
                          <span className="font-medium text-gray-900">Rs. {item.price * item.qty}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-gray-900">Rs. {order.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Delivery Address</p>
                      <p className="text-xs text-gray-500 mt-0.5">{order.deliveryAddress}</p>
                    </div>
                  </div>

                  {/* Tracking Info */}
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Estimated Delivery</p>
                      <p className="text-xs text-gray-500 mt-0.5">{order.estimatedDelivery}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">
                        Cancel Order
                      </Button>
                      <Button size="sm" variant="secondary">
                        Track Order
                      </Button>
                    </div>
                  )}

                  {order.status === 'DELIVERED' && (
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="secondary">
                        Reorder
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            {activeTab === 'ACTIVE' && 'No active orders'}
            {activeTab === 'DELIVERED' && 'No delivered orders yet'}
            {activeTab === 'CANCELLED' && 'No cancelled orders'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Your orders will appear here</p>
        </div>
      )}
    </div>
  );
}
