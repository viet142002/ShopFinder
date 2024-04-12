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
                card: '0 20px 27px rgb(0 0 0/5%)'
            }
        }
    },
    plugins: []
};
