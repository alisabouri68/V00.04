
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
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                dark: 'rgb(var(--color-dark) / <alpha-value>)',
                light: 'rgb(var(--color-light) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                warning: 'rgb(var(--color-warning) / <alpha-value>)',
                danger: 'rgb(var(--color-danger) / <alpha-value>)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('flowbite/plugin'),
        require('tailwind-scrollbar'),

    ],
}

