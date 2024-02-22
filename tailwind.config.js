/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./node_modules/flowbite/**/*.js"
],
  theme: {
    extend: {
            fontSize: {
                '10xl': '8rem',
            },
            fontFamily: {
                'montserrat': ['Montserrat'],
                'abhaya-libre': ['Abhaya Libre'],
                'alegraya-sans': ['Alegreya Sans'],
            },
            letterSpacing: {
                widest: '.25em',
            }
        },
  },
  plugins: [
            require('flowbite/plugin')
  ],
}


