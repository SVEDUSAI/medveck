import { useState } from 'react';
import { Search, Download, FileText, Upload, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const mockReports = [
  { id: 'R001', patientName: 'Priya Krishnan', tests: ['Vitamin D', 'B12', 'Iron Studies'], date: '2 days ago', status: 'uploaded' },
  { id: 'R002', patientName: 'Sneha Gupta', tests: ['TSH'], date: '3 days ago', status: 'uploaded' },
  { id: 'R003', patientName: 'Rahul Mehta', tests: ['Full Body Checkup'], date: '5 days ago', status: 'uploaded' },
  { id: 'R004', patientName: 'Amit Joshi', tests: ['CBC', 'LFT'], date: '1 week ago', status: 'uploaded' },
  { id: 'R005', patientName: 'Vikram Singh', tests: ['Lipid Profile'], date: '1 week ago', status: 'uploaded' },
  { id: 'R006', patientName: 'Priya Krishnan', tests: ['HbA1c', 'Fasting Sugar'], date: '2 weeks ago', status: 'uploaded' },
  { id: 'R007', patientName: 'Sneha Gupta', tests: ['Thyroid Profile'], date: '2 weeks ago', status: 'uploaded' },
  { id: 'R008', patientName: 'Rahul Mehta', tests: ['KFT', 'Uric Acid'], date: '3 weeks ago', status: 'uploaded' },
];

export function LabReports() {
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const filtered = mockReports.filter((r) => !search || r.patientName.toLowerCase().includes(search.toLowerCase()) || r.tests.some((t) => t.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg text-gray-900">Reports</h1>
        <Button size="sm" onClick={() => setShowUpload(true)}><Upload className="w-4 h-4 mr-1" /> Upload</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by patient or test..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
      </div>

      <div className="space-y-2">
        {filtered.map((report) => (
          <Card key={report.id} hover>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{report.patientName}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {report.tests.map((t) => <span key={t} className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">{t}</span>)}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{report.date}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-primary-500">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center">{filtered.length} reports</p>

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between"><h2 className="font-heading font-bold text-lg">Upload Report</h2><button onClick={() => setShowUpload(false)}><X className="w-5 h-5 text-gray-400" /></button></div>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm">
              <option>Select Booking</option>
              <option>LB004 - Rahul Mehta (Full Body)</option>
              <option>LB003 - Amit Joshi (Lipid + HbA1c)</option>
            </select>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Drop report PDF here</p>
              <p className="text-xs text-gray-400">or click to browse</p>
            </div>
            <textarea placeholder="Notes (optional)" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none" rows={2} />
            <Button className="w-full" onClick={() => { alert('Report uploaded!'); setShowUpload(false); }}>Upload Report</Button>
          </div>
        </div>
      )}
    </div>
  );
}
