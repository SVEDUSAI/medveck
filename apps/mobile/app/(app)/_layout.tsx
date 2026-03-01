import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function AppLayout() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
      return;
    }

    // Route to the correct role group based on user role
    if (user) {
      switch (user.role) {
        case 'PATIENT':
          router.replace('/(app)/(patient)');
          break;
        case 'DOCTOR':
        case 'VET':
        case 'DENTIST':
          router.replace('/(app)/(doctor)');
          break;
        case 'VENDOR':
        case 'LAB':
          router.replace('/(app)/(vendor)');
          break;
        case 'DRIVER':
          router.replace('/(app)/(driver)');
          break;
        case 'ADMIN':
        case 'SUPER_ADMIN':
          router.replace('/(app)/(admin)');
          break;
        default:
          router.replace('/(app)/(patient)');
      }
    }
  }, [isAuthenticated, user?.role]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(patient)" />
      <Stack.Screen name="(doctor)" />
      <Stack.Screen name="(vendor)" />
      <Stack.Screen name="(driver)" />
      <Stack.Screen name="(admin)" />
    </Stack>
  );
}
