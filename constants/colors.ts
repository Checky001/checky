/**
 * Cool Color Palette for Checky
 * Inspired by modern apps like Figma, Linear, and Stripe
 */

export const Colors = {
  // Primary - Cool Blues & Purples
  primary: {
    50: '#F0F4FF',
    100: '#E0EAFF',
    200: '#C7D7FE',
    300: '#A5B9FC',
    400: '#818CF8',
    500: '#6366F1',  // Main primary action color
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Secondary - Teal/Cyan
  secondary: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    200: '#A5F3FC',
    300: '#67E8F9',
    400: '#22D3EE',  // Main secondary color
    500: '#06B6D4',
    600: '#0891B2',
    700: '#0E7490',
    800: '#155E75',
    900: '#164E63',
  },

  // Success - Cool Green
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',  // Main success color
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Warning - Amber
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',  // Main warning color
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Error - Cool Red
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',  // Main error color
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Neutrals - Cool Grays
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Accent - Electric Purple / Pink for highlights
  accent: {
    50: '#FDF2FF',
    100: '#FCE7FF',
    200: '#F9A8FF',
    300: '#F472FF',
    400: '#EC38FF',
    500: '#DB00FF',
    600: '#B800D6',
    700: '#9300AA',
    800: '#6F007F',
    900: '#4B0054',
  },

  // Semantic Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F0F4FF',
  },

  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },

  // Special Effects
  overlay: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.15)',
    dark: 'rgba(0, 0, 0, 0.4)',
    darker: 'rgba(0, 0, 0, 0.7)',
  },

  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 10,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.2,
      shadowRadius: 25,
      elevation: 15,
    },
  },
};

// Helper function for opacity
export const withOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

