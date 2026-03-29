import { useState } from 'react';
import {
  Stethoscope, Heart, Brain, Baby, Eye, Bone,
  Smile, Dog, Star, Clock, Search, ArrowLeft,
  MapPin, Calendar, ChevronRight, Home as HomeIcon,
  CheckCircle, Phone,
} from 'lucide-react';
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
  { id: '1', name: 'Dr. Priya Sharma', specialty: 'General Physician', exp: 12, fee: 500, visitFee: 800, rating: 4.8, reviews: 234, hospital: 'Apollo Hospital', available: true, nextSlot: '10:30 AM', languages: ['English', 'Hindi'], bio: 'Experienced general physician specialising in preventive care and chronic disease management.', phone: '+91 98765 43210' },
  { id: '2', name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', exp: 20, fee: 1000, visitFee: 1500, rating: 4.9, reviews: 456, hospital: 'Fortis Healthcare', available: true, nextSlot: '11:00 AM', languages: ['English', 'Hindi', 'Telugu'], bio: 'Senior cardiologist with 20 years of clinical excellence in heart disease management.', phone: '+91 98765 43211' },
  { id: '3', name: 'Dr. Ananya Patel', specialty: 'Dermatologist', exp: 8, fee: 700, visitFee: 1000, rating: 4.7, reviews: 189, hospital: 'Max Hospital', available: true, nextSlot: '2:00 PM', languages: ['English', 'Gujarati'], bio: 'Expert dermatologist focusing on skin allergies, acne and cosmetic dermatology.', phone: '+91 98765 43212' },
  { id: '4', name: 'Dr. Vikram Singh', specialty: 'Veterinary Surgeon', exp: 15, fee: 600, visitFee: 900, rating: 4.6, reviews: 128, hospital: 'PetCare Clinic', available: true, nextSlot: '12:30 PM', languages: ['English', 'Hindi'], bio: 'Skilled veterinary surgeon with expertise in small and large animal care.', phone: '+91 98765 43213' },
  { id: '5', name: 'Dr. Meera Reddy', specialty: 'Orthodontist', exp: 10, fee: 800, visitFee: 1200, rating: 4.8, reviews: 312, hospital: 'SmileCare Dental', available: false, nextSlot: 'Tomorrow', languages: ['English', 'Kannada'], bio: 'Renowned orthodontist offering advanced braces and dental alignment solutions.', phone: '+91 98765 43214' },
  { id: '6', name: 'Dr. Arjun Nair', specialty: 'Pediatrician', exp: 14, fee: 600, visitFee: 900, rating: 4.9, reviews: 567, hospital: 'Rainbow Children', available: true, nextSlot: '3:00 PM', languages: ['English', 'Malayalam'], bio: 'Dedicated pediatrician providing compassionate care for children of all ages.', phone: '+91 98765 43215' },
];

const timeSlots = ['9:00 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '4:00 PM', '4:30 PM'];

const today = new Date();
const dateOptions = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  return {
    label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short' }),
    sub: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    value: d.toISOString().split('T')[0],
  };
});

type Step = 'list' | 'detail' | 'confirm';

export function ConsultPage() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].value);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState<Step>('list');
  const [booked, setBooked] = useState(false);

  const filtered = doctors.filter((d) => {
    if (search) {
      const s = search.toLowerCase();
      return d.name.toLowerCase().includes(s) || d.specialty.toLowerCase().includes(s);
    }
    if (selectedSpec) return d.specialty.toLowerCase().includes(selectedSpec.toLowerCase());
    return true;
  });

  const doctor = selectedDoctor ? doctors.find((d) => d.id === selectedDoctor) : null;

  const handleBook = () => {
    if (!selectedSlot || !address.trim()) return;
    setBooked(true);
  };

  // ── Booking confirmed screen ──────────────────────────
  if (booked && doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="font-heading font-extrabold text-xl text-gray-900 mb-1">Booking Confirmed!</h2>
        <p className="text-sm text-gray-500 mb-6">
          {doctor.name} will visit you at home on{' '}
          <span className="font-semibold text-gray-800">
            {dateOptions.find((d) => d.value === selectedDate)?.label} at {selectedSlot}
          </span>
        </p>

        <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-5 text-left space-y-3 mb-6">
          {[
            { label: 'Doctor', value: doctor.name },
            { label: 'Specialty', value: doctor.specialty },
            { label: 'Visit Address', value: address },
            { label: 'Visit Fee', value: `₹${doctor.visitFee}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
            </div>
          ))}
        </div>

        <Button size="lg" className="w-full" onClick={() => { setBooked(false); setStep('list'); setSelectedDoctor(null); setSelectedSlot(''); setAddress(''); }}>
          Back to Home
        </Button>
      </div>
    );
  }

  // ── Booking form ─────────────────────────────────────
  if (step === 'confirm' && doctor) {
    return (
      <div className="px-4 pt-4 space-y-4 pb-8">
        <button onClick={() => setStep('detail')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Doctor summary */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <Avatar name={doctor.name} size="lg" />
          <div>
            <p className="text-sm font-bold text-gray-900">{doctor.name}</p>
            <p className="text-xs text-primary-500 font-medium">{doctor.specialty}</p>
          </div>
        </div>

        {/* Date picker */}
        <div>
          <h3 className="font-heading font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-500" /> Select Date
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
            {dateOptions.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl border-2 transition-all ${
                  selectedDate === d.value
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                }`}
              >
                <span className="text-[11px] font-semibold">{d.label}</span>
                <span className="text-xs mt-0.5">{d.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time slot */}
        <div>
          <h3 className="font-heading font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-500" /> Select Time Slot
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  selectedSlot === slot
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-heading font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-500" /> Home Address
          </h3>
          <textarea
            rows={3}
            placeholder="Enter your full address for the doctor's visit..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 bg-white rounded-2xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
          />
        </div>

        {/* Summary + book */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400">Home Visit Fee</p>
              <p className="font-heading font-extrabold text-2xl text-gray-900">₹{doctor.visitFee}</p>
            </div>
            <div className="text-right text-xs text-gray-400">
              {selectedSlot
                ? <p className="text-green-600 font-semibold">{dateOptions.find((d) => d.value === selectedDate)?.label} · {selectedSlot}</p>
                : <p className="text-amber-500">Select a time slot</p>
              }
            </div>
          </div>
          <Button
            size="lg"
            className="w-full"
            disabled={!selectedSlot || !address.trim()}
            onClick={handleBook}
          >
            Confirm Home Visit
          </Button>
        </div>
      </div>
    );
  }

  // ── Doctor detail ─────────────────────────────────────
  if (step === 'detail' && doctor) {
    return (
      <div className="pb-8">
        {/* Hero gradient */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 px-4 pt-4 pb-8">
          <button onClick={() => { setStep('list'); setSelectedDoctor(null); }} className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {doctor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-extrabold text-lg text-white">{doctor.name}</h2>
              <p className="text-sm text-white/80 font-medium">{doctor.specialty}</p>
              <p className="text-xs text-white/60 mt-0.5">{doctor.hospital}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  {doctor.rating} ({doctor.reviews} reviews)
                </span>
                <span>{doctor.exp} yrs exp</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 -mt-4 space-y-4">
          {/* Bio card */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">About</p>
            <p className="text-sm text-gray-600 leading-relaxed">{doctor.bio}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {doctor.languages.map((l) => (
                <Badge key={l} variant="neutral">{l}</Badge>
              ))}
            </div>
          </div>

          {/* Home visit info */}
          <div className="bg-primary-50 rounded-3xl p-5 border border-primary-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Home Visit Only</p>
                <p className="text-xs text-gray-500">Doctor comes to your doorstep</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Visit Fee', value: `₹${doctor.visitFee}` },
                { label: 'Earliest Slot', value: doctor.nextSlot },
                { label: 'Response Time', value: '~15 min' },
                { label: 'Availability', value: doctor.available ? 'Available' : 'Unavailable' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-2xl p-3">
                  <p className="text-[11px] text-gray-400">{label}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Contact</p>
                <p className="text-sm font-semibold text-gray-800">{doctor.phone}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </div>

          {/* Book CTA */}
          <Button
            size="lg"
            className="w-full"
            disabled={!doctor.available}
            onClick={() => setStep('confirm')}
          >
            {doctor.available ? 'Book Home Visit' : 'Currently Unavailable'}
          </Button>
        </div>
      </div>
    );
  }

  // ── Doctor list ───────────────────────────────────────
  return (
    <div className="pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 px-4 pt-4 pb-10">
        <h1 className="font-heading font-extrabold text-xl text-white mb-1">Book a Doctor</h1>
        <p className="text-sm text-white/70 mb-4">Certified doctors visit you at home</p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search doctors, specialties..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelectedSpec(''); }}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border-0 shadow-sm
                       text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-5">
        {/* How it works */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">How It Works</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { icon: <Search className="w-5 h-5" />, label: 'Pick a Doctor', color: 'bg-blue-50 text-blue-500' },
              { icon: <Calendar className="w-5 h-5" />, label: 'Choose Slot', color: 'bg-purple-50 text-purple-500' },
              { icon: <HomeIcon className="w-5 h-5" />, label: 'Doctor Visits', color: 'bg-green-50 text-green-500' },
            ].map(({ icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
                <span className="text-[11px] font-medium text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div>
          <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Specialties</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {specialties.map((s) => (
              <button
                key={s.label}
                onClick={() => { setSelectedSpec(selectedSpec === s.label ? '' : s.label); setSearch(''); }}
                className={`flex-shrink-0 flex flex-col items-center gap-2 w-20 transition-opacity ${
                  selectedSpec === s.label ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg} ${selectedSpec === s.label ? 'ring-2 ring-offset-1 ring-primary-400' : ''}`}>{s.icon}</div>
                <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Doctors */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-base text-gray-900">
              {selectedSpec || 'All'} Doctors
            </h2>
            <span className="text-xs text-gray-400">{filtered.length} available</span>
          </div>

          <div className="space-y-3">
            {filtered.map((doc) => (
              <button
                key={doc.id}
                onClick={() => { setSelectedDoctor(doc.id); setStep('detail'); }}
                className="w-full text-left"
              >
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                      {doc.name.split(' ').map((n) => n[0]).join('').slice(1, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                          <p className="text-xs text-primary-500 font-medium">{doc.specialty}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-heading font-bold text-sm text-gray-900">₹{doc.visitFee}</p>
                          <p className="text-[10px] text-gray-400">home visit</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[11px] text-gray-500 flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {doc.rating} <span className="text-gray-400">({doc.reviews})</span>
                        </span>
                        <span className="text-[11px] text-gray-400">{doc.exp}y exp</span>
                      </div>

                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-[11px] text-gray-400 truncate">{doc.hospital}</span>
                        <span className={`text-[11px] font-medium flex items-center gap-0.5 ${doc.available ? 'text-green-600' : 'text-gray-400'}`}>
                          <Clock className="w-3 h-3" />
                          {doc.nextSlot}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
