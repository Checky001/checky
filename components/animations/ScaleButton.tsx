import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Animations } from '@/constants/animations';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ScaleButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  scale?: number;
  style?: ViewStyle;
  haptic?: boolean;
}

export function ScaleButton({
  children,
  onPress,
  scale = Animations.scale.pressed,
  style,
  haptic = true,
}: ScaleButtonProps) {
  const scaleValue = useSharedValue(1);

  const handlePressIn = () => {
    scaleValue.value = withTiming(scale, {
      duration: Animations.timing.fast,
    });
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    scaleValue.value = withSpring(1, Animations.configs.spring);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
      activeOpacity={0.9}
    >
      {children}
    </AnimatedTouchable>
  );
}

