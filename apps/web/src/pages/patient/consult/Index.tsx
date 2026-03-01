import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Stethoscope, Heart, Brain, Baby, Eye, Bone,
  Smile, Dog, ChevronRight, Star, Clock, Search, Video, Phone,
  MessageSquare, ArrowLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

const specialties = [
  { icon: <Stethoscope className="w-5 h-5" />, label: 'General Physician', bg: 'bg-blue-50 text-blue-600' },
  { icon: <Heart className="w-5 h-5" />, label: 'Cardiologist', bg: 'bg-red-50 text-red-600' },
  { icon: <Brain className="w-5 h-5" />, label: 'Neurologist', bg: 'bg-purple-50 text-purple-600' },
  { icon: <Baby className="w-5 h-5" />, label: 'Pediatrician', bg: 'bg-pink-50 text-pink-600' },
  { icon: <Eye className="w-5 h-5" />, label: 'Ophthalmologist', bg: 'bg-cyan-50 text-cyan-600' },
  { icon: <Bone className="w-5 h-5" />, label: 'Orthopedic', bg: 'bg-amber-50 text-amber-600' },
  { icon: <Smile className="w-5 h-5" />, label: 'Dermatologist', bg: 'bg-green-50 text-green-600' },
  { icon: <Dog className="w-5 h-5" />, label: 'Veterinary', bg: 'bg-teal-50 text-teal-600' },
];

const doctors = [
  { id: '1', name: 'Dr. Priya Sharma', specialty: 'General Physician', type: 'MEDICAL', exp: 12, fee: 500, rating: 4.8, reviews: 234, hospital: 'Apollo Hospital', available: true, nextSlot: '10:30 AM', languages: ['English', 'Hindi'] },
  { id: '2', name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', type: 'MEDICAL', exp: 20, fee: 1000, rating: 4.9, reviews: 456, hospital: 'Fortis Healthcare', available: true, nextSlot: '11:00 AM', languages: ['English', 'Hindi', 'Telugu'] },
  { id: '3', name: 'Dr. Ananya Patel', specialty: 'Dermatologist', type: 'MEDICAL', exp: 8, fee: 700, rating: 4.7, reviews: 189, hospital: 'Max Hospital', available: true, nextSlot: '2:00 PM', languages: ['English', 'Gujarati'] },
  { id: '4', name: 'Dr. Vikram Singh', specialty: 'Veterinary Surgeon', type: 'VETERINARY', exp: 15, fee: 600, rating: 4.6, reviews: 128, hospital: 'PetCare Clinic', available: true, nextSlot: '12:30 PM', languages: ['English', 'Hindi'] },
  { id: '5', name: 'Dr. Meera Reddy', specialty: 'Orthodontist', type: 'DENTAL', exp: 10, fee: 800, rating: 4.8, reviews: 312, hospital: 'SmileCare Dental', available: false, nextSlot: 'Tomorrow', languages: ['English', 'Kannada'] },
  { id: '6', name: 'Dr. Arjun Nair', specialty: 'Pediatrician', type: 'MEDICAL', exp: 14, fee: 600, rating: 4.9, reviews: 567, hospital: 'Rainbow Children', available: true, nextSlot: '3:00 PM', languages: ['English', 'Malayalam'] },
];

export function ConsultPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState(searchParams.get('specialty') || '');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [consultType, setConsultType] = useState<'VIDEO' | 'AUDIO' | 'CHAT'>('VIDEO');

  const filtered = doctors.filter((d) => {
    if (search) {
      const s = search.toLowerCase();
      return d.name.toLowerCase().includes(s) || d.specialty.toLowerCase().includes(s);
    }
    if (selectedSpec) return d.specialty.toLowerCase().includes(selectedSpec.toLowerCase()) || d.type === selectedSpec;
    return true;
  });

  const doctor = selectedDoctor ? doctors.find((d) => d.id === selectedDoctor) : null;

  // Doctor detail view
  if (doctor) {
    return (
      <div className="px-4 pt-4 space-y-4">
        <button onClick={() => setSelectedDoctor(null)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Back to doctors
        </button>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <Avatar name={doctor.name} size="xl" />
            <div className="flex-1">
              <h2 className="font-heading font-bold text-lg text-gray-900">{doctor.name}</h2>
              <p className="text-sm text-primary-500 font-medium">{doctor.specialty}</p>
              <p className="text-xs text-gray-400 mt-1">{doctor.hospital}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{doctor.rating} ({doctor.reviews})</span>
                <span>{doctor.exp} yrs exp</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {doctor.languages.map((l) => (
              <Badge key={l} variant="neutral">{l}</Badge>
            ))}
          </div>
        </div>

        {/* Consult type selector */}
        <div>
          <h3 className="font-heading font-bold text-sm text-gray-900 mb-3">Consultation Type</h3>
          <div className="grid grid-cols-3 gap-3">
            {([
              { type: 'VIDEO' as const, icon: <Video className="w-5 h-5" />, label: 'Video Call' },
              { type: 'AUDIO' as const, icon: <Phone className="w-5 h-5" />, label: 'Audio Call' },
              { type: 'CHAT' as const, icon: <MessageSquare className="w-5 h-5" />, label: 'Chat' },
            ]).map((ct) => (
              <button
                key={ct.type}
                onClick={() => setConsultType(ct.type)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  consultType === ct.type
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                }`}
              >
                {ct.icon}
                <span className="text-xs font-medium">{ct.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time slot */}
        <div>
          <h3 className="font-heading font-bold text-sm text-gray-900 mb-3">Next Available</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '4:00 PM'].map((slot) => (
              <button key={slot} className="flex-shrink-0 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-primary-400 hover:text-primary-500 transition-colors">
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Fee + Book */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Consultation Fee</p>
            <p className="font-heading font-extrabold text-2xl text-gray-900">₹{doctor.fee}</p>
          </div>
          <Button size="lg">Book Now</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search doctors, specialties..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSelectedSpec(''); }}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm
                     text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      {/* Specialties */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Specialties</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {specialties.map((s) => (
            <button
              key={s.label}
              onClick={() => { setSelectedSpec(s.label); setSearch(''); }}
              className={`flex-shrink-0 flex flex-col items-center gap-2 w-20 ${
                selectedSpec === s.label ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg}`}>{s.icon}</div>
              <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Doctors list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-base text-gray-900">
            {selectedSpec || 'All'} Doctors
          </h2>
          <span className="text-xs text-gray-400">{filtered.length} found</span>
        </div>

        <div className="space-y-3">
          {filtered.map((doc) => (
            <button key={doc.id} onClick={() => setSelectedDoctor(doc.id)} className="w-full text-left">
              <Card padding="sm" className="flex items-center gap-3">
                <Avatar name={doc.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-primary-500 font-medium">{doc.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />{doc.rating}
                    </span>
                    <span className="text-[11px] text-gray-400">{doc.exp}y exp</span>
                    <span className="text-[11px] text-gray-400">{doc.hospital}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-heading font-bold text-sm text-gray-900">₹{doc.fee}</p>
                  <p className="text-[10px] text-green-600 mt-1 flex items-center gap-0.5 justify-end">
                    <Clock className="w-3 h-3" />{doc.nextSlot}
                  </p>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
