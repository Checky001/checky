/**
 * Spacing System
 */

export const Spacing = {
  // Base spacing scale
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
  '5xl': 128,

  // Screen padding
  screenPadding: {
    horizontal: 20,
    vertical: 24,
  },

  // Component spacing
  component: {
    gap: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
    },
  },

  // Border radius
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    full: 9999,
  },

  // Icon sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  },

  // Button sizes
  button: {
    sm: {
      height: 36,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    md: {
      height: 48,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    lg: {
      height: 56,
      paddingHorizontal: 32,
      paddingVertical: 16,
    },
  },

  // Input sizes
  input: {
    sm: {
      height: 36,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    md: {
      height: 48,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    lg: {
      height: 56,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
  },
};

// Helper function to get spacing value
export const getSpacing = (multiplier: number): number => {
  return Spacing.md * multiplier;
};

