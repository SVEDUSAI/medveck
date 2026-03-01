import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { colors, borderRadius, shadows } from '@/constants/theme';

const staffRoles = [
  { label: 'Doctor', value: 'DOCTOR', route: '/(app)/(doctor)' },
  { label: 'Veterinary', value: 'VET', route: '/(app)/(doctor)' },
  { label: 'Dentist', value: 'DENTIST', route: '/(app)/(doctor)' },
  { label: 'Vendor', value: 'VENDOR', route: '/(app)/(vendor)' },
  { label: 'Lab', value: 'LAB', route: '/(app)/(vendor)' },
  { label: 'Driver', value: 'DRIVER', route: '/(app)/(driver)' },
  { label: 'Admin', value: 'ADMIN', route: '/(app)/(admin)' },
];

export default function StaffLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    // TODO: real API call
    setTimeout(() => {
      setLoading(false);
      setError('Backend not connected yet');
    }, 1000);
  };

  const devLoginAs = (role: string, route: string) => {
    setAuth('dev-token', {
      id: `dev-${role}`,
      name: `Dev ${role}`,
      phone: '9999999999',
      email: `dev@${role.toLowerCase()}.com`,
      role,
    });
    router.replace(route as any);
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>Back to patient login</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Staff Login</Text>
          <Text style={styles.subtitle}>
            For doctors, vendors, labs, drivers & admins
          </Text>
        </View>

        {/* Login card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Input
              label="Email"
              placeholder="your@email.com"
              icon={<Mail size={20} color={colors.gray[400]} />}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.inputSpacing}
            />
            <Input
              label="Password"
              placeholder="Your password"
              icon={<Lock size={20} color={colors.gray[400]} />}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={error}
              containerStyle={styles.inputSpacing}
            />
            <View style={styles.buttonSpacing}>
              <Button onPress={handleLogin} loading={loading} fullWidth>
                Sign In
              </Button>
            </View>
          </View>

          {/* Dev shortcuts */}
          {__DEV__ && (
            <View style={styles.devSection}>
              <Text style={styles.devLabel}>[Dev] Quick login as:</Text>
              <View style={styles.devRoles}>
                {staffRoles.map((r) => (
                  <TouchableOpacity
                    key={r.value}
                    style={styles.devRoleButton}
                    onPress={() => devLoginAs(r.value, r.route)}
                  >
                    <Text style={styles.devRoleText}>{r.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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
    paddingTop: 64,
    paddingBottom: 64,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    color: colors.primary[200],
    fontSize: 14,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    color: colors.white,
  },
  subtitle: {
    color: colors.primary[200],
    fontSize: 14,
    marginTop: 4,
  },
  cardWrapper: {
    marginTop: -40,
    paddingHorizontal: 24,
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: 24,
    ...shadows.lg,
  },
  inputSpacing: {
    marginBottom: 16,
  },
  buttonSpacing: {
    marginTop: 8,
  },
  devSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  devLabel: {
    fontSize: 12,
    color: colors.gray[400],
    marginBottom: 12,
  },
  devRoles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  devRoleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.full,
  },
  devRoleText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray[600],
  },
});
