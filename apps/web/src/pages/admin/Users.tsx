import { useState } from 'react';
import { Search, Plus, ChevronDown, ToggleLeft, ToggleRight, X, UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const ROLES = ['ALL', 'PATIENT', 'DOCTOR', 'VET', 'DENTIST', 'VENDOR', 'LAB', 'DRIVER', 'ADMIN', 'SUPER_ADMIN'];
const roleBadge: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  PATIENT: 'primary', DOCTOR: 'success', VET: 'success', DENTIST: 'success',
  VENDOR: 'warning', LAB: 'neutral', DRIVER: 'primary', ADMIN: 'danger', SUPER_ADMIN: 'danger',
};

const mockUsers = [
  { id: '1', name: 'Rahul Mehta', phone: '9500000001', email: 'rahul.m@gmail.com', role: 'PATIENT', isActive: true, createdAt: '2025-12-01' },
  { id: '2', name: 'Dr. Priya Sharma', phone: '9100000001', email: 'priya@medvek.com', role: 'DOCTOR', isActive: true, createdAt: '2025-11-15', specialization: 'General Physician' },
  { id: '3', name: 'Dr. Rajesh Kumar', phone: '9100000002', email: 'rajesh@medvek.com', role: 'DOCTOR', isActive: true, createdAt: '2025-11-10', specialization: 'Cardiologist' },
  { id: '4', name: 'MedPlus Pharmacy', phone: '9200000001', email: 'medplus@medvek.com', role: 'VENDOR', isActive: true, createdAt: '2025-10-20', shopName: 'MedPlus - Banjara Hills' },
  { id: '5', name: 'Thyrocare Labs', phone: '9300000001', email: 'thyrocare@medvek.com', role: 'LAB', isActive: true, createdAt: '2025-10-15', labName: 'Thyrocare Diagnostics' },
  { id: '6', name: 'Ravi Kumar', phone: '9400000001', email: 'ravi.driver@medvek.com', role: 'DRIVER', isActive: true, createdAt: '2025-11-01' },
  { id: '7', name: 'Sneha Gupta', phone: '9500000002', email: 'sneha.g@gmail.com', role: 'PATIENT', isActive: false, createdAt: '2025-12-10' },
  { id: '8', name: 'Dr. Arjun Patel', phone: '9100000004', email: 'arjun.vet@medvek.com', role: 'VET', isActive: true, createdAt: '2025-11-20', specialization: 'Small Animals' },
  { id: '9', name: 'Admin User', phone: '9000000002', email: 'admin@medvek.com', role: 'ADMIN', isActive: true, createdAt: '2025-09-01' },
  { id: '10', name: 'Dr. Sanjay Gupta', phone: '9100000006', email: 'sanjay.dental@medvek.com', role: 'DENTIST', isActive: true, createdAt: '2025-11-05', specialization: 'Orthodontist' },
];

export function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [showAdd, setShowAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', password: '', role: 'DOCTOR' });

  const filtered = mockUsers.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.phone.includes(search) && !u.email?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.isActive).length,
    suspended: mockUsers.filter((u) => !u.isActive).length,
    doctors: mockUsers.filter((u) => ['DOCTOR', 'VET', 'DENTIST'].includes(u.role)).length,
  };

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg text-gray-900">User Management</h1>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Total', value: stats.total, color: 'text-blue-600 bg-blue-50' },
          { label: 'Active', value: stats.active, color: 'text-green-600 bg-green-50' },
          { label: 'Suspended', value: stats.suspended, color: 'text-red-600 bg-red-50' },
          { label: 'Doctors', value: stats.doctors, color: 'text-purple-600 bg-purple-50' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-3 text-center ${s.color}`}>
            <p className="font-bold text-lg">{s.value}</p>
            <p className="text-[10px] font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" placeholder="Search users..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <div className="relative">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-3 pr-8 py-2.5 text-sm focus:outline-none focus:border-primary-400">
            {ROLES.map((r) => <option key={r} value={r}>{r === 'ALL' ? 'All Roles' : r}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* User List */}
      <div className="space-y-2">
        {filtered.map((user) => (
          <Card key={user.id} hover onClick={() => setSelectedUser(user)}>
            <div className="flex items-center gap-3">
              <Avatar name={user.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
                  <Badge variant={roleBadge[user.role] || 'neutral'}>{user.role}</Badge>
                </div>
                <p className="text-xs text-gray-400">{user.phone} · {user.email}</p>
                {(user as any).specialization && <p className="text-xs text-gray-500">{(user as any).specialization}</p>}
              </div>
              <div className="flex flex-col items-end gap-1">
                {user.isActive ? (
                  <span className="flex items-center gap-1 text-xs text-green-600"><ToggleRight className="w-4 h-4" /> Active</span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-red-500"><ToggleLeft className="w-4 h-4" /> Suspended</span>
                )}
                <p className="text-[10px] text-gray-400">Joined {user.createdAt}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center">Showing {filtered.length} of {mockUsers.length} users</p>

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-lg flex items-center gap-2"><UserPlus className="w-5 h-5" /> Add New User</h2>
              <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <Input label="Full Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            <Input label="Email" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <Input label="Phone" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
            <Input label="Password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Role</label>
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400">
                {ROLES.filter((r) => r !== 'ALL').map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <Button className="w-full" onClick={() => { alert('User created (mock)'); setShowAdd(false); }}>
              Create User
            </Button>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-lg">User Details</h2>
              <button onClick={() => setSelectedUser(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="flex items-center gap-3">
              <Avatar name={selectedUser.name} size="lg" />
              <div>
                <p className="font-bold text-gray-900">{selectedUser.name}</p>
                <Badge variant={roleBadge[selectedUser.role] || 'neutral'}>{selectedUser.role}</Badge>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Phone</span><span className="font-medium">{selectedUser.phone}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Email</span><span className="font-medium">{selectedUser.email}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Status</span><span className={selectedUser.isActive ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>{selectedUser.isActive ? 'Active' : 'Suspended'}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Joined</span><span className="font-medium">{selectedUser.createdAt}</span></div>
              {selectedUser.specialization && <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-400">Specialization</span><span className="font-medium">{selectedUser.specialization}</span></div>}
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" variant={selectedUser.isActive ? 'danger' : 'primary'} onClick={() => setSelectedUser(null)}>
                {selectedUser.isActive ? 'Suspend' : 'Activate'}
              </Button>
              <Button className="flex-1" variant="secondary" onClick={() => setSelectedUser(null)}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
