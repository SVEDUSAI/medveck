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
  Search,
  FlaskConical,
  Home as HomeIcon,
  Clock,
  ChevronRight,
  CheckCircle,
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors, borderRadius, shadows } from '@/constants/theme';

const categories = ['All', 'Popular', 'Full Body', 'Diabetes', 'Thyroid', 'Heart', 'Allergy'];

const packages = [
  {
    id: 'p1',
    name: 'Full Body Checkup',
    tests: 72,
    price: 999,
    mrp: 2400,
    popular: true,
    includes: ['CBC', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid'],
  },
  {
    id: 'p2',
    name: 'Diabetes Care Package',
    tests: 15,
    price: 449,
    mrp: 900,
    popular: true,
    includes: ['HbA1c', 'Fasting Blood Sugar', 'Post Prandial Sugar', 'Kidney Function'],
  },
];

const tests = [
  { id: 't1', name: 'Complete Blood Count (CBC)', price: 199, mrp: 350, category: 'Popular', preparation: 'No fasting required' },
  { id: 't2', name: 'Thyroid Profile (T3, T4, TSH)', price: 349, mrp: 600, category: 'Thyroid', preparation: 'No fasting required' },
  { id: 't3', name: 'Lipid Profile', price: 249, mrp: 450, category: 'Heart', preparation: '12 hours fasting required' },
  { id: 't4', name: 'HbA1c (Glycated Hemoglobin)', price: 299, mrp: 500, category: 'Diabetes', preparation: 'No fasting required' },
  { id: 't5', name: 'Liver Function Test (LFT)', price: 349, mrp: 550, category: 'Popular', preparation: '8-10 hours fasting required' },
  { id: 't6', name: 'Vitamin D Test', price: 599, mrp: 1000, category: 'Popular', preparation: 'No fasting required' },
];

export default function LabsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [homeCollection, setHomeCollection] = useState(true);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const toggleTest = (id: string) => {
    setSelectedTests((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const filteredTests = tests.filter((t) => {
    const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPrice = tests
    .filter((t) => selectedTests.includes(t.id))
    .reduce((s, t) => s + t.price, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Lab Tests</Text>
        <Text style={styles.pageSubtitle}>
          Book tests with sample collection at home
        </Text>

        {/* Home collection toggle */}
        <View style={styles.homeToggle}>
          <View style={styles.homeToggleLeft}>
            <View style={styles.homeToggleIcon}>
              <HomeIcon size={18} color={colors.primary[500]} strokeWidth={1.8} />
            </View>
            <View>
              <Text style={styles.homeToggleTitle}>Home Collection</Text>
              <Text style={styles.homeToggleSubtitle}>
                Sample collected from your home
              </Text>
            </View>
          </View>
          <Switch
            value={homeCollection}
            onValueChange={setHomeCollection}
            trackColor={{ false: colors.gray[200], true: colors.primary[200] }}
            thumbColor={homeCollection ? colors.primary[500] : colors.gray[400]}
          />
        </View>

        {/* Search */}
        <Input
          placeholder="Search lab tests..."
          icon={<Search size={18} color={colors.gray[400]} />}
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchInput}
        />

        {/* Popular packages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Packages</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.packagesRow}
          >
            {packages.map((pkg) => (
              <View key={pkg.id} style={styles.packageCard}>
                <View style={styles.packageHeader}>
                  <FlaskConical size={20} color={colors.primary[500]} strokeWidth={1.8} />
                  <Badge variant="success">Popular</Badge>
                </View>
                <Text style={styles.packageName}>{pkg.name}</Text>
                <Text style={styles.packageTestCount}>
                  Includes {pkg.tests} tests
                </Text>
                <View style={styles.packageIncludes}>
                  {pkg.includes.slice(0, 3).map((t) => (
                    <View key={t} style={styles.includeItem}>
                      <CheckCircle size={12} color={colors.green[500]} />
                      <Text style={styles.includeText}>{t}</Text>
                    </View>
                  ))}
                  {pkg.includes.length > 3 && (
                    <Text style={styles.moreTests}>
                      +{pkg.includes.length - 3} more
                    </Text>
                  )}
                </View>
                <View style={styles.packagePriceRow}>
                  <Text style={styles.packagePrice}>₹{pkg.price}</Text>
                  <Text style={styles.packageMrp}>₹{pkg.mrp}</Text>
                </View>
                <Button size="sm" fullWidth style={styles.packageBtn}>
                  Book Now
                </Button>
              </View>
            ))}
          </ScrollView>
        </View>

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

        {/* Individual tests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Individual Tests</Text>
          <View style={styles.testsList}>
            {filteredTests.map((test) => {
              const isSelected = selectedTests.includes(test.id);
              return (
                <TouchableOpacity
                  key={test.id}
                  activeOpacity={0.7}
                  onPress={() => toggleTest(test.id)}
                >
                  <Card
                    padding="sm"
                    style={isSelected ? styles.testCardSelected : undefined}
                  >
                    <View style={styles.testRow}>
                      <View style={styles.testCheckbox}>
                        {isSelected ? (
                          <CheckCircle
                            size={22}
                            color={colors.primary[500]}
                            fill={colors.primary[500]}
                          />
                        ) : (
                          <View style={styles.testCheckboxEmpty} />
                        )}
                      </View>
                      <View style={styles.testInfo}>
                        <Text style={styles.testName}>{test.name}</Text>
                        <View style={styles.testMeta}>
                          <Clock size={12} color={colors.gray[400]} />
                          <Text style={styles.testPrep}>
                            {test.preparation}
                          </Text>
                        </View>
                        <View style={styles.testPriceRow}>
                          <Text style={styles.testPrice}>₹{test.price}</Text>
                          <Text style={styles.testMrp}>₹{test.mrp}</Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      {selectedTests.length > 0 && (
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomTests}>
              {selectedTests.length} test{selectedTests.length > 1 ? 's' : ''}{' '}
              selected
            </Text>
            <Text style={styles.bottomTotal}>₹{totalPrice}</Text>
          </View>
          <Button size="sm" onPress={() => {}}>
            Book Now
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
  homeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray[100],
    marginBottom: 16,
    ...shadows.sm,
  },
  homeToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  homeToggleIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeToggleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
  homeToggleSubtitle: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 1,
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
  packagesRow: {
    gap: 12,
  },
  packageCard: {
    width: 260,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray[100],
    ...shadows.sm,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[900],
  },
  packageTestCount: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 4,
    marginBottom: 12,
  },
  packageIncludes: {
    gap: 6,
    marginBottom: 12,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  includeText: {
    fontSize: 12,
    color: colors.gray[600],
  },
  moreTests: {
    fontSize: 12,
    color: colors.primary[500],
    fontWeight: '500',
  },
  packagePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  packagePrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.gray[900],
  },
  packageMrp: {
    fontSize: 14,
    color: colors.gray[400],
    textDecorationLine: 'line-through',
  },
  packageBtn: {
    marginTop: 4,
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
  testsList: {
    gap: 10,
  },
  testCardSelected: {
    borderColor: colors.primary[300],
    backgroundColor: colors.primary[50],
  },
  testRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  testCheckbox: {
    marginTop: 2,
  },
  testCheckboxEmpty: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.gray[300],
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
  testMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  testPrep: {
    fontSize: 12,
    color: colors.gray[400],
  },
  testPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  testPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[900],
  },
  testMrp: {
    fontSize: 12,
    color: colors.gray[400],
    textDecorationLine: 'line-through',
  },
  bottomBar: {
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
  bottomTests: {
    fontSize: 12,
    color: colors.primary[200],
  },
  bottomTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
});
