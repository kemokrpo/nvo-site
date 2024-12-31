/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#721011",
        main2: "#500707",
      },
      fontFamily: {
        satisfy: "Satisfy",
        roboto: "Roboto",
      },
      screens:{
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      clipPath: {
        'custom-mobile': 'polygon(0 0, 100% 0, 50% 100%, 0% 100%)',
        'custom-desktop': 'polygon(0 0, 52% 0, 100% 100%, 0% 100%)',
      },
    },
  },
  plugins: [
    require('tailwind-clip-path')
  ],
};
