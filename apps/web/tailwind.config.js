/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF0F0',
          100: '#FFE0E0',
          200: '#FFBCBC',
          300: '#E8A0A0',
          400: '#C46B6B',
          500: '#8B2635',
          600: '#73202D',
          700: '#5C1924',
          800: '#44131B',
          900: '#2D0C12',
        },
        cream: {
          50: '#FFFCF9',
          100: '#FFF8F0',
          200: '#FFF1E3',
          300: '#FFE8D3',
        },
        accent: {
          pink: '#F5C6C6',
          rose: '#E8A0A0',
          peach: '#FFD5C2',
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
