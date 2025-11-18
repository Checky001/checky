import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Animations } from '@/constants/animations';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
}

export function FadeInView({
  children,
  delay = 0,
  duration = Animations.timing.normal,
  style,
}: FadeInViewProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, {
        duration,
        easing: Animations.easing.easeOut,
      });
      translateY.value = withTiming(0, {
        duration,
        easing: Animations.easing.easeOut,
      });
    }, delay);
  }, [delay, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}

