import { useState } from 'react';
import { Search, ShoppingCart, Plus, Minus, X, ChevronRight, Upload } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const categories = [
  { label: 'All', emoji: '💊' },
  { label: 'Fever & Pain', emoji: '🤒' },
  { label: 'Cold & Cough', emoji: '🤧' },
  { label: 'Stomach', emoji: '🫄' },
  { label: 'Skin Care', emoji: '🧴' },
  { label: 'Diabetes', emoji: '💉' },
  { label: 'Heart', emoji: '❤️' },
  { label: 'Vitamins', emoji: '💪' },
];

const medicines = [
  { id: '1', name: 'Dolo 650mg', generic: 'Paracetamol', manufacturer: 'Micro Labs', price: 30, mrp: 35, category: 'Fever & Pain', rx: false, img: '' },
  { id: '2', name: 'Crocin Advance', generic: 'Paracetamol 500mg', manufacturer: 'GSK', price: 25, mrp: 30, category: 'Fever & Pain', rx: false, img: '' },
  { id: '3', name: 'Azithral 500', generic: 'Azithromycin', manufacturer: 'Alembic', price: 95, mrp: 115, category: 'Cold & Cough', rx: true, img: '' },
  { id: '4', name: 'Pan D', generic: 'Pantoprazole + Domperidone', manufacturer: 'Alkem', price: 120, mrp: 145, category: 'Stomach', rx: true, img: '' },
  { id: '5', name: 'Shelcal 500', generic: 'Calcium + Vitamin D3', manufacturer: 'Torrent', price: 140, mrp: 165, category: 'Vitamins', rx: false, img: '' },
  { id: '6', name: 'Metformin 500mg', generic: 'Metformin', manufacturer: 'USV', price: 35, mrp: 42, category: 'Diabetes', rx: true, img: '' },
  { id: '7', name: 'Cetirizine 10mg', generic: 'Cetirizine', manufacturer: 'Cipla', price: 18, mrp: 25, category: 'Cold & Cough', rx: false, img: '' },
  { id: '8', name: 'Betadine Ointment', generic: 'Povidone Iodine', manufacturer: 'Win Medicare', price: 65, mrp: 75, category: 'Skin Care', rx: false, img: '' },
];

export function MedicinesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = medicines.filter((m) => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.generic.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || m.category === activeCategory;
    return matchSearch && matchCat;
  });

  const addToCart = (med: typeof medicines[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === med.id);
      if (existing) return prev.map((i) => i.id === med.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: med.id, name: med.name, price: med.price, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter((i) => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const getCartQty = (id: string) => cart.find((i) => i.id === id)?.quantity || 0;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 space-y-4 flex-1 overflow-y-auto pb-24">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text" placeholder="Search medicines..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        {/* Upload prescription */}
        <button className="w-full flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-2xl p-4">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-primary-700">Upload Prescription</p>
            <p className="text-xs text-primary-500">Get exact medicines delivered</p>
          </div>
          <ChevronRight className="w-5 h-5 text-primary-400" />
        </button>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => setActiveCategory(c.label)}
              className={`flex-shrink-0 px-4 py-2 rounded-pill text-sm font-medium transition-all ${
                activeCategory === c.label
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-100'
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Medicines grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((med) => {
            const qty = getCartQty(med.id);
            const discount = Math.round(((med.mrp - med.price) / med.mrp) * 100);
            return (
              <div key={med.id} className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
                {/* Placeholder image */}
                <div className="w-full h-24 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-3xl">💊</span>
                </div>
                {med.rx && <Badge variant="warning" className="text-[10px] mb-1">Rx Required</Badge>}
                <p className="text-sm font-semibold text-gray-900 truncate">{med.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{med.generic}</p>
                <p className="text-[10px] text-gray-400">{med.manufacturer}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-heading font-bold text-base text-gray-900">₹{med.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{med.mrp}</span>
                  {discount > 0 && <span className="text-[10px] text-green-600 font-medium">{discount}% off</span>}
                </div>
                <div className="mt-2">
                  {qty > 0 ? (
                    <div className="flex items-center justify-between bg-primary-50 rounded-xl px-2 py-1">
                      <button onClick={() => updateQty(med.id, -1)} className="w-8 h-8 flex items-center justify-center text-primary-600">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-primary-600">{qty}</span>
                      <button onClick={() => updateQty(med.id, 1)} className="w-8 h-8 flex items-center justify-center text-primary-600">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(med)}
                      className="w-full py-2 text-sm font-medium text-primary-500 border border-primary-200 rounded-xl hover:bg-primary-50 transition-colors">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart bar (fixed) */}
      {cartCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 px-4 pb-2 z-20">
          <button
            onClick={() => setShowCart(!showCart)}
            className="w-full bg-primary-500 text-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-primary-500 rounded-full text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="font-medium text-sm">{cartCount} item{cartCount > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg">₹{cartTotal}</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}

      {/* Cart drawer */}
      {showCart && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowCart(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[70vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-heading font-bold text-lg">Your Cart</h3>
              <button onClick={() => setShowCart(false)} className="p-1"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-primary-50 rounded-lg px-2 py-1">
                      <button onClick={() => updateQty(item.id, -1)}><Minus className="w-3.5 h-3.5 text-primary-600" /></button>
                      <span className="text-sm font-bold text-primary-600 w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)}><Plus className="w-3.5 h-3.5 text-primary-600" /></button>
                    </div>
                    <span className="text-sm font-semibold w-14 text-right">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="font-heading font-bold text-lg">₹{cartTotal}</span>
              </div>
              <Button className="w-full" size="lg">Proceed to Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
