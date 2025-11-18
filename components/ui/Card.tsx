import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Animations } from '@/constants/animations';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  padding?: keyof typeof Spacing;
}

export function Card({
  children,
  onPress,
  style,
  elevated = true,
  padding = 'md',
}: CardProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withTiming(0.98, {
        duration: Animations.timing.fast,
      });
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withTiming(1, {
        duration: Animations.timing.fast,
      });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const cardStyle: ViewStyle = {
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing[padding],
    ...(elevated ? Colors.shadow.md : {}),
    borderWidth: elevated ? 0 : 1,
    borderColor: Colors.border.light,
  };

  if (onPress) {
    return (
      <AnimatedTouchable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[animatedStyle, cardStyle, style]}
        activeOpacity={0.9}
      >
        {children}
      </AnimatedTouchable>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
}

