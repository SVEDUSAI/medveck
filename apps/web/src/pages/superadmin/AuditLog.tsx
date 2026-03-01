import { useState } from 'react';
import { Search, ChevronDown, Activity, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const actionColors: Record<string, 'success' | 'danger' | 'warning' | 'primary' | 'neutral'> = {
  CREATE_USER: 'success', UPDATE_USER: 'primary', DELETE_USER: 'danger', SUSPEND_USER: 'danger',
  ACTIVATE_USER: 'success', CREATE_ADMIN: 'warning', REMOVE_ADMIN: 'danger',
  UPDATE_PLATFORM_CONFIG: 'neutral',
};

const mockLogs = [
  { id: '1', userId: 'admin-1', userName: 'Admin User', action: 'CREATE_USER', entity: 'User', entityId: 'usr-10', details: 'Created patient Rahul Mehta', createdAt: '2 min ago' },
  { id: '2', userId: 'superadmin-1', userName: 'Super Admin', action: 'UPDATE_PLATFORM_CONFIG', entity: 'PlatformConfig', entityId: null, details: 'Updated commission_percentage to 15', createdAt: '1 hr ago' },
  { id: '3', userId: 'admin-1', userName: 'Admin User', action: 'SUSPEND_USER', entity: 'User', entityId: 'usr-7', details: 'Suspended Sneha Gupta', createdAt: '2 hrs ago' },
  { id: '4', userId: 'admin-1', userName: 'Admin User', action: 'UPDATE_USER', entity: 'User', entityId: 'usr-4', details: 'Updated vendor MedPlus profile', createdAt: '3 hrs ago' },
  { id: '5', userId: 'superadmin-1', userName: 'Super Admin', action: 'CREATE_ADMIN', entity: 'User', entityId: 'usr-9', details: 'Created admin Admin User', createdAt: '1 day ago' },
  { id: '6', userId: 'admin-1', userName: 'Admin User', action: 'CREATE_USER', entity: 'User', entityId: 'usr-6', details: 'Created driver Ravi Kumar', createdAt: '1 day ago' },
  { id: '7', userId: 'admin-1', userName: 'Admin User', action: 'CREATE_USER', entity: 'User', entityId: 'usr-2', details: 'Created doctor Dr. Priya Sharma', createdAt: '2 days ago' },
  { id: '8', userId: 'superadmin-1', userName: 'Super Admin', action: 'ACTIVATE_USER', entity: 'User', entityId: 'usr-3', details: 'Activated Dr. Rajesh Kumar', createdAt: '2 days ago' },
  { id: '9', userId: 'admin-1', userName: 'Admin User', action: 'CREATE_USER', entity: 'User', entityId: 'usr-5', details: 'Created lab Thyrocare', createdAt: '3 days ago' },
  { id: '10', userId: 'superadmin-1', userName: 'Super Admin', action: 'UPDATE_PLATFORM_CONFIG', entity: 'PlatformConfig', entityId: null, details: 'Updated ambulance_base_fare to 500', createdAt: '3 days ago' },
];

const ACTIONS = ['ALL', 'CREATE_USER', 'UPDATE_USER', 'SUSPEND_USER', 'ACTIVATE_USER', 'DELETE_USER', 'CREATE_ADMIN', 'UPDATE_PLATFORM_CONFIG'];

export function AuditLogPage() {
  const [actionFilter, setActionFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = mockLogs.filter((l) => {
    if (actionFilter !== 'ALL' && l.action !== actionFilter) return false;
    if (search && !l.details.toLowerCase().includes(search.toLowerCase()) && !l.userName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="font-heading font-bold text-lg text-gray-900">Audit Log</h1>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
        </div>
        <div className="relative">
          <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-3 pr-8 py-2.5 text-sm focus:outline-none focus:border-primary-400">
            {ACTIONS.map((a) => <option key={a} value={a}>{a === 'ALL' ? 'All Actions' : a.replace(/_/g, ' ')}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((log) => (
          <Card key={log.id}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Activity className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={actionColors[log.action] || 'neutral'}>{log.action.replace(/_/g, ' ')}</Badge>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{log.createdAt}</span>
                </div>
                <p className="text-sm mt-1">{log.details}</p>
                <p className="text-xs text-gray-400 mt-0.5">by {log.userName} · {log.entity}{log.entityId ? ` #${log.entityId}` : ''}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center">Showing {filtered.length} entries</p>
    </div>
  );
}
