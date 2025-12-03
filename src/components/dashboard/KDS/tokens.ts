/**
 * KDS Design System Tokens
 * Semantic design tokens for the Kitchen Display System
 * 
 * These tokens are also available as CSS variables in /styles/globals.css
 * 
 * Usage:
 * - Import tokens: import { colorTokens } from './design-system/tokens';
 * - Use in JSX: style={{ backgroundColor: colorTokens.status.new.background }}
 * - Use CSS vars: className="bg-[var(--status-new-bg)]"
 */

// Color Tokens
export const colorTokens = {
  // Status Colors
  status: {
    new: {
      background: 'hsl(0, 84%, 60%)',
      foreground: 'hsl(0, 0%, 100%)',
      border: 'hsl(0, 84%, 50%)',
      surface: 'hsl(0, 84%, 97%)',
    },
    'in-progress': {
      background: 'hsl(45, 93%, 47%)',
      foreground: 'hsl(45, 10%, 10%)',
      border: 'hsl(45, 93%, 37%)',
      surface: 'hsl(45, 93%, 95%)',
    },
    ready: {
      background: 'hsl(142, 71%, 45%)',
      foreground: 'hsl(0, 0%, 100%)',
      border: 'hsl(142, 71%, 35%)',
      surface: 'hsl(142, 71%, 97%)',
    },
    completed: {
      background: 'hsl(215, 16%, 47%)',
      foreground: 'hsl(0, 0%, 100%)',
      border: 'hsl(215, 16%, 37%)',
      surface: 'hsl(215, 16%, 97%)',
    },
    delayed: {
      background: 'hsl(0, 72%, 51%)',
      foreground: 'hsl(0, 0%, 100%)',
      border: 'hsl(0, 72%, 41%)',
      surface: 'hsl(0, 72%, 97%)',
    },
  },

  // Category Colors
  category: {
    grill: {
      background: 'hsl(24, 100%, 93%)',
      foreground: 'hsl(24, 90%, 25%)',
      border: 'hsl(24, 90%, 75%)',
    },
    salad: {
      background: 'hsl(142, 76%, 93%)',
      foreground: 'hsl(142, 76%, 25%)',
      border: 'hsl(142, 76%, 75%)',
    },
    drinks: {
      background: 'hsl(217, 91%, 93%)',
      foreground: 'hsl(217, 91%, 25%)',
      border: 'hsl(217, 91%, 75%)',
    },
    dessert: {
      background: 'hsl(330, 81%, 93%)',
      foreground: 'hsl(330, 81%, 25%)',
      border: 'hsl(330, 81%, 75%)',
    },
    appetizer: {
      background: 'hsl(271, 76%, 93%)',
      foreground: 'hsl(271, 76%, 25%)',
      border: 'hsl(271, 76%, 75%)',
    },
  },

  // Background Colors
  background: {
    base: 'hsl(0, 0%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    elevated: 'hsl(0, 0%, 100%)',
    overlay: 'hsl(0, 0%, 0%, 0.5)',
  },

  // Text Colors
  text: {
    primary: 'hsl(0, 0%, 9%)',
    secondary: 'hsl(0, 0%, 45%)',
    tertiary: 'hsl(0, 0%, 60%)',
    inverse: 'hsl(0, 0%, 100%)',
    disabled: 'hsl(0, 0%, 70%)',
  },

  // Border Colors
  border: {
    base: 'hsl(0, 0%, 89%)',
    subtle: 'hsl(0, 0%, 94%)',
    strong: 'hsl(0, 0%, 75%)',
    focus: 'hsl(24, 94%, 50%)',
  },

  // Brand Colors
  brand: {
    primary: 'hsl(24, 94%, 50%)',
    primaryHover: 'hsl(24, 94%, 45%)',
    secondary: 'hsl(217, 91%, 60%)',
    secondaryHover: 'hsl(217, 91%, 55%)',
  },

  // Feedback Colors
  feedback: {
    success: 'hsl(142, 71%, 45%)',
    warning: 'hsl(45, 93%, 47%)',
    error: 'hsl(0, 84%, 60%)',
    info: 'hsl(217, 91%, 60%)',
  },
} as const;

// Typography Tokens
export const typographyTokens = {
  fontFamily: {
    base: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;

// Spacing Tokens
export const spacingTokens = {
  'space-xs': '0.25rem',    // 4px
  'space-sm': '0.5rem',     // 8px
  'space-md': '1rem',       // 16px
  'space-lg': '1.5rem',     // 24px
  'space-xl': '2rem',       // 32px
  'space-2xl': '3rem',      // 48px
  'space-3xl': '4rem',      // 64px
} as const;

// Radius Tokens
export const radiusTokens = {
  none: '0',
  sm: '0.25rem',    // 4px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  full: '9999px',
} as const;

// Shadow Tokens
export const shadowTokens = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  glow: {
    new: '0 0 0 3px hsl(0, 84%, 60%, 0.1)',
    ready: '0 0 0 3px hsl(142, 71%, 45%, 0.1)',
  },
} as const;

// Animation Tokens
export const animationTokens = {
  duration: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Breakpoint Tokens
export const breakpointTokens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-Index Tokens
export const zIndexTokens = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
} as const;
