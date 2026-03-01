import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';

export function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const sendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/send-otp', { phone });
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res: any = await api.post('/auth/verify-otp', { phone, otp });
      setAuth(res.data.token, res.data.user);
      navigate(res.data.isNewUser ? '/onboarding' : '/app');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // Dev mode: skip auth
  const devLogin = () => {
    setAuth('dev-token', { id: 'dev-1', name: 'Dev User', phone: '9999999999', role: 'PATIENT' });
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Top section */}
      <div className="bg-primary-500 pt-16 pb-24 px-6 rounded-b-[40px]">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <span className="text-white font-extrabold text-3xl font-heading">M</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl text-white">MedVek</h1>
          <p className="text-primary-200 mt-2 text-sm">Healthcare at your doorstep</p>
        </div>
      </div>

      {/* Card pulled up */}
      <div className="max-w-sm mx-auto w-full px-6 -mt-12 flex-1">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="font-heading font-bold text-lg text-gray-900 mb-1">
            {step === 'phone' ? 'Welcome back' : 'Verify OTP'}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {step === 'phone'
              ? 'Enter your phone number to continue'
              : <>Code sent to <span className="font-medium text-gray-600">+91 {phone}</span></>
            }
          </p>

          {step === 'phone' ? (
            <>
              <Input
                placeholder="10-digit phone number"
                icon={<Phone className="w-5 h-5" />}
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                error={error}
                maxLength={10}
                autoFocus
              />
              <Button className="w-full mt-4" onClick={sendOtp} loading={loading}>
                Continue <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </>
          ) : (
            <>
              <div className="flex gap-2 mb-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ''}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl
                               focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const newOtp = otp.split('');
                      newOtp[i] = val;
                      setOtp(newOtp.join('').slice(0, 6));
                      if (val && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && e.currentTarget.previousElementSibling) {
                        (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                      }
                    }}
                  />
                ))}
              </div>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              <Button className="w-full mt-4" onClick={verifyOtp} loading={loading}>
                Verify & Login <Shield className="w-4 h-4 ml-1" />
              </Button>
              <button
                className="w-full mt-3 text-sm text-primary-500 font-medium hover:underline"
                onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
              >
                Change number
              </button>
            </>
          )}
        </div>

        {/* Staff login link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Doctor / Vendor / Lab?{' '}
          <button onClick={() => navigate('/staff-login')} className="text-primary-500 font-medium">Staff Login</button>
        </p>

        {/* Dev shortcut */}
        {import.meta.env.DEV && (
          <button onClick={devLogin} className="w-full mt-4 text-xs text-gray-300 hover:text-gray-500 py-2">
            [Dev] Skip Login →
          </button>
        )}
      </div>
    </div>
  );
}
