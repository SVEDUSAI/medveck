import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';

const staffRoles = [
  { label: 'Doctor', value: 'DOCTOR' },
  { label: 'Veterinary', value: 'VET' },
  { label: 'Dentist', value: 'DENTIST' },
  { label: 'Vendor', value: 'VENDOR' },
  { label: 'Lab', value: 'LAB' },
  { label: 'Driver', value: 'DRIVER' },
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Super Admin', value: 'SUPER_ADMIN' },
];

export function StaffLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    try {
      const res: any = await api.post('/auth/staff-login', { email, password });
      setAuth(res.data.token, res.data.user);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) { setError('Enter your email first'); return; }
    try {
      await api.post('/auth/forgot-password', { email });
      setError('');
      alert('If an account exists with this email, a reset link has been sent.');
    } catch { setError('Something went wrong'); }
  };

  const devLoginAs = (role: string) => {
    setAuth('dev-token', { id: `dev-${role}`, name: `Dev ${role}`, phone: '9999999999', email: `dev@${role}.com`, role });
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <div className="bg-primary-500 pt-12 pb-20 px-6 rounded-b-[40px]">
        <div className="max-w-sm mx-auto">
          <button onClick={() => navigate('/login')} className="text-primary-200 text-sm mb-8 hover:text-white transition-colors">
            ← Back to patient login
          </button>
          <h1 className="font-heading font-extrabold text-2xl text-white">Staff Login</h1>
          <p className="text-primary-200 mt-1 text-sm">For doctors, vendors, labs, drivers & admins</p>
        </div>
      </div>

      <div className="max-w-sm mx-auto w-full px-6 -mt-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <Input label="Email" type="email" placeholder="your@email.com" icon={<Mail className="w-5 h-5" />}
            value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} />
          <div className="relative">
            <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Your password"
              icon={<Lock className="w-5 h-5" />} value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }} error={error} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button onClick={handleForgotPassword} className="text-xs text-primary-500 font-medium hover:underline">
            Forgot password?
          </button>

          <Button className="w-full" onClick={handleLogin} loading={loading}>
            Sign In <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="mt-4 bg-white/80 rounded-2xl p-4 border border-gray-100">
          <p className="text-xs text-gray-400 font-medium mb-2">Test credentials (after seeding DB):</p>
          <div className="space-y-1 text-[11px] text-gray-500">
            <p>Super Admin: <span className="font-mono">superadmin@medvek.com</span> / admin123</p>
            <p>Admin: <span className="font-mono">admin@medvek.com</span> / admin123</p>
            <p>Doctor: <span className="font-mono">priya@medvek.com</span> / password123</p>
            <p>Vendor: <span className="font-mono">medplus@medvek.com</span> / password123</p>
            <p>Lab: <span className="font-mono">thyrocare@medvek.com</span> / password123</p>
            <p>Driver: <span className="font-mono">ravi.driver@medvek.com</span> / password123</p>
          </div>
        </div>

        {import.meta.env.DEV && (
          <div className="mt-4">
            <p className="text-xs text-gray-400 text-center mb-3">[Dev] Quick login as:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {staffRoles.map((r) => (
                <button key={r.value} onClick={() => devLoginAs(r.value)}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-primary-400 hover:text-primary-500 transition-colors">
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
