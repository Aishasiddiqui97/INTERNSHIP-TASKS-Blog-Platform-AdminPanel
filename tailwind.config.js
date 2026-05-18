/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      // Default (Light Mode)
      primary: '#0B0F19',
      secondary: '#1E293B',
      accent: '#8B5CF6',
      success: '#22C55E',
      error: '#EF4444',
      text: '#F8FAFC',
      muted: '#94A3B8',
      transparent: 'transparent',
      current: 'currentColor',
      
      // Dark Mode Overrides
      'primary-dark': '#09090B',
      'secondary-dark': '#18181B',
      'accent-dark': '#6366F1',
      'success-dark': '#14B8A6',
      'error-dark': '#EF4444',
      'text-dark': '#FAFAFA',
      'muted-dark': '#A1A1AA',
      
      // Required base colors for Tailwind utilities
      black: '#000',
      white: '#fff',
      gray: {
        50: '#f9fafb',
        100: '#f4f6f8',
        200: '#e4e7ed',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
    },
    extend: {
      backgroundColor: {
        primary: '#0B0F19',
        secondary: '#1E293B',
        accent: '#8B5CF6',
        success: '#22C55E',
        error: '#EF4444',
        
        'primary-dark': '#09090B',
        'secondary-dark': '#18181B',
        'accent-dark': '#6366F1',
        'success-dark': '#14B8A6',
        'error-dark': '#EF4444',
      },
      textColor: {
        primary: '#F8FAFC',
        secondary: '#94A3B8',
        accent: '#8B5CF6',
        success: '#22C55E',
        error: '#EF4444',
        
        'primary-dark': '#FAFAFA',
        'secondary-dark': '#A1A1AA',
        'accent-dark': '#6366F1',
        'success-dark': '#14B8A6',
        'error-dark': '#EF4444',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}