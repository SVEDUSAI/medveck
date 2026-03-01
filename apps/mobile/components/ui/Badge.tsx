import React from 'react';
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { colors, borderRadius } from '@/constants/theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  style?: ViewStyle;
}

export function Badge({ children, variant = 'primary', style }: BadgeProps) {
  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: colors.primary[100] },
    success: { backgroundColor: colors.green[100] },
    warning: { backgroundColor: colors.amber[100] },
    danger: { backgroundColor: colors.red[100] },
    neutral: { backgroundColor: colors.gray[100] },
  };

  const variantTextStyles: Record<string, TextStyle> = {
    primary: { color: colors.primary[600] },
    success: { color: colors.green[700] },
    warning: { color: colors.amber[700] },
    danger: { color: colors.red[700] },
    neutral: { color: colors.gray[600] },
  };

  return (
    <View style={[styles.badge, variantStyles[variant], style]}>
      <Text style={[styles.text, variantTextStyles[variant]]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
