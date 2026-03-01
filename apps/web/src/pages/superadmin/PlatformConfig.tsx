import { useState } from 'react';
import { Save, Settings, CreditCard, Bell, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ConfigItem { key: string; label: string; value: any; type: 'text' | 'number' | 'boolean'; }

const initialConfig: Record<string, ConfigItem[]> = {
  General: [
    { key: 'app_name', label: 'Application Name', value: 'MedVek', type: 'text' },
    { key: 'support_email', label: 'Support Email', value: 'support@medvek.com', type: 'text' },
    { key: 'support_phone', label: 'Support Phone', value: '+91-1800-MEDVEK', type: 'text' },
    { key: 'maintenance_mode', label: 'Maintenance Mode', value: false, type: 'boolean' },
  ],
  Payments: [
    { key: 'commission_percentage', label: 'Commission (%)', value: 15, type: 'number' },
    { key: 'min_order_amount', label: 'Min Order Amount (₹)', value: 100, type: 'number' },
    { key: 'ambulance_base_fare', label: 'Ambulance Base Fare (₹)', value: 500, type: 'number' },
    { key: 'ambulance_per_km', label: 'Ambulance Per KM (₹)', value: 20, type: 'number' },
    { key: 'default_consultation_fee', label: 'Default Consultation Fee (₹)', value: 500, type: 'number' },
  ],
  Notifications: [
    { key: 'sms_enabled', label: 'SMS Notifications', value: true, type: 'boolean' },
    { key: 'email_enabled', label: 'Email Notifications', value: true, type: 'boolean' },
    { key: 'push_enabled', label: 'Push Notifications', value: true, type: 'boolean' },
  ],
  Security: [
    { key: 'max_login_attempts', label: 'Max Login Attempts', value: 5, type: 'number' },
    { key: 'otp_expiry_minutes', label: 'OTP Expiry (min)', value: 5, type: 'number' },
    { key: 'session_timeout_days', label: 'Session Timeout (days)', value: 30, type: 'number' },
    { key: 'require_email_verification', label: 'Require Email Verification', value: false, type: 'boolean' },
  ],
};

const sectionIcons: Record<string, React.ReactNode> = {
  General: <Settings className="w-4 h-4" />,
  Payments: <CreditCard className="w-4 h-4" />,
  Notifications: <Bell className="w-4 h-4" />,
  Security: <Shield className="w-4 h-4" />,
};

export function PlatformConfigPage() {
  const [config, setConfig] = useState(initialConfig);
  const [hasChanges, setHasChanges] = useState(false);

  const updateValue = (section: string, key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => item.key === key ? { ...item, value } : item),
    }));
    setHasChanges(true);
  };

  const saveAll = () => {
    alert('Platform config saved!');
    setHasChanges(false);
  };

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg text-gray-900">Platform Configuration</h1>
        {hasChanges && (
          <Button size="sm" onClick={saveAll}><Save className="w-4 h-4 mr-1" /> Save All</Button>
        )}
      </div>

      {Object.entries(config).map(([section, items]) => (
        <Card key={section}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-primary-500">{sectionIcons[section]}</div>
            <h2 className="font-heading font-bold text-sm text-gray-900">{section}</h2>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-gray-700">{item.label}</label>
                  <p className="text-[10px] text-gray-400 font-mono">{item.key}</p>
                </div>
                {item.type === 'boolean' ? (
                  <button onClick={() => updateValue(section, item.key, !item.value)}
                    className={`w-11 h-6 rounded-full transition-colors ${item.value ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${item.value ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                ) : (
                  <input type={item.type} value={item.value}
                    onChange={(e) => updateValue(section, item.key, item.type === 'number' ? Number(e.target.value) : e.target.value)}
                    className="w-44 text-right border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-400" />
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}

      {hasChanges && (
        <div className="sticky bottom-20 px-4">
          <Button className="w-full shadow-lg" onClick={saveAll}><Save className="w-4 h-4 mr-1" /> Save All Changes</Button>
        </div>
      )}
    </div>
  );
}
