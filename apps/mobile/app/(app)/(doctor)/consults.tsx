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
  Clock,
  ChevronRight,
  Play,
  CheckCircle,
  AlertCircle,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { colors, borderRadius, shadows } from '@/constants/theme';

type ConsultStatus = 'waiting' | 'in_progress' | 'completed';

interface Consultation {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  type: 'VIDEO' | 'AUDIO' | 'CHAT';
  status: ConsultStatus;
  symptoms: string;
  scheduledTime: string;
  duration?: string;
}

const consultations: Consultation[] = [
  {
    id: '1',
    patientName: 'Rahul Mehta',
    age: 34,
    gender: 'M',
    type: 'VIDEO',
    status: 'waiting',
    symptoms: 'Persistent cough, mild fever for 3 days',
    scheduledTime: '10:00 AM',
  },
  {
    id: '2',
    patientName: 'Sneha Patel',
    age: 28,
    gender: 'F',
    type: 'AUDIO',
    status: 'waiting',
    symptoms: 'Skin rash on forearms, itching',
    scheduledTime: '10:30 AM',
  },
  {
    id: '3',
    patientName: 'Amit Sharma',
    age: 45,
    gender: 'M',
    type: 'CHAT',
    status: 'waiting',
    symptoms: 'Follow-up for blood pressure medication',
    scheduledTime: '11:00 AM',
  },
  {
    id: '4',
    patientName: 'Priya Verma',
    age: 32,
    gender: 'F',
    type: 'VIDEO',
    status: 'in_progress',
    symptoms: 'Headache and dizziness since morning',
    scheduledTime: '9:30 AM',
    duration: '8 min',
  },
  {
    id: '5',
    patientName: 'Vikram Singh',
    age: 52,
    gender: 'M',
    type: 'VIDEO',
    status: 'completed',
    symptoms: 'Joint pain in knees, difficulty walking',
    scheduledTime: '8:30 AM',
    duration: '15 min',
  },
  {
    id: '6',
    patientName: 'Meena Devi',
    age: 60,
    gender: 'F',
    type: 'AUDIO',
    status: 'completed',
    symptoms: 'Diabetes follow-up, sugar level review',
    scheduledTime: '8:00 AM',
    duration: '10 min',
  },
  {
    id: '7',
    patientName: 'Karan Malhotra',
    age: 29,
    gender: 'M',
    type: 'CHAT',
    status: 'completed',
    symptoms: 'Acidity and stomach discomfort',
    scheduledTime: '9:00 AM',
    duration: '7 min',
  },
  {
    id: '8',
    patientName: 'Ritu Gupta',
    age: 38,
    gender: 'F',
    type: 'VIDEO',
    status: 'completed',
    symptoms: 'Allergic rhinitis, sneezing',
    scheduledTime: '7:30 AM',
    duration: '12 min',
  },
  {
    id: '9',
    patientName: 'Deepak Joshi',
    age: 41,
    gender: 'M',
    type: 'AUDIO',
    status: 'completed',
    symptoms: 'Back pain, follow-up after physiotherapy',
    scheduledTime: '7:00 AM',
    duration: '9 min',
  },
];

const tabs: { key: ConsultStatus; label: string }[] = [
  { key: 'waiting', label: 'Waiting' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
];

const typeIconMap: Record<string, React.ElementType> = {
  VIDEO: Video,
  AUDIO: Phone,
  CHAT: MessageSquare,
};

const typeColorMap: Record<string, { color: string; bg: string }> = {
  VIDEO: { color: colors.blue[600], bg: colors.blue[50] },
  AUDIO: { color: colors.green[600], bg: colors.green[50] },
  CHAT: { color: colors.purple[600], bg: colors.purple[50] },
};

export default function DoctorConsults() {
  const [activeTab, setActiveTab] = useState<ConsultStatus>('waiting');

  const filteredConsults = consultations.filter((c) => c.status === activeTab);

  const getStatusCounts = (status: ConsultStatus) =>
    consultations.filter((c) => c.status === status).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>Consultations</Text>
        <Text style={styles.pageSubtitle}>
          Manage your patient consultations
        </Text>

        {/* Status tabs */}
        <View style={styles.tabsRow}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const count = getStatusCounts(tab.key);
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
                <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
                  <Text style={[styles.tabBadgeText, isActive && styles.tabBadgeTextActive]}>
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredConsults.length === 0 ? (
          <View style={styles.emptyState}>
            <CheckCircle size={48} color={colors.gray[200]} strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No consultations</Text>
            <Text style={styles.emptySubtitle}>
              No {activeTab.replace('_', ' ')} consultations at the moment
            </Text>
          </View>
        ) : (
          <View style={styles.consultsList}>
            {filteredConsults.map((consult) => {
              const TypeIcon = typeIconMap[consult.type];
              const typeColors = typeColorMap[consult.type];
              return (
                <Card key={consult.id} padding="sm">
                  <View style={styles.consultRow}>
                    <View style={styles.consultAvatar}>
                      <Text style={styles.consultInitial}>
                        {consult.patientName.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.consultInfo}>
                      <View style={styles.consultNameRow}>
                        <Text style={styles.consultName}>{consult.patientName}</Text>
                        <Text style={styles.consultAge}>
                          {consult.age} yrs, {consult.gender}
                        </Text>
                      </View>
                      <Text style={styles.consultSymptoms} numberOfLines={1}>
                        {consult.symptoms}
                      </Text>
                      <View style={styles.consultMeta}>
                        <View style={[styles.typeBadge, { backgroundColor: typeColors.bg }]}>
                          <TypeIcon size={12} color={typeColors.color} strokeWidth={2} />
                          <Text style={[styles.typeText, { color: typeColors.color }]}>
                            {consult.type}
                          </Text>
                        </View>
                        <View style={styles.timeRow}>
                          <Clock size={12} color={colors.gray[400]} strokeWidth={1.8} />
                          <Text style={styles.timeText}>{consult.scheduledTime}</Text>
                        </View>
                        {consult.duration && (
                          <Text style={styles.durationText}>{consult.duration}</Text>
                        )}
                      </View>
                    </View>
                  </View>

                  {/* Action button based on status */}
                  {consult.status === 'waiting' && (
                    <TouchableOpacity style={styles.startButton} activeOpacity={0.7}>
                      <Play size={16} color={colors.white} strokeWidth={2} />
                      <Text style={styles.startButtonText}>Start Consultation</Text>
                    </TouchableOpacity>
                  )}
                  {consult.status === 'in_progress' && (
                    <TouchableOpacity style={styles.resumeButton} activeOpacity={0.7}>
                      <Video size={16} color={colors.white} strokeWidth={2} />
                      <Text style={styles.resumeButtonText}>Resume Consultation</Text>
                    </TouchableOpacity>
                  )}
                  {consult.status === 'completed' && (
                    <TouchableOpacity style={styles.viewButton} activeOpacity={0.7}>
                      <Text style={styles.viewButtonText}>View Summary</Text>
                      <ChevronRight size={16} color={colors.primary[500]} strokeWidth={2} />
                    </TouchableOpacity>
                  )}
                </Card>
              );
            })}
          </View>
        )}

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
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colors.cream[50],
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
    marginBottom: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  tabActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[600],
  },
  tabTextActive: {
    color: colors.white,
  },
  tabBadge: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: colors.primary[700],
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.gray[600],
  },
  tabBadgeTextActive: {
    color: colors.white,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  consultsList: {
    gap: 12,
  },
  consultRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  consultAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  consultInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary[600],
  },
  consultInfo: {
    flex: 1,
  },
  consultNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  consultName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray[900],
  },
  consultAge: {
    fontSize: 12,
    color: colors.gray[400],
  },
  consultSymptoms: {
    fontSize: 13,
    color: colors.gray[500],
    marginTop: 4,
  },
  consultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
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
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.gray[400],
  },
  durationText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray[500],
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.lg,
    paddingVertical: 10,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: colors.blue[600],
    borderRadius: borderRadius.lg,
    paddingVertical: 10,
  },
  resumeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 12,
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.lg,
    paddingVertical: 10,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[500],
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[500],
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.gray[400],
  },
  bottomSpacer: {
    height: 16,
  },
});
