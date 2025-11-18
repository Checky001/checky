import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Animations } from '@/constants/animations';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  containerStyle,
  ...textInputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useSharedValue(Colors.border.light);
  const labelColor = useSharedValue(Colors.text.secondary);

  const handleFocus = () => {
    setIsFocused(true);
    borderColor.value = withTiming(Colors.primary[500], {
      duration: Animations.timing.fast,
    });
    labelColor.value = withTiming(Colors.primary[500], {
      duration: Animations.timing.fast,
    });
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!error) {
      borderColor.value = withTiming(Colors.border.light, {
        duration: Animations.timing.fast,
      });
      labelColor.value = withTiming(Colors.text.secondary, {
        duration: Animations.timing.fast,
      });
    }
  };

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: error
      ? Colors.error[500]
      : borderColor.value,
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    color: error ? Colors.error[500] : labelColor.value,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.Text style={[styles.label, animatedLabelStyle]}>
          {label}
        </Animated.Text>
      )}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            ...Spacing.input[size],
            borderRadius: Spacing.borderRadius.md,
          },
          animatedBorderStyle,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          {...textInputProps}
          style={[
            styles.input,
            Typography.styles.body,
            {
              color: Colors.text.primary,
              flex: 1,
            },
          ]}
          placeholderTextColor={Colors.text.tertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.styles.captionMedium,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderWidth: 2,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
  error: {
    ...Typography.styles.small,
    color: Colors.error[500],
    marginTop: Spacing.xs,
  },
});

