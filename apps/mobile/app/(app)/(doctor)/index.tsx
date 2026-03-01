import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  Video,
  Phone,
  MessageSquare,
  Clock,
  Users,
  CheckCircle,
  ChevronRight,
  Activity,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { colors, borderRadius, shadows } from '@/constants/theme';

const waitingPatients = [
  {
    id: '1',
    name: 'Rahul Mehta',
    age: 34,
    type: 'VIDEO',
    typeColor: colors.blue[600],
    typeBg: colors.blue[50],
    symptoms: 'Persistent cough, mild fever for 3 days',
    waitTime: '5 min',
  },
  {
    id: '2',
    name: 'Sneha Patel',
    age: 28,
    type: 'AUDIO',
    typeColor: colors.green[600],
    typeBg: colors.green[50],
    symptoms: 'Skin rash on forearms, itching',
    waitTime: '12 min',
  },
  {
    id: '3',
    name: 'Amit Sharma',
    age: 45,
    type: 'CHAT',
    typeColor: colors.purple[600],
    typeBg: colors.purple[50],
    symptoms: 'Follow-up for blood pressure medication',
    waitTime: '18 min',
  },
];

const typeIconMap: Record<string, React.ElementType> = {
  VIDEO: Video,
  AUDIO: Phone,
  CHAT: MessageSquare,
};

export default function DoctorHome() {
  const { user } = useAuthStore();
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>
              Dr. {user?.name?.split(' ').slice(1).join(' ') || user?.name?.split(' ')[0] || 'Doctor'}
            </Text>
            <Text style={styles.headerSubtitle}>General Physician</Text>
          </View>
          <TouchableOpacity style={styles.notifButton}>
            <Bell size={22} color={colors.gray[600]} strokeWidth={1.8} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Availability toggle */}
        <View style={[styles.availabilityBanner, isAvailable ? styles.availableOn : styles.availableOff]}>
          <View style={styles.availabilityLeft}>
            <View style={[styles.statusDot, { backgroundColor: isAvailable ? colors.green[500] : colors.gray[400] }]} />
            <View>
              <Text style={[styles.availabilityTitle, { color: isAvailable ? colors.green[700] : colors.gray[600] }]}>
                {isAvailable ? 'You are Online' : 'You are Offline'}
              </Text>
              <Text style={[styles.availabilitySubtitle, { color: isAvailable ? colors.green[600] : colors.gray[400] }]}>
                {isAvailable ? 'Accepting new consultations' : 'Not accepting consultations'}
              </Text>
            </View>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: colors.gray[200], true: colors.green[500] }}
            thumbColor={colors.white}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.amber[50] }]}>
            <View style={[styles.statIcon, { backgroundColor: colors.amber[100] }]}>
              <Clock size={20} color={colors.amber[600]} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Waiting</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.blue[50] }]}>
            <View style={[styles.statIcon, { backgroundColor: colors.blue[100] }]}>
              <Users size={20} color={colors.blue[600]} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.green[50] }]}>
            <View style={[styles.statIcon, { backgroundColor: colors.green[100] }]}>
              <CheckCircle size={20} color={colors.green[600]} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Waiting Room */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Waiting Room</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.patientsList}>
            {waitingPatients.map((patient) => {
              const TypeIcon = typeIconMap[patient.type];
              return (
                <Card key={patient.id} padding="sm">
                  <View style={styles.patientRow}>
                    <View style={styles.patientAvatar}>
                      <Text style={styles.patientInitial}>
                        {patient.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.patientInfo}>
                      <View style={styles.patientNameRow}>
                        <Text style={styles.patientName}>{patient.name}</Text>
                        <Text style={styles.patientAge}>{patient.age} yrs</Text>
                      </View>
                      <View style={styles.patientTypeRow}>
                        <View style={[styles.typeBadge, { backgroundColor: patient.typeBg }]}>
                          <TypeIcon size={12} color={patient.typeColor} strokeWidth={2} />
                          <Text style={[styles.typeText, { color: patient.typeColor }]}>
                            {patient.type}
                          </Text>
                        </View>
                        <View style={styles.waitTimeRow}>
                          <Clock size={12} color={colors.gray[400]} strokeWidth={1.8} />
                          <Text style={styles.waitTimeText}>{patient.waitTime}</Text>
                        </View>
                      </View>
                      <Text style={styles.symptoms} numberOfLines={2}>
                        {patient.symptoms}
                      </Text>
                    </View>
                    <ChevronRight size={18} color={colors.gray[300]} />
                  </View>
                  <TouchableOpacity style={styles.startButton} activeOpacity={0.7}>
                    <Text style={styles.startButtonText}>Start Consult</Text>
                  </TouchableOpacity>
                </Card>
              );
            })}
          </View>
        </View>

        {/* Quick tip */}
        <View style={styles.section}>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Activity size={24} color={colors.primary[500]} strokeWidth={1.8} />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Today's Efficiency</Text>
              <Text style={styles.tipDesc}>
                Average consultation time: 12 min. You're 15% faster than last week.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream[50],
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.gray[900],
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.gray[400],
    marginTop: 2,
  },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray[100],
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red[500],
    borderWidth: 2,
    borderColor: colors.white,
  },
  availabilityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    padding: 16,
    marginBottom: 16,
  },
  availableOn: {
    backgroundColor: colors.green[50],
    borderColor: colors.green[100],
  },
  availableOff: {
    backgroundColor: colors.gray[50],
    borderColor: colors.gray[200],
  },
  availabilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  availabilityTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  availabilitySubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: borderRadius.xl,
    gap: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.gray[900],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray[500],
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary[500],
    marginBottom: 12,
  },
  patientsList: {
    gap: 12,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  patientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary[600],
  },
  patientInfo: {
    flex: 1,
  },
  patientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  patientName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray[900],
  },
  patientAge: {
    fontSize: 12,
    color: colors.gray[400],
  },
  patientTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  waitTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  waitTimeText: {
    fontSize: 12,
    color: colors.gray[400],
  },
  symptoms: {
    fontSize: 13,
    color: colors.gray[500],
    marginTop: 6,
    lineHeight: 18,
  },
  startButton: {
    marginTop: 12,
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.lg,
    paddingVertical: 10,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.xl,
    padding: 16,
    gap: 16,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[900],
  },
  tipDesc: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 16,
  },
});
