/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#F7F7F7',
        primary: {
          50: '#FFF9F0',
          100: '#FFF3E0',
          200: '#FEE7C1',
          300: '#FEDBA2',
          400: '#FED376', // Main CTA color
          500: '#FEC857',
          600: '#FDBC38',
          700: '#FDAF19',
          800: '#FDA300',
          900: '#E49200',
        },
        success: {
          50: '#F0F8F4',
          100: '#E1F1E9',
          200: '#C3E3D3',
          300: '#A2D7BF', // Success color
          400: '#81CAA9',
          500: '#60BD94',
          600: '#45A77C',
          700: '#378662',
          800: '#2A6549',
          900: '#1C4331',
        },
        accent: {
          50: '#FCF0F5',
          100: '#F9E1EB',
          200: '#F3C3D7',
          300: '#EA93BE', // Emotional accent
          400: '#E474AE',
          500: '#DD559E',
          600: '#D6368E',
          700: '#B92773',
          800: '#8C1E57',
          900: '#5F143B',
        },
        neutral: {
          50: '#F5F4F8',
          100: '#ECEAF1',
          200: '#D9D5E3',
          300: '#C6C0D5',
          400: '#A59CCC', // Text color
          500: '#8478C3',
          600: '#6354BA',
          700: '#4E409E',
          800: '#3B3077',
          900: '#28204F',
        }
      }
    },
  },
  plugins: [],
};