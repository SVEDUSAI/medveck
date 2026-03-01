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
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Phone,
  MessageSquare,
  User,
  CalendarDays,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { colors, borderRadius, shadows } from '@/constants/theme';

interface TimeSlot {
  id: string;
  time: string;
  status: 'booked' | 'available' | 'break';
  patient?: {
    name: string;
    age: number;
    type: 'VIDEO' | 'AUDIO' | 'CHAT';
    reason: string;
  };
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  return weekDays.map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      day,
      date: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
      fullDate: date,
    };
  });
};

const todaySlots: TimeSlot[] = [
  {
    id: '1',
    time: '7:00 AM',
    status: 'booked',
    patient: {
      name: 'Deepak Joshi',
      age: 41,
      type: 'AUDIO',
      reason: 'Back pain follow-up',
    },
  },
  {
    id: '2',
    time: '7:30 AM',
    status: 'booked',
    patient: {
      name: 'Ritu Gupta',
      age: 38,
      type: 'VIDEO',
      reason: 'Allergic rhinitis',
    },
  },
  {
    id: '3',
    time: '8:00 AM',
    status: 'booked',
    patient: {
      name: 'Meena Devi',
      age: 60,
      type: 'AUDIO',
      reason: 'Diabetes follow-up',
    },
  },
  {
    id: '4',
    time: '8:30 AM',
    status: 'booked',
    patient: {
      name: 'Vikram Singh',
      age: 52,
      type: 'VIDEO',
      reason: 'Joint pain consultation',
    },
  },
  {
    id: '5',
    time: '9:00 AM',
    status: 'break',
  },
  {
    id: '6',
    time: '9:30 AM',
    status: 'booked',
    patient: {
      name: 'Priya Verma',
      age: 32,
      type: 'VIDEO',
      reason: 'Headache and dizziness',
    },
  },
  {
    id: '7',
    time: '10:00 AM',
    status: 'booked',
    patient: {
      name: 'Rahul Mehta',
      age: 34,
      type: 'VIDEO',
      reason: 'Persistent cough',
    },
  },
  {
    id: '8',
    time: '10:30 AM',
    status: 'booked',
    patient: {
      name: 'Sneha Patel',
      age: 28,
      type: 'AUDIO',
      reason: 'Skin rash',
    },
  },
  {
    id: '9',
    time: '11:00 AM',
    status: 'booked',
    patient: {
      name: 'Amit Sharma',
      age: 45,
      type: 'CHAT',
      reason: 'BP medication follow-up',
    },
  },
  {
    id: '10',
    time: '11:30 AM',
    status: 'available',
  },
  {
    id: '11',
    time: '12:00 PM',
    status: 'available',
  },
  {
    id: '12',
    time: '12:30 PM',
    status: 'break',
  },
  {
    id: '13',
    time: '1:00 PM',
    status: 'available',
  },
  {
    id: '14',
    time: '1:30 PM',
    status: 'available',
  },
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

export default function DoctorSchedule() {
  const weekDates = generateWeekDates();
  const todayIndex = weekDates.findIndex((d) => d.isToday);
  const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex >= 0 ? todayIndex : 0);

  const selectedDay = weekDates[selectedDayIndex];
  const bookedCount = todaySlots.filter((s) => s.status === 'booked').length;
  const availableCount = todaySlots.filter((s) => s.status === 'available').length;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>Schedule</Text>
        <Text style={styles.pageSubtitle}>
          {monthNames[selectedDay.fullDate.getMonth()]} {selectedDay.fullDate.getFullYear()}
        </Text>

        {/* Week calendar strip */}
        <View style={styles.weekStrip}>
          {weekDates.map((dayInfo, index) => {
            const isSelected = index === selectedDayIndex;
            return (
              <TouchableOpacity
                key={dayInfo.day}
                style={[
                  styles.dayCell,
                  isSelected && styles.dayCellSelected,
                  dayInfo.isToday && !isSelected && styles.dayCellToday,
                ]}
                onPress={() => setSelectedDayIndex(index)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    isSelected && styles.dayLabelSelected,
                  ]}
                >
                  {dayInfo.day}
                </Text>
                <Text
                  style={[
                    styles.dayDate,
                    isSelected && styles.dayDateSelected,
                  ]}
                >
                  {dayInfo.date}
                </Text>
                {dayInfo.isToday && (
                  <View style={[styles.todayDot, isSelected && styles.todayDotSelected]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Day summary */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryItem, { backgroundColor: colors.blue[50] }]}>
            <CalendarDays size={16} color={colors.blue[600]} strokeWidth={1.8} />
            <Text style={[styles.summaryValue, { color: colors.blue[600] }]}>{bookedCount}</Text>
            <Text style={styles.summaryLabel}>Booked</Text>
          </View>
          <View style={[styles.summaryItem, { backgroundColor: colors.green[50] }]}>
            <Clock size={16} color={colors.green[600]} strokeWidth={1.8} />
            <Text style={[styles.summaryValue, { color: colors.green[600] }]}>{availableCount}</Text>
            <Text style={styles.summaryLabel}>Available</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Time slots */}
        <View style={styles.slotsList}>
          {todaySlots.map((slot) => {
            if (slot.status === 'break') {
              return (
                <View key={slot.id} style={styles.breakSlot}>
                  <View style={styles.breakLine} />
                  <Text style={styles.breakText}>Break</Text>
                  <View style={styles.breakLine} />
                </View>
              );
            }

            if (slot.status === 'available') {
              return (
                <View key={slot.id} style={styles.slotRow}>
                  <Text style={styles.slotTime}>{slot.time}</Text>
                  <TouchableOpacity style={styles.availableSlot} activeOpacity={0.7}>
                    <View style={styles.availableDot} />
                    <Text style={styles.availableText}>Available</Text>
                  </TouchableOpacity>
                </View>
              );
            }

            const patient = slot.patient!;
            const TypeIcon = typeIconMap[patient.type];
            const typeColors = typeColorMap[patient.type];

            return (
              <View key={slot.id} style={styles.slotRow}>
                <Text style={styles.slotTime}>{slot.time}</Text>
                <TouchableOpacity style={styles.bookedSlot} activeOpacity={0.7}>
                  <View style={styles.bookedContent}>
                    <View style={styles.bookedHeader}>
                      <Text style={styles.bookedName}>{patient.name}</Text>
                      <View style={[styles.typeBadge, { backgroundColor: typeColors.bg }]}>
                        <TypeIcon size={10} color={typeColors.color} strokeWidth={2} />
                        <Text style={[styles.typeText, { color: typeColors.color }]}>
                          {patient.type}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.bookedReason} numberOfLines={1}>
                      {patient.reason}
                    </Text>
                    <Text style={styles.bookedAge}>{patient.age} yrs</Text>
                  </View>
                  <ChevronRight size={16} color={colors.gray[300]} />
                </TouchableOpacity>
              </View>
            );
          })}
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
  weekStrip: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[100],
    gap: 4,
  },
  dayCellSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  dayCellToday: {
    borderColor: colors.primary[300],
    borderWidth: 1.5,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.gray[400],
    textTransform: 'uppercase',
  },
  dayLabelSelected: {
    color: colors.primary[200],
  },
  dayDate: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[800],
  },
  dayDateSelected: {
    color: colors.white,
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary[500],
  },
  todayDotSelected: {
    backgroundColor: colors.white,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: borderRadius.lg,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.gray[500],
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  slotsList: {
    gap: 8,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slotTime: {
    width: 70,
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray[400],
    textAlign: 'right',
  },
  bookedSlot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray[100],
    borderLeftWidth: 3,
    borderLeftColor: colors.primary[400],
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...shadows.sm,
  },
  bookedContent: {
    flex: 1,
  },
  bookedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookedName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
  bookedReason: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  bookedAge: {
    fontSize: 11,
    color: colors.gray[400],
    marginTop: 2,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  typeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  availableSlot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.green[100],
    borderStyle: 'dashed',
    backgroundColor: colors.green[50],
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.green[500],
  },
  availableText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.green[600],
  },
  breakSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  breakLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray[200],
  },
  breakText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.gray[400],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bottomSpacer: {
    height: 16,
  },
});
