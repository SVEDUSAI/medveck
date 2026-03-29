/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // MedVek Brand Colors — from logo
        primary: {
          50: '#E8F3FB',
          100: '#C8E2F5',
          200: '#94C5EB',
          300: '#5AAED8',   // light blue (sparkles in logo)
          400: '#3A8EC4',   // steel blue (VEK letters)
          500: '#2B7AB8',   // main primary
          600: '#1F6299',
          700: '#1B4D7A',
          800: '#15395C',
          900: '#0E2540',
        },
        navy: {
          50: '#E8EEF5',
          100: '#C2D0E3',
          200: '#8AAAC9',
          300: '#5281AE',
          400: '#2B5F94',
          500: '#1B2D4F',   // dark navy (MED letters, main dark)
          600: '#162845',
          700: '#10203A',
          800: '#0B172B',
          900: '#070F1C',
        },
        // UI background — clean white/light blue instead of cream
        surface: {
          50: '#F4F8FD',
          100: '#EAF2FA',
          200: '#D5E6F4',
          300: '#B8D4EC',
        },
        accent: {
          cyan: '#5AB8D8',
          blue: '#3A8EC4',
          light: '#C8E2F5',
        },
        success: '#2D7A4F',
        warning: '#C4882A',
        danger: '#C0392B',
      },
      fontFamily: {
        heading: ['Nunito', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '16px',
        modal: '24px',
      },
    },
  },
  plugins: [],
};
