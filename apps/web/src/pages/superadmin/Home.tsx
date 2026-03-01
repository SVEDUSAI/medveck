import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  Shield, Users, Activity, Database, Wifi, Server, Plus, Trash2, ChevronRight, Clock, X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function SuperAdminHome() {
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const healthChecks = [
    { label: 'API Server', status: 'healthy', icon: <Server className="w-4 h-4" /> },
    { label: 'Database', status: 'healthy', icon: <Database className="w-4 h-4" /> },
    { label: 'WebSocket', status: 'healthy', icon: <Wifi className="w-4 h-4" /> },
  ];

  const admins = [
    { id: '1', name: 'Super Admin', email: 'superadmin@medvek.com', role: 'SUPER_ADMIN', isActive: true, lastLogin: '2 min ago' },
    { id: '2', name: 'Admin User', email: 'admin@medvek.com', role: 'ADMIN', isActive: true, lastLogin: '1 hr ago' },
  ];

  const recentAudit = [
    { action: 'CREATE_USER', entity: 'User', user: 'Admin User', time: '10 min ago', details: 'Created Dr. New Doctor' },
    { action: 'UPDATE_PLATFORM_CONFIG', entity: 'PlatformConfig', user: 'Super Admin', time: '1 hr ago', details: 'Updated commission rate' },
    { action: 'SUSPEND_USER', entity: 'User', user: 'Admin User', time: '2 hrs ago', details: 'Suspended user Sneha Gupta' },
    { action: 'UPDATE_USER', entity: 'User', user: 'Admin User', time: '3 hrs ago', details: 'Updated vendor profile' },
  ];

  const platformStats = [
    { label: 'Total Users', value: '2,856' },
    { label: 'Total Orders', value: '12,450' },
    { label: 'Total Revenue', value: '₹1.25Cr' },
    { label: 'Uptime', value: '99.9%' },
  ];

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary-500" />
        <h1 className="font-heading font-bold text-lg text-gray-900">Super Admin</h1>
      </div>

      {/* Platform Health */}
      <Card>
        <h2 className="font-heading font-bold text-sm mb-3">Platform Health</h2>
        <div className="flex gap-3">
          {healthChecks.map((h) => (
            <div key={h.label} className="flex-1 flex items-center gap-2 bg-green-50 rounded-xl p-3">
              <div className="text-green-600">{h.icon}</div>
              <div>
                <p className="text-[10px] text-gray-500">{h.label}</p>
                <p className="text-xs font-medium text-green-700">{h.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {platformStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-gray-100">
            <p className="font-bold text-sm">{s.value}</p>
            <p className="text-[9px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Admin Management */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-sm">Admin Users</h2>
          <button onClick={() => setShowAddAdmin(true)} className="text-primary-500 text-xs font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
        </div>
        <div className="space-y-2">
          {admins.map((a) => (
            <div key={a.id} className="flex items-center gap-3 py-2">
              <Avatar name={a.name} size="sm" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{a.name}</p>
                  <Badge variant={a.role === 'SUPER_ADMIN' ? 'danger' : 'warning'}>{a.role}</Badge>
                </div>
                <p className="text-xs text-gray-400">{a.email} · Last: {a.lastLogin}</p>
              </div>
              {a.role !== 'SUPER_ADMIN' && (
                <button className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Audit */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-sm">Recent Activity</h2>
          <Link to="/app/audit-log" className="text-primary-500 text-xs font-medium flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></Link>
        </div>
        <div className="space-y-2">
          {recentAudit.map((a, i) => (
            <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                <Activity className="w-3 h-3 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm"><span className="font-medium">{a.user}</span> <span className="text-gray-400">·</span> {a.details}</p>
                <p className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {[
          { label: 'Audit Log', to: '/app/audit-log' },
          { label: 'Platform Config', to: '/app/platform-config' },
          { label: 'All Users', to: '/app/users' },
          { label: 'Analytics', to: '/app/analytics' },
        ].map((l) => (
          <Link key={l.label} to={l.to} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">{l.label}</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </Link>
        ))}
      </div>

      {showAddAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between"><h2 className="font-heading font-bold text-lg">Add Admin</h2><button onClick={() => setShowAddAdmin(false)}><X className="w-5 h-5 text-gray-400" /></button></div>
            <input placeholder="Full Name" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm" />
            <input placeholder="Email" type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm" />
            <input placeholder="Phone" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm" />
            <input placeholder="Password" type="password" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm" />
            <Button className="w-full" onClick={() => { alert('Admin created (mock)'); setShowAddAdmin(false); }}>Create Admin</Button>
          </div>
        </div>
      )}
    </div>
  );
}
