import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Video,
  Phone,
  MessageSquare,
  Star,
  Clock,
  ChevronRight,
  Search,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, borderRadius, shadows } from '@/constants/theme';

const consultTypes = [
  { id: 'video', label: 'Video Call', icon: Video, color: colors.blue[600], bg: colors.blue[50] },
  { id: 'audio', label: 'Audio Call', icon: Phone, color: colors.green[600], bg: colors.green[50] },
  { id: 'chat', label: 'Chat', icon: MessageSquare, color: colors.purple[600], bg: colors.purple[50] },
];

const specialties = [
  'General Physician',
  'Dermatologist',
  'Pediatrician',
  'Gynecologist',
  'ENT',
  'Orthopedic',
  'Cardiologist',
  'Neurologist',
];

const doctors = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    experience: 12,
    rating: 4.8,
    reviews: 234,
    fee: 299,
    available: true,
    hospital: 'Apollo Hospital',
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Dermatologist',
    experience: 8,
    rating: 4.6,
    reviews: 156,
    fee: 399,
    available: true,
    hospital: 'KIMS Hospital',
  },
  {
    id: '3',
    name: 'Dr. Anita Reddy',
    specialty: 'Pediatrician',
    experience: 15,
    rating: 4.9,
    reviews: 312,
    fee: 349,
    available: false,
    hospital: 'Care Hospital',
  },
];

export default function ConsultScreen() {
  const [selectedType, setSelectedType] = useState('video');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Consult a Doctor</Text>
        <Text style={styles.pageSubtitle}>
          Connect with verified doctors instantly
        </Text>

        {/* Consult type selector */}
        <View style={styles.typesRow}>
          {consultTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  isSelected && { borderColor: colors.primary[400], backgroundColor: colors.primary[50] },
                ]}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.typeIcon, { backgroundColor: type.bg }]}>
                  <Icon size={22} color={type.color} strokeWidth={1.8} />
                </View>
                <Text
                  style={[
                    styles.typeLabel,
                    isSelected && { color: colors.primary[600] },
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Search */}
        <Input
          placeholder="Search doctors by name or specialty"
          icon={<Search size={18} color={colors.gray[400]} />}
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchInput}
        />

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialtiesRow}
          >
            {specialties.map((sp) => (
              <TouchableOpacity
                key={sp}
                style={[
                  styles.specialtyChip,
                  selectedSpecialty === sp && styles.specialtyChipActive,
                ]}
                onPress={() =>
                  setSelectedSpecialty(selectedSpecialty === sp ? null : sp)
                }
              >
                <Text
                  style={[
                    styles.specialtyText,
                    selectedSpecialty === sp && styles.specialtyTextActive,
                  ]}
                >
                  {sp}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Doctors list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Doctors</Text>
          <View style={styles.doctorsList}>
            {doctors.map((doc) => (
              <Card key={doc.id} padding="sm">
                <View style={styles.doctorRow}>
                  <Avatar name={doc.name} size="lg" />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doc.name}</Text>
                    <Text style={styles.doctorSpecialty}>
                      {doc.specialty} · {doc.experience} yrs
                    </Text>
                    <Text style={styles.doctorHospital}>{doc.hospital}</Text>
                    <View style={styles.doctorMeta}>
                      <View style={styles.ratingRow}>
                        <Star
                          size={14}
                          color={colors.amber[500]}
                          fill={colors.amber[500]}
                        />
                        <Text style={styles.ratingText}>
                          {doc.rating} ({doc.reviews})
                        </Text>
                      </View>
                      <Text style={styles.feeText}>₹{doc.fee}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.doctorActions}>
                  {doc.available ? (
                    <Button size="sm" fullWidth>
                      Consult Now
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" fullWidth>
                      Schedule
                    </Button>
                  )}
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream[50],
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.gray[900],
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.gray[400],
    marginTop: 4,
    marginBottom: 20,
  },
  typesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  typeCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.gray[100],
    gap: 8,
  },
  typeIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[600],
  },
  searchInput: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 12,
  },
  specialtiesRow: {
    gap: 8,
  },
  specialtyChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  specialtyChipActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  specialtyText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.gray[600],
  },
  specialtyTextActive: {
    color: colors.white,
  },
  doctorsList: {
    gap: 12,
  },
  doctorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray[900],
  },
  doctorSpecialty: {
    fontSize: 13,
    color: colors.gray[500],
    marginTop: 2,
  },
  doctorHospital: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 2,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray[600],
  },
  feeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary[500],
  },
  doctorActions: {
    marginTop: 12,
  },
});
