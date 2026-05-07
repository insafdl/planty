export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f7',
          100: '#fce7f1',
          200: '#fbcfe4',
          300: '#f9a8cc',
          400: '#f472aa',
          500: '#e91e8c',
          600: '#d4167d',
          700: '#b01165',
          800: '#921254',
          900: '#7a1248',
        },
        dark: '#1a0a12',
      },

      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },

  plugins: [],
}