import { useState } from 'react';
import { Search, Home as HomeIcon, ChevronRight, Clock, CheckCircle, FlaskConical } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const testCategories = ['Popular', 'Full Body', 'Diabetes', 'Thyroid', 'Heart', 'Women', 'Vitamins'];

const tests = [
  { id: '1', name: 'Complete Blood Count (CBC)', price: 350, category: 'Popular', prep: 'No fasting required', turnaround: '6 hours' },
  { id: '2', name: 'Thyroid Profile (T3, T4, TSH)', price: 500, category: 'Thyroid', prep: 'No fasting required', turnaround: '12 hours' },
  { id: '3', name: 'Lipid Profile', price: 450, category: 'Heart', prep: '12 hrs fasting', turnaround: '8 hours' },
  { id: '4', name: 'HbA1c (Glycated Hemoglobin)', price: 400, category: 'Diabetes', prep: 'No fasting required', turnaround: '6 hours' },
  { id: '5', name: 'Full Body Checkup', price: 1500, category: 'Full Body', prep: '12 hrs fasting', turnaround: '24 hours' },
  { id: '6', name: 'Vitamin D + B12', price: 700, category: 'Vitamins', prep: 'No fasting', turnaround: '12 hours' },
  { id: '7', name: 'Liver Function Test', price: 500, category: 'Popular', prep: '10 hrs fasting', turnaround: '8 hours' },
  { id: '8', name: 'Iron & TIBC', price: 400, category: 'Women', prep: 'No fasting', turnaround: '10 hours' },
];

export function LabsPage() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('Popular');
  const [selected, setSelected] = useState<string[]>([]);
  const [homeCollection, setHomeCollection] = useState(true);

  const filtered = tests.filter((t) => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !search && activeCat ? t.category === activeCat : true;
    return matchSearch && matchCat;
  });

  const selectedTests = tests.filter((t) => selected.includes(t.id));
  const total = selectedTests.reduce((s, t) => s + t.price, 0);

  const toggleTest = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 space-y-4 flex-1 overflow-y-auto pb-24">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Search lab tests..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200" />
        </div>

        {/* Home collection toggle */}
        <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-4">
          <HomeIcon className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">Home Sample Collection</p>
            <p className="text-xs text-green-600">Phlebotomist visits your home</p>
          </div>
          <button onClick={() => setHomeCollection(!homeCollection)}
            className={`w-12 h-7 rounded-full transition-colors ${homeCollection ? 'bg-green-500' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${homeCollection ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {testCategories.map((c) => (
            <button key={c} onClick={() => { setActiveCat(c); setSearch(''); }}
              className={`flex-shrink-0 px-4 py-2 rounded-pill text-sm font-medium transition-all ${
                activeCat === c ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-100'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Tests list */}
        <div className="space-y-3">
          {filtered.map((test) => {
            const isSelected = selected.includes(test.id);
            return (
              <button key={test.id} onClick={() => toggleTest(test.id)} className="w-full text-left">
                <Card padding="sm" className={`flex items-center gap-3 transition-all ${isSelected ? 'ring-2 ring-primary-400 bg-primary-50/50' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-primary-500 text-white' : 'bg-purple-50 text-purple-600'
                  }`}>
                    {isSelected ? <CheckCircle className="w-5 h-5" /> : <FlaskConical className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{test.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-gray-400">{test.prep}</span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-0.5"><Clock className="w-3 h-3" />{test.turnaround}</span>
                    </div>
                  </div>
                  <span className="font-heading font-bold text-sm text-gray-900 flex-shrink-0">₹{test.price}</span>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 px-4 pb-2 z-20">
          <div className="bg-primary-500 text-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-sm font-medium">{selected.length} test{selected.length > 1 ? 's' : ''} selected</p>
              <p className="font-heading font-bold text-xl">₹{total}</p>
            </div>
            <Button variant="secondary" className="bg-white text-primary-500 border-0">
              Book Now <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
