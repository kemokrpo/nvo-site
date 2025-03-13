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
          light: "#ffffff", // Default background for light mode
          dark: "#0f0f0f", // Background for dark mode
        },
        dt: {
          light: "#1a1a1a", // Text color for light mode
          dark: "#f5f5f5", // Text color for dark mode
        },
        main: {
          100: "#721011",
          200: "#500707",
          300: "#871616",
          400: "#700e10",
          500: "#7e1416",
          600: "#65071f",
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
