import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';
import {
  FileText, Pill, FlaskConical, Stethoscope, Plus, X,
  Eye, Upload, Calendar, ChevronDown,
} from 'lucide-react';

type RecordType = 'ALL' | 'PRESCRIPTION' | 'LAB_REPORT' | 'MEDICAL_RECORD';

interface HealthRecord {
  id: string;
  type: 'PRESCRIPTION' | 'LAB_REPORT' | 'MEDICAL_RECORD';
  title: string;
  doctorName: string;
  date: string;
  fileName: string;
}

const mockRecords: HealthRecord[] = [
  { id: '1', type: 'PRESCRIPTION', title: 'Fever & Cold Medication', doctorName: 'Dr. Priya Sharma', date: '2026-02-25', fileName: 'prescription_feb25.pdf' },
  { id: '2', type: 'LAB_REPORT', title: 'Complete Blood Count (CBC)', doctorName: 'Dr. Rajesh Kumar', date: '2026-02-20', fileName: 'cbc_report.pdf' },
  { id: '3', type: 'MEDICAL_RECORD', title: 'Annual Health Checkup', doctorName: 'Dr. Anita Desai', date: '2026-02-15', fileName: 'annual_checkup.pdf' },
  { id: '4', type: 'PRESCRIPTION', title: 'Blood Pressure Medication', doctorName: 'Dr. Suresh Nair', date: '2026-02-10', fileName: 'bp_prescription.pdf' },
  { id: '5', type: 'LAB_REPORT', title: 'Thyroid Profile (T3, T4, TSH)', doctorName: 'Dr. Meera Iyer', date: '2026-02-05', fileName: 'thyroid_report.pdf' },
  { id: '6', type: 'MEDICAL_RECORD', title: 'Dental X-Ray Report', doctorName: 'Dr. Vikram Reddy', date: '2026-01-28', fileName: 'dental_xray.pdf' },
  { id: '7', type: 'PRESCRIPTION', title: 'Allergy Medication', doctorName: 'Dr. Priya Sharma', date: '2026-01-20', fileName: 'allergy_rx.pdf' },
  { id: '8', type: 'LAB_REPORT', title: 'Lipid Profile & HbA1c', doctorName: 'Dr. Rajesh Kumar', date: '2026-01-15', fileName: 'lipid_hba1c.pdf' },
];

const tabs: { key: RecordType; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'PRESCRIPTION', label: 'Prescriptions' },
  { key: 'LAB_REPORT', label: 'Lab Reports' },
  { key: 'MEDICAL_RECORD', label: 'Medical Records' },
];

const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  PRESCRIPTION: { icon: <Pill className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50' },
  LAB_REPORT: { icon: <FlaskConical className="w-5 h-5" />, color: 'text-purple-600 bg-purple-50' },
  MEDICAL_RECORD: { icon: <Stethoscope className="w-5 h-5" />, color: 'text-green-600 bg-green-50' },
};

export function RecordsPage() {
  const [activeTab, setActiveTab] = useState<RecordType>('ALL');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    type: 'PRESCRIPTION' as 'PRESCRIPTION' | 'LAB_REPORT' | 'MEDICAL_RECORD',
    title: '',
    date: '',
    notes: '',
    fileName: '',
  });

  const filtered = activeTab === 'ALL'
    ? mockRecords
    : mockRecords.filter((r) => r.type === activeTab);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleUploadSubmit = () => {
    setShowUpload(false);
    setUploadForm({ type: 'PRESCRIPTION', title: '', date: '', notes: '', fileName: '' });
  };

  return (
    <div className="px-4 pt-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg text-gray-900">Health Records</h1>
        <Badge variant="neutral">{mockRecords.length} records</Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === tab.key
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {filtered.map((record) => {
          const config = typeConfig[record.type];
          return (
            <Card key={record.id} padding="sm" className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${config.color}`}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{record.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{record.doctorName}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(record.date)}
                </p>
              </div>
              <Button size="sm" variant="secondary" icon={<Eye className="w-3.5 h-3.5" />}>
                View
              </Button>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">No records found</p>
          <p className="text-xs text-gray-400 mt-1">Upload your health records to keep them organized</p>
        </div>
      )}

      {/* Floating Upload Button */}
      <button
        onClick={() => setShowUpload(true)}
        className="fixed bottom-24 right-5 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 active:bg-primary-700 flex items-center justify-center transition-all hover:shadow-xl z-20"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowUpload(false)} />
          <div className="relative bg-white rounded-t-modal w-full max-w-lg p-6 pb-8 space-y-5 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-gray-900">Upload Record</h2>
              <button onClick={() => setShowUpload(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Record Type</label>
              <div className="relative">
                <select
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value as typeof uploadForm.type })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
                >
                  <option value="PRESCRIPTION">Prescription</option>
                  <option value="LAB_REPORT">Lab Report</option>
                  <option value="MEDICAL_RECORD">Medical Record</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                placeholder="e.g., Blood Test Report"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
              />
            </div>

            {/* File Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload File</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Tap to select a file</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                {uploadForm.fileName && (
                  <p className="text-sm text-primary-500 font-medium mt-2">{uploadForm.fileName}</p>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
              <input
                type="date"
                value={uploadForm.date}
                onChange={(e) => setUploadForm({ ...uploadForm, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes (Optional)</label>
              <textarea
                value={uploadForm.notes}
                onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
                placeholder="Any additional notes..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 resize-none"
              />
            </div>

            {/* Save Button */}
            <Button className="w-full" size="lg" onClick={handleUploadSubmit}>
              Save Record
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
