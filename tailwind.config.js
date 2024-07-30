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
        // Add custom colors
        lightGray: '#F8F9FA',
        darkGray: '#343A40',
        navyBlue: '#2B3A67',
        customBlack: '#1a1a1a',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
        'modal-light': '#F8F9FA',
        'modal-dark': '#343A40',
        'modal-navy': '#2B3A67',
        'modal-custom': '#1a1a1a',
      }),
    },
  },
  plugins: [],
};
