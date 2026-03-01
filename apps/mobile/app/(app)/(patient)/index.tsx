import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Search,
  AlertCircle,
  ChevronRight,
  Pill,
  Video,
  FlaskConical,
  Heart,
  Bell,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { ServiceGrid } from '@/components/ServiceGrid';
import { useAuthStore } from '@/stores/authStore';
import { colors, borderRadius, shadows } from '@/constants/theme';

const activeOrders = [
  {
    id: '1',
    type: 'Medicine Delivery',
    status: 'Out for delivery',
    time: '15 min away',
    iconColor: colors.green[600],
    iconBg: colors.green[50],
  },
  {
    id: '2',
    type: 'Video Consultation',
    status: 'Scheduled at 4:00 PM',
    time: 'Dr. Priya Sharma',
    iconColor: colors.blue[600],
    iconBg: colors.blue[50],
  },
];

const recentItems = [
  {
    label: 'Reorder Medicines',
    desc: 'Last ordered 3 days ago',
    iconColor: colors.green[600],
    iconBg: colors.green[50],
  },
  {
    label: 'Book Follow-up',
    desc: 'Dr. Priya Sharma',
    iconColor: colors.blue[600],
    iconBg: colors.blue[50],
  },
  {
    label: 'View Lab Report',
    desc: 'CBC + Thyroid Panel',
    iconColor: colors.purple[600],
    iconBg: colors.purple[50],
  },
];

export default function PatientHome() {
  const { user } = useAuthStore();
  const router = useRouter();

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
              Hello, {user?.name?.split(' ')[0] || 'there'}
            </Text>
            <Text style={styles.headerSubtitle}>How are you feeling today?</Text>
          </View>
          <TouchableOpacity style={styles.notifButton}>
            <Bell size={22} color={colors.gray[600]} strokeWidth={1.8} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray[400]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, medicines, lab tests..."
            placeholderTextColor={colors.gray[400]}
          />
        </View>

        {/* SOS Banner */}
        <TouchableOpacity
          style={styles.sosBanner}
          activeOpacity={0.7}
          onPress={() => router.push('/(app)/(patient)/consult')}
        >
          <View style={styles.sosIcon}>
            <AlertCircle size={22} color={colors.white} />
          </View>
          <View style={styles.sosText}>
            <Text style={styles.sosTitle}>Emergency? Call Ambulance</Text>
            <Text style={styles.sosSubtitle}>
              24/7 emergency service -- nearest ambulance dispatched
            </Text>
          </View>
          <ChevronRight size={20} color={colors.red[400]} />
        </TouchableOpacity>

        {/* Services grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <ServiceGrid />
        </View>

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Orders</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ordersList}>
              {activeOrders.map((order) => (
                <Card key={order.id} padding="sm" style={styles.orderCard}>
                  <View style={styles.orderRow}>
                    <View
                      style={[
                        styles.orderIcon,
                        { backgroundColor: order.iconBg },
                      ]}
                    >
                      {order.type.includes('Medicine') ? (
                        <Pill size={20} color={order.iconColor} strokeWidth={1.8} />
                      ) : (
                        <Video size={20} color={order.iconColor} strokeWidth={1.8} />
                      )}
                    </View>
                    <View style={styles.orderInfo}>
                      <Text style={styles.orderType}>{order.type}</Text>
                      <Text style={styles.orderStatus}>{order.status}</Text>
                    </View>
                    <View style={styles.orderRight}>
                      <Text style={styles.orderTime}>{order.time}</Text>
                      <ChevronRight
                        size={16}
                        color={colors.gray[300]}
                        style={styles.orderChevron}
                      />
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        )}

        {/* Recent */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentList}
          >
            {recentItems.map((item) => (
              <TouchableOpacity key={item.label} style={styles.recentCard} activeOpacity={0.7}>
                <View
                  style={[
                    styles.recentIcon,
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  {item.label.includes('Medicine') ? (
                    <Pill size={20} color={item.iconColor} strokeWidth={1.8} />
                  ) : item.label.includes('Follow') ? (
                    <Video size={20} color={item.iconColor} strokeWidth={1.8} />
                  ) : (
                    <FlaskConical size={20} color={item.iconColor} strokeWidth={1.8} />
                  )}
                </View>
                <Text style={styles.recentLabel}>{item.label}</Text>
                <Text style={styles.recentDesc}>{item.desc}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Health tip */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Tips</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Heart size={24} color={colors.primary[500]} strokeWidth={1.8} />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Stay Hydrated</Text>
              <Text style={styles.tipDesc}>
                Drink at least 8 glasses of water daily to keep your body
                functioning optimally.
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray[100],
    paddingHorizontal: 16,
    marginBottom: 16,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.gray[700],
  },
  sosBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red[50],
    borderWidth: 1,
    borderColor: colors.red[100],
    borderRadius: borderRadius.xl,
    padding: 16,
    gap: 12,
    marginBottom: 20,
  },
  sosIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.red[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosText: {
    flex: 1,
  },
  sosTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.red[700],
  },
  sosSubtitle: {
    fontSize: 12,
    color: colors.red[500],
    marginTop: 2,
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
  ordersList: {
    gap: 12,
  },
  orderCard: {},
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderType: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[900],
  },
  orderStatus: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderTime: {
    fontSize: 12,
    color: colors.gray[400],
  },
  orderChevron: {
    marginTop: 4,
  },
  recentList: {
    gap: 12,
    paddingRight: 4,
  },
  recentCard: {
    width: 160,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray[100],
    padding: 16,
    ...shadows.sm,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  recentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[900],
  },
  recentDesc: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 4,
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
