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
  Store,
  Bell,
  Package,
  Clock,
  Truck,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { colors, borderRadius, shadows } from '@/constants/theme';

const stats = [
  { label: 'New', value: '2', iconColor: colors.blue[600], iconBg: colors.blue[50] },
  { label: 'Preparing', value: '1', iconColor: colors.amber[600], iconBg: colors.amber[50] },
  { label: 'Dispatched', value: '3', iconColor: colors.purple[600], iconBg: colors.purple[50] },
  { label: 'Done', value: '12', iconColor: colors.green[600], iconBg: colors.green[50] },
];

const incomingOrders = [
  {
    id: '1',
    orderId: '#MV-1042',
    customer: 'Ravi Kumar',
    items: '3 items',
    total: '₹485',
    time: '2 min ago',
    itemsList: 'Dolo 650 x2, Azithromycin 500 x1',
  },
  {
    id: '2',
    orderId: '#MV-1043',
    customer: 'Anita Sharma',
    items: '1 item',
    total: '₹155',
    time: '5 min ago',
    itemsList: 'Shelcal 500 x1',
  },
  {
    id: '3',
    orderId: '#MV-1044',
    customer: 'Deepak Patel',
    items: '5 items',
    total: '₹920',
    time: '8 min ago',
    itemsList: 'Metformin 500 x3, Pantocid 40 x2',
  },
];

export default function VendorHome() {
  const { user } = useAuthStore();
  const [shopOpen, setShopOpen] = useState(true);

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
              {user?.name?.split(' ')[0] || 'Vendor'}'s Shop
            </Text>
            <Text style={styles.headerSubtitle}>Manage your pharmacy orders</Text>
          </View>
          <TouchableOpacity style={styles.notifButton}>
            <Bell size={22} color={colors.gray[600]} strokeWidth={1.8} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Shop Status Toggle */}
        <Card padding="md" style={styles.statusCard}>
          <View style={styles.statusRow}>
            <View style={[styles.statusIcon, { backgroundColor: shopOpen ? colors.green[50] : colors.red[50] }]}>
              <Store size={22} color={shopOpen ? colors.green[600] : colors.red[500]} strokeWidth={1.8} />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>Shop Status</Text>
              <Text style={[styles.statusLabel, { color: shopOpen ? colors.green[600] : colors.red[500] }]}>
                {shopOpen ? 'Open — Accepting Orders' : 'Closed — Not Accepting'}
              </Text>
            </View>
            <Switch
              value={shopOpen}
              onValueChange={setShopOpen}
              trackColor={{ false: colors.gray[200], true: colors.green[500] }}
              thumbColor={colors.white}
            />
          </View>
        </Card>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.iconBg }]}>
                  {stat.label === 'New' && <ShoppingBag size={18} color={stat.iconColor} strokeWidth={1.8} />}
                  {stat.label === 'Preparing' && <Clock size={18} color={stat.iconColor} strokeWidth={1.8} />}
                  {stat.label === 'Dispatched' && <Truck size={18} color={stat.iconColor} strokeWidth={1.8} />}
                  {stat.label === 'Done' && <CheckCircle2 size={18} color={stat.iconColor} strokeWidth={1.8} />}
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Incoming Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Incoming Orders</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ordersList}>
            {incomingOrders.map((order) => (
              <Card key={order.id} padding="md">
                <View style={styles.orderHeader}>
                  <View style={styles.orderIdRow}>
                    <View style={[styles.orderIcon, { backgroundColor: colors.blue[50] }]}>
                      <Package size={18} color={colors.blue[600]} strokeWidth={1.8} />
                    </View>
                    <View>
                      <Text style={styles.orderId}>{order.orderId}</Text>
                      <Text style={styles.orderCustomer}>{order.customer}</Text>
                    </View>
                  </View>
                  <View style={styles.orderMeta}>
                    <Text style={styles.orderTime}>{order.time}</Text>
                    <Text style={styles.orderTotal}>{order.total}</Text>
                  </View>
                </View>
                <View style={styles.orderItemsRow}>
                  <Text style={styles.orderItems}>{order.itemsList}</Text>
                  <Text style={styles.orderItemCount}>{order.items}</Text>
                </View>
                <View style={styles.orderActions}>
                  <TouchableOpacity style={styles.rejectButton} activeOpacity={0.7}>
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptButton} activeOpacity={0.7}>
                    <Text style={styles.acceptText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
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
  statusCard: {
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '500',
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
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray[100],
    padding: 12,
    alignItems: 'center',
    ...shadows.sm,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.gray[900],
  },
  statLabel: {
    fontSize: 11,
    color: colors.gray[400],
    marginTop: 2,
  },
  ordersList: {
    gap: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
  orderCustomer: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  orderMeta: {
    alignItems: 'flex-end',
  },
  orderTime: {
    fontSize: 11,
    color: colors.gray[400],
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[900],
    marginTop: 2,
  },
  orderItemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  orderItems: {
    fontSize: 12,
    color: colors.gray[500],
    flex: 1,
  },
  orderItemCount: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray[400],
    marginLeft: 8,
  },
  orderActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.red[200],
    backgroundColor: colors.red[50],
    alignItems: 'center',
  },
  rejectText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.red[600],
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
  },
  acceptText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  bottomSpacer: {
    height: 16,
  },
});
