import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Video,
  Pill,
  FlaskConical,
  Ambulance,
  Home as HomeIcon,
  Heart,
  Stethoscope,
  UserCheck,
} from 'lucide-react-native';
import { colors, borderRadius } from '@/constants/theme';

const services = [
  {
    icon: Video,
    label: 'Consult\nDoctor',
    route: '/(app)/(patient)/consult',
    bgColor: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    icon: Pill,
    label: 'Order\nMedicines',
    route: '/(app)/(patient)/medicines',
    bgColor: '#F0FDF4',
    iconColor: '#16A34A',
  },
  {
    icon: FlaskConical,
    label: 'Book\nLab Test',
    route: '/(app)/(patient)/labs',
    bgColor: '#FAF5FF',
    iconColor: '#9333EA',
  },
  {
    icon: Ambulance,
    label: 'Emergency\nAmbulance',
    route: '/(app)/(patient)/consult',
    bgColor: '#FEF2F2',
    iconColor: '#DC2626',
  },
  {
    icon: HomeIcon,
    label: 'Home\nVisit',
    route: '/(app)/(patient)/consult',
    bgColor: '#FFFBEB',
    iconColor: '#D97706',
  },
  {
    icon: Heart,
    label: 'Nurse\nCare',
    route: '/(app)/(patient)/consult',
    bgColor: '#FDF2F8',
    iconColor: '#DB2777',
  },
  {
    icon: Stethoscope,
    label: 'Veterinary',
    route: '/(app)/(patient)/consult',
    bgColor: '#F0FDFA',
    iconColor: '#0D9488',
  },
  {
    icon: UserCheck,
    label: 'Dental\nCare',
    route: '/(app)/(patient)/consult',
    bgColor: '#EEF2FF',
    iconColor: '#4F46E5',
  },
];

export function ServiceGrid() {
  const router = useRouter();

  return (
    <View style={styles.grid}>
      {services.map((service) => {
        const IconComponent = service.icon;
        return (
          <TouchableOpacity
            key={service.label}
            style={styles.serviceItem}
            onPress={() => router.push(service.route as any)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: service.bgColor },
              ]}
            >
              <IconComponent
                size={24}
                color={service.iconColor}
                strokeWidth={1.8}
              />
            </View>
            <Text style={styles.serviceLabel}>{service.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceItem: {
    width: '22%',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 14,
  },
});
