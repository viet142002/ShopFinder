/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#eee',
                secondary: '#2d2d2d',
                price: '#d01345'
            },
            margin: {
                sideBarMark: '2.5rem'
            },
            padding: {
                sideBarMark: '2.5rem'
            },
            width: {},
            boxShadow: {
                card: '0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15)'
            }
        }
    },
    plugins: []
};
