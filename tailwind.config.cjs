/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#0a68ff',
        white: '#fff',
        black: 'rgb(39, 39, 42)',
      },
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem'
      },
      boxShadow: {
        'sm': 'box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);',
        'lg': 'box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    },
    screens: {
      'xs': '360px',
      'sm': '568px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
      'xxl': '1440px'
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss')
  ],
  corePlugins: {
    preflight: false
  },
  important: true,
}