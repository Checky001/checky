import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = 'neutral',
  size = 'md',
  style,
}: BadgeProps) {
  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingHorizontal: size === 'sm' ? Spacing.sm : Spacing.md,
      paddingVertical: size === 'sm' ? 4 : 6,
      borderRadius: Spacing.borderRadius.full,
      alignSelf: 'flex-start',
    };

    switch (variant) {
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: Colors.success[50],
        };
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: Colors.warning[50],
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: Colors.error[50],
        };
      case 'info':
        return {
          ...baseStyle,
          backgroundColor: Colors.primary[50],
        };
      case 'neutral':
        return {
          ...baseStyle,
          backgroundColor: Colors.neutral[100],
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'success':
        return Colors.success[700];
      case 'warning':
        return Colors.warning[700];
      case 'error':
        return Colors.error[700];
      case 'info':
        return Colors.primary[700];
      case 'neutral':
        return Colors.neutral[700];
      default:
        return Colors.neutral[700];
    }
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text
        style={[
          size === 'sm' ? Typography.styles.small : Typography.styles.caption,
          {
            color: getTextColor(),
            fontFamily: Typography.fonts.semibold,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

