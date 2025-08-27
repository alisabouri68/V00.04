/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,json}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  important: false,
  darkMode: "class",
  theme: {
    extend: {
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('./src/THME/index.js'),
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),

  ],
}
