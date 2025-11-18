import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Animations } from '@/constants/animations';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(Animations.scale.pressed, {
      duration: Animations.timing.fast,
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Animations.configs.spring);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Spacing.borderRadius.md,
      ...Spacing.button[size],
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[300] : Colors.primary[500],
          ...Colors.shadow.md,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[300] : Colors.secondary[400],
          ...Colors.shadow.md,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? Colors.neutral[300] : Colors.primary[500],
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[100] : Colors.neutral[50],
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[300] : Colors.error[500],
          ...Colors.shadow.md,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...Typography.styles[size === 'sm' ? 'buttonSmall' : 'button'],
      marginLeft: icon ? Spacing.sm : 0,
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return { ...baseStyle, color: Colors.text.inverse };
      case 'outline':
        return {
          ...baseStyle,
          color: disabled ? Colors.neutral[300] : Colors.primary[500],
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: disabled ? Colors.neutral[400] : Colors.primary[500],
        };
      default:
        return baseStyle;
    }
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[animatedStyle, getButtonStyle(), style]}
      activeOpacity={0.9}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'ghost'
              ? Colors.primary[500]
              : Colors.text.inverse
          }
        />
      ) : (
        <>
          {icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </AnimatedTouchable>
  );
}

