import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { SearchBar } from '@/components/ui/SearchBar';
import { clsx } from 'clsx';
import {
  ArrowLeft, Calendar, FileText, Pill, ChevronRight,
  Users, Clock, Video, Phone, MessageSquare,
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  totalVisits: number;
  bloodGroup: string;
  conditions: string[];
  consultations: { date: string; type: string; complaint: string }[];
  prescriptions: { date: string; medicines: string[] }[];
}

const mockPatients: Patient[] = [
  {
    id: '1', name: 'Rahul Mehta', age: 28, gender: 'Male', phone: '+91 98765 43210',
    lastVisit: '2026-02-28', totalVisits: 5, bloodGroup: 'O+',
    conditions: ['Seasonal Allergies'],
    consultations: [
      { date: '2026-02-28', type: 'VIDEO', complaint: 'Fever and cold since 3 days' },
      { date: '2026-02-10', type: 'AUDIO', complaint: 'Follow-up for fever' },
      { date: '2026-01-15', type: 'VIDEO', complaint: 'Allergy flare-up' },
    ],
    prescriptions: [
      { date: '2026-02-28', medicines: ['Dolo 650mg', 'Cetirizine 10mg', 'Azithromycin 500mg'] },
      { date: '2026-01-15', medicines: ['Montelukast 10mg', 'Levocetirizine 5mg'] },
    ],
  },
  {
    id: '2', name: 'Sneha Gupta', age: 45, gender: 'Female', phone: '+91 87654 32109',
    lastVisit: '2026-02-25', totalVisits: 8, bloodGroup: 'B+',
    conditions: ['Hypertension', 'Hypothyroidism'],
    consultations: [
      { date: '2026-02-25', type: 'AUDIO', complaint: 'BP medication review' },
      { date: '2026-01-25', type: 'VIDEO', complaint: 'Thyroid follow-up' },
    ],
    prescriptions: [
      { date: '2026-02-25', medicines: ['Amlodipine 5mg', 'Thyronorm 50mcg'] },
    ],
  },
  {
    id: '3', name: 'Amit Joshi', age: 32, gender: 'Male', phone: '+91 76543 21098',
    lastVisit: '2026-02-20', totalVisits: 3, bloodGroup: 'A+',
    conditions: ['Eczema'],
    consultations: [
      { date: '2026-02-20', type: 'CHAT', complaint: 'Skin rash on arms' },
    ],
    prescriptions: [
      { date: '2026-02-20', medicines: ['Betamethasone Cream', 'Cetirizine 10mg'] },
    ],
  },
  {
    id: '4', name: 'Kavitha Reddy', age: 55, gender: 'Female', phone: '+91 65432 10987',
    lastVisit: '2026-02-18', totalVisits: 12, bloodGroup: 'AB+',
    conditions: ['Osteoarthritis', 'Diabetes Type 2'],
    consultations: [
      { date: '2026-02-18', type: 'HOME_VISIT', complaint: 'Knee pain and swelling' },
      { date: '2026-01-18', type: 'VIDEO', complaint: 'Diabetes review' },
    ],
    prescriptions: [
      { date: '2026-02-18', medicines: ['Diclofenac Gel', 'Glucosamine', 'Metformin 500mg'] },
    ],
  },
  {
    id: '5', name: 'Sanjay Murthy', age: 38, gender: 'Male', phone: '+91 54321 09876',
    lastVisit: '2026-02-15', totalVisits: 2, bloodGroup: 'O-',
    conditions: [],
    consultations: [
      { date: '2026-02-15', type: 'VIDEO', complaint: 'Annual health checkup discussion' },
    ],
    prescriptions: [],
  },
  {
    id: '6', name: 'Deepa Sharma', age: 29, gender: 'Female', phone: '+91 43210 98765',
    lastVisit: '2026-02-12', totalVisits: 4, bloodGroup: 'B-',
    conditions: ['Migraine'],
    consultations: [
      { date: '2026-02-12', type: 'AUDIO', complaint: 'Increasing migraine frequency' },
    ],
    prescriptions: [
      { date: '2026-02-12', medicines: ['Sumatriptan 50mg', 'Propranolol 40mg'] },
    ],
  },
  {
    id: '7', name: 'Vikram Singh', age: 42, gender: 'Male', phone: '+91 32109 87654',
    lastVisit: '2026-02-08', totalVisits: 6, bloodGroup: 'A-',
    conditions: ['Type 2 Diabetes', 'Hyperlipidemia'],
    consultations: [
      { date: '2026-02-08', type: 'VIDEO', complaint: 'Medication review and HbA1c discussion' },
    ],
    prescriptions: [
      { date: '2026-02-08', medicines: ['Metformin 1000mg', 'Atorvastatin 20mg', 'Glimepiride 2mg'] },
    ],
  },
  {
    id: '8', name: 'Meera Iyer', age: 33, gender: 'Female', phone: '+91 21098 76543',
    lastVisit: '2026-02-05', totalVisits: 3, bloodGroup: 'AB-',
    conditions: ['PCOD'],
    consultations: [
      { date: '2026-02-05', type: 'VIDEO', complaint: 'Irregular periods, weight gain' },
    ],
    prescriptions: [
      { date: '2026-02-05', medicines: ['Myo-Inositol', 'Metformin 500mg'] },
    ],
  },
  {
    id: '9', name: 'Ravi Kumar', age: 60, gender: 'Male', phone: '+91 10987 65432',
    lastVisit: '2026-01-30', totalVisits: 15, bloodGroup: 'O+',
    conditions: ['COPD', 'Hypertension'],
    consultations: [
      { date: '2026-01-30', type: 'VIDEO', complaint: 'Breathing difficulty' },
    ],
    prescriptions: [
      { date: '2026-01-30', medicines: ['Tiotropium Inhaler', 'Salbutamol Inhaler', 'Telmisartan 40mg'] },
    ],
  },
  {
    id: '10', name: 'Lakshmi Devi', age: 48, gender: 'Female', phone: '+91 09876 54321',
    lastVisit: '2026-01-25', totalVisits: 7, bloodGroup: 'B+',
    conditions: ['Rheumatoid Arthritis'],
    consultations: [
      { date: '2026-01-25', type: 'AUDIO', complaint: 'Joint pain and stiffness in mornings' },
    ],
    prescriptions: [
      { date: '2026-01-25', medicines: ['Methotrexate 15mg', 'Folic Acid 5mg', 'Hydroxychloroquine 200mg'] },
    ],
  },
];

const typeIcon: Record<string, React.ReactNode> = {
  VIDEO: <Video className="w-3 h-3 text-blue-500" />,
  AUDIO: <Phone className="w-3 h-3 text-green-500" />,
  CHAT: <MessageSquare className="w-3 h-3 text-amber-500" />,
  HOME_VISIT: <Calendar className="w-3 h-3 text-purple-500" />,
};

export function PatientsPage() {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filtered = mockPatients.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (selectedPatient) {
    return (
      <div className="px-4 pt-4 space-y-4 pb-6">
        {/* Back Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedPatient(null)} className="p-1 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-lg text-gray-900">Patient Details</h1>
        </div>

        {/* Patient Info Card */}
        <Card>
          <div className="flex items-center gap-4">
            <Avatar name={selectedPatient.name} size="xl" />
            <div className="flex-1 min-w-0">
              <h2 className="font-heading font-bold text-lg text-gray-900">{selectedPatient.name}</h2>
              <p className="text-sm text-gray-500">
                {selectedPatient.age} yrs, {selectedPatient.gender}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{selectedPatient.phone}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="primary">{selectedPatient.bloodGroup}</Badge>
                {selectedPatient.conditions.map((c) => (
                  <Badge key={c} variant="warning" className="text-[10px]">{c}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center flex-1">
              <p className="font-heading font-bold text-lg text-gray-900">{selectedPatient.totalVisits}</p>
              <p className="text-[11px] text-gray-400">Total Visits</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center flex-1">
              <p className="font-heading font-bold text-sm text-gray-900">{formatDate(selectedPatient.lastVisit)}</p>
              <p className="text-[11px] text-gray-400">Last Visit</p>
            </div>
          </div>
        </Card>

        {/* Consultation History */}
        <div>
          <h3 className="font-heading font-bold text-base text-gray-900 mb-3">Consultation History</h3>
          <div className="space-y-2">
            {selectedPatient.consultations.map((c, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  {typeIcon[c.type] || <Calendar className="w-3 h-3 text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{c.complaint}</p>
                  <p className="text-[11px] text-gray-400">{formatDate(c.date)} | {c.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prescriptions */}
        {selectedPatient.prescriptions.length > 0 && (
          <div>
            <h3 className="font-heading font-bold text-base text-gray-900 mb-3">Prescriptions Given</h3>
            <div className="space-y-2">
              {selectedPatient.prescriptions.map((p, i) => (
                <Card key={i} padding="sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Pill className="w-4 h-4 text-primary-500" />
                    <span className="text-xs font-medium text-gray-400">{formatDate(p.date)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {p.medicines.map((med) => (
                      <Badge key={med} variant="neutral" className="text-[11px]">{med}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg text-gray-900">My Patients</h1>
        <Badge variant="neutral">{mockPatients.length} patients</Badge>
      </div>

      {/* Search */}
      <SearchBar
        placeholder="Search patients..."
        value={search}
        onChange={setSearch}
      />

      {/* Patient List */}
      <div className="space-y-3">
        {filtered.map((patient) => (
          <Card
            key={patient.id}
            padding="sm"
            className="cursor-pointer"
            onClick={() => setSelectedPatient(patient)}
          >
            <div className="flex items-center gap-3">
              <Avatar name={patient.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
                <p className="text-xs text-gray-500">{patient.age} yrs, {patient.gender}</p>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(patient.lastVisit)}
                  </span>
                  <span>{patient.totalVisits} visits</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">No patients found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
