/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        customPink: '#ED51C2',
        customPinkSecondary: '#ed6dca',
        lightPink: '#f8d7da',
        darkPink: '#f5c6cb',
        lightGray: '#F8F9FA',
        darkGray: '#343A40',
        navyBlue: '#2B3A67',
        customBlack: '#1a1a1a',
        softBlue: '#E0F7FA',
        lightGradient: '#E2E8F0',
        paypalBlue: '#003087',
        stripeBlue: '#6772E5',
        deepBlue: '#212A31',
        slateBlue: '#2E3944',
        oceanBlue: '#124E66',
        coolGray: '#748D92',
        softGray: '#D3D9D4',
        paypa: '#FFC439',
        paypaHover: '#FFC102',
      },
      boxShadow: {
        paypal:
          '0 4px 4px -1px rgba(0, 89, 250, 0.8), 0 -2px 20px -2px rgba(0, 89, 250, 0.7)',
        stripe:
          '0 4px 4px -1px rgba(1, 114, 229, 0.8), 0 -2px 20px -2px rgba(103, 114, 229, 0.7)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-custom':
          'linear-gradient(to right, #f7f7f7, #e2e2e2, #cfcfcf)',
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
        'modal-light': '#F8F9FA',
        'modal-dark': '#343A40',
        'modal-navy': '#2B3A67',
        'modal-custom': '#1a1a1a',
        softBlue: '#E0F7FA',
      }),
      fontFamily: {
        handwritten: ['Indie Flower', 'cursive'],
        script: ['Dancing Script', 'cursive'],
        sans: ['Inter', 'sans-serif'],
        modernSans: ['Roboto', 'sans-serif'],
        modernSerif: ['Merriweather', 'serif'],
        display: ['Oswald', 'sans-serif'],
        rounded: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
