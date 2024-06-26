/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './solibee/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgba(var(--color-background))',
        font: 'rgba(var(--color-font))',
        subfont: 'rgba(var(--color-subfont))',
        h3font: 'rgba(var(--color-h3font))',
        footerfont: 'rgba(var(--color-footerfont))',
        boldfont: 'rgba(var(--color-boldfont))',
        hover: 'rgba(var(--color-hover))',

        yellow: {
          100: '#fcef46',
          200: '#ffd231',
        },
        orange: {
          100: '#faaa3d',
          200: '#f47833',
          300: '#742D06',
        },
        black: '#191818',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: '50px' },
        },
        'accordion-up': {
          from: { height: '50px' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-in-out',
        'accordion-up': 'accordion-up 0.2s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
