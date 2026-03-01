import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Upload,
  ShoppingCart,
  Plus,
  Minus,
  Tag,
  ChevronRight,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, borderRadius, shadows } from '@/constants/theme';

const categories = [
  'All',
  'Common Cold',
  'Diabetes',
  'Heart',
  'Pain Relief',
  'Vitamins',
  'Skin Care',
];

const medicines = [
  {
    id: '1',
    name: 'Dolo 650',
    generic: 'Paracetamol 650mg',
    manufacturer: 'Micro Labs',
    price: 30,
    mrp: 35,
    category: 'Pain Relief',
    prescription: false,
    inStock: true,
  },
  {
    id: '2',
    name: 'Azithromycin 500',
    generic: 'Azithromycin 500mg',
    manufacturer: 'Cipla',
    price: 89,
    mrp: 105,
    category: 'Antibiotic',
    prescription: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Pantocid 40',
    generic: 'Pantoprazole 40mg',
    manufacturer: 'Sun Pharma',
    price: 65,
    mrp: 78,
    category: 'Gastro',
    prescription: false,
    inStock: true,
  },
  {
    id: '4',
    name: 'Shelcal 500',
    generic: 'Calcium + Vitamin D3',
    manufacturer: 'Elder Pharma',
    price: 155,
    mrp: 180,
    category: 'Vitamins',
    prescription: false,
    inStock: false,
  },
  {
    id: '5',
    name: 'Metformin 500',
    generic: 'Metformin HCL 500mg',
    manufacturer: 'USV',
    price: 25,
    mrp: 32,
    category: 'Diabetes',
    prescription: true,
    inStock: true,
  },
];

export default function MedicinesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = medicines
    .filter((m) => cart[m.id])
    .reduce((sum, m) => sum + m.price * (cart[m.id] || 0), 0);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const count = (prev[id] || 0) - 1;
      if (count <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: count };
    });
  };

  const filteredMeds = medicines.filter((m) => {
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.generic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Order Medicines</Text>
        <Text style={styles.pageSubtitle}>
          Delivered to your doorstep in 30 minutes
        </Text>

        {/* Upload prescription */}
        <TouchableOpacity style={styles.uploadBanner} activeOpacity={0.7}>
          <View style={styles.uploadIcon}>
            <Upload size={20} color={colors.primary[500]} strokeWidth={1.8} />
          </View>
          <View style={styles.uploadText}>
            <Text style={styles.uploadTitle}>Upload Prescription</Text>
            <Text style={styles.uploadSubtitle}>
              Get medicines as prescribed by your doctor
            </Text>
          </View>
          <ChevronRight size={20} color={colors.primary[400]} />
        </TouchableOpacity>

        {/* Search */}
        <Input
          placeholder="Search medicines by name..."
          icon={<Search size={18} color={colors.gray[400]} />}
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchInput}
        />

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
          style={styles.categoriesScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Medicine list */}
        <View style={styles.medsList}>
          {filteredMeds.map((med) => (
            <Card key={med.id} padding="sm">
              <View style={styles.medRow}>
                <View style={styles.medImagePlaceholder}>
                  <Text style={styles.medImageText}>
                    {med.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.medInfo}>
                  <View style={styles.medNameRow}>
                    <Text style={styles.medName}>{med.name}</Text>
                    {med.prescription && (
                      <Badge variant="warning">Rx</Badge>
                    )}
                  </View>
                  <Text style={styles.medGeneric}>{med.generic}</Text>
                  <Text style={styles.medManufacturer}>{med.manufacturer}</Text>
                  <View style={styles.medPriceRow}>
                    <Text style={styles.medPrice}>₹{med.price}</Text>
                    <Text style={styles.medMrp}>₹{med.mrp}</Text>
                    <View style={styles.discountBadge}>
                      <Tag size={10} color={colors.green[600]} />
                      <Text style={styles.discountText}>
                        {Math.round(((med.mrp - med.price) / med.mrp) * 100)}%
                        off
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.medActions}>
                {!med.inStock ? (
                  <Text style={styles.outOfStock}>Out of Stock</Text>
                ) : cart[med.id] ? (
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={() => removeFromCart(med.id)}
                    >
                      <Minus size={16} color={colors.primary[500]} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{cart[med.id]}</Text>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={() => addToCart(med.id)}
                    >
                      <Plus size={16} color={colors.primary[500]} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Button size="sm" variant="secondary" onPress={() => addToCart(med.id)}>
                    Add to Cart
                  </Button>
                )}
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Cart bar */}
      {cartCount > 0 && (
        <View style={styles.cartBar}>
          <View style={styles.cartInfo}>
            <View style={styles.cartBadge}>
              <ShoppingCart size={18} color={colors.white} strokeWidth={2} />
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{cartCount}</Text>
              </View>
            </View>
            <Text style={styles.cartTotal}>₹{cartTotal}</Text>
          </View>
          <Button size="sm" onPress={() => {}}>
            View Cart
          </Button>
        </View>
      )}
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
    paddingBottom: 100,
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
  uploadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[100],
    borderRadius: borderRadius.xl,
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[700],
  },
  uploadSubtitle: {
    fontSize: 12,
    color: colors.primary[400],
    marginTop: 2,
  },
  searchInput: {
    marginBottom: 12,
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoriesRow: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  categoryChipActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.gray[600],
  },
  categoryTextActive: {
    color: colors.white,
  },
  medsList: {
    gap: 12,
  },
  medRow: {
    flexDirection: 'row',
    gap: 12,
  },
  medImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  medImageText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.gray[400],
  },
  medInfo: {
    flex: 1,
  },
  medNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  medName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray[900],
  },
  medGeneric: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  medManufacturer: {
    fontSize: 11,
    color: colors.gray[400],
    marginTop: 1,
  },
  medPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  medPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[900],
  },
  medMrp: {
    fontSize: 12,
    color: colors.gray[400],
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.green[50],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.green[600],
  },
  medActions: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  outOfStock: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.red[500],
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.full,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary[500],
    minWidth: 20,
    textAlign: 'center',
  },
  cartBar: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.xl,
    paddingHorizontal: 20,
    paddingVertical: 14,
    ...shadows.lg,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartBadge: {
    position: 'relative',
  },
  cartCountBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: colors.red[500],
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  cartTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});
