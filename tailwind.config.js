export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
            },
            colors: {
                accent: '#D60100',
                'accent-hover': '#920201',
                'light-gray': '#f0f0f0',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [],
};