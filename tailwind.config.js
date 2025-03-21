/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        dbg: {
          light: "#b0b0b0", // Default background for light mode
          dark: "#151515", // Background for dark mode
        },
        dt: {
          light: "#151515", // Text color for light mode
          dark: "#f0f0f0", // Text color for dark mode
        },
        main: {
          700: "#820407",
        
      }
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
