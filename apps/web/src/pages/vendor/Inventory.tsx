import { useState } from 'react';
import { Search, Plus, AlertTriangle, Package, X, Edit2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const CATEGORIES = ['All', 'Fever & Pain', 'Cold & Cough', 'Stomach', 'Skin Care', 'Diabetes', 'Heart', 'Vitamins'];

const mockInventory = [
  { id: '1', name: 'Dolo 650mg', genericName: 'Paracetamol', stock: 150, price: 30, category: 'Fever & Pain', rxRequired: false },
  { id: '2', name: 'Crocin Advance', genericName: 'Paracetamol 500mg', stock: 85, price: 25, category: 'Fever & Pain', rxRequired: false },
  { id: '3', name: 'Combiflam', genericName: 'Ibuprofen + Paracetamol', stock: 5, price: 42, category: 'Fever & Pain', rxRequired: false },
  { id: '4', name: 'Sinarest New', genericName: 'Paracetamol + CPM', stock: 60, price: 35, category: 'Cold & Cough', rxRequired: false },
  { id: '5', name: 'Pan-D', genericName: 'Pantoprazole + Domperidone', stock: 3, price: 120, category: 'Stomach', rxRequired: true },
  { id: '6', name: 'Gelusil MPS', genericName: 'Magaldrate', stock: 40, price: 85, category: 'Stomach', rxRequired: false },
  { id: '7', name: 'Metformin 500mg', genericName: 'Metformin', stock: 0, price: 45, category: 'Diabetes', rxRequired: true },
  { id: '8', name: 'Atorvastatin 10mg', genericName: 'Atorvastatin', stock: 22, price: 65, category: 'Heart', rxRequired: true },
  { id: '9', name: 'Becosules', genericName: 'B-Complex + Vit C', stock: 200, price: 32, category: 'Vitamins', rxRequired: false },
  { id: '10', name: 'Shelcal 500', genericName: 'Calcium + D3', stock: 8, price: 115, category: 'Vitamins', rxRequired: false },
];

function stockLevel(stock: number): { label: string; color: string } {
  if (stock === 0) return { label: 'Out of Stock', color: 'text-red-600 bg-red-50' };
  if (stock < 10) return { label: 'Low Stock', color: 'text-amber-600 bg-amber-50' };
  return { label: 'In Stock', color: 'text-green-600 bg-green-50' };
}

export function VendorInventory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const lowStockItems = mockInventory.filter((m) => m.stock < 10);

  const filtered = mockInventory.filter((m) => {
    if (category !== 'All' && m.category !== category) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.genericName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg text-gray-900">Inventory</h1>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" /> Add</Button>
      </div>

      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <p className="text-sm font-medium text-amber-800">Low Stock Alert</p>
          </div>
          <p className="text-xs text-amber-600">{lowStockItems.map((m) => `${m.name} (${m.stock})`).join(', ')}</p>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search medicines..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${category === c ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((med) => {
          const sl = stockLevel(med.stock);
          return (
            <Card key={med.id} hover onClick={() => setEditItem(med)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cream-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{med.name}</p>
                    {med.rxRequired && <Badge variant="warning">Rx</Badge>}
                  </div>
                  <p className="text-xs text-gray-400">{med.genericName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">₹{med.price}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${sl.color}`}>{med.stock} qty</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {(showAdd || editItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between">
              <h2 className="font-heading font-bold text-lg">{editItem ? 'Edit Medicine' : 'Add Medicine'}</h2>
              <button onClick={() => { setShowAdd(false); setEditItem(null); }}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <input placeholder="Medicine Name" defaultValue={editItem?.name} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm" />
            <input placeholder="Generic Name" defaultValue={editItem?.genericName} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Price (₹)" type="number" defaultValue={editItem?.price} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm" />
              <input placeholder="Stock Qty" type="number" defaultValue={editItem?.stock} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm" />
            </div>
            <select defaultValue={editItem?.category || ''} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm">
              <option value="">Select Category</option>
              {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <Button className="w-full" onClick={() => { setShowAdd(false); setEditItem(null); }}>
              {editItem ? 'Update' : 'Add'} Medicine
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
