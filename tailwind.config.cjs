/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
module.exports = {
    mode: 'jit',
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Open Sans', 'sans-serif'],
          bree: ['Bree Serif', 'serif'],
        },
        colors: {
          testColor: '#FF5733',
          HCPred: {
            DEFAULT: '#CE2C37',
          }
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/line-clamp'),
      addVariablesForColors
    ],
  };
  function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );
  
    addBase({
      ":root": newVars,
    });
  }
  