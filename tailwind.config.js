/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#394DFD',
        'custom-white':'#F7F8F9',
        'custom-gray':"#E8ECF4",
        
      },
    },
  },
  plugins: [],
 
}

