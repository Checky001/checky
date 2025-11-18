/**
 * Animation System - Smooth Ease-In-Ease-Out
 */

import { Easing } from 'react-native-reanimated';

export const Animations = {
  // Timing Durations (ms)
  timing: {
    instant: 0,
    fastest: 150,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  },

  // Easing Curves
  easing: {
    // Standard ease-in-out (most common)
    easeInOut: Easing.bezier(0.4, 0.0, 0.2, 1),
    
    // Ease out (starts fast, ends slow)
    easeOut: Easing.bezier(0.0, 0.0, 0.2, 1),
    
    // Ease in (starts slow, ends fast)
    easeIn: Easing.bezier(0.4, 0.0, 1, 1),
    
    // Bounce effect
    bounce: Easing.bezier(0.68, -0.55, 0.265, 1.55),
    
    // Sharp (quick acceleration and deceleration)
    sharp: Easing.bezier(0.4, 0.0, 0.6, 1),
    
    // Linear
    linear: Easing.linear,
  },

  // Predefined Animation Configs
  configs: {
    // Fade animations
    fadeIn: {
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    },
    fadeOut: {
      duration: 200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    },

    // Slide animations
    slideUp: {
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    },
    slideDown: {
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    },

    // Scale animations
    scaleIn: {
      duration: 200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    },
    scaleOut: {
      duration: 150,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    },

    // Button press
    press: {
      duration: 150,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    },

    // Spring animations
    spring: {
      damping: 15,
      mass: 1,
      stiffness: 150,
    },
    springBouncy: {
      damping: 10,
      mass: 1,
      stiffness: 100,
    },
  },

  // Scale values
  scale: {
    pressed: 0.95,
    hover: 1.02,
    active: 0.98,
  },

  // Opacity values
  opacity: {
    invisible: 0,
    subtle: 0.4,
    medium: 0.6,
    visible: 1,
  },
};

// Helper function to create stagger delay for list animations
export const getStaggerDelay = (index: number, baseDelay: number = 50): number => {
  return index * baseDelay;
};

// Helper function to create spring config
export const springConfig = (damping: number = 15, stiffness: number = 150) => ({
  damping,
  stiffness,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
});

