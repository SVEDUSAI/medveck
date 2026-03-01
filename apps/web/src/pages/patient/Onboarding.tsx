import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, User, MapPin, Heart, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Basic Info', 'Health', 'Address', 'Emergency'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GENDERS = ['Male', 'Female', 'Other'];

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const { updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', dob: '', gender: '', bloodGroup: '',
    street: '', city: '', state: '', pincode: '',
    emergencyContact: '', allergies: '',
  });

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const finish = () => {
    updateUser({ name: form.name });
    navigate('/app');
  };

  const skip = () => navigate('/app');

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Progress */}
      <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">Step {step + 1} of {STEPS.length}</p>
          <button onClick={skip} className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-600">
            <SkipForward className="w-3 h-3" /> Skip
          </button>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-primary-500' : 'bg-gray-200'}`} />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">{STEPS[step]}</p>
      </div>

      <div className="flex-1 px-6 py-6 max-w-md mx-auto w-full">
        {step === 0 && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary-500" />
            </div>
            <h2 className="font-heading font-bold text-xl text-center">What's your name?</h2>
            <p className="text-sm text-gray-400 text-center">Let's get to know you better</p>
            <Input label="Full Name" placeholder="Enter your full name" value={form.name} onChange={(e) => update('name', e.target.value)} autoFocus />
            <Input label="Email (optional)" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="font-heading font-bold text-xl text-center">Health Details</h2>
            <p className="text-sm text-gray-400 text-center">Helps doctors serve you better</p>
            <Input label="Date of Birth" type="date" value={form.dob} onChange={(e) => update('dob', e.target.value)} />
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
              <div className="flex gap-2">
                {GENDERS.map((g) => (
                  <button key={g} onClick={() => update('gender', g)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border ${form.gender === g ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-gray-600 border-gray-200'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Blood Group</label>
              <div className="grid grid-cols-4 gap-2">
                {BLOOD_GROUPS.map((bg) => (
                  <button key={bg} onClick={() => update('bloodGroup', bg)}
                    className={`py-2 rounded-xl text-sm font-medium border ${form.bloodGroup === bg ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-600 border-gray-200'}`}>
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="font-heading font-bold text-xl text-center">Your Address</h2>
            <p className="text-sm text-gray-400 text-center">For home visits & medicine delivery</p>
            <Input label="Street / Area" placeholder="Street name, building" value={form.street} onChange={(e) => update('street', e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} />
              <Input label="State" placeholder="State" value={form.state} onChange={(e) => update('state', e.target.value)} />
            </div>
            <Input label="Pincode" placeholder="6-digit pincode" value={form.pincode} onChange={(e) => update('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="font-heading font-bold text-xl text-center">Almost Done!</h2>
            <p className="text-sm text-gray-400 text-center">Emergency contact & allergies (optional)</p>
            <Input label="Emergency Contact" placeholder="Phone number" value={form.emergencyContact} onChange={(e) => update('emergencyContact', e.target.value)} />
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Known Allergies</label>
              <textarea placeholder="e.g., Penicillin, Sulfa drugs (comma separated)" value={form.allergies}
                onChange={(e) => update('allergies', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-primary-400" rows={3} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className="bg-white border-t border-gray-100 px-6 py-4">
        <div className="max-w-md mx-auto flex gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button className="flex-1" onClick={() => setStep(step + 1)}>
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button className="flex-1" onClick={finish}>
              Get Started <Check className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
