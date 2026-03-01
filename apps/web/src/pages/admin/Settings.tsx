import { useState } from 'react';
import { Save, Bell, CreditCard, Ambulance, Stethoscope, Settings as SettingsIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    appName: 'MedVek', supportEmail: 'support@medvek.com', supportPhone: '+91-1800-MEDVEK', maintenanceMode: false,
    emailNotifs: true, smsNotifs: true, pushNotifs: true,
    commissionPct: 15, minOrderAmount: 100,
    ambulanceBaseFare: 500, ambulancePerKm: 20, surgeMultiplier: 1.5,
    defaultFee: 500, maxWaitMinutes: 15, autoCancelMinutes: 30,
  });

  const update = (key: string, value: any) => setSettings({ ...settings, [key]: value });

  const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-primary-500">{icon}</div>
        <h2 className="font-heading font-bold text-sm text-gray-900">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </Card>
  );

  const Field = ({ label, value, onChange, type = 'text' }: any) => (
    <div className="flex items-center justify-between">
      <label className="text-sm text-gray-600">{label}</label>
      {type === 'toggle' ? (
        <button onClick={() => onChange(!value)} className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          className="w-40 text-right border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-400" />
      )}
    </div>
  );

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg text-gray-900">Settings</h1>
        <Button size="sm" onClick={() => alert('Settings saved!')}><Save className="w-4 h-4 mr-1" /> Save All</Button>
      </div>

      <Section title="Platform Settings" icon={<SettingsIcon className="w-4 h-4" />}>
        <Field label="App Name" value={settings.appName} onChange={(v: string) => update('appName', v)} />
        <Field label="Support Email" value={settings.supportEmail} onChange={(v: string) => update('supportEmail', v)} type="email" />
        <Field label="Support Phone" value={settings.supportPhone} onChange={(v: string) => update('supportPhone', v)} />
        <Field label="Maintenance Mode" value={settings.maintenanceMode} onChange={(v: boolean) => update('maintenanceMode', v)} type="toggle" />
      </Section>

      <Section title="Notifications" icon={<Bell className="w-4 h-4" />}>
        <Field label="Email Notifications" value={settings.emailNotifs} onChange={(v: boolean) => update('emailNotifs', v)} type="toggle" />
        <Field label="SMS Notifications" value={settings.smsNotifs} onChange={(v: boolean) => update('smsNotifs', v)} type="toggle" />
        <Field label="Push Notifications" value={settings.pushNotifs} onChange={(v: boolean) => update('pushNotifs', v)} type="toggle" />
      </Section>

      <Section title="Payment Settings" icon={<CreditCard className="w-4 h-4" />}>
        <Field label="Commission (%)" value={settings.commissionPct} onChange={(v: number) => update('commissionPct', v)} type="number" />
        <Field label="Min Order Amount (₹)" value={settings.minOrderAmount} onChange={(v: number) => update('minOrderAmount', v)} type="number" />
      </Section>

      <Section title="Ambulance Settings" icon={<Ambulance className="w-4 h-4" />}>
        <Field label="Base Fare (₹)" value={settings.ambulanceBaseFare} onChange={(v: number) => update('ambulanceBaseFare', v)} type="number" />
        <Field label="Per KM Rate (₹)" value={settings.ambulancePerKm} onChange={(v: number) => update('ambulancePerKm', v)} type="number" />
        <Field label="Surge Multiplier" value={settings.surgeMultiplier} onChange={(v: number) => update('surgeMultiplier', v)} type="number" />
      </Section>

      <Section title="Consultation Settings" icon={<Stethoscope className="w-4 h-4" />}>
        <Field label="Default Fee (₹)" value={settings.defaultFee} onChange={(v: number) => update('defaultFee', v)} type="number" />
        <Field label="Max Wait (min)" value={settings.maxWaitMinutes} onChange={(v: number) => update('maxWaitMinutes', v)} type="number" />
        <Field label="Auto-Cancel (min)" value={settings.autoCancelMinutes} onChange={(v: number) => update('autoCancelMinutes', v)} type="number" />
      </Section>
    </div>
  );
}
