import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, ArrowRight, Shield } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';
import { colors, borderRadius, shadows } from '@/constants/theme';

export default function LoginScreen() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const otpRefs = useRef<(TextInput | null)[]>([]);

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
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res: any = await api.post('/auth/verify-otp', { phone, otp: otpString });
      setAuth(res.data.token, res.data.user);
      router.replace('/(app)/(patient)');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    const digit = text.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError('');

    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const devLogin = () => {
    setAuth('dev-token', {
      id: 'dev-1',
      name: 'Dev User',
      phone: '9999999999',
      role: 'PATIENT',
    });
    router.replace('/(app)/(patient)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Header with logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <Text style={styles.title}>MedVek</Text>
          <Text style={styles.subtitle}>Healthcare at your doorstep</Text>
        </View>

        {/* Login card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {step === 'phone' ? 'Welcome back' : 'Verify OTP'}
            </Text>
            <Text style={styles.cardSubtitle}>
              {step === 'phone'
                ? 'Enter your phone number to continue'
                : `Code sent to +91 ${phone}`}
            </Text>

            {step === 'phone' ? (
              <>
                <Input
                  placeholder="10-digit phone number"
                  icon={<Phone size={20} color={colors.gray[400]} />}
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text.replace(/\D/g, '').slice(0, 10));
                    setError('');
                  }}
                  error={error}
                  maxLength={10}
                  keyboardType="phone-pad"
                  autoFocus
                />
                <View style={styles.buttonSpacing}>
                  <Button onPress={sendOtp} loading={loading} fullWidth>
                    Continue
                  </Button>
                </View>
              </>
            ) : (
              <>
                <View style={styles.otpContainer}>
                  {otp.map((digit, i) => (
                    <TextInput
                      key={i}
                      ref={(ref) => { otpRefs.current[i] = ref; }}
                      style={[
                        styles.otpInput,
                        digit ? styles.otpInputFilled : null,
                      ]}
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, i)}
                      onKeyPress={({ nativeEvent }) =>
                        handleOtpKeyPress(nativeEvent.key, i)
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                    />
                  ))}
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.buttonSpacing}>
                  <Button onPress={verifyOtp} loading={loading} fullWidth>
                    Verify & Login
                  </Button>
                </View>
                <TouchableOpacity
                  style={styles.changeNumber}
                  onPress={() => {
                    setStep('phone');
                    setOtp(['', '', '', '', '', '']);
                    setError('');
                  }}
                >
                  <Text style={styles.changeNumberText}>Change number</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Staff login link */}
          <View style={styles.staffLoginWrapper}>
            <Text style={styles.staffLoginLabel}>
              Doctor / Vendor / Lab?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/staff-login')}>
              <Text style={styles.staffLoginLink}>Staff Login</Text>
            </TouchableOpacity>
          </View>

          {/* Dev shortcut */}
          {__DEV__ && (
            <TouchableOpacity style={styles.devButton} onPress={devLogin}>
              <Text style={styles.devButtonText}>[Dev] Skip Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.cream[100],
  },
  header: {
    backgroundColor: colors.primary[500],
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 30,
  },
  title: {
    fontWeight: '800',
    fontSize: 30,
    color: colors.white,
  },
  subtitle: {
    color: colors.primary[200],
    fontSize: 14,
    marginTop: 8,
  },
  cardWrapper: {
    marginTop: -48,
    paddingHorizontal: 24,
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: 24,
    ...shadows.lg,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.gray[900],
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.gray[400],
    marginBottom: 24,
  },
  buttonSpacing: {
    marginTop: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  otpInput: {
    flex: 1,
    height: 56,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.lg,
    color: colors.gray[900],
  },
  otpInputFilled: {
    borderColor: colors.primary[400],
  },
  errorText: {
    fontSize: 13,
    color: colors.red[500],
    marginTop: 4,
  },
  changeNumber: {
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
  },
  changeNumberText: {
    fontSize: 14,
    color: colors.primary[500],
    fontWeight: '500',
  },
  staffLoginWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  staffLoginLabel: {
    fontSize: 14,
    color: colors.gray[400],
  },
  staffLoginLink: {
    fontSize: 14,
    color: colors.primary[500],
    fontWeight: '500',
  },
  devButton: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  devButtonText: {
    fontSize: 12,
    color: colors.gray[300],
  },
});
