import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Store,
  MapPin,
  Star,
  Clock,
  Phone,
  FileText,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { colors, borderRadius, shadows } from '@/constants/theme';

const menuSections = [
  {
    title: 'Shop',
    items: [
      { icon: FileText, label: 'Shop Documents', color: colors.blue[600], bg: colors.blue[50] },
      { icon: Clock, label: 'Operating Hours', color: colors.amber[600], bg: colors.amber[50] },
      { icon: Phone, label: 'Contact Info', color: colors.green[600], bg: colors.green[50] },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: Bell, label: 'Notifications', color: colors.purple[600], bg: colors.purple[50] },
      { icon: Shield, label: 'Privacy & Security', color: colors.teal[600], bg: colors.teal[50] },
      { icon: HelpCircle, label: 'Help & Support', color: colors.indigo[600], bg: colors.indigo[50] },
    ],
  },
];

export default function VendorProfile() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Shop header */}
        <View style={styles.profileHeader}>
          <View style={styles.shopAvatar}>
            <Store size={32} color={colors.primary[500]} strokeWidth={1.5} />
          </View>
          <Text style={styles.shopName}>{user?.name || 'MedVek Pharmacy'}</Text>
          <View style={styles.addressRow}>
            <MapPin size={14} color={colors.gray[400]} strokeWidth={1.8} />
            <Text style={styles.shopAddress}>
              123 Health Street, Sector 12, Mumbai 400001
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Shop Details</Text>
          </TouchableOpacity>
        </View>

        {/* Ratings & Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.ratingRow}>
              <Star size={16} color={colors.amber[500]} fill={colors.amber[500]} strokeWidth={1.8} />
              <Text style={styles.statValue}>4.7</Text>
            </View>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>342</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Acceptance</Text>
          </View>
        </View>

        {/* Menu sections */}
        {menuSections.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <Card padding="sm" style={styles.menuCard}>
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.label}
                    style={[
                      styles.menuItem,
                      i < section.items.length - 1 && styles.menuItemBorder,
                    ]}
                    activeOpacity={0.6}
                  >
                    <View
                      style={[styles.menuIcon, { backgroundColor: item.bg }]}
                    >
                      <Icon size={18} color={item.color} strokeWidth={1.8} />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <ChevronRight size={18} color={colors.gray[300]} />
                  </TouchableOpacity>
                );
              })}
            </Card>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={colors.red[500]} strokeWidth={1.8} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MedVek v1.0.0</Text>
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
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  shopAvatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.primary[50],
    borderWidth: 2,
    borderColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.gray[900],
    marginTop: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  shopAddress: {
    fontSize: 13,
    color: colors.gray[500],
  },
  editButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.primary[200],
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary[500],
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.gray[100],
    ...shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  statDivider: {
    width: 1,
    backgroundColor: colors.gray[100],
  },
  menuSection: {
    marginBottom: 20,
  },
  menuSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[50],
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.gray[700],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginTop: 8,
    backgroundColor: colors.red[50],
    borderRadius: borderRadius.xl,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.red[500],
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  versionText: {
    fontSize: 12,
    color: colors.gray[300],
  },
});
