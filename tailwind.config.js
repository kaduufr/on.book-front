/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#8C6A5E',
        secondary: '#69A7BF',
        tertiary: '#72583A',
        blueLight: '#C2E0F2',
        brownLight: '#f2e5d0',
        grayIce: '#fffdfc',
        blueDark: '#42708C',
      },
    },
  },
  plugins: [require('daisyui')],
}
