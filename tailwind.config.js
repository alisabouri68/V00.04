
// this is a default tailwind file that will use for theme setup - it will define the base theme by including the the
// default them from  ../src/THEMs/THME_defaut.JSON




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
      boxShadow: {
        'vazir-glow': '0px 10px 50px 5px #78C4D6',
      },
    },
  },
    plugins: [
        require('@tailwindcss/forms'),
        require('flowbite/plugin'),
        require('tailwind-scrollbar'),
        // custom theme plugin
        require('./src/THME/index'),
    ],
}

