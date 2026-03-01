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
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ShoppingBag,
  ChevronRight,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { colors, borderRadius, shadows } from '@/constants/theme';

const statusFilters = ['New', 'Preparing', 'Ready', 'Dispatched', 'Completed'];

const allOrders = [
  {
    id: '1',
    orderId: '#MV-1042',
    customer: 'Ravi Kumar',
    items: [
      { name: 'Dolo 650', qty: 2, price: 30 },
      { name: 'Azithromycin 500', qty: 1, price: 89 },
    ],
    total: 149,
    status: 'New',
    time: '2 min ago',
  },
  {
    id: '2',
    orderId: '#MV-1041',
    customer: 'Priya Menon',
    items: [
      { name: 'Pantocid 40', qty: 2, price: 65 },
      { name: 'Shelcal 500', qty: 1, price: 155 },
    ],
    total: 285,
    status: 'Preparing',
    time: '15 min ago',
  },
  {
    id: '3',
    orderId: '#MV-1040',
    customer: 'Suresh Reddy',
    items: [
      { name: 'Metformin 500', qty: 3, price: 25 },
    ],
    total: 75,
    status: 'Ready',
    time: '28 min ago',
  },
  {
    id: '4',
    orderId: '#MV-1039',
    customer: 'Anita Sharma',
    items: [
      { name: 'Dolo 650', qty: 1, price: 30 },
      { name: 'Pantocid 40', qty: 1, price: 65 },
      { name: 'Shelcal 500', qty: 2, price: 155 },
    ],
    total: 405,
    status: 'Dispatched',
    time: '45 min ago',
  },
  {
    id: '5',
    orderId: '#MV-1038',
    customer: 'Deepak Patel',
    items: [
      { name: 'Azithromycin 500', qty: 2, price: 89 },
    ],
    total: 178,
    status: 'Completed',
    time: '1 hr ago',
  },
  {
    id: '6',
    orderId: '#MV-1037',
    customer: 'Kavitha Nair',
    items: [
      { name: 'Metformin 500', qty: 2, price: 25 },
      { name: 'Dolo 650', qty: 3, price: 30 },
    ],
    total: 140,
    status: 'Completed',
    time: '2 hrs ago',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return { color: colors.blue[600], bg: colors.blue[50] };
    case 'Preparing':
      return { color: colors.amber[600], bg: colors.amber[50] };
    case 'Ready':
      return { color: colors.teal[600], bg: colors.teal[50] };
    case 'Dispatched':
      return { color: colors.purple[600], bg: colors.purple[50] };
    case 'Completed':
      return { color: colors.green[600], bg: colors.green[50] };
    default:
      return { color: colors.gray[600], bg: colors.gray[50] };
  }
};

const getStatusIcon = (status: string, iconColor: string) => {
  switch (status) {
    case 'New':
      return <ShoppingBag size={16} color={iconColor} strokeWidth={1.8} />;
    case 'Preparing':
      return <Clock size={16} color={iconColor} strokeWidth={1.8} />;
    case 'Ready':
      return <Package size={16} color={iconColor} strokeWidth={1.8} />;
    case 'Dispatched':
      return <Truck size={16} color={iconColor} strokeWidth={1.8} />;
    case 'Completed':
      return <CheckCircle2 size={16} color={iconColor} strokeWidth={1.8} />;
    default:
      return <Package size={16} color={iconColor} strokeWidth={1.8} />;
  }
};

export default function VendorOrders() {
  const [selectedStatus, setSelectedStatus] = useState('New');

  const filteredOrders = allOrders.filter((o) => o.status === selectedStatus);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Orders</Text>
        <Text style={styles.pageSubtitle}>Track and manage all your orders</Text>
      </View>

      {/* Status filter pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
        style={styles.pillsScroll}
      >
        {statusFilters.map((status) => {
          const isActive = selectedStatus === status;
          const count = allOrders.filter((o) => o.status === status).length;
          return (
            <TouchableOpacity
              key={status}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {status}
              </Text>
              <View style={[styles.pillBadge, isActive && styles.pillBadgeActive]}>
                <Text style={[styles.pillBadgeText, isActive && styles.pillBadgeTextActive]}>
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Orders list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.gray[100] }]}>
              <Package size={32} color={colors.gray[300]} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No {selectedStatus.toLowerCase()} orders</Text>
            <Text style={styles.emptySubtitle}>
              Orders with this status will appear here
            </Text>
          </View>
        ) : (
          <View style={styles.ordersList}>
            {filteredOrders.map((order) => {
              const statusStyle = getStatusColor(order.status);
              return (
                <Card key={order.id} padding="md">
                  <View style={styles.orderHeader}>
                    <View style={styles.orderIdRow}>
                      <Text style={styles.orderId}>{order.orderId}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        {getStatusIcon(order.status, statusStyle.color)}
                        <Text style={[styles.statusBadgeText, { color: statusStyle.color }]}>
                          {order.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.orderTime}>{order.time}</Text>
                  </View>

                  <Text style={styles.orderCustomer}>{order.customer}</Text>

                  <View style={styles.itemsDivider} />

                  {/* Items */}
                  {order.items.map((item, i) => (
                    <View key={i} style={styles.itemRow}>
                      <Text style={styles.itemName}>
                        {item.name} x{item.qty}
                      </Text>
                      <Text style={styles.itemPrice}>₹{item.price * item.qty}</Text>
                    </View>
                  ))}

                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>₹{order.total}</Text>
                  </View>

                  {/* Action button */}
                  {order.status !== 'Completed' && (
                    <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                      <Text style={styles.actionButtonText}>
                        {order.status === 'New' && 'Start Preparing'}
                        {order.status === 'Preparing' && 'Mark as Ready'}
                        {order.status === 'Ready' && 'Dispatch Order'}
                        {order.status === 'Dispatched' && 'Mark Delivered'}
                      </Text>
                      <ChevronRight size={16} color={colors.white} />
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
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
  },
  pillsScroll: {
    marginTop: 16,
    marginBottom: 4,
  },
  pillsRow: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
    gap: 6,
  },
  pillActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.gray[600],
  },
  pillTextActive: {
    color: colors.white,
  },
  pillBadge: {
    backgroundColor: colors.gray[100],
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: 'center',
  },
  pillBadgeActive: {
    backgroundColor: colors.primary[400],
  },
  pillBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.gray[500],
  },
  pillBadgeTextActive: {
    color: colors.white,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
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
    gap: 8,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[900],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  orderTime: {
    fontSize: 11,
    color: colors.gray[400],
  },
  orderCustomer: {
    fontSize: 13,
    color: colors.gray[500],
    marginTop: 6,
  },
  itemsDivider: {
    height: 1,
    backgroundColor: colors.gray[100],
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 13,
    color: colors.gray[600],
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray[700],
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.gray[900],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.lg,
    paddingVertical: 12,
    marginTop: 14,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[700],
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.gray[400],
    marginTop: 4,
  },
  bottomSpacer: {
    height: 16,
  },
});
