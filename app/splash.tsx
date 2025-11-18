import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Animations } from '@/constants/animations';

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: Animations.timing.slow,
      easing: Animations.easing.easeOut,
    });

    scale.value = withSequence(
      withTiming(1.1, {
        duration: Animations.timing.slow,
        easing: Animations.easing.easeOut,
      }),
      withTiming(1, {
        duration: Animations.timing.normal,
        easing: Animations.easing.easeInOut,
      })
    );

    const timer = setTimeout(() => {
      router.replace('/sign-in');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>✓</Text>
        </View>
        <Text style={styles.title}>Checky</Text>
        <Text style={styles.subtitle}>Shop. Scan. Go.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.text.inverse,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...Colors.shadow.lg,
  },
  iconText: {
    fontSize: 48,
    color: Colors.primary[500],
  },
  title: {
    ...Typography.styles.h1,
    color: Colors.text.inverse,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.styles.h6,
    color: Colors.primary[100],
    fontFamily: Typography.fonts.medium,
  },
});
